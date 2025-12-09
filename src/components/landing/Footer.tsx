import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-primary via-[#1f4fd8] to-[#38bdf8] text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-white/40 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/30 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_40%)]" />
      </div>

      <div className="container relative z-10 pt-12 pb-6 md:pt-16 space-y-16">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 mb-6 leading-tight"
          >
            Um dia. Várias memórias.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/85 text-lg mb-10 max-w-md mx-auto"
          >
            Comece agora e crie a memória coletiva do seu próximo evento com
            fotos e vídeos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="secondary"
              size="xl"
              className="shadow-lg hover:shadow-xl"
              asChild
            >
              <Link to="/criar-evento">
                Criar meu evento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer Links */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Logo and tagline */}
            <div className="text-center md:text-left">
              <Link
                to="/"
                onClick={() => {
                  // Se já estiver na home, fazer scroll suave para o topo
                  if (window.location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="flex items-center justify-center gap-2 text-4xl font-bold mb-2 hover:opacity-80 transition-opacity duration-200"
              >
                <QrCode className="h-8 w-8 text-white" />
                <span>
                  <span className="text-[#22d3ee] font-extrabold italic tracking-wider drop-shadow-md">
                    this
                  </span>
                  <span className="text-white font-normal">day</span>
                </span>
              </Link>
              <p className="text-white/70 text-sm">Um dia. Várias memórias.</p>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8">
              <Link
                to="/termos"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Termos
              </Link>
              <Link
                to="/privacidade"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Privacidade
              </Link>
              <Link
                to="/contato"
                className="text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Contato
              </Link>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-6 border-t border-white/15 text-center"
          >
            <p className="text-white/60 text-xs">
              © {new Date().getFullYear()} THISDAY. Todos os direitos
              reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
