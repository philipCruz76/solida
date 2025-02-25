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
import { Check, Info, Globe, MapPin } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  region: string;
  riskFactor: number;
}

interface CoverageOption {
  id: string;
  name: string;
  description: string;
  included: boolean;
  price: number;
}

const TravelInsuranceSimulator: React.FC = () => {
  const destinations: Destination[] = [
    { id: "portugal", name: "Portugal", region: "Europa", riskFactor: 1.0 },
    { id: "spain", name: "Espanha", region: "Europa", riskFactor: 1.0 },
    { id: "france", name: "França", region: "Europa", riskFactor: 1.0 },
    { id: "italy", name: "Itália", region: "Europa", riskFactor: 1.0 },
    { id: "germany", name: "Alemanha", region: "Europa", riskFactor: 1.0 },
    { id: "uk", name: "Reino Unido", region: "Europa", riskFactor: 1.1 },
    {
      id: "usa",
      name: "Estados Unidos",
      region: "América do Norte",
      riskFactor: 1.5,
    },
    {
      id: "canada",
      name: "Canadá",
      region: "América do Norte",
      riskFactor: 1.4,
    },
    { id: "brazil", name: "Brasil", region: "América do Sul", riskFactor: 1.3 },
    {
      id: "argentina",
      name: "Argentina",
      region: "América do Sul",
      riskFactor: 1.3,
    },
    { id: "japan", name: "Japão", region: "Ásia", riskFactor: 1.4 },
    { id: "china", name: "China", region: "Ásia", riskFactor: 1.4 },
    { id: "australia", name: "Austrália", region: "Oceania", riskFactor: 1.4 },
    { id: "thailand", name: "Tailândia", region: "Ásia", riskFactor: 1.5 },
    { id: "egypt", name: "Egito", region: "África", riskFactor: 1.6 },
    {
      id: "south_africa",
      name: "África do Sul",
      region: "África",
      riskFactor: 1.6,
    },
  ];

  const [selectedDestination, setSelectedDestination] =
    useState<string>("portugal");
  const [tripDuration, setTripDuration] = useState<number>(7);
  const [travelers, setTravelers] = useState<number>(1);
  const [coverageOptions, setCoverageOptions] = useState<CoverageOption[]>([
    {
      id: "medical",
      name: "Despesas Médicas",
      description:
        "Cobertura para despesas médicas, hospitalares e farmacêuticas",
      included: true,
      price: 15,
    },
    {
      id: "cancellation",
      name: "Cancelamento de Viagem",
      description: "Reembolso em caso de cancelamento por motivos cobertos",
      included: true,
      price: 10,
    },
    {
      id: "baggage",
      name: "Bagagem",
      description: "Cobertura para perda, roubo ou danos na bagagem",
      included: false,
      price: 8,
    },
    {
      id: "delay",
      name: "Atraso de Voo",
      description: "Compensação por atrasos significativos",
      included: false,
      price: 5,
    },
    {
      id: "personal",
      name: "Responsabilidade Civil",
      description: "Cobertura para danos causados a terceiros",
      included: false,
      price: 7,
    },
    {
      id: "activities",
      name: "Atividades Desportivas",
      description: "Cobertura para prática de atividades desportivas",
      included: false,
      price: 12,
    },
  ]);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDestination(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripDuration(parseInt(e.target.value));
  };

  const handleTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTravelers(parseInt(e.target.value));
  };

  const toggleCoverage = (id: string) => {
    setCoverageOptions(
      coverageOptions.map((option) =>
        option.id === id ? { ...option, included: !option.included } : option,
      ),
    );
  };

  const getDestination = (): Destination | undefined => {
    return destinations.find((dest) => dest.id === selectedDestination);
  };

  const calculateInsurance = () => {
    const destination = getDestination();
    if (!destination) return;

    // Base price calculation
    let basePrice = 5; // Base daily rate

    // Adjust for destination risk factor
    basePrice *= destination.riskFactor;

    // Adjust for trip duration (longer trips get slight discount)
    const durationFactor =
      tripDuration <= 7
        ? 1
        : tripDuration <= 14
          ? 0.95
          : tripDuration <= 30
            ? 0.9
            : 0.85;

    // Calculate base total
    let total = basePrice * tripDuration * durationFactor;

    // Add selected coverages
    const coveragesPrice = coverageOptions
      .filter((option) => option.included)
      .reduce((sum, option) => sum + option.price, 0);

    total += coveragesPrice;

    // Multiply by number of travelers
    total *= travelers;

    setTotalPrice(Math.round(total));
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulador de Seguro de Viagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Destino
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Globe className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    id="destination"
                    value={selectedDestination}
                    onChange={handleDestinationChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                  >
                    <optgroup label="Europa">
                      {destinations
                        .filter((d) => d.region === "Europa")
                        .map((dest) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="América do Norte">
                      {destinations
                        .filter((d) => d.region === "América do Norte")
                        .map((dest) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="América do Sul">
                      {destinations
                        .filter((d) => d.region === "América do Sul")
                        .map((dest) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Ásia">
                      {destinations
                        .filter((d) => d.region === "Ásia")
                        .map((dest) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="África">
                      {destinations
                        .filter((d) => d.region === "África")
                        .map((dest) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Oceania">
                      {destinations
                        .filter((d) => d.region === "Oceania")
                        .map((dest) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Duração da Viagem: {tripDuration} dias
                </label>
                <input
                  type="range"
                  id="duration"
                  min="1"
                  max="90"
                  value={tripDuration}
                  onChange={handleDurationChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="travelers"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Número de Viajantes: {travelers}
                </label>
                <input
                  type="range"
                  id="travelers"
                  min="1"
                  max="10"
                  value={travelers}
                  onChange={handleTravelersChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">
                      Destino: {getDestination()?.name}
                    </h4>
                    <p className="text-sm text-blue-600">
                      Região: {getDestination()?.region}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Coberturas</h3>
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
                      <p className="text-sm font-medium mt-1">
                        +{option.price}€
                      </p>
                    </div>
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        id={`coverage-${option.id}`}
                        checked={option.included}
                        onChange={() => toggleCoverage(option.id)}
                        disabled={option.id === "medical"} // Medical coverage is mandatory
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
              <div className="text-center p-6 rounded-lg bg-gray-50 mb-6">
                <p className="text-sm text-gray-500 mb-1">
                  Preço Total do Seguro
                </p>
                <p className="text-3xl font-bold text-primary">
                  {totalPrice.toLocaleString("pt-PT")}€
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Para {travelers} {travelers === 1 ? "pessoa" : "pessoas"},{" "}
                  {tripDuration} {tripDuration === 1 ? "dia" : "dias"} em{" "}
                  {getDestination()?.name}
                </p>
              </div>

              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Esta simulação é apenas uma estimativa. O valor final pode
                  variar de acordo com fatores adicionais como idade dos
                  viajantes, condições de saúde pré-existentes e atividades
                  planeadas. Para obter um orçamento personalizado, entre em
                  contacto com um dos nossos consultores.
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

export default TravelInsuranceSimulator;
