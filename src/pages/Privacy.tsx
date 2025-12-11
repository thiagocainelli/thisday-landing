import { motion } from "framer-motion";
import { Lock, Eye, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import PageBanner from "@/components/ui/PageBanner";
import PageContainer from "@/components/ui/PageContainer";
import { Link } from "react-router-dom";

const Privacy = () => {
  const lastUpdate = "15 de janeiro de 2024";

  return (
    <>
      <SEO
        title="Privacidade - shareday"
        description="Leia a Política de Privacidade da plataforma. Conheça como coletamos, usamos, armazenamos e protegemos seus dados pessoais."
        keywords="política de privacidade plataforma, privacidade plataforma, proteção de dados, política de proteção de dados"
        url="https://shareday.app/privacidade"
      />
      <div className="min-h-screen bg-background">
        <PageBanner title="Política de Privacidade" backTo="/" />

        <PageContainer className="-mt-10 md:-mt-14 py-20">
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
                      Conformidade com a LGPD
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Esta Política está em conformidade com a Lei Geral de
                      Proteção de Dados (Lei nº 13.709/2018) e descreve como
                      coletamos, usamos, armazenamos e protegemos seus dados
                      pessoais.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Última atualização: {lastUpdate}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* 1. Introdução */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Introdução e Responsável pelo Tratamento
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    shareday ("nós", "nosso", "Plataforma") é operado por [NOME
                    DA EMPRESA], inscrita no CNPJ sob o nº [CNPJ], com sede em
                    [ENDEREÇO COMPLETO], atuando como Controladora dos dados
                    pessoais coletados através desta Plataforma.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Esta Política de Privacidade descreve como coletamos,
                      usamos, armazenamos, compartilhamos e protegemos suas
                      informações pessoais quando você utiliza nossos serviços.
                    </strong>
                  </p>
                  <p>
                    Ao utilizar a Plataforma, você concorda com as práticas
                    descritas nesta Política. Recomendamos a leitura completa
                    para entender como tratamos seus dados.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      Encarregado de Proteção de Dados (DPO):
                    </strong>{" "}
                    Para questões relacionadas à proteção de dados, entre em
                    contato com nosso DPO através do e-mail{" "}
                    <a
                      href="mailto:privacidade@shareday.app"
                      className="text-primary hover:underline"
                    >
                      privacidade@shareday.app
                    </a>
                    .
                  </p>
                </div>
              </section>

              <Separator />

              {/* 2. Dados Coletados */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  2. Dados Pessoais Coletados
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      2.1. Dados de Organizadores
                    </h3>
                    <p className="mb-2">
                      Quando você cria um evento como Organizador, coletamos:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <strong className="text-foreground">
                          Dados de identificação:
                        </strong>{" "}
                        Nome completo, e-mail, número de telefone
                      </li>
                      <li>
                        <strong className="text-foreground">
                          Dados do evento:
                        </strong>{" "}
                        Nome do evento, data do evento
                      </li>
                      <li>
                        <strong className="text-foreground">
                          Dados de pagamento:
                        </strong>{" "}
                        Informações necessárias para processamento (processadas
                        por terceiros seguros, não armazenamos dados completos
                        de cartão)
                      </li>
                      <li>
                        <strong className="text-foreground">
                          Dados de uso:
                        </strong>{" "}
                        Histórico de eventos criados, interações com a
                        Plataforma
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      2.2. Dados de Convidados
                    </h3>
                    <p className="mb-2">
                      Convidados não precisam criar conta. Coletamos apenas:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <strong className="text-foreground">
                          Fotos enviadas:
                        </strong>{" "}
                        Imagens enviadas através do QR Code do evento
                      </li>
                      <li>
                        <strong className="text-foreground">
                          Dados técnicos:
                        </strong>{" "}
                        Endereço IP, tipo de navegador, dispositivo, data/hora
                        do envio
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      2.3. Dados Técnicos Automáticos
                    </h3>
                    <p className="mb-2">
                      Coletamos automaticamente quando você acessa a Plataforma:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Endereço IP</li>
                      <li>Tipo de navegador e versão</li>
                      <li>Sistema operacional</li>
                      <li>Dispositivo utilizado (mobile, tablet, desktop)</li>
                      <li>Data e hora de acesso</li>
                      <li>Páginas visitadas e tempo de permanência</li>
                      <li>
                        Cookies e tecnologias similares (ver seção específica)
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 3. Base Legal e Finalidades */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  3. Base Legal e Finalidades do Tratamento
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Tratamos seus dados pessoais com base nas seguintes bases
                    legais da LGPD:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong className="text-foreground">
                        Execução de contrato:
                      </strong>{" "}
                      Para fornecer o serviço contratado (criação de eventos,
                      coleta de fotos)
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Consentimento:
                      </strong>{" "}
                      Quando você nos fornece consentimento explícito para
                      determinados tratamentos
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Legítimo interesse:
                      </strong>{" "}
                      Para melhorar nossos serviços, segurança e prevenir
                      fraudes
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Cumprimento de obrigação legal:
                      </strong>{" "}
                      Para cumprir obrigações fiscais, contábeis e legais
                    </li>
                  </ul>
                  <p>
                    <strong className="text-foreground">
                      Utilizamos seus dados para:
                    </strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Fornecer e manter o serviço de coleta de fotos em eventos
                    </li>
                    <li>Processar pagamentos e gerenciar assinaturas</li>
                    <li>
                      Comunicar-nos com você sobre o serviço (e-mails
                      transacionais)
                    </li>
                    <li>Enviar notificações sobre eventos e atualizações</li>
                    <li>
                      Melhorar a experiência do usuário e desenvolver novos
                      recursos
                    </li>
                    <li>Garantir segurança e prevenir fraudes</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                    <li>
                      Realizar análises estatísticas e pesquisas (dados
                      anonimizados)
                    </li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* 4. Armazenamento e Retenção */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  4. Armazenamento e Período de Retenção
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Localização:</strong>{" "}
                    Seus dados são armazenados em servidores localizados no
                    Brasil, em conformidade com a LGPD.
                  </p>
                  <p>
                    <strong className="text-foreground">Fotos e vídeos:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      As fotos enviadas são armazenadas de forma segura durante
                      o período do plano contratado (7, 15 ou 30 dias)
                    </li>
                    <li>
                      <strong className="text-foreground">
                        Após o término do período, todas as fotos e vídeos são
                        permanentemente e automaticamente excluídas
                      </strong>
                    </li>
                    <li>
                      Não mantemos cópias, backups ou qualquer forma de
                      recuperação após a exclusão automática
                    </li>
                    <li>
                      A exclusão é irreversível e ocorre sem aviso prévio ao
                      término do período
                    </li>
                  </ul>
                  <p>
                    <strong className="text-foreground">
                      Dados de Organizadores:
                    </strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Mantidos enquanto sua conta estiver ativa e por até 5 anos
                      após o encerramento, para cumprimento de obrigações legais
                    </li>
                    <li>
                      Dados de pagamento são mantidos conforme exigências legais
                      e regulatórias (geralmente 5 anos)
                    </li>
                  </ul>
                  <p>
                    <strong className="text-foreground">Dados Técnicos:</strong>{" "}
                    Mantidos por até 12 meses para fins de segurança e análise.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 5. Compartilhamento */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  5. Compartilhamento de Dados
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">
                      Não vendemos, alugamos ou compartilhamos suas informações
                      pessoais com terceiros para fins de marketing ou
                      publicidade.
                    </strong>
                  </p>
                  <p>
                    Podemos compartilhar seus dados apenas nas seguintes
                    situações:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        5.1. Prestadores de Serviço
                      </h3>
                      <p className="mb-2">
                        Compartilhamos dados com prestadores que nos auxiliam na
                        operação:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <strong className="text-foreground">
                            Processadores de pagamento:
                          </strong>{" "}
                          Para processar transações (dados mínimos necessários)
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Hospedagem e infraestrutura:
                          </strong>{" "}
                          Para armazenar e processar dados (com contratos de
                          proteção de dados)
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Análise e monitoramento:
                          </strong>{" "}
                          Para melhorar serviços (dados anonimizados quando
                          possível)
                        </li>
                      </ul>
                      <p className="mt-2">
                        Todos os prestadores são contratualmente obrigados a
                        proteger seus dados e utilizá-los apenas para as
                        finalidades acordadas.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        5.2. Obrigações Legais
                      </h3>
                      <p>
                        Podemos divulgar dados quando exigido por lei, ordem
                        judicial ou processo legal, ou para proteger nossos
                        direitos, propriedade ou segurança, bem como de nossos
                        usuários.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        5.3. Transferências
                      </h3>
                      <p>
                        Em caso de fusão, aquisição ou venda de ativos, seus
                        dados podem ser transferidos, sempre com notificação
                        prévia e garantia de proteção.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 6. Segurança */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. Medidas de Segurança
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Implementamos medidas técnicas e organizacionais robustas
                    para proteger seus dados pessoais:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Medidas Técnicas
                      </h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <strong className="text-foreground">
                            Criptografia:
                          </strong>{" "}
                          Dados em trânsito (HTTPS/TLS) e em repouso (AES-256)
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Autenticação:
                          </strong>{" "}
                          Sistemas de autenticação seguros e controle de acesso
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Monitoramento:
                          </strong>{" "}
                          Monitoramento contínuo de segurança e detecção de
                          intrusões
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Backups seguros:
                          </strong>{" "}
                          Backups criptografados e testados regularmente
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Atualizações:
                          </strong>{" "}
                          Manutenção regular de sistemas e aplicação de patches
                          de segurança
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Medidas Organizacionais
                      </h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          Acesso restrito a dados pessoais apenas para
                          funcionários autorizados
                        </li>
                        <li>Treinamento regular em proteção de dados</li>
                        <li>Políticas internas de segurança da informação</li>
                        <li>Auditorias periódicas de segurança</li>
                        <li>Plano de resposta a incidentes</li>
                      </ul>
                    </div>
                  </div>
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 mt-4">
                    <CardContent className="pt-6 space-y-2">
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                        Importante
                      </p>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Nenhum sistema é 100% seguro. Embora implementemos
                        medidas robustas, não podemos garantir segurança
                        absoluta. Recomendamos que você também tome precauções,
                        como usar senhas fortes e não compartilhar credenciais.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator />

              {/* 7. Direitos do Titular (LGPD) */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    7. Seus Direitos (LGPD)
                  </h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Conforme a LGPD, você possui os seguintes direitos sobre
                    seus dados pessoais:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Confirmação e Acesso
                      </h3>
                      <p>
                        Direito de confirmar se tratamos seus dados e acessar
                        informações sobre o tratamento.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Correção
                      </h3>
                      <p>
                        Direito de solicitar correção de dados incompletos,
                        inexatos ou desatualizados.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Anonimização, Bloqueio ou Eliminação
                      </h3>
                      <p>
                        Direito de solicitar anonimização, bloqueio ou
                        eliminação de dados desnecessários, excessivos ou
                        tratados em desconformidade com a LGPD.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Portabilidade
                      </h3>
                      <p>
                        Direito de solicitar a portabilidade de seus dados para
                        outro prestador de serviço, em formato estruturado e
                        interoperável.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Eliminação
                      </h3>
                      <p>
                        Direito de solicitar a eliminação de dados tratados com
                        base em consentimento, quando aplicável.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Informação sobre Compartilhamento
                      </h3>
                      <p>
                        Direito de obter informações sobre entidades públicas e
                        privadas com as quais compartilhamos dados.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Revogação de Consentimento
                      </h3>
                      <p>
                        Direito de revogar seu consentimento a qualquer momento,
                        quando o tratamento for baseado em consentimento.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Oposição
                      </h3>
                      <p>
                        Direito de se opor ao tratamento quando houver
                        descumprimento da LGPD.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Revisão de Decisões Automatizadas
                      </h3>
                      <p>
                        Direito de solicitar revisão de decisões tomadas
                        unicamente com base em tratamento automatizado de dados.
                      </p>
                    </div>
                  </div>
                  <Card className="bg-primary/5 border-primary/20 mt-4">
                    <CardContent className="pt-6">
                      <p className="text-sm text-foreground mb-2">
                        <strong>Como exercer seus direitos:</strong>
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Para exercer qualquer um desses direitos, entre em
                        contato conosco através de:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                        <li>
                          E-mail:{" "}
                          <a
                            href="mailto:privacidade@shareday.app"
                            className="text-primary hover:underline"
                          >
                            privacidade@shareday.app
                          </a>
                        </li>
                        <li>
                          Página de contato:{" "}
                          <Link
                            to="/contato"
                            className="text-primary hover:underline"
                          >
                            /contato
                          </Link>
                        </li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-3">
                        Responderemos sua solicitação em até 15 dias, conforme
                        previsto na LGPD.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator />

              {/* 8. Cookies */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  8. Cookies e Tecnologias Similares
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Utilizamos cookies e tecnologias similares para melhorar sua
                    experiência e o funcionamento da Plataforma.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Tipos de Cookies Utilizados
                      </h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong className="text-foreground">
                            Essenciais:
                          </strong>{" "}
                          Necessários para o funcionamento básico da Plataforma
                          (não podem ser desativados)
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Funcionais:
                          </strong>{" "}
                          Permitem funcionalidades aprimoradas e personalização
                        </li>
                        <li>
                          <strong className="text-foreground">
                            Analíticos:
                          </strong>{" "}
                          Ajudam a entender como os usuários interagem com a
                          Plataforma (dados anonimizados)
                        </li>
                      </ul>
                    </div>
                    <p>
                      Você pode configurar seu navegador para recusar cookies,
                      mas isso pode afetar o funcionamento de algumas
                      funcionalidades da Plataforma.
                    </p>
                    <p>
                      Não utilizamos cookies de publicidade ou rastreamento de
                      terceiros para fins de marketing.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 9. Menores de Idade */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  9. Proteção de Dados de Menores
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    O serviço é destinado a usuários com pelo menos 18 anos de
                    idade. Não coletamos intencionalmente dados pessoais de
                    menores de 18 anos.
                  </p>
                  <p>
                    Se tomarmos conhecimento de que coletamos dados de um menor
                    sem consentimento do responsável legal, tomaremos medidas
                    para excluir tais informações imediatamente.
                  </p>
                  <p>
                    Responsáveis legais que acreditam que seus filhos forneceram
                    dados pessoais devem entrar em contato conosco
                    imediatamente.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 10. Notificação de Violações */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  10. Notificação de Violações de Dados
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Em caso de violação de segurança que possa resultar em risco
                    ou dano relevante aos titulares, notificaremos:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Os titulares afetados em até 72 horas, quando tecnicamente
                      viável
                    </li>
                    <li>A Autoridade Nacional de Proteção de Dados (ANPD)</li>
                  </ul>
                  <p>
                    A notificação incluirá informações sobre a natureza da
                    violação, dados afetados e medidas tomadas para mitigar os
                    riscos.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 11. Alterações */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  11. Alterações nesta Política
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Podemos atualizar esta Política de Privacidade
                    periodicamente para refletir mudanças em nossas práticas ou
                    por motivos legais, operacionais ou regulatórios.
                  </p>
                  <p>Alterações significativas serão comunicadas através de:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>E-mail enviado ao endereço cadastrado</li>
                    <li>Aviso destacado na Plataforma</li>
                    <li>Atualização da data de "Última atualização"</li>
                  </ul>
                  <p>
                    Recomendamos que você revise esta Política periodicamente. O
                    uso continuado da Plataforma após alterações constitui
                    aceitação da nova versão.
                  </p>
                </div>
              </section>

              <Separator />

              {/* 12. Contato */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  12. Contato e Encarregado de Proteção de Dados
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Para questões sobre privacidade, proteção de dados ou para
                    exercer seus direitos, entre em contato:
                  </p>
                  <Card className="bg-secondary/30 border-border/50">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            Encarregado de Proteção de Dados (DPO)
                          </p>
                          <p className="text-sm text-muted-foreground">
                            E-mail:{" "}
                            <a
                              href="mailto:privacidade@shareday.app"
                              className="text-primary hover:underline"
                            >
                              privacidade@shareday.app
                            </a>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            Contato Geral
                          </p>
                          <p className="text-sm text-muted-foreground">
                            E-mail:{" "}
                            <a
                              href="mailto:contato@shareday.app"
                              className="text-primary hover:underline"
                            >
                              contato@shareday.app
                            </a>
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Página:{" "}
                            <Link
                              to="/contato"
                              className="text-primary hover:underline"
                            >
                              /contato
                            </Link>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            Autoridade Nacional de Proteção de Dados (ANPD)
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Você também pode apresentar reclamações à ANPD
                            através do site{" "}
                            <a
                              href="https://www.gov.br/anpd"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              www.gov.br/anpd
                            </a>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <p className="text-sm text-muted-foreground">
                    Comprometemo-nos a responder todas as solicitações em até 15
                    dias úteis, conforme previsto na LGPD.
                  </p>
                </div>
              </section>
            </div>

            {/* Footer Info */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Esta Política de Privacidade está em conformidade com a Lei
                  Geral de Proteção de Dados (Lei nº 13.709/2018). Ao utilizar o
                  shareday, você confirma que leu, compreendeu e aceita esta
                  Política e nossos{" "}
                  <Link
                    to="/termos"
                    className="text-primary hover:underline font-medium"
                  >
                    Termos de Uso
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

export default Privacy;
