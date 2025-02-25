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
  AlertCircle,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  Clock,
  Shield,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

// Types for the insurance policy data
export interface InsurancePolicy {
  id: string;
  type: string;
  name: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "expired";
  premium: {
    amount: number;
    frequency: "monthly" | "quarterly" | "annually";
    nextPaymentDate: string;
  };
  coverage: {
    amount: number;
    details: string;
  };
}

// Types for the client data
export interface ClientData {
  name: string;
  email: string;
  phone: string;
  address: string;
  clientSince: string;
  policies: InsurancePolicy[];
  upcomingPayments: {
    date: string;
    amount: number;
    policyId: string;
    policyName: string;
  }[];
  recentClaims: {
    id: string;
    date: string;
    status: "pending" | "approved" | "rejected" | "in_review";
    amount: number;
    policyId: string;
    policyName: string;
  }[];
}

interface ClientDashboardProps {
  clientData: ClientData;
  onPolicyClick?: (policy: InsurancePolicy) => void;
  onClaimClick?: (claim: any) => void;
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
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
      case "in_review":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
    </span>
  );
};

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  clientData,
  onPolicyClick,
  onClaimClick,
}) => {
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
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/90 to-primary rounded-xl p-6 desktop:p-8 text-white shadow-md"
      >
        <div className="flex flex-col desktop:flex-row desktop:items-center desktop:justify-between">
          <div className="mb-4 desktop:mb-0">
            <h1 className="text-2xl desktop:text-3xl font-bold mb-2">
              Bem-vindo, {clientData.name}
            </h1>
            <p className="opacity-90">
              Gerencie os seus seguros e acompanhe as suas apólices
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
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

      {/* Summary Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 desktop:gap-6"
      >
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Apólices</p>
                <p className="text-2xl font-bold">
                  {clientData.policies.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Próximo Pagamento</p>
                <p className="text-2xl font-bold">
                  {clientData.upcomingPayments.length > 0
                    ? formatCurrency(clientData.upcomingPayments[0].amount)
                    : "N/A"}
                </p>
                {clientData.upcomingPayments.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {formatDate(clientData.upcomingPayments[0].date)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <FileCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sinistros Recentes</p>
                <p className="text-2xl font-bold">
                  {clientData.recentClaims.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
        {/* Insurance Policies */}
        <motion.div variants={itemVariants} className="desktop:col-span-2">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>As Minhas Apólices</CardTitle>
                  <CardDescription>
                    Gerencie todas as suas apólices de seguro
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden desktop:flex"
                >
                  Ver Todas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData.policies.map((policy, index) => (
                  <motion.div
                    key={policy.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center"
                    onClick={() => onPolicyClick && onPolicyClick(policy)}
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/10 rounded-full mr-4">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{policy.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-500">
                          <span>Nº {policy.policyNumber}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>
                            {formatCurrency(policy.premium.amount)} /{" "}
                            {policy.premium.frequency}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <StatusBadge status={policy.status} />
                          <span className="text-xs text-gray-500">
                            Válido até {formatDate(policy.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.div>
                ))}
              </div>
              {clientData.policies.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>Não tem apólices ativas de momento.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Claims */}
        <motion.div variants={itemVariants} className="desktop:col-span-1">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Sinistros Recentes</CardTitle>
                  <CardDescription>
                    Acompanhe o estado dos seus sinistros
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden desktop:flex"
                >
                  Ver Todos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData.recentClaims.map((claim, index) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center"
                    onClick={() => onClaimClick && onClaimClick(claim)}
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-full mr-4">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{claim.policyName}</h3>
                        <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-500">
                          <span>Ref: {claim.id}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{formatDate(claim.date)}</span>
                        </div>
                        <div className="mt-1">
                          <StatusBadge status={claim.status} />
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.div>
                ))}
              </div>
              {clientData.recentClaims.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>Não tem sinistros recentes.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Payments */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Pagamentos Agendados</CardTitle>
                <CardDescription>
                  Próximos pagamentos das suas apólices
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hidden desktop:flex"
              >
                Ver Histórico
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientData.upcomingPayments.map((payment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-4">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{payment.policyName}</h3>
                      <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-500">
                        <span>{formatDate(payment.date)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{formatCurrency(payment.amount)}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Pagar Agora
                  </Button>
                </motion.div>
              ))}
            </div>
            {clientData.upcomingPayments.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <p>Não tem pagamentos agendados.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Client Information */}
      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Os seus dados de contacto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{clientData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium">{clientData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Cliente desde</p>
                    <p className="font-medium">
                      {formatDate(clientData.clientSince)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Última atualização</p>
                    <p className="font-medium">
                      {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full sm:w-auto">
                  Atualizar Informações
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ClientDashboard;
