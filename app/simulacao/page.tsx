"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Navbar } from "@/app/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

interface FormData {
  clientType: "individual" | "company";
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: string;
  companyName?: string;
  companySize?: string;
  insuranceType: string;
  message: string;
}

export default function SimulationPage() {
  const [formData, setFormData] = useState<FormData>({
    clientType: "individual",
    firstName: "",
    lastName: "",
    workEmail: "",
    phone: "",
    companyName: "",
    companySize: "",
    insuranceType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <main className="pt-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col desktop:flex-row">
          {/* Image Section - Hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden desktop:block desktop:w-1/2 desktop:fixed desktop:left-0 desktop:top-0 desktop:h-screen"
          >
            <div className="relative h-full w-full">
              <Image
                src="/insurance-consultation.jpg"
                alt="Insurance Consultation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full desktop:w-1/2 desktop:ml-auto p-4"
          >
            <div className="flex flex-col gap-6 max-w-3xl">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Como podemos ajudar?
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Independentemente do tamanho do seu negócio ou necessidades, a
                  nossa equipa de especialistas pode ajudar.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">
                        Tipo de Cliente*
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="clientType"
                            value="individual"
                            checked={formData.clientType === "individual"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                clientType: "individual",
                              })
                            }
                            className="mr-2"
                          />
                          Particular
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="clientType"
                            value="company"
                            checked={formData.clientType === "company"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                clientType: "company",
                              })
                            }
                            className="mr-2"
                          />
                          Empresa
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">
                          Nome*
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">
                          Apelido*
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {formData.clientType === "company" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Nome da Empresa*
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                            value={formData.companyName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                companyName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-900">
                            Dimensão da empresa
                          </label>
                          <select
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                            value={formData.companySize}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                companySize: e.target.value,
                              })
                            }
                          >
                            <option value="">Selecione uma opção</option>
                            <option value="1-10">1-10 funcionários</option>
                            <option value="11-50">11-50 funcionários</option>
                            <option value="51-200">51-200 funcionários</option>
                            <option value="201+">201+ funcionários</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">
                        {formData.clientType === "individual"
                          ? "Email de contacto*"
                          : "Email profissional* "}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                        value={formData.workEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workEmail: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">
                        Telefone*
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">
                        Tipo de seguro*
                      </label>
                      <select
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                        value={formData.insuranceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insuranceType: e.target.value,
                          })
                        }
                      >
                        <option value="">Selecione um tipo de seguro</option>
                        {formData.clientType === "individual" ? (
                          <>
                            <option value="vida">Seguro de Vida</option>
                            <option value="saude">Seguro de Saúde</option>
                            <option value="auto">Seguro Automóvel</option>
                            <option value="casa">Seguro Casa</option>
                          </>
                        ) : (
                          <>
                            <option value="empresa">Seguro Empresarial</option>
                            <option value="frota">Seguro de Frota</option>
                            <option value="responsabilidade">
                              Seguro de Responsabilidade Civil
                            </option>
                            <option value="grupo">Seguro de Grupo</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">
                        Mensagem adicional
                      </label>
                      <textarea
                        className="min-h-[100px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Conte-nos mais sobre o seu projeto, necessidades e cronograma..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-white hover:bg-primary/90 py-6"
                    >
                      Pedir Simulação
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
