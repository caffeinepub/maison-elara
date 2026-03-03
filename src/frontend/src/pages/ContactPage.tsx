import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useMetaTags } from "../hooks/useMetaTags";
import { useSubmitContact } from "../hooks/useQueries";

export function ContactPage() {
  useMetaTags({
    title: "Contact",
    description:
      "Contact Maison Elara to begin your interior design journey. We'd love to hear about your project.",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { mutate, isPending, isSuccess, isError } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
  };

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 text-center bg-beige dark:bg-muted/20">
        <AnimatedSection>
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Get In Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-foreground mb-4">
            Contact Us
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mt-2 mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            We'd love to hear about your project. Let's start a conversation.
          </p>
        </AnimatedSection>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-medium text-foreground mb-8">
                Send Us a Message
              </h2>

              {isSuccess ? (
                <div
                  data-ocid="contact.success_state"
                  className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-8 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-medium text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Thank you for reaching out. We'll be in touch within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isError && (
                    <div
                      data-ocid="contact.error_state"
                      className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                      <p className="text-sm text-destructive">
                        Something went wrong. Please try again or email us
                        directly.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-xs tracking-[0.12em] uppercase font-semibold text-muted-foreground"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        data-ocid="contact.name_input"
                        type="text"
                        value={form.name}
                        onChange={handleChange("name")}
                        required
                        placeholder="Elara Beaumont"
                        className="rounded-xl border-border focus:border-gold focus:ring-gold/20 bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs tracking-[0.12em] uppercase font-semibold text-muted-foreground"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        data-ocid="contact.email_input"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        required
                        placeholder="hello@example.com"
                        className="rounded-xl border-border focus:border-gold focus:ring-gold/20 bg-card"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-xs tracking-[0.12em] uppercase font-semibold text-muted-foreground"
                    >
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      data-ocid="contact.subject_input"
                      type="text"
                      value={form.subject}
                      onChange={handleChange("subject")}
                      required
                      placeholder="New project inquiry"
                      className="rounded-xl border-border focus:border-gold focus:ring-gold/20 bg-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-xs tracking-[0.12em] uppercase font-semibold text-muted-foreground"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      data-ocid="contact.message_textarea"
                      value={form.message}
                      onChange={handleChange("message")}
                      required
                      placeholder="Tell us about your project, timeline, and budget..."
                      rows={6}
                      className="rounded-xl border-border focus:border-gold focus:ring-gold/20 bg-card resize-none"
                    />
                  </div>

                  {isPending ? (
                    <div
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2 text-muted-foreground text-sm"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending your message...
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={isPending}
                    className="w-full sm:w-auto px-10 py-3.5 bg-gold text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-gold-dark transition-all duration-300 hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={100}>
              <h2 className="font-display text-2xl font-medium text-foreground mb-8">
                Studio Information
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase font-semibold text-muted-foreground mb-1">
                      Studio Address
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">
                      42 Rue du Faubourg Saint-Honoré
                      <br />
                      Paris, 75008, France
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase font-semibold text-muted-foreground mb-1">
                      Phone
                    </p>
                    <p className="text-foreground text-sm">+33 1 42 68 00 00</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase font-semibold text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@maisonelara.com"
                      className="text-foreground text-sm hover:text-gold transition-colors"
                    >
                      hello@maisonelara.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase font-semibold text-muted-foreground mb-1">
                      Business Hours
                    </p>
                    <div className="text-foreground text-sm space-y-1">
                      <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                      <p>Saturday: 10:00 AM – 4:00 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-10 rounded-2xl overflow-hidden border border-border bg-beige dark:bg-muted/30 aspect-video flex items-center justify-center relative">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{
                    backgroundImage:
                      "url('/assets/generated/project-dining.dim_800x600.jpg')",
                  }}
                />
                <div className="relative z-10 text-center glass-card rounded-xl px-6 py-4">
                  <MapPin className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-foreground text-xs font-semibold tracking-wide">
                    Paris 8th Arrondissement
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Near Champs-Élysées
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
