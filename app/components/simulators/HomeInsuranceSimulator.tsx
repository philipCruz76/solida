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
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Slider } from "@/app/components/ui/slider";
import { Switch } from "@/app/components/ui/switch";
import { Check, Info } from "lucide-react";

interface CoverageOption {
  id: string;
  name: string;
  description: string;
  included: boolean;
  price: number;
}

const HomeInsuranceSimulator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<string>("apartment");
  const [propertySize, setPropertySize] = useState<number>(100);
  const [propertyValue, setPropertyValue] = useState<number>(200000);
  const [constructionYear, setConstructionYear] = useState<number>(2000);
  const [coverageOptions, setCoverageOptions] = useState<CoverageOption[]>([
    {
      id: "fire",
      name: "Incêndio, Raio e Explosão",
      description:
        "Cobertura para danos causados por incêndio, raio ou explosão",
      included: true,
      price: 80,
    },
    {
      id: "water",
      name: "Danos por Água",
      description: "Cobertura para danos causados por água",
      included: true,
      price: 60,
    },
    {
      id: "theft",
      name: "Roubo e Furto",
      description: "Cobertura para roubo ou furto de bens",
      included: true,
      price: 70,
    },
    {
      id: "natural",
      name: "Fenómenos Naturais",
      description:
        "Cobertura para danos causados por tempestades, inundações, etc.",
      included: false,
      price: 50,
    },
    {
      id: "electrical",
      name: "Danos Elétricos",
      description: "Cobertura para danos em equipamentos elétricos",
      included: false,
      price: 40,
    },
    {
      id: "liability",
      name: "Responsabilidade Civil",
      description: "Cobertura para danos causados a terceiros",
      included: false,
      price: 30,
    },
  ]);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [monthlyPrice, setMonthlyPrice] = useState<number>(0);
  const [annualPrice, setAnnualPrice] = useState<number>(0);

  const toggleCoverage = (id: string) => {
    setCoverageOptions(
      coverageOptions.map((option) =>
        option.id === id ? { ...option, included: !option.included } : option,
      ),
    );
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
  };

  const calculateInsurance = () => {
    // Base price calculation based on property size and value
    let basePrice = propertySize * 0.5 + propertyValue * 0.0002;

    // Adjust for property type
    const typeMultiplier =
      propertyType === "apartment"
        ? 1
        : propertyType === "house"
          ? 1.2
          : propertyType === "villa"
            ? 1.5
            : 1;
    basePrice *= typeMultiplier;

    // Adjust for construction year
    const ageMultiplier = Math.max(
      0.8,
      1 - (new Date().getFullYear() - constructionYear) * 0.005,
    );
    basePrice *= ageMultiplier;

    // Add selected coverages
    const coveragesPrice = coverageOptions
      .filter((option) => option.included)
      .reduce((sum, option) => sum + option.price, 0);

    const totalAnnual = basePrice + coveragesPrice;
    const totalMonthly = totalAnnual / 12;

    setAnnualPrice(Math.round(totalAnnual));
    setMonthlyPrice(Math.round(totalMonthly));
    setShowResults(true);
  };

  return (
    <div className="space-y-8">
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-xl text-gray-900">
            Simulador de Seguro Habitação
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="propertyType" className="text-gray-700">
                  Tipo de Imóvel
                </Label>
                <Select
                  value={propertyType}
                  onValueChange={handlePropertyTypeChange}
                >
                  <SelectTrigger id="propertyType" className="w-full">
                    <SelectValue placeholder="Selecione o tipo de imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="house">Moradia</SelectItem>
                    <SelectItem value="villa">Vivenda</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="propertySize" className="text-gray-700">
                    Área (m²)
                  </Label>
                  <span className="text-sm font-medium text-gray-900">
                    {propertySize} m²
                  </span>
                </div>
                <Slider
                  id="propertySize"
                  min={20}
                  max={500}
                  step={1}
                  value={[propertySize]}
                  onValueChange={(value) => setPropertySize(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>20 m²</span>
                  <span>500 m²</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="propertyValue" className="text-gray-700">
                    Valor do Imóvel
                  </Label>
                  <span className="text-sm font-medium text-gray-900">
                    {propertyValue.toLocaleString("pt-PT")}€
                  </span>
                </div>
                <Slider
                  id="propertyValue"
                  min={50000}
                  max={1000000}
                  step={10000}
                  value={[propertyValue]}
                  onValueChange={(value) => setPropertyValue(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>50.000€</span>
                  <span>1.000.000€</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="constructionYear" className="text-gray-700">
                    Ano de Construção
                  </Label>
                  <span className="text-sm font-medium text-gray-900">
                    {constructionYear}
                  </span>
                </div>
                <Slider
                  id="constructionYear"
                  min={1950}
                  max={new Date().getFullYear()}
                  step={1}
                  value={[constructionYear]}
                  onValueChange={(value) => setConstructionYear(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1950</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Coberturas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coverageOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border transition-all ${option.included ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {option.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                      <p className="text-sm font-medium mt-2 text-primary">
                        +{option.price}€/ano
                      </p>
                    </div>
                    <Switch
                      checked={option.included}
                      onCheckedChange={() => toggleCoverage(option.id)}
                      disabled={option.id === "fire"} // Fire coverage is mandatory
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-6 bg-gray-50 border-t border-gray-200">
          <Button onClick={calculateInsurance} className="px-6">
            Calcular Preço
          </Button>
        </CardFooter>
      </Card>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary shadow-md overflow-hidden">
            <CardHeader className="bg-primary/10 border-b border-primary/20">
              <CardTitle className="flex items-center text-xl text-primary">
                <Check className="h-5 w-5 mr-2" />
                Resultado da Simulação
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Pagamento Mensal</p>
                  <p className="text-3xl font-bold text-primary">
                    {monthlyPrice.toLocaleString("pt-PT")}€
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Pagamento Anual</p>
                  <p className="text-3xl font-bold text-primary">
                    {annualPrice.toLocaleString("pt-PT")}€
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100">
                <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Esta simulação é apenas uma estimativa. O valor final pode
                  variar de acordo com a avaliação detalhada do imóvel e outros
                  fatores. Para obter um orçamento personalizado, entre em
                  contacto com um dos nossos consultores.
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="px-6">Solicitar Contacto</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default HomeInsuranceSimulator;
