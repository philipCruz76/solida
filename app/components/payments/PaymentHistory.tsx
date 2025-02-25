"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Download,
  Filter,
  ChevronDown,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Info,
} from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

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

interface PaymentHistoryProps {
  payments: Payment[];
  onSelectPayment: (paymentId: string) => void;
  selectedPaymentId: string | null;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  payments,
  onSelectPayment,
  selectedPaymentId,
}) => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [filterPolicy, setFilterPolicy] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique years from payment dates
  const years = Array.from(
    new Set(payments.map((payment) => payment.dueDate.getFullYear())),
  ).sort((a, b) => b - a); // Sort descending

  // Get unique policy numbers
  const policyNumbers = Array.from(
    new Set(payments.map((payment) => payment.policyNumber)),
  ).sort();

  const filteredPayments = payments.filter((payment) => {
    if (filterStatus && payment.status !== filterStatus) return false;
    if (filterYear && payment.dueDate.getFullYear() !== filterYear)
      return false;
    if (filterPolicy && payment.policyNumber !== filterPolicy) return false;
    return true;
  });

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

  const resetFilters = () => {
    setFilterStatus(null);
    setFilterYear(null);
    setFilterPolicy(null);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg">Histórico de Pagamentos</CardTitle>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>

      {showFilters && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Estado
              </label>
              <select
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={filterStatus || ""}
                onChange={(e) => setFilterStatus(e.target.value || null)}
              >
                <option value="">Todos</option>
                <option value="paid">Pagos</option>
                <option value="pending">Pendentes</option>
                <option value="upcoming">Próximos</option>
                <option value="overdue">Em Atraso</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Ano
              </label>
              <select
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={filterYear || ""}
                onChange={(e) =>
                  setFilterYear(
                    e.target.value ? parseInt(e.target.value) : null,
                  )
                }
              >
                <option value="">Todos</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Apólice
              </label>
              <select
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={filterPolicy || ""}
                onChange={(e) => setFilterPolicy(e.target.value || null)}
              >
                <option value="">Todas</option>
                {policyNumbers.map((policy) => (
                  <option key={policy} value={policy}>
                    {policy}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-gray-600"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      )}

      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => {
              const statusDetails = getPaymentStatusDetails(payment.status);
              return (
                <div
                  key={payment.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${selectedPaymentId === payment.id ? "bg-gray-50" : ""}`}
                  onClick={() => onSelectPayment(payment.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          {payment.policyNumber}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-600">
                          {payment.policyType}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Vencimento:{" "}
                        {format(payment.dueDate, "dd MMM yyyy", { locale: pt })}
                        {payment.paymentDate && (
                          <>
                            <span className="mx-2 text-gray-300">•</span>
                            Pago em:{" "}
                            {format(payment.paymentDate, "dd MMM yyyy", {
                              locale: pt,
                            })}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-gray-900">
                        {payment.amount.toLocaleString("pt-PT")}€
                      </span>
                      <span
                        className={`mt-1 text-xs px-2 py-1 rounded-full border flex items-center ${statusDetails.color}`}
                      >
                        {statusDetails.icon}
                        {statusDetails.label}
                      </span>
                    </div>
                  </div>

                  {payment.status === "paid" && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // In a real app, this would download the receipt
                          alert(
                            `Downloading receipt for payment ${payment.id}`,
                          );
                        }}
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-xs">Recibo</span>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                Não foram encontrados pagamentos com os filtros selecionados.
              </p>
              {(filterStatus || filterYear || filterPolicy) && (
                <Button variant="link" onClick={resetFilters} className="mt-2">
                  Limpar filtros
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
