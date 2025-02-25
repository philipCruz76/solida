"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Shield, ChevronRight, Plus } from "lucide-react";

// Define policy interfaces
interface PolicyPremium {
  amount: number;
  frequency: string;
  nextPaymentDate: string;
}

interface AutoVehicle {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}

interface HomeProperty {
  type: string;
  address: string;
  size: number;
  yearBuilt: number;
}

interface BasePolicy {
  id: string;
  type: string;
  name: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  status: string;
  premium: PolicyPremium;
}

interface AutoPolicy extends BasePolicy {
  type: "auto";
  vehicle: AutoVehicle;
}

interface HomePolicy extends BasePolicy {
  type: "home";
  property: HomeProperty;
}

interface HealthPolicy extends BasePolicy {
  type: "health";
  beneficiaries: string[];
}

type Policy = AutoPolicy | HomePolicy | HealthPolicy;

// Mock data for policies
const mockPolicies: Policy[] = [
  {
    id: "POL-123456",
    type: "auto",
    name: "Seguro Automóvel",
    policyNumber: "AUTO-2023-12345",
    startDate: "2023-01-15",
    endDate: "2024-01-14",
    status: "active",
    premium: {
      amount: 350.5,
      frequency: "monthly",
      nextPaymentDate: "2023-07-15",
    },
    vehicle: {
      make: "Toyota",
      model: "Corolla",
      year: 2020,
      licensePlate: "AB-12-CD",
    },
  },
  {
    id: "POL-789012",
    type: "home",
    name: "Seguro Habitação",
    policyNumber: "HOME-2023-78901",
    startDate: "2023-02-10",
    endDate: "2024-02-09",
    status: "active",
    premium: {
      amount: 180.25,
      frequency: "quarterly",
      nextPaymentDate: "2023-08-10",
    },
    property: {
      type: "Apartment",
      address: "Rua das Flores, 123, Lisboa",
      size: 95,
      yearBuilt: 2010,
    },
  },
  {
    id: "POL-345678",
    type: "health",
    name: "Seguro Saúde",
    policyNumber: "HEALTH-2023-34567",
    startDate: "2023-03-01",
    endDate: "2024-02-28",
    status: "active",
    premium: {
      amount: 75.0,
      frequency: "monthly",
      nextPaymentDate: "2023-07-01",
    },
    beneficiaries: ["João Silva", "Maria Silva", "Pedro Silva"],
  },
];

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function PoliciesPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">As Minhas Apólices</h1>
          <p className="text-gray-500">
            Gerencie todas as suas apólices de seguro
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Apólice
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockPolicies.map((policy) => (
          <Card
            key={policy.id}
            className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <CardContent className="p-0">
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{policy.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-500 mt-1">
                      <span>Nº {policy.policyNumber}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        {formatCurrency(policy.premium.amount)} /{" "}
                        {policy.premium.frequency}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <StatusBadge status={policy.status} />
                      <span className="text-xs text-gray-500">
                        Válido até {formatDate(policy.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {policy.type === "auto" && (
                    <>
                      <div>
                        <span className="text-gray-500">Veículo:</span>{" "}
                        <span className="font-medium">
                          {policy.vehicle.make} {policy.vehicle.model} (
                          {policy.vehicle.year})
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Matrícula:</span>{" "}
                        <span className="font-medium">
                          {policy.vehicle.licensePlate}
                        </span>
                      </div>
                    </>
                  )}

                  {policy.type === "home" && (
                    <>
                      <div>
                        <span className="text-gray-500">Imóvel:</span>{" "}
                        <span className="font-medium">
                          {policy.property.type}, {policy.property.size}m²
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Morada:</span>{" "}
                        <span className="font-medium">
                          {policy.property.address}
                        </span>
                      </div>
                    </>
                  )}

                  {policy.type === "health" && (
                    <>
                      <div>
                        <span className="text-gray-500">Beneficiários:</span>{" "}
                        <span className="font-medium">
                          {policy.beneficiaries.join(", ")}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
                    Documentos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
