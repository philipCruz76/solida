"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import ClientDashboard, {
  ClientData,
  InsurancePolicy,
} from "@/app/components/client/ClientDashboard";
import PolicyDetail from "@/app/components/client/PolicyDetail";
import ClaimDetail from "@/app/components/client/ClaimDetail";

// Mock data for demonstration
const mockClientData: ClientData = {
  name: "João Silva",
  email: "joao.silva@example.com",
  phone: "+351 912 345 678",
  address: "Rua das Flores, 123, Lisboa",
  clientSince: "2020-03-15",
  policies: [
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
      coverage: {
        amount: 50000,
        details:
          "Cobertura contra danos próprios, responsabilidade civil, assistência em viagem, proteção jurídica e quebra isolada de vidros. Franquia de 2% sobre o valor do veículo em caso de sinistro.",
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
      coverage: {
        amount: 150000,
        details:
          "Cobertura contra incêndio, inundações, roubo, responsabilidade civil e danos elétricos. Inclui assistência ao lar 24h.",
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
      coverage: {
        amount: 100000,
        details:
          "Cobertura para consultas, exames, internamento, cirurgias e medicamentos. Rede de prestadores em todo o país.",
      },
    },
  ],
  upcomingPayments: [
    {
      date: "2023-07-01",
      amount: 75.0,
      policyId: "POL-345678",
      policyName: "Seguro Saúde",
    },
    {
      date: "2023-07-15",
      amount: 350.5,
      policyId: "POL-123456",
      policyName: "Seguro Automóvel",
    },
    {
      date: "2023-08-10",
      amount: 180.25,
      policyId: "POL-789012",
      policyName: "Seguro Habitação",
    },
  ],
  recentClaims: [
    {
      id: "CLM-123456",
      date: "2023-05-20",
      status: "approved",
      amount: 1200.0,
      policyId: "POL-123456",
      policyName: "Seguro Automóvel",
    },
    {
      id: "CLM-789012",
      date: "2023-06-05",
      status: "in_review",
      amount: 350.75,
      policyId: "POL-789012",
      policyName: "Seguro Habitação",
    },
  ],
};

// Mock claim data for demonstration
const mockClaimData = {
  id: "CLM-789012",
  date: "2023-06-05",
  status: "in_review" as const,
  amount: 350.75,
  policyId: "POL-789012",
  policyName: "Seguro Habitação",
  description:
    "Danos causados por infiltração de água na parede da sala devido a fortes chuvas. A infiltração danificou a pintura e causou mofo em parte da parede.",
  incidentDate: "2023-06-01",
  documents: [
    {
      id: "DOC-1",
      name: "Formulário de Participação",
      type: "pdf",
      date: "2023-06-05",
      status: "approved" as const,
    },
    {
      id: "DOC-2",
      name: "Fotos dos Danos",
      type: "jpg",
      date: "2023-06-05",
      status: "approved" as const,
    },
    {
      id: "DOC-3",
      name: "Orçamento de Reparação",
      type: "pdf",
      date: "2023-06-07",
      status: "pending" as const,
    },
  ],
  timeline: [
    {
      date: "2023-06-05",
      status: "Sinistro Reportado",
      description: "Sinistro reportado através da plataforma online.",
    },
    {
      date: "2023-06-06",
      status: "Documentação Recebida",
      description: "Recebemos a documentação inicial do sinistro.",
    },
    {
      date: "2023-06-08",
      status: "Em Análise",
      description: "O sinistro está a ser analisado pela nossa equipa técnica.",
    },
  ],
};

enum ViewMode {
  DASHBOARD,
  POLICY_DETAIL,
  CLAIM_DETAIL,
}

export default function ClientPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(
    null,
  );
  const [selectedClaim, setSelectedClaim] = useState<any | null>(null);

  const handlePolicyClick = (policy: InsurancePolicy) => {
    setSelectedPolicy(policy);
    setViewMode(ViewMode.POLICY_DETAIL);
  };

  const handleClaimClick = (claim: any) => {
    setSelectedClaim(mockClaimData); // In a real app, you would fetch the claim details
    setViewMode(ViewMode.CLAIM_DETAIL);
  };

  const handleBackToDashboard = () => {
    setViewMode(ViewMode.DASHBOARD);
    setSelectedPolicy(null);
    setSelectedClaim(null);
  };

  return (
    <>
      {viewMode === ViewMode.DASHBOARD && (
        <ClientDashboard
          clientData={mockClientData}
          onPolicyClick={handlePolicyClick}
          onClaimClick={handleClaimClick}
        />
      )}

      {viewMode === ViewMode.POLICY_DETAIL && selectedPolicy && (
        <PolicyDetail policy={selectedPolicy} onBack={handleBackToDashboard} />
      )}

      {viewMode === ViewMode.CLAIM_DETAIL && selectedClaim && (
        <ClaimDetail claim={selectedClaim} onBack={handleBackToDashboard} />
      )}
    </>
  );
}
