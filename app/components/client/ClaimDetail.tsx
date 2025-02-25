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
  Clock,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  Upload,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ClaimDetailProps {
  claim: {
    id: string;
    date: string;
    status: "pending" | "approved" | "rejected" | "in_review";
    amount: number;
    policyId: string;
    policyName: string;
    description: string;
    incidentDate: string;
    documents: {
      id: string;
      name: string;
      type: string;
      date: string;
      status: "approved" | "pending" | "rejected";
    }[];
    timeline: {
      date: string;
      status: string;
      description: string;
    }[];
  };
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

const ClaimDetail: React.FC<ClaimDetailProps> = ({ claim, onBack }) => {
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

      {/* Claim Header */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/90 to-primary rounded-xl p-6 text-white shadow-md"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Sinistro: {claim.policyName}
            </h1>
            <p className="opacity-90">Referência: {claim.id}</p>
            <div className="mt-2">
              <StatusBadge status={claim.status} />
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-blue-50"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contactar Gestor
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-primary/80"
            >
              <Upload className="mr-2 h-4 w-4" />
              Adicionar Documentos
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Claim Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Claim Information */}
        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Informações do Sinistro</CardTitle>
              <CardDescription>Detalhes sobre o seu sinistro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <span>Data do Incidente</span>
                  </div>
                  <span className="font-medium">
                    {formatDate(claim.incidentDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <span>Data de Abertura</span>
                  </div>
                  <span className="font-medium">{formatDate(claim.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Estado</span>
                  </div>
                  <StatusBadge status={claim.status} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-3" />
                    <span>Valor Reclamado</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(claim.amount)}
                  </span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-2">Descrição do Sinistro</h4>
                  <p className="text-gray-600 text-sm">{claim.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Claim Timeline */}
        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Cronologia</CardTitle>
              <CardDescription>
                Acompanhe o progresso do seu sinistro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claim.timeline.map((event, index) => (
                  <div key={index} className="relative pl-6 pb-4">
                    {index !== claim.timeline.length - 1 && (
                      <div className="absolute top-0 left-[9px] h-full w-0.5 bg-gray-200"></div>
                    )}
                    <div className="absolute top-0 left-0 rounded-full bg-primary p-1">
                      <Clock className="h-3 w-3 text-white" />
                    </div>
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">
                        {formatDate(event.date)}
                      </p>
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Claim Documents */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
            <CardDescription>
              Documentos relacionados com o seu sinistro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claim.documents.map((doc, index) => (
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
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500">
                          {formatDate(doc.date)}
                        </p>
                        <StatusBadge status={doc.status} />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Carregar Novo Documento
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
            <CardDescription>O que esperar a seguir</CardDescription>
          </CardHeader>
          <CardContent>
            {claim.status === "pending" && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Sinistro em Processamento
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      O seu sinistro foi recebido e está a ser processado. Um
                      gestor de sinistros irá analisar o seu caso em breve.
                      Poderemos entrar em contacto consigo para solicitar
                      informações adicionais.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {claim.status === "in_review" && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-primary">
                      Sinistro em Análise
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      O seu sinistro está a ser analisado pela nossa equipa.
                      Este processo pode demorar até 5 dias úteis.
                      Manteremos-lhe informado sobre quaisquer atualizações.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {claim.status === "approved" && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">
                      Sinistro Aprovado
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      O seu sinistro foi aprovado. O pagamento será processado
                      nos próximos 3-5 dias úteis. Receberá uma notificação
                      quando o pagamento for efetuado.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {claim.status === "rejected" && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">
                      Sinistro Rejeitado
                    </h4>
                    <p className="text-sm text-red-700 mt-1">
                      Lamentamos informar que o seu sinistro foi rejeitado. Para
                      mais informações sobre os motivos da rejeição, por favor
                      contacte o seu gestor de sinistros ou consulte a carta de
                      rejeição enviada para o seu email.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Precisa de Ajuda?</CardTitle>
            <CardDescription>
              Contacte o seu gestor de sinistros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-medium">Gestor de Sinistros</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Para qualquer dúvida relacionada com o seu sinistro,
                    contacte-nos:
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Telefone: 800 123 456 (dias úteis, 9h-18h)
                  </p>
                  <p className="text-sm font-medium">
                    Email: sinistros@solida.pt
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ClaimDetail;
