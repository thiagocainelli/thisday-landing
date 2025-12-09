import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Logo and tagline */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-background mb-2">THISDAY</h3>
              <p className="text-background/60 text-sm">
                Registro coletivo de um dia.
              </p>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8">
              <Link
                to="/termos"
                className="text-background/60 hover:text-background text-sm transition-colors duration-200"
              >
                Termos
              </Link>
              <Link
                to="/privacidade"
                className="text-background/60 hover:text-background text-sm transition-colors duration-200"
              >
                Privacidade
              </Link>
              <Link
                to="/contato"
                className="text-background/60 hover:text-background text-sm transition-colors duration-200"
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
            className="mt-10 pt-8 border-t border-background/10 text-center"
          >
            <p className="text-background/40 text-xs">
              © {new Date().getFullYear()} THISDAY. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
