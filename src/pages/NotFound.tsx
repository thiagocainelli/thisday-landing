import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEO from "@/components/seo/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log apenas em desenvolvimento
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  const quickLinks = [
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Preços", href: "/#precos" },
    { label: "Contato", href: "/contato" },
    { label: "Criar evento", href: "/criar-evento" },
  ];

  return (
    <>
      <SEO
        title="Página não encontrada - THISDAY"
        description="A página que você está procurando não foi encontrada. Volte para a página inicial ou explore nossos recursos."
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#eef4ff] via-transparent to-[#e9f7ff]" />
          </div>

          <div className="container relative z-10 px-6 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                {/* Icon */}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 via-[#1f4fd8]/20 to-[#38bdf8]/20 flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-foreground"
                >
                  Página não encontrada
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
              >
                Ops! A página que você está procurando não existe ou foi movida.
                Que tal voltar para a página inicial?
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <Button variant="hero" size="lg" asChild className="shadow-lg">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Voltar para home
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
                  className="shadow-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="border-t border-border/50 pt-8"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Links úteis:
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
