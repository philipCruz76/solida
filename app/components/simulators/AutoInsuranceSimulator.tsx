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
import { Input } from "@/app/components/ui/input";
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

const AutoInsuranceSimulator: React.FC = () => {
  const [vehicleYear, setVehicleYear] = useState<number>(2020);
  const [vehicleValue, setVehicleValue] = useState<number>(15000);
  const [vehicleType, setVehicleType] = useState<string>("car");
  const [driverAge, setDriverAge] = useState<number>(35);
  const [drivingExperience, setDrivingExperience] = useState<number>(10);
  const [coverageOptions, setCoverageOptions] = useState<CoverageOption[]>([
    {
      id: "liability",
      name: "Responsabilidade Civil",
      description: "Cobertura obrigatória para danos causados a terceiros",
      included: true,
      price: 120,
    },
    {
      id: "collision",
      name: "Colisão",
      description: "Cobertura para danos no seu veículo em caso de acidente",
      included: true,
      price: 250,
    },
    {
      id: "theft",
      name: "Roubo e Furto",
      description: "Cobertura em caso de roubo ou furto do veículo",
      included: true,
      price: 180,
    },
    {
      id: "glass",
      name: "Quebra de Vidros",
      description: "Cobertura para reparação ou substituição de vidros",
      included: false,
      price: 80,
    },
    {
      id: "assistance",
      name: "Assistência em Viagem",
      description: "Assistência 24h em caso de avaria ou acidente",
      included: false,
      price: 60,
    },
    {
      id: "natural",
      name: "Fenómenos Naturais",
      description:
        "Cobertura para danos causados por tempestades, inundações, etc.",
      included: false,
      price: 90,
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

  const calculateInsurance = () => {
    // Base price calculation
    let basePrice = 200;

    // Adjust for vehicle age
    const ageMultiplier = Math.max(
      0.5,
      1 - (new Date().getFullYear() - vehicleYear) * 0.05,
    );
    basePrice *= ageMultiplier;

    // Adjust for vehicle value
    const valueMultiplier = 0.01 + vehicleValue / 50000;
    basePrice *= valueMultiplier;

    // Adjust for vehicle type
    const typeMultiplier =
      vehicleType === "car"
        ? 1
        : vehicleType === "motorcycle"
          ? 1.3
          : vehicleType === "van"
            ? 1.2
            : 1;
    basePrice *= typeMultiplier;

    // Adjust for driver age and experience
    const driverRiskFactor = Math.max(
      0.8,
      1.5 - driverAge / 100 - drivingExperience / 50,
    );
    basePrice *= driverRiskFactor;

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
            Simulador de Seguro Automóvel
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vehicleType" className="text-gray-700">
                  Tipo de Veículo
                </Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger id="vehicleType" className="w-full">
                    <SelectValue placeholder="Selecione o tipo de veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Automóvel</SelectItem>
                    <SelectItem value="motorcycle">Motociclo</SelectItem>
                    <SelectItem value="van">Comercial Ligeiro</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="vehicleYear" className="text-gray-700">
                    Ano do Veículo
                  </Label>
                  <span className="text-sm font-medium text-gray-900">
                    {vehicleYear}
                  </span>
                </div>
                <Slider
                  id="vehicleYear"
                  min={1990}
                  max={new Date().getFullYear()}
                  step={1}
                  value={[vehicleYear]}
                  onValueChange={(value) => setVehicleYear(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1990</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="vehicleValue" className="text-gray-700">
                    Valor do Veículo
                  </Label>
                  <span className="text-sm font-medium text-gray-900">
                    {vehicleValue.toLocaleString("pt-PT")}€
                  </span>
                </div>
                <Slider
                  id="vehicleValue"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={[vehicleValue]}
                  onValueChange={(value) => setVehicleValue(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1.000€</span>
                  <span>100.000€</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="driverAge" className="text-gray-700">
                    Idade do Condutor
                  </Label>
                  <span className="text-sm font-medium text-gray-900">
                    {driverAge} anos
                  </span>
                </div>
                <Slider
                  id="driverAge"
                  min={18}
                  max={90}
                  step={1}
                  value={[driverAge]}
                  onValueChange={(value) => setDriverAge(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>18</span>
                  <span>90</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="drivingExperience" className="text-gray-700">
                    Anos de Carta
                  </Label>
                  <span className="text-sm font-medium text-gray-900">
                    {drivingExperience} anos
                  </span>
                </div>
                <Slider
                  id="drivingExperience"
                  min={0}
                  max={70}
                  step={1}
                  value={[drivingExperience]}
                  onValueChange={(value) => setDrivingExperience(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>70</span>
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
                      disabled={option.id === "liability"} // Liability is mandatory
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
                  variar de acordo com a avaliação detalhada do risco e outros
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

export default AutoInsuranceSimulator;
