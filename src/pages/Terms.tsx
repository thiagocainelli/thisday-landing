import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import PageBanner from "@/components/ui/PageBanner";
import PageContainer from "@/components/ui/PageContainer";
import { Link } from "react-router-dom";

const Terms = () => {
  const lastUpdate = "15 de janeiro de 2024";

  return (
    <>
      <SEO
        title="Termos de Uso - shareday"
        description="Leia os Termos de Uso da plataforma. Conheça as regras, direitos e responsabilidades ao utilizar nossa plataforma de coleta de fotos para eventos."
        keywords="termos de uso plataforma, política plataforma, condições de uso, termos e condições"
        url="https://shareday.app/termos"
      />
      <div className="min-h-screen bg-background">
        <PageBanner title="Termos de Uso" backTo="/" />

        <PageContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8">
              <Card className="bg-secondary/30 border-border/50">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      Última atualização
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lastUpdate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ao utilizar nossos serviços, você concorda com estes
                      termos. Recomendamos a leitura completa antes de
                      prosseguir.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* 1. Informações Gerais */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Informações Gerais e Aceitação
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Estes Termos de Uso ("Termos") regem o uso da plataforma
                    shareday ("Plataforma", "Serviço", "nós", "nosso"), operada
                    por [NOME DA EMPRESA], inscrita no CNPJ sob o nº [CNPJ], com
                    sede em [ENDEREÇO COMPLETO] ("Empresa").
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Ao acessar, utilizar ou criar uma conta na Plataforma,
                      você ("Usuário", "Você", "Organizador") declara ter lido,
                      compreendido e aceito integralmente estes Termos, bem como
                      nossa{" "}
                      <Link
                        to="/privacidade"
                        className="text-primary hover:underline font-medium"
                      >
                        Política de Privacidade
                      </Link>
                      .
                    </strong>
                  </p>
                  <p>
                    Se você não concordar com qualquer parte destes Termos, não
                    poderá acessar ou utilizar nossos serviços. O uso continuado
                    da Plataforma após alterações nestes Termos constitui
                    aceitação das mesmas.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 2. Definições */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  2. Definições
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Organizador:</strong>{" "}
                    Pessoa física ou jurídica que contrata e paga pelo serviço
                    para criar um evento na Plataforma.
                  </p>
                  <p>
                    <strong className="text-foreground">Convidado:</strong>{" "}
                    Pessoa que acessa o evento através de QR Code e envia fotos,
                    sem necessidade de cadastro.
                  </p>
                  <p>
                    <strong className="text-foreground">Evento:</strong> Espaço
                    virtual temporário criado pelo Organizador para coleta de
                    fotos.
                  </p>
                  <p>
                    <strong className="text-foreground">Conteúdo:</strong> Todas
                    as fotos, imagens, textos e demais materiais enviados
                    através da Plataforma.
                  </p>
                  <p>
                    <strong className="text-foreground">Plano:</strong>{" "}
                    Modalidade de contratação do serviço (Básico, Evento ou
                    Premium), com limites de fotos e período de disponibilidade
                    distintos.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 3. Descrição do Serviço */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  3. Descrição do Serviço
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    shareday é uma plataforma digital que permite a coleta e
                    compartilhamento temporário de fotos em eventos através de
                    QR Codes. O serviço permite que:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Organizadores criem eventos e recebam um QR Code único
                      para compartilhamento;
                    </li>
                    <li>
                      Convidados enviem fotos diretamente do celular, sem
                      necessidade de instalação de aplicativo ou cadastro;
                    </li>
                    <li>
                      Todas as fotos e vídeos sejam centralizadas em uma galeria
                      temporária, acessível apenas durante o período contratado;
                    </li>
                    <li>
                      O conteúdo seja automaticamente excluído após o término do
                      período do plano escolhido.
                    </li>
                  </ul>
                  <p>
                    O serviço é destinado a uso pessoal e comercial para eventos
                    como casamentos, aniversários, eventos corporativos e
                    similares.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 4. Cadastro e Conta */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  4. Cadastro e Conta do Organizador
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>Para utilizar o serviço como Organizador, é necessário:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Ter pelo menos 18 anos de idade ou estar emancipado;
                    </li>
                    <li>
                      Fornecer informações verdadeiras, precisas e atualizadas
                      (nome completo, e-mail, telefone);
                    </li>
                    <li>
                      Manter a confidencialidade de suas credenciais de acesso;
                    </li>
                    <li>
                      Ser responsável por todas as atividades realizadas em sua
                      conta.
                    </li>
                  </ul>
                  <p>
                    <strong className="text-foreground">
                      Você é responsável por manter a segurança de sua conta e
                      por todas as ações realizadas sob sua conta.
                    </strong>{" "}
                    A Empresa não se responsabiliza por perdas decorrentes de
                    uso não autorizado de sua conta.
                  </p>
                  <p>
                    Reservamo-nos o direito de suspender ou encerrar contas que
                    violem estes Termos ou que sejam utilizadas de forma
                    fraudulenta.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 5. Conteúdo do Usuário */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  5. Conteúdo do Usuário e Responsabilidades
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">
                      Você é o único responsável por todo o Conteúdo enviado
                      através da Plataforma.
                    </strong>{" "}
                    Ao enviar fotos e vídeos ou qualquer outro material, você
                    declara e garante que:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Possui todos os direitos, licenças e autorizações
                      necessárias sobre o Conteúdo;
                    </li>
                    <li>
                      O Conteúdo não viola direitos de propriedade intelectual,
                      direitos de imagem, privacidade ou qualquer outro direito
                      de terceiros;
                    </li>
                    <li>
                      O Conteúdo não contém material ilegal, difamatório,
                      calunioso, pornográfico, violento, discriminatório ou
                      ofensivo;
                    </li>
                    <li>
                      O Conteúdo não contém vírus, malware ou código malicioso;
                    </li>
                    <li>
                      Você obteve o consentimento necessário de todas as pessoas
                      identificáveis nas imagens;
                    </li>
                    <li>
                      O Conteúdo não viola leis ou regulamentos aplicáveis.
                    </li>
                  </ul>
                  <p>
                    A Empresa se reserva o direito de remover, sem aviso prévio,
                    qualquer Conteúdo que viole estes Termos ou que seja
                    considerado inadequado, a nosso exclusivo critério.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Você concorda em indenizar e isentar a Empresa de qualquer
                      responsabilidade decorrente de violação dos direitos de
                      terceiros por Conteúdo enviado por você ou por convidados
                      do seu evento.
                    </strong>
                  </p>
                </div>
              </section>

              <Separator />

              {/* 6. Temporalidade e Exclusão */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  6. Temporalidade do Conteúdo e Exclusão Automática
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">
                      O serviço é temporário por design.
                    </strong>{" "}
                    Todas as fotos e Conteúdo enviados para eventos na
                    plataforma serão automaticamente e permanentemente excluídos
                    após o término do período contratado:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong className="text-foreground">Plano Básico:</strong>{" "}
                      7 dias a partir da data do evento
                    </li>
                    <li>
                      <strong className="text-foreground">Plano Evento:</strong>{" "}
                      15 dias a partir da data do evento
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Plano Premium:
                      </strong>{" "}
                      30 dias a partir da data do evento
                    </li>
                  </ul>
                  <p>
                    <strong className="text-foreground">
                      Após a exclusão automática, não será possível recuperar o
                      Conteúdo.
                    </strong>{" "}
                    Recomendamos fortemente que Organizadores e Convidados façam
                    backup de todas as fotos e vídeos desejadas antes do término
                    do período.
                  </p>
                  <p>
                    A Empresa não se responsabiliza por perda de Conteúdo após a
                    exclusão automática ou por falhas técnicas que possam
                    resultar em perda antecipada de dados.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 7. Pagamentos e Reembolsos */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  7. Pagamentos, Preços e Política de Reembolso
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Preços:</strong> Os
                    preços dos planos são exibidos em Reais (R$) e podem ser
                    alterados a qualquer momento. O preço cobrado será o vigente
                    no momento da contratação.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Formas de Pagamento:
                    </strong>{" "}
                    Aceitamos pagamento via Pix e cartão de crédito
                    (parcelamento em até 10x, com juros aplicados após 3x).
                  </p>
                  <p>
                    <strong className="text-foreground">Reembolsos:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Reembolsos podem ser solicitados até 7 dias após a
                      contratação, desde que o evento ainda não tenha ocorrido;
                    </li>
                    <li>
                      Após o início do período do evento, não serão concedidos
                      reembolsos;
                    </li>
                    <li>
                      Em caso de falha técnica comprovada da Plataforma que
                      impeça o uso do serviço, avaliaremos reembolso
                      proporcional;
                    </li>
                    <li>
                      Reembolsos serão processados no prazo de até 10 dias
                      úteis, no mesmo método de pagamento utilizado.
                    </li>
                  </ul>
                  <p>
                    <strong className="text-foreground">Cancelamento:</strong>{" "}
                    Organizadores podem cancelar eventos a qualquer momento, mas
                    o Conteúdo será excluído imediatamente e não haverá
                    reembolso se o período já tiver iniciado.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 8. Uso Aceitável */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  8. Uso Aceitável e Proibições
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>É expressamente proibido utilizar a Plataforma para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Compartilhar conteúdo ilegal, incluindo mas não limitado a
                      material pornográfico, violento, difamatório ou que
                      promova atividades criminosas;
                    </li>
                    <li>
                      Violar direitos de propriedade intelectual, incluindo
                      direitos autorais, marcas registradas ou patentes;
                    </li>
                    <li>
                      Violar direitos de privacidade ou imagem de terceiros sem
                      consentimento;
                    </li>
                    <li>
                      Enviar spam, conteúdo malicioso, vírus ou código que possa
                      danificar a Plataforma ou sistemas de terceiros;
                    </li>
                    <li>
                      Tentar acessar áreas restritas da Plataforma ou realizar
                      engenharia reversa;
                    </li>
                    <li>
                      Utilizar a Plataforma de forma que possa sobrecarregar ou
                      prejudicar o funcionamento do serviço;
                    </li>
                    <li>
                      Representar falsamente sua identidade ou afiliação com
                      qualquer pessoa ou entidade;
                    </li>
                    <li>Coletar dados de outros usuários sem autorização.</li>
                  </ul>
                  <p>
                    A violação destas proibições pode resultar em suspensão
                    imediata da conta, exclusão de Conteúdo e, quando aplicável,
                    medidas legais.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 9. Propriedade Intelectual */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  9. Propriedade Intelectual
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Plataforma:</strong>{" "}
                    Todos os direitos de propriedade intelectual sobre a
                    Plataforma, incluindo design, código, logotipos, marcas e
                    conteúdo próprio, pertencem à Empresa ou a seus
                    licenciadores.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Conteúdo do Usuário:
                    </strong>{" "}
                    Você mantém todos os direitos sobre o Conteúdo que enviar.
                    Ao enviar Conteúdo, você concede à Empresa uma licença não
                    exclusiva, mundial, livre de royalties e transferível para
                    usar, armazenar, processar e exibir o Conteúdo
                    exclusivamente para fornecer o serviço, durante o período
                    contratado.
                  </p>
                  <p>
                    Após a exclusão automática do Conteúdo, a licença será
                    revogada e a Empresa não manterá cópias.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 10. Limitação de Responsabilidade */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  10. Limitação de Responsabilidade
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">
                      A Plataforma é fornecida "como está" e "conforme
                      disponível".
                    </strong>{" "}
                    A Empresa não garante que o serviço será ininterrupto, livre
                    de erros ou que atenderá a todas as suas expectativas.
                  </p>
                  <p>
                    Na máxima extensão permitida por lei, a Empresa não se
                    responsabiliza por:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Perda de dados, incluindo fotos e Conteúdo, por qualquer
                      motivo;
                    </li>
                    <li>
                      Interrupções, falhas técnicas ou indisponibilidade
                      temporária do serviço;
                    </li>
                    <li>
                      Danos indiretos, incidentais, especiais ou consequenciais;
                    </li>
                    <li>
                      Ações ou omissões de terceiros, incluindo Convidados ou
                      prestadores de serviço;
                    </li>
                    <li>
                      Conteúdo enviado por outros usuários que possa ser
                      inadequado, ofensivo ou ilegal;
                    </li>
                    <li>
                      Perda de lucros, receita ou oportunidades de negócio.
                    </li>
                  </ul>
                  <p>
                    A responsabilidade total da Empresa, em qualquer
                    circunstância, está limitada ao valor pago pelo Organizador
                    pelo plano no período de 12 meses anteriores ao evento que
                    deu origem à reclamação.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 11. Indenização */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  11. Indenização
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Você concorda em indenizar, defender e isentar a Empresa,
                    seus diretores, funcionários, agentes e parceiros de
                    qualquer reclamação, demanda, perda, responsabilidade e
                    despesa (incluindo honorários advocatícios) decorrentes de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Seu uso da Plataforma;</li>
                    <li>
                      Conteúdo enviado por você ou por Convidados do seu evento;
                    </li>
                    <li>Violação destes Termos;</li>
                    <li>Violação de direitos de terceiros;</li>
                    <li>
                      Qualquer atividade ilegal realizada através de sua conta.
                    </li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* 12. Modificações */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  12. Modificações dos Termos e do Serviço
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    A Empresa se reserva o direito de modificar estes Termos a
                    qualquer momento. Alterações significativas serão
                    comunicadas através de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>E-mail enviado ao endereço cadastrado;</li>
                    <li>Aviso destacado na Plataforma;</li>
                    <li>
                      Atualização da data de "Última atualização" nesta página.
                    </li>
                  </ul>
                  <p>
                    O uso continuado da Plataforma após as modificações
                    constitui aceitação dos novos Termos. Se você não concordar
                    com as alterações, deve encerrar o uso do serviço.
                  </p>
                  <p>
                    A Empresa também se reserva o direito de modificar,
                    suspender ou descontinuar qualquer aspecto do serviço, com
                    ou sem aviso prévio.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 13. Rescisão */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  13. Rescisão
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Você pode encerrar sua conta a qualquer momento através das
                    configurações da Plataforma ou entrando em contato conosco.
                  </p>
                  <p>
                    A Empresa pode suspender ou encerrar sua conta
                    imediatamente, sem aviso prévio, se você violar estes Termos
                    ou se houver suspeita de atividade fraudulenta ou ilegal.
                  </p>
                  <p>
                    Após a rescisão, seu acesso à Plataforma será encerrado e
                    todo o Conteúdo será excluído conforme a política de
                    temporalidade. Não haverá reembolso para períodos já
                    utilizados.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 14. Lei Aplicável e Foro */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  14. Lei Aplicável e Foro
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Estes Termos são regidos pelas leis da República Federativa
                    do Brasil.
                  </p>
                  <p>
                    Qualquer disputa decorrente destes Termos será resolvida
                    preferencialmente por meio de mediação. Na hipótese de não
                    ser possível a resolução por mediação, as partes elegem o
                    foro da comarca de [CIDADE/ESTADO], renunciando a qualquer
                    outro, por mais privilegiado que seja.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 15. Disposições Gerais */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  15. Disposições Gerais
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Integralidade:</strong>{" "}
                    Estes Termos, juntamente com a Política de Privacidade,
                    constituem o acordo integral entre você e a Empresa.
                  </p>
                  <p>
                    <strong className="text-foreground">Renúncia:</strong> A
                    falha da Empresa em exercer qualquer direito não constitui
                    renúncia a tal direito.
                  </p>
                  <p>
                    <strong className="text-foreground">Divisibilidade:</strong>{" "}
                    Se qualquer disposição destes Termos for considerada
                    inválida, as demais disposições permanecerão em pleno vigor.
                  </p>
                  <p>
                    <strong className="text-foreground">Cessão:</strong> Você
                    não pode ceder ou transferir estes Termos sem consentimento
                    prévio por escrito. A Empresa pode ceder estes Termos a
                    qualquer momento.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Menores de Idade:
                    </strong>{" "}
                    Menores de 18 anos devem ter autorização de responsável
                    legal para utilizar o serviço como Organizador.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 16. Contato */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  16. Contato e Suporte
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Para questões sobre estes Termos, dúvidas ou suporte, entre
                    em contato conosco através de:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>
                      <strong className="text-foreground">E-mail:</strong>{" "}
                      <a
                        href="mailto:contato@shareday.app"
                        className="text-primary hover:underline"
                      >
                        contato@shareday.app
                      </a>
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Página de Contato:
                      </strong>{" "}
                      <Link
                        to="/contato"
                        className="text-primary hover:underline"
                      >
                        /contato
                      </Link>
                    </li>
                  </ul>
                  <p>
                    Comprometemo-nos a responder todas as solicitações em até 5
                    dias úteis.
                  </p>
                </div>
              </section>
            </div>

            {/* Footer Info */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Ao utilizar a plataforma, você confirma que leu, compreendeu e
                  aceita estes Termos de Uso e nossa{" "}
                  <Link
                    to="/privacidade"
                    className="text-primary hover:underline font-medium"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </PageContainer>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Terms;
