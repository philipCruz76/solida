"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Landmark,
  Wallet,
  AlertCircle,
} from "lucide-react";
import PaymentMethodSelector from "@/app/components/payments/PaymentMethodSelector";
import CreditCardForm, {
  CreditCardFormData,
} from "@/app/components/payments/CreditCardForm";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

// Mock payment data - in a real app, this would be fetched from an API
const getPaymentDetails = (paymentId: string) => {
  return {
    id: paymentId,
    policyNumber: "AP-2023-0042",
    policyType: "Automóvel",
    amount: 145.6,
    dueDate: new Date(2024, 1, 15),
    status: "pending",
    reference: "REF-2024-02-001",
  };
};

const PaymentProcessPage = () => {
  const params = useParams();
  const router = useRouter();
  const clientId = params.clientId as string;
  const paymentId = params.paymentId as string;

  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    const details = getPaymentDetails(paymentId);
    setPaymentDetails(details);
  }, [paymentId]);

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleCreditCardSubmit = (formData: CreditCardFormData) => {
    setIsProcessing(true);
    setPaymentStatus("processing");

    // Simulate payment processing
    setTimeout(() => {
      // 90% chance of success
      const isSuccess = Math.random() < 0.9;

      if (isSuccess) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("error");
        setErrorMessage(
          "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.",
        );
      }

      setIsProcessing(false);
    }, 2000);
  };

  const handleBankTransferDetails = () => {
    // In a real app, this would show bank details or redirect to a bank transfer page
    alert(
      "Detalhes para transferência bancária:\nIBAN: PT50 0000 0000 0000 0000 0000 0\nBeneficiário: Seguros XYZ\nReferência: " +
        paymentDetails?.reference,
    );
  };

  const handleMBWayPayment = () => {
    // In a real app, this would initiate an MB WAY payment
    alert("A redirecionar para MB WAY...");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToPayments = () => {
    router.push(`/cliente/${clientId}/pagamentos`);
  };

  if (!paymentDetails) {
    return (
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">A carregar detalhes do pagamento...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === "success") {
    return (
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-200 shadow-md overflow-hidden">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <CardTitle className="flex items-center text-xl text-green-700">
                <CheckCircle2 className="h-6 w-6 mr-2" />
                Pagamento Concluído com Sucesso
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Obrigado pelo seu pagamento!
                </h3>
                <p className="text-gray-600">
                  O seu pagamento foi processado com sucesso.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Referência</span>
                  <span className="font-medium">
                    {paymentDetails.reference}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Apólice</span>
                  <span className="font-medium">
                    {paymentDetails.policyNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Valor Pago</span>
                  <span className="font-medium text-lg">
                    {paymentDetails.amount.toLocaleString("pt-PT")}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Data de Pagamento</span>
                  <span className="font-medium">
                    {format(new Date(), "dd MMM yyyy", { locale: pt })}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center p-6 bg-gray-50 border-t border-gray-200">
              <Button onClick={handleGoToPayments} className="px-6">
                Voltar aos Pagamentos
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (paymentStatus === "error") {
    return (
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-red-200 shadow-md overflow-hidden">
            <CardHeader className="bg-red-50 border-b border-red-100">
              <CardTitle className="flex items-center text-xl text-red-700">
                <AlertCircle className="h-6 w-6 mr-2" />
                Erro no Processamento do Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Ocorreu um erro
                </h3>
                <p className="text-gray-600">{errorMessage}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 p-6 bg-gray-50 border-t border-gray-200">
              <Button variant="outline" onClick={handleGoBack} className="px-6">
                Voltar
              </Button>
              <Button onClick={() => setPaymentStatus("idle")} className="px-6">
                Tentar Novamente
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Processar Pagamento
            </CardTitle>
            <CardDescription className="text-gray-600">
              Complete o pagamento da sua apólice utilizando um dos métodos
              disponíveis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Referência</span>
                <span className="font-medium">{paymentDetails.reference}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Apólice</span>
                <span className="font-medium">
                  {paymentDetails.policyNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tipo</span>
                <span className="font-medium">{paymentDetails.policyType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Valor a Pagar</span>
                <span className="font-medium text-lg">
                  {paymentDetails.amount.toLocaleString("pt-PT")}€
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data de Vencimento</span>
                <span className="font-medium">
                  {format(paymentDetails.dueDate, "dd MMM yyyy", {
                    locale: pt,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3 border-b border-gray-200">
            <CardTitle className="text-lg">Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PaymentMethodSelector
              selectedMethod={selectedMethod}
              onSelect={handlePaymentMethodSelect}
            />
          </CardContent>
        </Card>

        {selectedMethod === "credit-card" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CreditCardForm
              amount={paymentDetails.amount}
              onSubmit={handleCreditCardSubmit}
              isProcessing={isProcessing}
            />
          </motion.div>
        )}

        {selectedMethod === "bank-transfer" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <Landmark className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Transferência Bancária
                  </h3>
                </div>

                <p className="text-gray-600">
                  Para efetuar o pagamento por transferência bancária, utilize
                  os dados abaixo:
                </p>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">IBAN</span>
                    <span className="font-medium">
                      PT50 0000 0000 0000 0000 0000 0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Beneficiário</span>
                    <span className="font-medium">Seguros XYZ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Referência</span>
                    <span className="font-medium">
                      {paymentDetails.reference}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Valor</span>
                    <span className="font-medium">
                      {paymentDetails.amount.toLocaleString("pt-PT")}€
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Após efetuar a transferência, o pagamento será processado em
                  até 2 dias úteis. É importante incluir a referência correta
                  para que possamos identificar o seu pagamento.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end p-6 bg-gray-50 border-t border-gray-200">
                <Button onClick={handleBankTransferDetails} className="px-6">
                  Copiar Detalhes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {selectedMethod === "mb-way" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 text-purple-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">MB WAY</h3>
                </div>

                <p className="text-gray-600">
                  Para efetuar o pagamento através do MB WAY, introduza o seu
                  número de telemóvel:
                </p>

                <div className="flex items-center space-x-3">
                  <input
                    type="tel"
                    placeholder="9xx xxx xxx"
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Após clicar em "Pagar com MB WAY", receberá uma notificação na
                  sua app MB WAY para confirmar o pagamento.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end p-6 bg-gray-50 border-t border-gray-200">
                <Button onClick={handleMBWayPayment} className="px-6">
                  Pagar com MB WAY
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessPage;
