"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import ClientSidebar from "@/app/components/client/ClientSidebar";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/app/lib/store";

export default function ClientIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const clientId = params.clientId as string;

  // Use the Zustand store instead of local state
  const { isOpen, isDesktop, setIsDesktop, toggleSidebar } = useSidebarStore();

  // Handle responsive behavior
  useEffect(() => {
    const checkIfDesktop = () => {
      const isDesktopView = window.innerWidth >= 900;
      setIsDesktop(isDesktopView);
    };

    // Initial check
    checkIfDesktop();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, [setIsDesktop]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center px-4 sm:px-6 desktop:px-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {!isDesktop && (
              <button
                onClick={toggleSidebar}
                className="mr-4 p-2 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Área de Cliente
              </h1>
              <p className="text-sm text-gray-500">Gerencie os seus seguros</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              J
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <ClientSidebar
        clientId={clientId}
        clientName="João Silva"
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 pt-16 ${isDesktop ? "ml-64" : "ml-0"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-4 sm:p-6 desktop:p-8 max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
