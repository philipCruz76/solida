"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  CreditCard,
  Download,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Info,
} from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import Link from "next/link";

interface Payment {
  id: string;
  policyNumber: string;
  policyType: string;
  amount: number;
  dueDate: Date;
  status: "paid" | "pending" | "upcoming" | "overdue";
  paymentDate?: Date | null;
  paymentMethod?: string | null;
  reference: string;
}

interface PaymentDetailsProps {
  payment: Payment | null;
  clientId: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  payment,
  clientId,
}) => {
  if (!payment) {
    return (
      <Card className="border border-gray-200 shadow-sm h-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Selecione um pagamento para ver os detalhes.</p>
        </div>
      </Card>
    );
  }

  const getPaymentStatusDetails = (status: string) => {
    switch (status) {
      case "paid":
        return {
          label: "Pago",
          color: "text-green-600 bg-green-50 border-green-200",
          icon: <CheckCircle2 className="h-4 w-4 mr-1.5" />,
        };
      case "pending":
        return {
          label: "Pendente",
          color: "text-amber-600 bg-amber-50 border-amber-200",
          icon: <Clock className="h-4 w-4 mr-1.5" />,
        };
      case "upcoming":
        return {
          label: "Próximo",
          color: "text-blue-600 bg-blue-50 border-blue-200",
          icon: <Calendar className="h-4 w-4 mr-1.5" />,
        };
      case "overdue":
        return {
          label: "Em Atraso",
          color: "text-red-600 bg-red-50 border-red-200",
          icon: <AlertCircle className="h-4 w-4 mr-1.5" />,
        };
      default:
        return {
          label: "Desconhecido",
          color: "text-gray-600 bg-gray-50 border-gray-200",
          icon: <Info className="h-4 w-4 mr-1.5" />,
        };
    }
  };

  const statusDetails = getPaymentStatusDetails(payment.status);

  return (
    <Card className="border border-gray-200 shadow-sm sticky top-24">
      <CardHeader className="pb-3 border-b border-gray-200">
        <CardTitle className="text-lg">Detalhes do Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Referência</span>
            <span className="font-medium">{payment.reference}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Apólice</span>
            <span className="font-medium">{payment.policyNumber}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Tipo</span>
            <span className="font-medium">{payment.policyType}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Valor</span>
            <span className="font-medium text-lg">
              {payment.amount.toLocaleString("pt-PT")}€
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Data de Vencimento</span>
            <span className="font-medium">
              {format(payment.dueDate, "dd MMM yyyy", { locale: pt })}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Estado</span>
            <span
              className={`text-xs px-2 py-1 rounded-full border flex items-center ${statusDetails.color}`}
            >
              {statusDetails.icon}
              {statusDetails.label}
            </span>
          </div>

          {payment.paymentDate && (
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-600">Data de Pagamento</span>
              <span className="font-medium">
                {format(payment.paymentDate, "dd MMM yyyy", { locale: pt })}
              </span>
            </div>
          )}

          {payment.paymentMethod && (
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-600">Método de Pagamento</span>
              <span className="font-medium">{payment.paymentMethod}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 p-4">
        {payment.status === "paid" && (
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => {
              // In a real app, this would download the receipt
              alert(`Downloading receipt for payment ${payment.id}`);
            }}
          >
            <Download className="h-4 w-4" />
            Recibo
          </Button>
        )}

        {(payment.status === "pending" || payment.status === "overdue") && (
          <Link
            href={`/cliente/${clientId}/pagamentos/processar/${payment.id}`}
            className="w-full"
          >
            <Button className="w-full gap-2">
              <CreditCard className="h-4 w-4" />
              Pagar Agora
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default PaymentDetails;
