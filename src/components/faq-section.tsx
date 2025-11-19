import { FAQClient } from "./faq-client";

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Preguntas Frecuentes
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            ¿Tienes alguna duda? Pregúntale a nuestro asistente de IA o envíanos un mensaje.
          </p>
        </div>
        <div className="mt-12">
          <FAQClient />
        </div>
      </div>
    </section>
  );
}
