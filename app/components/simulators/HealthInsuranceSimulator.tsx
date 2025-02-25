"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Check, Info } from "lucide-react";

interface PlanOption {
  id: string;
  name: string;
  description: string;
  price: number;
  benefits: string[];
  recommended?: boolean;
}

const HealthInsuranceSimulator: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [age, setAge] = useState<number>(35);
  const [showResults, setShowResults] = useState<boolean>(false);

  const plans: PlanOption[] = [
    {
      id: "basic",
      name: "Plano Básico",
      description: "Cobertura essencial para cuidados de saúde",
      price: 25,
      benefits: [
        "Consultas de medicina geral e familiar",
        "Consultas de especialidade com co-pagamento",
        "Exames de diagnóstico básicos",
        "Rede de prestadores convencionados",
      ],
    },
    {
      id: "plus",
      name: "Plano Plus",
      description: "Cobertura ampliada para maior tranquilidade",
      price: 45,
      benefits: [
        "Todas as coberturas do Plano Básico",
        "Consultas de especialidade com co-pagamento reduzido",
        "Exames de diagnóstico avançados",
        "Internamento hospitalar",
        "Pequena cirurgia",
      ],
      recommended: true,
    },
    {
      id: "premium",
      name: "Plano Premium",
      description: "Cobertura completa para si e sua família",
      price: 75,
      benefits: [
        "Todas as coberturas do Plano Plus",
        "Consultas ao domicílio",
        "Cobertura internacional",
        "Medicina dentária",
        "Próteses e ortóteses",
        "Medicamentos",
      ],
    },
  ];

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value));
  };

  const calculatePrice = (basePrice: number): number => {
    // Age factor calculation
    let ageFactor = 1;

    if (age < 18) {
      ageFactor = 0.7;
    } else if (age >= 18 && age <= 30) {
      ageFactor = 0.9;
    } else if (age >= 31 && age <= 45) {
      ageFactor = 1;
    } else if (age >= 46 && age <= 60) {
      ageFactor = 1.3;
    } else {
      ageFactor = 1.8;
    }

    return Math.round(basePrice * ageFactor);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowResults(true);
  };

  const getSelectedPlan = (): PlanOption | undefined => {
    return plans.find((plan) => plan.id === selectedPlan);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulador de Seguro de Saúde</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Idade: {age} anos
              </label>
              <input
                type="range"
                id="age"
                min="0"
                max="100"
                value={age}
                onChange={handleAgeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-2 transition-all ${
                  selectedPlan === plan.id
                    ? "border-primary shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                } ${plan.recommended ? "relative" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                    Recomendado
                  </div>
                )}
                <CardHeader className={plan.recommended ? "pt-6" : ""}>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-primary">
                      {calculatePrice(plan.price)}€
                      <span className="text-sm font-normal text-gray-500">
                        /mês
                      </span>
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className="w-full"
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                  >
                    {selectedPlan === plan.id ? "Selecionado" : "Selecionar"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {showResults && selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary">
            <CardHeader className="bg-primary/10">
              <CardTitle className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                Plano Selecionado: {getSelectedPlan()?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Pagamento Mensal</p>
                  <p className="text-3xl font-bold text-primary">
                    {calculatePrice(getSelectedPlan()?.price || 0)}€
                  </p>
                </div>

                <div className="mt-6 flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Esta simulação é apenas uma estimativa. O valor final pode
                    variar de acordo com a avaliação médica e outros fatores.
                    Para obter um orçamento personalizado, entre em contacto com
                    um dos nossos consultores.
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button className="w-full md:w-auto">
                    Solicitar Contacto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default HealthInsuranceSimulator;
