"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { AlertCircle, ChevronRight, Filter, Search, Plus } from "lucide-react";
import ClaimDetail from "@/app/components/client/ClaimDetail";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockClaims = [
  {
    id: "CLM-123456",
    date: "2023-05-20",
    status: "approved" as const,
    amount: 1200.0,
    policyId: "POL-123456",
    policyName: "Seguro Automóvel",
    description:
      "Acidente de viação com danos na parte frontal do veículo. Colisão com outro veículo num cruzamento.",
    incidentDate: "2023-05-15",
    documents: [
      {
        id: "DOC-1",
        name: "Formulário de Participação",
        type: "pdf",
        date: "2023-05-20",
        status: "approved" as const,
      },
      {
        id: "DOC-2",
        name: "Fotos dos Danos",
        type: "jpg",
        date: "2023-05-20",
        status: "approved" as const,
      },
      {
        id: "DOC-3",
        name: "Orçamento de Reparação",
        type: "pdf",
        date: "2023-05-22",
        status: "approved" as const,
      },
      {
        id: "DOC-4",
        name: "Declaração Amigável",
        type: "pdf",
        date: "2023-05-20",
        status: "approved" as const,
      },
    ],
    timeline: [
      {
        date: "2023-05-20",
        status: "Sinistro Reportado",
        description: "Sinistro reportado através da plataforma online.",
      },
      {
        date: "2023-05-22",
        status: "Documentação Recebida",
        description: "Recebemos a documentação completa do sinistro.",
      },
      {
        date: "2023-05-25",
        status: "Peritagem Realizada",
        description: "Peritagem realizada no veículo para avaliação dos danos.",
      },
      {
        date: "2023-05-30",
        status: "Sinistro Aprovado",
        description: "O sinistro foi aprovado e o pagamento será processado.",
      },
      {
        date: "2023-06-05",
        status: "Pagamento Efetuado",
        description: "O pagamento foi efetuado para a oficina indicada.",
      },
    ],
  },
  {
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
        description:
          "O sinistro está a ser analisado pela nossa equipa técnica.",
      },
    ],
  },
  {
    id: "CLM-345678",
    date: "2023-04-10",
    status: "rejected" as const,
    amount: 500.0,
    policyId: "POL-345678",
    policyName: "Seguro Saúde",
    description:
      "Consulta de especialidade em cardiologia e exames complementares de diagnóstico.",
    incidentDate: "2023-04-05",
    documents: [
      {
        id: "DOC-1",
        name: "Formulário de Participação",
        type: "pdf",
        date: "2023-04-10",
        status: "approved" as const,
      },
      {
        id: "DOC-2",
        name: "Fatura da Consulta",
        type: "pdf",
        date: "2023-04-10",
        status: "rejected" as const,
      },
      {
        id: "DOC-3",
        name: "Prescrição Médica",
        type: "pdf",
        date: "2023-04-10",
        status: "approved" as const,
      },
    ],
    timeline: [
      {
        date: "2023-04-10",
        status: "Sinistro Reportado",
        description: "Sinistro reportado através da plataforma online.",
      },
      {
        date: "2023-04-12",
        status: "Documentação Recebida",
        description: "Recebemos a documentação do sinistro.",
      },
      {
        date: "2023-04-15",
        status: "Em Análise",
        description:
          "O sinistro está a ser analisado pela nossa equipa médica.",
      },
      {
        date: "2023-04-20",
        status: "Sinistro Rejeitado",
        description:
          "O sinistro foi rejeitado por não estar coberto pela apólice. O procedimento realizado está excluído das coberturas contratadas.",
      },
    ],
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
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
      case "in_review":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_review":
        return "Em Análise";
      case "approved":
        return "Aprovado";
      case "rejected":
        return "Rejeitado";
      case "pending":
        return "Pendente";
      default:
        return (
          status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")
        );
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {getStatusText(status)}
    </span>
  );
};

export default function ClaimsPage() {
  const params = useParams();
  const clientId = params.clientId as string;

  const [selectedClaim, setSelectedClaim] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleClaimClick = (claim: any) => {
    setSelectedClaim(claim);
  };

  const handleBackToList = () => {
    setSelectedClaim(null);
  };

  // Filter claims based on search term and status filter
  const filteredClaims = mockClaims.filter((claim) => {
    const matchesSearch =
      claim.policyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? claim.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gradient-to-b from-blue-50/50 to-white">
      {/* Main Content */}
      <main>
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          {selectedClaim ? (
            <ClaimDetail claim={selectedClaim} onBack={handleBackToList} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h1 className="text-2xl font-bold">Os Meus Sinistros</h1>
                  <p className="text-gray-600 mt-1">
                    Acompanhe o estado dos seus sinistros
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-2" />
                  Reportar Novo Sinistro
                </Button>
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar sinistros..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={
                      statusFilter === "approved" ? "default" : "outline"
                    }
                    onClick={() =>
                      setStatusFilter(
                        statusFilter === "approved" ? null : "approved",
                      )
                    }
                    className="whitespace-nowrap"
                  >
                    Aprovados
                  </Button>
                  <Button
                    variant={
                      statusFilter === "in_review" ? "default" : "outline"
                    }
                    onClick={() =>
                      setStatusFilter(
                        statusFilter === "in_review" ? null : "in_review",
                      )
                    }
                    className="whitespace-nowrap"
                  >
                    Em Análise
                  </Button>
                  <Button
                    variant={
                      statusFilter === "rejected" ? "default" : "outline"
                    }
                    onClick={() =>
                      setStatusFilter(
                        statusFilter === "rejected" ? null : "rejected",
                      )
                    }
                    className="whitespace-nowrap"
                  >
                    Rejeitados
                  </Button>
                </div>
              </motion.div>

              {/* Claims List */}
              <motion.div variants={itemVariants}>
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Sinistros</CardTitle>
                        <CardDescription>
                          {filteredClaims.length} sinistro(s) encontrado(s)
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros Avançados
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredClaims.map((claim, index) => (
                        <motion.div
                          key={claim.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleClaimClick(claim)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="p-2 bg-primary/10 rounded-full mr-4 mt-1">
                                <AlertCircle className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  {claim.policyName}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-500 mt-1">
                                  <span>Ref: {claim.id}</span>
                                  <span className="hidden sm:inline">•</span>
                                  <span>Data: {formatDate(claim.date)}</span>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {claim.description}
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <StatusBadge status={claim.status} />
                                  <span className="text-sm text-gray-500">
                                    {formatCurrency(claim.amount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </motion.div>
                      ))}

                      {filteredClaims.length === 0 && (
                        <div className="text-center py-6 text-gray-500">
                          <p>
                            Nenhum sinistro encontrado com os filtros
                            selecionados.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
