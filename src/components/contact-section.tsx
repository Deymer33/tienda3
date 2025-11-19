import { InquiryForm } from "./inquiry-form";
import { contact } from "@/lib/company-data";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="text-left">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Ponte en Contacto
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Estamos listos para ayudarte. Completa el formulario o utiliza uno de nuestros canales de contacto directo.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Dirección</h3>
                  <p className="text-muted-foreground">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Teléfono y WhatsApp</h3>
                  <Button variant="link" asChild className="p-0 h-auto text-base text-muted-foreground">
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </Button>
                  <br />
                  <Button variant="link" asChild className="p-0 h-auto text-base text-muted-foreground">
                    <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Chatea con nosotros</a>
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <Button variant="link" asChild className="p-0 h-auto text-base text-muted-foreground">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
