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
import { Check, Info, Heart, Shield } from "lucide-react";

interface CoverageOption {
  id: string;
  name: string;
  description: string;
  included: boolean;
  price: number;
}

const LifeInsuranceSimulator: React.FC = () => {
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<string>("male");
  const [smoker, setSmoker] = useState<boolean>(false);
  const [coverageAmount, setCoverageAmount] = useState<number>(100000);
  const [coverageTerm, setCoverageTerm] = useState<number>(20);
  const [coverageOptions, setCoverageOptions] = useState<CoverageOption[]>([
    {
      id: "death",
      name: "Morte",
      description: "Cobertura básica em caso de morte",
      included: true,
      price: 0, // Included in base price
    },
    {
      id: "disability",
      name: "Invalidez Permanente",
      description: "Cobertura em caso de invalidez permanente",
      included: true,
      price: 20,
    },
    {
      id: "critical",
      name: "Doenças Graves",
      description: "Cobertura para doenças graves específicas",
      included: false,
      price: 35,
    },
    {
      id: "funeral",
      name: "Despesas de Funeral",
      description: "Cobertura para despesas de funeral",
      included: false,
      price: 15,
    },
    {
      id: "income",
      name: "Proteção de Rendimento",
      description: "Rendimento mensal para a família em caso de morte",
      included: false,
      price: 40,
    },
  ]);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [monthlyPrice, setMonthlyPrice] = useState<number>(0);
  const [annualPrice, setAnnualPrice] = useState<number>(0);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleSmokerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSmoker(e.target.checked);
  };

  const handleCoverageAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCoverageAmount(parseInt(e.target.value));
  };

  const handleCoverageTermChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCoverageTerm(parseInt(e.target.value));
  };

  const toggleCoverage = (id: string) => {
    setCoverageOptions(
      coverageOptions.map((option) =>
        option.id === id ? { ...option, included: !option.included } : option,
      ),
    );
  };

  const calculateInsurance = () => {
    // Base rate per 1000€ of coverage
    let baseRate = 0.1;

    // Age factor
    const ageFactor = Math.pow(1.05, Math.max(0, age - 30));
    baseRate *= ageFactor;

    // Gender factor (simplified)
    const genderFactor = gender === "male" ? 1.2 : 1.0;
    baseRate *= genderFactor;

    // Smoker factor
    const smokerFactor = smoker ? 1.5 : 1.0;
    baseRate *= smokerFactor;

    // Term factor (longer terms are slightly more expensive per year)
    const termFactor = 1 + coverageTerm / 100;
    baseRate *= termFactor;

    // Calculate base annual price
    let annualPrice = (baseRate * coverageAmount) / 1000;

    // Add selected coverages
    const coveragesPrice = coverageOptions
      .filter((option) => option.included && option.id !== "death") // Death is already in base price
      .reduce((sum, option) => sum + option.price, 0);

    annualPrice += coveragesPrice;

    // Calculate monthly price
    const monthlyPrice = annualPrice / 12;

    setAnnualPrice(Math.round(annualPrice));
    setMonthlyPrice(Math.round(monthlyPrice));
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulador de Seguro de Vida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  min="18"
                  max="75"
                  value={age}
                  onChange={handleAgeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Género
                </p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={handleGenderChange}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Masculino
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={handleGenderChange}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Feminino</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={smoker}
                    onChange={handleSmokerChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Fumador</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="coverageAmount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Valor da Cobertura: {coverageAmount.toLocaleString("pt-PT")}€
                </label>
                <input
                  type="range"
                  id="coverageAmount"
                  min="25000"
                  max="500000"
                  step="25000"
                  value={coverageAmount}
                  onChange={handleCoverageAmountChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label
                  htmlFor="coverageTerm"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Prazo do Seguro
                </label>
                <select
                  id="coverageTerm"
                  value={coverageTerm}
                  onChange={handleCoverageTermChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="5">5 anos</option>
                  <option value="10">10 anos</option>
                  <option value="15">15 anos</option>
                  <option value="20">20 anos</option>
                  <option value="25">25 anos</option>
                  <option value="30">30 anos</option>
                  <option value="35">35 anos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Coberturas Adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coverageOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border ${option.included ? "border-primary bg-primary/5" : "border-gray-200"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                      {option.id !== "death" && (
                        <p className="text-sm font-medium mt-1">
                          +{option.price}€/ano
                        </p>
                      )}
                    </div>
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        id={`coverage-${option.id}`}
                        checked={option.included}
                        onChange={() => toggleCoverage(option.id)}
                        disabled={option.id === "death"} // Death coverage is mandatory
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={calculateInsurance}>Calcular Preço</Button>
        </CardFooter>
      </Card>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary">
            <CardHeader className="bg-primary/10">
              <CardTitle className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                Resultado da Simulação
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Pagamento Mensal</p>
                  <p className="text-3xl font-bold text-primary">
                    {monthlyPrice.toLocaleString("pt-PT")}€
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Pagamento Anual</p>
                  <p className="text-3xl font-bold text-primary">
                    {annualPrice.toLocaleString("pt-PT")}€
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">
                      Detalhes da Cobertura
                    </h4>
                    <p className="text-sm text-blue-600">
                      Valor Segurado: {coverageAmount.toLocaleString("pt-PT")}€
                      <br />
                      Prazo: {coverageTerm} anos
                      <br />
                      Coberturas:{" "}
                      {coverageOptions
                        .filter((o) => o.included)
                        .map((o) => o.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Esta simulação é apenas uma estimativa. O valor final pode
                  variar de acordo com a avaliação médica, histórico de saúde e
                  outros fatores. Para obter um orçamento personalizado, entre
                  em contacto com um dos nossos consultores.
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="w-full md:w-auto">Solicitar Contacto</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default LifeInsuranceSimulator;
