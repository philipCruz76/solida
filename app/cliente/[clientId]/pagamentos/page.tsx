"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Info } from "lucide-react";
import PaymentHistory from "@/app/components/payments/PaymentHistory";
import PaymentDetails from "@/app/components/payments/PaymentDetails";

// Define the Payment interface
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

// Mock data for payments
const paymentsMock: Payment[] = [
  {
    id: "pay-001",
    policyNumber: "AP-2023-0042",
    policyType: "Automóvel",
    amount: 145.6,
    dueDate: new Date(2023, 10, 15),
    status: "paid",
    paymentDate: new Date(2023, 10, 10),
    paymentMethod: "Cartão de Crédito",
    reference: "REF-2023-11-001",
  },
  {
    id: "pay-002",
    policyNumber: "AP-2023-0042",
    policyType: "Automóvel",
    amount: 145.6,
    dueDate: new Date(2023, 11, 15),
    status: "paid",
    paymentDate: new Date(2023, 11, 12),
    paymentMethod: "Débito Direto",
    reference: "REF-2023-12-001",
  },
  {
    id: "pay-003",
    policyNumber: "AP-2023-0042",
    policyType: "Automóvel",
    amount: 145.6,
    dueDate: new Date(2024, 0, 15),
    status: "paid",
    paymentDate: new Date(2024, 0, 14),
    paymentMethod: "Débito Direto",
    reference: "REF-2024-01-001",
  },
  {
    id: "pay-004",
    policyNumber: "AP-2023-0042",
    policyType: "Automóvel",
    amount: 145.6,
    dueDate: new Date(2024, 1, 15),
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    reference: "REF-2024-02-001",
  },
  {
    id: "pay-005",
    policyNumber: "HS-2023-0018",
    policyType: "Habitação",
    amount: 210.75,
    dueDate: new Date(2023, 11, 20),
    status: "paid",
    paymentDate: new Date(2023, 11, 18),
    paymentMethod: "Transferência Bancária",
    reference: "REF-2023-12-002",
  },
  {
    id: "pay-006",
    policyNumber: "HS-2023-0018",
    policyType: "Habitação",
    amount: 210.75,
    dueDate: new Date(2024, 2, 20),
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    reference: "REF-2024-03-001",
  },
  {
    id: "pay-007",
    policyNumber: "HS-2023-0018",
    policyType: "Habitação",
    amount: 210.75,
    dueDate: new Date(2024, 5, 20),
    status: "upcoming",
    paymentDate: null,
    paymentMethod: null,
    reference: "REF-2024-06-001",
  },
  {
    id: "pay-008",
    policyNumber: "LS-2023-0007",
    policyType: "Vida",
    amount: 320.0,
    dueDate: new Date(2024, 3, 5),
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    reference: "REF-2024-04-001",
  },
];

const PaymentsPage = () => {
  const params = useParams();
  const clientId = params.clientId as string;
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const getSelectedPaymentDetails = (): Payment | null => {
    if (!selectedPayment) return null;
    return (
      paymentsMock.find((payment) => payment.id === selectedPayment) || null
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Pagamentos
            </CardTitle>
            <CardDescription className="text-gray-600">
              Gerencie os pagamentos das suas apólices e veja o histórico de
              transações.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3 text-gray-700">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Aqui pode consultar todos os pagamentos efetuados, pendentes e
                futuros. Para pagamentos pendentes, pode efetuar o pagamento
                diretamente através da plataforma.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PaymentHistory
            payments={paymentsMock}
            onSelectPayment={handleSelectPayment}
            selectedPaymentId={selectedPayment}
          />
        </div>

        <div>
          <PaymentDetails
            payment={getSelectedPaymentDetails()}
            clientId={clientId}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
