"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { CreditCard, Landmark, Wallet } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PaymentMethodSelectorProps {
  onSelect: (methodId: string) => void;
  selectedMethod: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  onSelect,
  selectedMethod,
}) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: "credit-card",
      name: "Cartão de Crédito",
      description: "Pagamento seguro com cartão de crédito",
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "bank-transfer",
      name: "Transferência Bancária",
      description: "Transferência direta para a nossa conta",
      icon: <Landmark className="h-5 w-5 text-green-500" />,
    },
    {
      id: "mb-way",
      name: "MB WAY",
      description: "Pagamento rápido através do MB WAY",
      icon: <Wallet className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <RadioGroup
      value={selectedMethod}
      onValueChange={onSelect}
      className="space-y-3"
    >
      {paymentMethods.map((method) => (
        <div key={method.id}>
          <RadioGroupItem
            value={method.id}
            id={method.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={method.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer transition-all hover:border-gray-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">{method.icon}</div>
              <div>
                <p className="font-medium text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center justify-end">
              <div className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary">
                <div className="h-2 w-2 rounded-full bg-white peer-data-[state=checked]:opacity-100 opacity-0"></div>
              </div>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
