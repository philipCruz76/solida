import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  FileText,
  Download,
  Calendar,
  CreditCard,
  Shield,
  Info,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { InsurancePolicy } from "./ClientDashboard";
import Link from "next/link";
import { motion } from "framer-motion";

interface PolicyDetailProps {
  policy: InsurancePolicy;
  onBack: () => void;
}

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

const PolicyDetail: React.FC<PolicyDetailProps> = ({ policy, onBack }) => {
  // Mock documents for the policy
  const documents = [
    { id: "1", name: "Apólice de Seguro", type: "pdf", date: "2023-05-15" },
    { id: "2", name: "Condições Gerais", type: "pdf", date: "2023-05-15" },
    {
      id: "3",
      name: "Condições Particulares",
      type: "pdf",
      date: "2023-05-15",
    },
    { id: "4", name: "Recibo de Pagamento", type: "pdf", date: "2023-06-01" },
  ];

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
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back button */}
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Painel
        </Button>
      </motion.div>

      {/* Policy Header */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/90 to-primary rounded-xl p-6 text-white shadow-md"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">{policy.name}</h1>
            <p className="opacity-90">Nº da Apólice: {policy.policyNumber}</p>
            <div className="mt-2">
              <StatusBadge status={policy.status} />
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-blue-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Ver Documentos
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-primary/80"
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Reportar Sinistro
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Policy Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coverage Information */}
        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Cobertura</CardTitle>
              <CardDescription>
                Detalhes da cobertura do seu seguro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-3" />
                    <span>Valor da Cobertura</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(policy.coverage.amount)}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Detalhes da Cobertura</h4>
                  <p className="text-gray-600 text-sm">
                    {policy.coverage.details}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Information */}
        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Pagamento</CardTitle>
              <CardDescription>
                Informações sobre o seu pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-primary mr-3" />
                    <span>Valor do Prémio</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(policy.premium.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <span>Frequência</span>
                  </div>
                  <span className="font-medium capitalize">
                    {policy.premium.frequency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <span>Próximo Pagamento</span>
                  </div>
                  <span className="font-medium">
                    {formatDate(policy.premium.nextPaymentDate)}
                  </span>
                </div>
                <div className="pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Pagar Agora
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Policy Period */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Período da Apólice</CardTitle>
            <CardDescription>
              Datas de início e fim da sua apólice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Data de Início</p>
                  <p className="font-medium">{formatDate(policy.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Data de Fim</p>
                  <p className="font-medium">{formatDate(policy.endDate)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Policy Documents */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
            <CardDescription>
              Aceda aos documentos relacionados com a sua apólice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-full mr-4">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(doc.date)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Information */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
            <CardDescription>
              Detalhes adicionais sobre a sua apólice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">
                    Precisa de ajuda?
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Se tiver alguma dúvida sobre a sua apólice ou precisar de
                    assistência, entre em contacto com o nosso serviço de apoio
                    ao cliente através do número
                    <strong> 800 123 456</strong> ou envie um email para
                    <strong> apoio@solida.pt</strong>.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PolicyDetail;
