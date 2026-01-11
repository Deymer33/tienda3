import type { LucideIcon } from "lucide-react";

export const companyName = "SYS Govil";

export const companySlogan = "Soluciones Integrales para la Industria y Gobierno";

export const companyInformation = `
SYS Govil es una empresa mexicana con una trayectoria de más de una década en el mercado, dedicada a ofrecer soluciones integrales y personalizadas en abastecimiento, mantenimiento y logística para el sector industrial y gubernamental. Nuestro compromiso se basa en la eficiencia, calidad y la capacidad de adaptarnos a las necesidades específicas de cada uno de nuestros clientes, garantizando siempre la mejor relación costo-beneficio.
`;

export const mission = "Ser el socio estratégico preferido de nuestros clientes, proporcionando soluciones innovadoras y de alta calidad que impulsen su competitividad y crecimiento, a través de un equipo altamente capacitado y comprometido con la excelencia.";

export const vision = "Consolidarnos como líderes en el mercado nacional, expandiendo nuestra presencia y diversificando nuestros servicios para anticiparnos a las necesidades de la industria, manteniendo siempre nuestros principios de integridad, confianza y responsabilidad social.";

export const values: { title: string, description: string }[] = [
    { title: "Compromiso", description: "Dedicación total para cumplir y superar las expectativas de nuestros clientes." },
    { title: "Calidad", description: "Estándares de excelencia en cada producto, servicio y proyecto que entregamos." },
    { title: "Innovación", description: "Búsqueda constante de soluciones creativas y eficientes para los desafíos de la industria." },
    { title: "Confianza", description: "Construimos relaciones a largo plazo basadas en la transparencia y la integridad." },
    { title: "Responsabilidad", description: "Actuamos con responsabilidad social y ambiental en todas nuestras operaciones." }
];

export const services: { title: string; description: string; icon: string; }[] = [
  {
    title: "Abastecimiento y Suministros Especializados",
    description: "Proveemos una amplia gama de productos y equipos de alta calidad, desde componentes específicos hasta maquinaria pesada, asegurando la disponibilidad y entrega oportuna.",
    icon: "PackageSearch"
  },
  {
    title: "Mantenimiento Industrial y Operativo",
    description: "Ofrecemos programas de mantenimiento preventivo y correctivo para maquinaria y equipos industriales, maximizando su vida útil y eficiencia operativa.",
    icon: "Wrench"
  },
  {
    title: "Gestión Logística y Distribución",
    description: "Optimizamos la cadena de suministro de nuestros clientes con soluciones logísticas a medida, incluyendo almacenamiento, transporte y distribución a nivel nacional.",
    icon: "Truck"
  },
  {
    title: "Asesoría Técnica y Soporte Continuo",
    description: "Brindamos soporte técnico especializado y asesoría para la selección, instalación y operación de equipos, asegurando el máximo rendimiento.",
    icon: "Headset"
  },
  {
    title: "Proyectos a Medida",
    description: "Desarrollamos proyectos llave en mano para sector privado y público, abarcando desde la planificación hasta la ejecución y puesta en marcha.",
    icon: "Building2"
  }
];

export const contact = {
    address: "Plan de Ayala #2173, Privada Ntra. Sra. de la Soledad, Soledad de Graciano Sánchez, San Luis Potosí 78430",
    phone: "+52 444 123 4567",
    email: "Suministros_y_servicios@hotmail.com",
    whatsapp: "https://wa.me/524441234567",
    socials: {
        facebook: "https://facebook.com/sysgovil",
        instagram: "https://instagram.com/sysgovil",
    }
};

export const fullCompanyInfoForAI = `
Company Name: ${companyName}
Company Slogan: ${companySlogan}
Company Description: ${companyInformation}
Mission: ${mission}
Vision: ${vision}
Values: ${values.map(v => `${v.title}: ${v.description}`).join('; ')}
Services: ${services.map(s => `${s.title}: ${s.description}`).join('; ')}
Contact Information: Address: ${contact.address}, Phone: ${contact.phone}, Email: ${contact.email}
`;
