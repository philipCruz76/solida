"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Car, Home, Heart, Umbrella, Plane, Info } from "lucide-react";
import AutoInsuranceSimulator from "@/app/components/simulators/AutoInsuranceSimulator";
import HealthInsuranceSimulator from "@/app/components/simulators/HealthInsuranceSimulator";
import HomeInsuranceSimulator from "@/app/components/simulators/HomeInsuranceSimulator";
import TravelInsuranceSimulator from "@/app/components/simulators/TravelInsuranceSimulator";
import LifeInsuranceSimulator from "@/app/components/simulators/LifeInsuranceSimulator";

const SimulationPage = () => {
  const [activeTab, setActiveTab] = useState("auto");

  const simulationTypes = [
    {
      id: "auto",
      name: "Automóvel",
      icon: <Car className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "health",
      name: "Saúde",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "home",
      name: "Habitação",
      icon: <Home className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "travel",
      name: "Viagem",
      icon: <Plane className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "life",
      name: "Vida",
      icon: <Umbrella className="h-5 w-5" />,
      color: "bg-red-100 text-red-700",
    },
  ];

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
              Simulações de Seguros
            </CardTitle>
            <CardDescription className="text-gray-600">
              Explore diferentes opções de seguros e simule coberturas
              personalizadas para as suas necessidades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3 text-gray-700">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                As nossas simulações permitem-lhe explorar diferentes opções de
                seguros e coberturas, ajudando-o a tomar decisões informadas
                sobre a sua proteção. Os valores apresentados são estimativas e
                podem variar conforme a avaliação final.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-8 bg-transparent">
          {simulationTypes.map((type) => (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className="flex items-center justify-center gap-2 py-3 rounded-lg shadow-sm border border-gray-200 data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary transition-all"
            >
              <span className={`p-1.5 rounded-full ${type.color}`}>
                {type.icon}
              </span>
              <span className="hidden sm:inline font-medium">{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div>
          <TabsContent
            value="auto"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <AutoInsuranceSimulator />
          </TabsContent>

          <TabsContent
            value="health"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <HealthInsuranceSimulator />
          </TabsContent>

          <TabsContent
            value="home"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <HomeInsuranceSimulator />
          </TabsContent>

          <TabsContent
            value="travel"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <TravelInsuranceSimulator />
          </TabsContent>

          <TabsContent
            value="life"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <LifeInsuranceSimulator />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SimulationPage;
