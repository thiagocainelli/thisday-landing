import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ListEventDto } from "@/types/events.dto";
import { ListPaymentDto } from "@/types/payments.dto";

interface DashboardAlertsProps {
  upcomingEvents: ListEventDto[];
  pendingPayments: ListPaymentDto[];
}

const DashboardAlerts = ({
  upcomingEvents,
  pendingPayments,
}: DashboardAlertsProps) => {
  const hasAlerts = upcomingEvents.length > 0 || pendingPayments.length > 0;

  if (!hasAlerts) return null;

  return (
    <div className="space-y-3">
      {upcomingEvents.length > 0 && (
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertTitle>Eventos Próximos</AlertTitle>
          <AlertDescription className="mt-2">
            <div className="space-y-2">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{event.eventName}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(event.eventDate), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <Link to="/admin/events">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Ver
                    </Button>
                  </Link>
                </div>
              ))}
              {upcomingEvents.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{upcomingEvents.length - 3} eventos próximos
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {pendingPayments.length > 0 && (
        <Alert variant="destructive">
          <CreditCard className="h-4 w-4" />
          <AlertTitle>Pagamentos Pendentes</AlertTitle>
          <AlertDescription className="mt-2">
            <div className="space-y-2">
              <p className="text-sm">
                {pendingPayments.length}{" "}
                {pendingPayments.length === 1
                  ? "pagamento pendente"
                  : "pagamentos pendentes"}
              </p>
              <Link to="/admin/payments">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs mt-2"
                >
                  Ver Pagamentos
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DashboardAlerts;
