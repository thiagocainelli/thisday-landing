import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
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
            Política de Privacidade
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Introdução
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                O THISDAY respeita sua privacidade e está comprometido em proteger 
                seus dados pessoais. Esta política descreve como coletamos, usamos 
                e protegemos suas informações.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Dados Coletados
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coletamos os seguintes tipos de informações:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>Organizadores:</strong> E-mail, nome e informações de pagamento
                </li>
                <li>
                  <strong>Convidados:</strong> Apenas as fotos enviadas (sem cadastro necessário)
                </li>
                <li>
                  <strong>Dados técnicos:</strong> Endereço IP, tipo de navegador, dispositivo
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Uso dos Dados
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos seus dados para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fornecer e manter nosso serviço</li>
                <li>Processar pagamentos</li>
                <li>Enviar comunicações sobre o serviço</li>
                <li>Melhorar a experiência do usuário</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. Armazenamento de Fotos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                As fotos enviadas são armazenadas de forma segura em nossos servidores 
                e são <strong>automaticamente excluídas</strong> após o período do 
                evento (7, 15 ou 30 dias). Não mantemos cópias das fotos após a exclusão.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Compartilhamento de Dados
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais 
                com terceiros para fins de marketing. Podemos compartilhar dados 
                apenas com prestadores de serviço essenciais (como processadores 
                de pagamento) ou quando exigido por lei.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Segurança
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para 
                proteger seus dados, incluindo criptografia de dados em trânsito 
                e em repouso, controles de acesso e monitoramento contínuo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Seus Direitos
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você tem direito a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incorretos</li>
                <li>Solicitar exclusão de seus dados</li>
                <li>Revogar consentimento a qualquer momento</li>
                <li>Receber seus dados em formato portátil</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies essenciais para o funcionamento do site e cookies 
                analíticos para entender como os usuários interagem com nosso serviço. 
                Você pode configurar seu navegador para recusar cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                9. Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, 
                entre em contato através da nossa{" "}
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

export default Privacy;
