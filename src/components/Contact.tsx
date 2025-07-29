import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_CONTACT_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_ID ||
  "YOUR_TEMPLATE_CONTACT_ID";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.subject.trim() ||
        !formData.message.trim()
      ) {
        // setStatus("error");
        // setErrorMessage("Please fill in all fields.");
        toast({
          title: "Error sending message",
          description: "Please try again later.",
          variant: "destructive",
        });
        return;
      }

      emailjs
        .sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_CONTACT_ID,
          formRef.current,
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
            Let's collaborate on something extraordinary. Reach out for custom
            pieces, consultations, or media inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-light tracking-wider mb-8">
              GET IN TOUCH
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm tracking-widest mb-2 text-foreground">
                  STUDIO
                </h4>
                <p className="text-muted-foreground">Via della Spiga, 12</p>
                <p className="text-muted-foreground">20121 Milano, Italy</p>
              </div>

              <div>
                <h4 className="text-sm tracking-widest mb-2 text-foreground">
                  EMAIL
                </h4>
                <p className="text-muted-foreground">hello@elenanoir.com</p>
                <p className="text-muted-foreground">press@elenanoir.com</p>
              </div>

              <div>
                <h4 className="text-sm tracking-widest mb-2 text-foreground">
                  PHONE
                </h4>
                <p className="text-muted-foreground">+39 02 1234 5678</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
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
