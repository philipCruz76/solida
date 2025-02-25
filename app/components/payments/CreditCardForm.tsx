"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { CreditCard, Lock } from "lucide-react";

interface CreditCardFormProps {
  amount: number;
  onSubmit: (formData: CreditCardFormData) => void;
  isProcessing: boolean;
}

export interface CreditCardFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  amount,
  onSubmit,
  isProcessing,
}) => {
  const [formData, setFormData] = useState<CreditCardFormData>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreditCardFormData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);

      setFormData({ ...formData, [name]: formatted });
      return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);

      setFormData({ ...formData, [name]: formatted });
      return;
    }

    // Format CVV (numbers only, max 3-4 digits)
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreditCardFormData, string>> = {};

    // Validate card number
    if (!formData.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.cardNumber = "Número de cartão inválido";
    }

    // Validate cardholder name
    if (formData.cardholderName.trim().length < 3) {
      newErrors.cardholderName = "Nome do titular inválido";
    }

    // Validate expiry date
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = "Data de validade inválida";
    } else {
      const [month, year] = formData.expiryDate.split("/");
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();

      if (expiryDate < now) {
        newErrors.expiryDate = "Cartão expirado";
      }
    }

    // Validate CVV
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "CVV inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium text-gray-900">
                Detalhes do Cartão
              </h3>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Lock className="h-4 w-4 mr-1" />
              Pagamento Seguro
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-gray-700">
                Número do Cartão
              </Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className={
                  errors.cardNumber
                    ? "border-red-300 focus-visible:ring-red-300"
                    : ""
                }
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500">{errors.cardNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName" className="text-gray-700">
                Nome do Titular
              </Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                placeholder="Nome como aparece no cartão"
                value={formData.cardholderName}
                onChange={handleChange}
                className={
                  errors.cardholderName
                    ? "border-red-300 focus-visible:ring-red-300"
                    : ""
                }
              />
              {errors.cardholderName && (
                <p className="text-sm text-red-500">{errors.cardholderName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-gray-700">
                  Data de Validade
                </Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/AA"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={
                    errors.expiryDate
                      ? "border-red-300 focus-visible:ring-red-300"
                      : ""
                  }
                />
                {errors.expiryDate && (
                  <p className="text-sm text-red-500">{errors.expiryDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-gray-700">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={
                    errors.cvv
                      ? "border-red-300 focus-visible:ring-red-300"
                      : ""
                  }
                />
                {errors.cvv && (
                  <p className="text-sm text-red-500">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50 border-t border-gray-200">
          <div className="text-gray-700">
            <span className="text-sm">Total a pagar:</span>
            <span className="ml-2 font-bold text-lg">
              {amount.toLocaleString("pt-PT")}€
            </span>
          </div>
          <Button type="submit" disabled={isProcessing} className="px-6">
            {isProcessing ? "A processar..." : "Pagar Agora"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreditCardForm;
