import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <span className="text-xl font-bold text-foreground">THISDAY</span>
          </div>
        </div>
      </header>

      <main className="container px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Termos de Uso
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e usar o THISDAY, você concorda em cumprir e estar vinculado 
                a estes Termos de Uso. Se você não concordar com qualquer parte destes 
                termos, não poderá acessar o serviço.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Descrição do Serviço
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                THISDAY é uma plataforma que permite a coleta e compartilhamento 
                temporário de fotos em eventos através de QR Codes. O serviço é 
                destinado a uso pessoal e comercial para eventos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Conteúdo do Usuário
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você é responsável por todo o conteúdo enviado através do THISDAY. 
                Ao enviar fotos, você declara que:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Possui os direitos sobre as imagens enviadas</li>
                <li>O conteúdo não viola direitos de terceiros</li>
                <li>O conteúdo não é ilegal, ofensivo ou inapropriado</li>
                <li>Concorda com a remoção automática após o período do evento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. Temporalidade do Conteúdo
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                As fotos enviadas para eventos no THISDAY são temporárias e serão 
                automaticamente removidas após o período contratado (7, 15 ou 30 dias, 
                conforme o plano escolhido). Recomendamos que os usuários façam backup 
                de suas fotos antes do término do período.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Uso Aceitável
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                É proibido usar o THISDAY para compartilhar conteúdo que seja ilegal, 
                difamatório, pornográfico, violento ou que viole os direitos de 
                propriedade intelectual de terceiros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Limitação de Responsabilidade
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                O THISDAY não se responsabiliza por perdas ou danos resultantes do 
                uso do serviço, incluindo, mas não se limitando a, perda de dados ou 
                interrupção do serviço.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Alterações nos Termos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão comunicadas aos usuários através do 
                e-mail cadastrado ou aviso no site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Para dúvidas sobre estes termos, entre em contato através da nossa{" "}
                <Link to="/contato" className="text-primary hover:underline">
                  página de contato
                </Link>
                .
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Terms;
