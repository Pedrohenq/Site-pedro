import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  UtensilsCrossed,
  GlassWater,
  Package,
  MapPin,
  Phone,
  Mail,
  Building,
  FileText,
  Briefcase,
  Globe,
} from "lucide-react";
import { MenuSuggester } from "@/components/menu-suggester";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");

  const services = [
    {
      icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
      title: "Fornecimento de Alimentos",
      description:
        "Soluções completas de refeições preparadas para o dia a dia da sua empresa, com qualidade e sabor inigualáveis.",
    },
    {
      icon: <GlassWater className="h-10 w-10 text-primary" />,
      title: "Comércio de Bebidas",
      description:
        "Ampla variedade de bebidas, desde água e sucos naturais até refrigerantes, para complementar suas refeições.",
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: "Produtos Alimentícios Diversos",
      description:
        "Oferecemos uma gama de produtos alimentícios para atender necessidades específicas do seu negócio.",
    },
  ];

  const contactDetails = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Endereço",
      info: "R. José Gomes Domingues, 111 - Jaqueline, Belo Horizonte - MG, 31.748-075",
    },
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "Telefone",
      info: "(31) 9962-1406",
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "E-mail",
      info: "pedrinhopenta@gmail.com",
    },
  ];

  const legalInfo = [
     {
      icon: <Building className="h-5 w-5 text-primary" />,
      label: "Razão Social",
      value: "Pedro Henrique da Silva",
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: "CNPJ",
      value: "63.038.758/0001-39",
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      label: "Localização",
      value: "Belo Horizonte - MG",
    },
    {
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      label: "Atividade Principal",
      value: "Fornecimento de alimentos preparados",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="home"
          className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center text-white"
        >
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
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-shadow-lg">
              Alimentação Corporativa de Qualidade
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-shadow">
              Soluções completas em alimentos, bebidas e produtos para a sua empresa em Belo Horizonte.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="#contact">Entre em Contato</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Nossos Serviços
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                Oferecemos tudo que sua empresa precisa para uma alimentação de excelência.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center">
                    {service.icon}
                    <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
             <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Sobre Nós
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                Confiança e profissionalismo no fornecimento de alimentos.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-headline text-primary">Nossa Missão</h3>
                <p className="text-muted-foreground">
                  Nossa missão é fornecer soluções alimentares de alta qualidade que promovam o bem-estar e a produtividade no ambiente corporativo. Buscamos a excelência em cada prato, garantindo a satisfação dos nossos clientes.
                </p>
                <h3 className="text-2xl font-bold font-headline text-primary mt-6">Nossos Diferenciais</h3>
                <p className="text-muted-foreground">
                  Combinamos ingredientes frescos e selecionados com um serviço logístico impecável. Nossa flexibilidade para criar cardápios personalizados e nosso compromisso com a pontualidade nos destacam no mercado de Belo Horizonte.
                </p>
              </div>
              <div className="relative h-80 w-full rounded-lg shadow-2xl overflow-hidden">
                {aboutImage && (
                   <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-ai-hint={aboutImage.imageHint}
                  />
                )}
              </div>
            </div>
            <Card className="mt-16 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Informações Legais</CardTitle>
                <CardDescription>Transparência e credibilidade para nossos parceiros.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {legalInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    {info.icon}
                    <div>
                      <p className="font-semibold">{info.label}</p>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Menu Suggester Section */}
        <section id="suggester" className="py-16 md:py-24 bg-card">
          <div className="container px-4 md:px-6">
             <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Assistente de Cardápio com IA
              </h2>
              <p className="mt-3 max-w-3xl mx-auto text-lg text-muted-foreground">
                Não sabe o que pedir? Descreva as preferências, restrições ou o tipo de evento da sua equipe e nossa IA criará um cardápio personalizado.
              </p>
            </div>
            <MenuSuggester />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Entre em Contato
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-secondary-foreground/80">
                Estamos prontos para atender sua empresa.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {contactDetails.map((detail) => (
                <div key={detail.title} className="flex flex-col items-center text-center">
                  {detail.icon}
                  <h3 className="mt-4 text-xl font-bold font-headline">{detail.title}</h3>
                  <p className="mt-1 text-secondary-foreground/80">{detail.info}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href={`mailto:${contactDetails.find(d => d.title === 'E-mail')?.info}`}>Enviar um E-mail</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
