const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo and tagline */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-background mb-2">THISDAY</h3>
              <p className="text-background/60 text-sm">
                Registro coletivo de um dia.
              </p>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8">
              <a
                href="#"
                className="text-background/60 hover:text-background text-sm transition-colors duration-200"
              >
                Termos
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background text-sm transition-colors duration-200"
              >
                Privacidade
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background text-sm transition-colors duration-200"
              >
                Contato
              </a>
            </nav>
          </div>

          <div className="mt-10 pt-8 border-t border-background/10 text-center">
            <p className="text-background/40 text-xs">
              © {new Date().getFullYear()} THISDAY. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
