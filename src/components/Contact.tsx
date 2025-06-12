
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });

      if (dbError) throw dbError;

      // Try to send email via edge function (will fail gracefully if not set up)
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: formData
        });
        
        if (emailError) {
          console.log('Email sending not configured yet:', emailError);
        }
      } catch (emailError) {
        console.log('Email function not available yet');
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. Your message has been saved and I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-wider mb-4">
            CONTACT
          </h2>
          <div className="w-24 h-px bg-foreground mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's collaborate on something extraordinary. Reach out for custom pieces, 
            consultations, or media inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-light tracking-wider mb-8">GET IN TOUCH</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm tracking-widest mb-2 text-foreground">STUDIO</h4>
                <p className="text-muted-foreground">Via della Spiga, 12</p>
                <p className="text-muted-foreground">20121 Milano, Italy</p>
              </div>
              
              <div>
                <h4 className="text-sm tracking-widest mb-2 text-foreground">EMAIL</h4>
                <p className="text-muted-foreground">hello@elenanoir.com</p>
                <p className="text-muted-foreground">press@elenanoir.com</p>
              </div>
              
              <div>
                <h4 className="text-sm tracking-widest mb-2 text-foreground">PHONE</h4>
                <p className="text-muted-foreground">+39 02 1234 5678</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="NAME"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-transparent border-muted-foreground/30 placeholder:text-muted-foreground/60 focus:border-foreground"
              />
              <Input
                name="email"
                type="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border-muted-foreground/30 placeholder:text-muted-foreground/60 focus:border-foreground"
              />
            </div>
            
            <Input
              name="subject"
              placeholder="SUBJECT"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-transparent border-muted-foreground/30 placeholder:text-muted-foreground/60 focus:border-foreground"
            />
            
            <Textarea
              name="message"
              placeholder="MESSAGE"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="bg-transparent border-muted-foreground/30 placeholder:text-muted-foreground/60 focus:border-foreground resize-none"
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-foreground text-background hover:bg-foreground/90 tracking-wider py-6"
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
