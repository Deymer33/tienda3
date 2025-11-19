import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { companySlogan } from "@/lib/company-data";
import { Button } from "@/components/ui/button";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-primary-foreground">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/70 bg-gradient-to-t from-primary/90 to-transparent" />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter drop-shadow-lg">
          SYS Govil
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80 drop-shadow-md">
          {companySlogan}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#services">Nuestros Servicios</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10">
            <Link href="#contact">Contáctanos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
