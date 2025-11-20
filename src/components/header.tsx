import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Zap, ShoppingCart } from "lucide-react";
import { companyName } from "@/lib/company-data";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary text-primary-foreground">
      <div className="container flex h-14 items-center">     
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={52}
            height={52}
          />
          <span className="font-bold font-headline text-lg">{companyName}</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary-foreground/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                   <Zap className="h-6 w-6 text-primary" />
                   <span className="font-bold font-headline">{companyName}</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contact">Solicitar Cotización</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
