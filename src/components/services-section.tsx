import { services } from "@/lib/company-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-secondary"
      data-aos="fade-up"
    >
      <div className="container">

        {/* Título */}
        <div
          className="text-center max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Ofrecemos un portafolio de servicios completo y flexible, diseñado para optimizar las operaciones y potenciar el crecimiento de su organización.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = (Icons as any)[service.icon] as Icons.LucideIcon;

            return (
              <Card
                key={service.title}
                className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={150 + idx * 150} // animación escalonada
              >
                <CardHeader className="flex-row items-center gap-4">
                  <div
                    className="bg-primary text-primary-foreground p-3 rounded-md"
                    data-aos="zoom-in"
                    data-aos-delay={180 + idx * 150} // ícono animado después de la card
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-lg">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
