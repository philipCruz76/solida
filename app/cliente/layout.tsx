"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        {children}
      </div>
    </>
  );
}
