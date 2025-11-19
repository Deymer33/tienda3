import Link from "next/link";
import { companyName, contact } from "@/lib/company-data";
import { Facebook, Instagram, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <span className="font-bold font-headline text-lg">{companyName}</span>
          </Link>
          <p className="text-sm text-primary-foreground/70">
            &copy; {new Date().getFullYear()} {companyName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
