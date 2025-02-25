import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  CreditCard,
  AlertCircle,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Calculator,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/app/lib/store";

interface ClientSidebarProps {
  clientId: string;
  clientName: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({
  clientId,
  clientName,
  isOpen,
  toggleSidebar,
}) => {
  const pathname = usePathname();
  // Use isDesktop from the Zustand store instead of local state
  const { isDesktop } = useSidebarStore();

  const navItems = [
    {
      name: "Painel",
      href: `/cliente/${clientId}`,
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Apólices",
      href: `/cliente/${clientId}/apolices`,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Pagamentos",
      href: `/cliente/${clientId}/pagamentos`,
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Sinistros",
      href: `/cliente/${clientId}/sinistros`,
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      name: "Simulações",
      href: `/cliente/${clientId}/simulacoes`,
      icon: <Calculator className="h-5 w-5" />,
    },
    {
      name: "Perfil",
      href: `/cliente/${clientId}/perfil`,
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Definições",
      href: `/cliente/${clientId}/definicoes`,
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Ajuda",
      href: `/cliente/${clientId}/ajuda`,
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  // Fixed isActive function to correctly determine the active navigation item
  const isActive = (href: string) => {
    // For the Painel (dashboard) option, only match the exact path
    if (href === `/cliente/${clientId}`) {
      // Only highlight the Painel option when we're exactly on the client dashboard
      return pathname === href;
    }
    // For other options, check if the pathname starts with the href
    // This ensures subpages (like /cliente/123/sinistros/details) still highlight the parent nav item
    return pathname.startsWith(href);
  };

  // Only show overlay on mobile when sidebar is open
  const showOverlay = !isDesktop && isOpen;

  return (
    <>
      {/* Overlay for mobile */}
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: !isDesktop && !isOpen ? -320 : 0,
          boxShadow: isDesktop ? "none" : "0 0 15px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white z-40
          w-64 border-r border-gray-200
          ${isDesktop ? "shadow-none" : "shadow-lg"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center px-4 border-b border-gray-200">
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="font-bold text-lg text-primary">Área Cliente</h2>
                <p className="text-sm text-gray-500 truncate">{clientName}</p>
              </div>
              {!isDesktop && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-3">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    onClick={() => {
                      if (!isDesktop) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <span
                      className={`mr-3 ${isActive(item.href) ? "text-primary" : "text-gray-500"}`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/"
              className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Terminar Sessão
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default ClientSidebar;
