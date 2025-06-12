
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(resendApiKey);
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Send notification email to site owner
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You'll need to update this with your verified domain
      to: ["your-email@example.com"], // Replace with your actual email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from your portfolio contact form.</em></p>
      `,
    });

    // Send confirmation email to the person who submitted the form
    await resend.emails.send({
      from: "Elena Noir <onboarding@resend.dev>", // You'll need to update this with your verified domain
      to: [email],
      subject: "Thank you for your message!",
      html: `
        <h2>Thank you for contacting me, ${name}!</h2>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Your message:</p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 16px; margin: 16px 0;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>Elena Noir</p>
      `,
    });

    console.log("Emails sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
