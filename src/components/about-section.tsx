import { companyInformation, mission, vision, values } from "@/lib/company-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-background"
      data-aos="fade-up" 
    >
      <div className="container">
        
        {/* Título y descripción */}
        <div
          className="text-center max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Tu Socio Estratégico en Soluciones Integrales
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {companyInformation}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Misión */}
          <Card data-aos="fade-up" data-aos-delay="150">
            <CardHeader>
              <CardTitle className="font-headline">Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mission}</p>
            </CardContent>
          </Card>

          {/* Visión */}
          <Card data-aos="fade-up" data-aos-delay="250">
            <CardHeader>
              <CardTitle className="font-headline">Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{vision}</p>
            </CardContent>
          </Card>

          {/* Valores */}
          <Card
            className="md:col-span-2 lg:col-span-1"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <CardHeader>
              <CardTitle className="font-headline">Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {values.map((value, idx) => (
                  <li
                    key={value.title}
                    className="flex items-start"
                    data-aos="fade-left"
                    data-aos-delay={400 + idx * 100} // animación escalonada
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold">{value.title}:</span>
                      <span className="text-muted-foreground ml-1">
                        {value.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
