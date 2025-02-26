"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Navbar } from "@/app/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { 
    control, 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isValid }, 
    trigger,
    setValue
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      clientType: "individual",
      firstName: "",
      lastName: "",
      workEmail: "",
      phone: "",
      companyName: "",
      companySize: "",
      insuranceType: "",
      message: ""
    }
  });

  // Watch values for conditional validation and rendering
  const clientType = watch("clientType");
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) || "Email inválido";
  };

  const validatePhone = (phone: string) => {
    // Basic validation for Portuguese phone numbers
    const re = /^(\+351|00351)?[1-9][0-9]{8}$/;
    return re.test(phone.replace(/\s/g, '')) || "Formato de telefone inválido";
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    // Validate fields in the first step
    const fieldsToValidate = ['firstName', 'lastName'];
    
    if (clientType === 'company') {
      fieldsToValidate.push('companyName');
    }
    
    const result = await trigger(fieldsToValidate as any);
    
    if (result) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow  bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col desktop:flex-row relative">
          {/* Image Section - Hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden desktop:block desktop:w-1/2 desktop:sticky desktop:top-20 desktop:min-h-[calc(100vh)] z-0 overflow-hidden"
          >
            <div className="relative h-full w-full">
              <Image
                src="/insurance-consultation.jpg"
                alt="Insurance Consultation"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/20"></div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full desktop:w-1/2 pt-20 desktop:ml-auto p-4 sm:p-6 pb-16"
          >
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Como podemos ajudar?
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Independentemente do tamanho do seu negócio ou necessidades, a
                  nossa equipa de especialistas pode ajudar.
                </p>
              </div>

              {/* Progress indicator */}
              {!submitted && (
                <div className="flex items-center justify-between mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: currentStep === 1 ? '50%' : '100%' }}
                    ></div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {currentStep}/2
                  </span>
                </div>
              )}

              {submitted ? (
                <Card className="border-green-100 shadow-md">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Enviado com Sucesso!</h2>
                    <p className="text-gray-600 mb-6">
                      Obrigado pelo seu interesse. Um dos nossos especialistas entrará em contacto consigo em breve.
                    </p>
                    <Button 
                      onClick={() => setSubmitted(false)}
                      className="bg-primary text-white hover:bg-primary/90 px-6"
                    >
                      Voltar ao Início
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-md border-gray-100">
                  <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {currentStep === 1 && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900 flex items-center">
                              Tipo de Cliente*
                            </label>
                            <div className="flex gap-4 flex-wrap">
                              <Controller
                                name="clientType"
                                control={control}
                                render={({ field }) => (
                                  <>
                                    <label 
                                      className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50" 
                                      style={{ borderColor: field.value === "individual" ? "#4F46E5" : "#E5E7EB" }}
                                    >
                                      <input
                                        type="radio"
                                        {...field}
                                        value="individual"
                                        checked={field.value === "individual"}
                                        className="mr-2 accent-primary"
                                      />
                                      <span className={field.value === "individual" ? "font-medium" : ""}>Particular</span>
                                    </label>
                                    <label 
                                      className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50" 
                                      style={{ borderColor: field.value === "company" ? "#4F46E5" : "#E5E7EB" }}
                                    >
                                      <input
                                        type="radio"
                                        {...field}
                                        value="company"
                                        checked={field.value === "company"}
                                        className="mr-2 accent-primary"
                                      />
                                      <span className={field.value === "company" ? "font-medium" : ""}>Empresa</span>
                                    </label>
                                  </>
                                )}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
                            <div className="space-y-2">
                              <label htmlFor="firstName" className="text-sm font-medium text-gray-900 flex items-center">
                                Nome*
                              </label>
                              <div className="relative">
                                <input
                                  id="firstName"
                                  {...register("firstName", { 
                                    required: "Nome é obrigatório" 
                                  })}
                                  className={`w-full rounded-lg border ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                  aria-invalid={errors.firstName ? "true" : "false"}
                                />
                                {errors.firstName && (
                                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                  </div>
                                )}
                              </div>
                              {errors.firstName && (
                                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="lastName" className="text-sm font-medium text-gray-900 flex items-center">
                                Apelido*
                              </label>
                              <div className="relative">
                                <input
                                  id="lastName"
                                  {...register("lastName", { 
                                    required: "Apelido é obrigatório" 
                                  })}
                                  className={`w-full rounded-lg border ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                  aria-invalid={errors.lastName ? "true" : "false"}
                                />
                                {errors.lastName && (
                                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                  </div>
                                )}
                              </div>
                              {errors.lastName && (
                                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                              )}
                            </div>
                          </div>

                          {clientType === "company" && (
                            <>
                              <div className="space-y-2">
                                <label htmlFor="companyName" className="text-sm font-medium text-gray-900 flex items-center">
                                  Nome da Empresa*
                                </label>
                                <div className="relative">
                                  <input
                                    id="companyName"
                                    {...register("companyName", { 
                                      required: clientType === "company" ? "Nome da empresa é obrigatório" : false
                                    })}
                                    className={`w-full rounded-lg border ${errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                    aria-invalid={errors.companyName ? "true" : "false"}
                                  />
                                  {errors.companyName && (
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                      <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                  )}
                                </div>
                                {errors.companyName && (
                                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="companySize" className="text-sm font-medium text-gray-900">
                                  Dimensão da empresa
                                </label>
                                <select
                                  id="companySize"
                                  {...register("companySize")}
                                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1em]"
                                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")" }}
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
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div className="space-y-2">
                            <label htmlFor="workEmail" className="text-sm font-medium text-gray-900 flex items-center">
                              {clientType === "individual"
                                ? "Email de contacto*"
                                : "Email profissional*"}
                            </label>
                            <div className="relative">
                              <input
                                id="workEmail"
                                type="email"
                                {...register("workEmail", { 
                                  required: "Email é obrigatório",
                                  validate: validateEmail
                                })}
                                className={`w-full rounded-lg border ${errors.workEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={errors.workEmail ? "true" : "false"}
                              />
                              {errors.workEmail && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {errors.workEmail && (
                              <p className="mt-1 text-sm text-red-600">{errors.workEmail.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-900 flex items-center">
                              Telefone*
                            </label>
                            <div className="relative">
                              <input
                                id="phone"
                                type="tel"
                                placeholder="+351 912 345 678"
                                {...register("phone", { 
                                  required: "Telefone é obrigatório",
                                  validate: validatePhone
                                })}
                                className={`w-full rounded-lg border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={errors.phone ? "true" : "false"}
                              />
                              {errors.phone && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                            <p className="text-xs text-gray-500">Formato: +351 912 345 678</p>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="insuranceType" className="text-sm font-medium text-gray-900 flex items-center">
                              Tipo de seguro*
                            </label>
                            <div className="relative">
                              <select
                                id="insuranceType"
                                {...register("insuranceType", { 
                                  required: "Selecione um tipo de seguro" 
                                })}
                                className={`w-full rounded-lg border ${errors.insuranceType ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1em]`}
                                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")" }}
                                aria-invalid={errors.insuranceType ? "true" : "false"}
                              >
                                <option value="">Selecione um tipo de seguro</option>
                                {clientType === "individual" ? (
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
                              {errors.insuranceType && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {errors.insuranceType && (
                              <p className="mt-1 text-sm text-red-600">{errors.insuranceType.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-900 flex items-center">
                              Mensagem adicional
                            </label>
                            <textarea
                              id="message"
                              {...register("message")}
                              className="min-h-[120px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                              placeholder="Conte-nos mais sobre o seu projeto, necessidades e cronograma..."
                            />
                          </div>
                        </>
                      )}

                      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                        {currentStep === 2 && (
                          <Button
                            type="button"
                            onClick={handlePrevStep}
                            className="w-full sm:w-auto bg-gray-100 text-gray-800 hover:bg-gray-200 py-3 px-6"
                          >
                            Voltar
                          </Button>
                        )}
                        
                        {currentStep === 1 ? (
                          <Button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                          >
                            Continuar
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white hover:bg-primary/90 py-3 relative"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="opacity-0">Pedir Simulação</span>
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                </span>
                              </>
                            ) : (
                              "Pedir Simulação"
                            )}
                          </Button>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-4">
                        <p>* Campos obrigatórios</p>
                        <p className="mt-1">Ao submeter este formulário, concorda com a nossa política de privacidade e termos de serviço.</p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer space placeholder - ensures content doesn't get hidden behind the image */}
      <div className="h-8 bg-white"></div>
    </div>
  );
}
