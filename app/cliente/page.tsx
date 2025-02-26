"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { Mail, Lock, ArrowRight, User, Phone, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(9, "Número de telefone inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLoginSubmit = async (data: LoginFormData) => {
    console.log("Login data:", data);
    // Handle login logic here
  };

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    console.log("Register data:", data);
    // Handle registration logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col desktop:flex-row relative">
          {/* Image Section - Hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden desktop:block desktop:w-1/2 desktop:sticky desktop:top-0 desktop:h-screen z-0 overflow-hidden"
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/20"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-start p-12 z-10">
                <h1 className="text-4xl font-bold text-white mb-4 max-w-md">Área de Cliente Solida Seguros</h1>
                <p className="text-lg text-white/90 max-w-md">Aceda à sua conta para gerir os seus seguros, consultar apólices e muito mais.</p>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full desktop:w-1/2 desktop:ml-auto p-4 sm:p-6 pb-16 pt-20"
          >
            <div className="flex flex-col gap-6 max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  // Login Form
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        Bem-vindo de volta
                      </h1>
                      <p className="mt-2 text-lg text-gray-600">
                        Entre na sua conta para aceder aos seus seguros
                      </p>
                    </div>

                    <Card className="shadow-md border-gray-100">
                      <CardContent className="p-6 sm:p-8">
                        <form
                          onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 flex items-center">
                              Email*
                            </label>
                            <div className="relative">
                              <input
                                id="email"
                                {...loginForm.register("email")}
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                className={`w-full rounded-lg border ${loginForm.formState.errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={loginForm.formState.errors.email ? "true" : "false"}
                              />
                              {loginForm.formState.errors.email && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {loginForm.formState.errors.email && (
                              <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.email.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 flex items-center">
                              Palavra-passe*
                            </label>
                            <div className="relative">
                              <input
                                id="password"
                                {...loginForm.register("password")}
                                type="password"
                                placeholder="••••••••"
                                className={`w-full rounded-lg border ${loginForm.formState.errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={loginForm.formState.errors.password ? "true" : "false"}
                              />
                              {loginForm.formState.errors.password && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {loginForm.formState.errors.password && (
                              <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.password.message}</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                {...loginForm.register("rememberMe")}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="text-sm text-gray-600">
                                Lembrar-me
                              </span>
                            </label>
                            <Link
                              href={"/cliente/esqueci-a-senha"}
                              className="text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                              Esqueceu a senha?
                            </Link>
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                          >
                            Entrar
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>

                          <div className="text-center text-sm text-gray-600">
                            Não tem uma conta?{" "}
                            <button
                              type="button"
                              onClick={() => setIsLogin(false)}
                              className="text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                              Registar
                            </button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  // Register Form
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        Criar conta
                      </h1>
                      <p className="mt-2 text-lg text-gray-600">
                        Registe-se para começar a gerir os seus seguros
                      </p>
                    </div>

                    <Card className="shadow-md border-gray-100">
                      <CardContent className="p-6 sm:p-8">
                        <form
                          onSubmit={registerForm.handleSubmit(
                            handleRegisterSubmit,
                          )}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 flex items-center">
                              Nome completo*
                            </label>
                            <div className="relative">
                              <input
                                id="name"
                                {...registerForm.register("name")}
                                type="text"
                                placeholder="João Silva"
                                className={`w-full rounded-lg border ${registerForm.formState.errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={registerForm.formState.errors.name ? "true" : "false"}
                              />
                              {registerForm.formState.errors.name && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {registerForm.formState.errors.name && (
                              <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.name.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="register-email" className="text-sm font-medium text-gray-900 flex items-center">
                              Email*
                            </label>
                            <div className="relative">
                              <input
                                id="register-email"
                                {...registerForm.register("email")}
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                className={`w-full rounded-lg border ${registerForm.formState.errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={registerForm.formState.errors.email ? "true" : "false"}
                              />
                              {registerForm.formState.errors.email && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {registerForm.formState.errors.email && (
                              <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.email.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-900 flex items-center">
                              Telefone*
                            </label>
                            <div className="relative">
                              <input
                                id="phone"
                                {...registerForm.register("phone")}
                                type="tel"
                                placeholder="+351 912 345 678"
                                className={`w-full rounded-lg border ${registerForm.formState.errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={registerForm.formState.errors.phone ? "true" : "false"}
                              />
                              {registerForm.formState.errors.phone && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {registerForm.formState.errors.phone && (
                              <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.phone.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="register-password" className="text-sm font-medium text-gray-900 flex items-center">
                              Palavra-passe*
                            </label>
                            <div className="relative">
                              <input
                                id="register-password"
                                {...registerForm.register("password")}
                                type="password"
                                placeholder="••••••••"
                                className={`w-full rounded-lg border ${registerForm.formState.errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={registerForm.formState.errors.password ? "true" : "false"}
                              />
                              {registerForm.formState.errors.password && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {registerForm.formState.errors.password && (
                              <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.password.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-900 flex items-center">
                              Confirmar palavra-passe*
                            </label>
                            <div className="relative">
                              <input
                                id="confirm-password"
                                {...registerForm.register("confirmPassword")}
                                type="password"
                                placeholder="••••••••"
                                className={`w-full rounded-lg border ${registerForm.formState.errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors`}
                                aria-invalid={registerForm.formState.errors.confirmPassword ? "true" : "false"}
                              />
                              {registerForm.formState.errors.confirmPassword && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                              )}
                            </div>
                            {registerForm.formState.errors.confirmPassword && (
                              <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.confirmPassword.message}</p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                          >
                            Registar
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>

                          <div className="text-center text-sm text-gray-600">
                            Já tem uma conta?{" "}
                            <button
                              type="button"
                              onClick={() => setIsLogin(true)}
                              className="text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                              Entrar
                            </button>
                          </div>
                          
                          <div className="text-xs text-gray-500 mt-4">
                            <p>* Campos obrigatórios</p>
                            <p className="mt-1">Ao registar-se, concorda com a nossa política de privacidade e termos de serviço.</p>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer space placeholder - ensures content doesn't get hidden behind the image */}
      <div className="h-8 bg-white"></div>
    </div>
  );
}
