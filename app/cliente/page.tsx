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
import { Mail, Lock, ArrowRight, User, Phone } from "lucide-react";
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
    <main className="min-h-screen p-8 tablet:p-12 desktop:p-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl pt-20 mx-auto px-4 tablet:px-6 desktop:px-8">
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-12 items-center">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  // Login Form
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardHeader className="space-y-2 text-center">
                      <CardTitle className="text-2xl font-bold">
                        Bem-vindo de volta
                      </CardTitle>
                      <CardDescription>
                        Entre na sua conta para aceder aos seus seguros
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              {...loginForm.register("email")}
                              type="email"
                              placeholder="Email"
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          {loginForm.formState.errors.email && (
                            <p className="text-sm text-red-500">
                              {loginForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              {...loginForm.register("password")}
                              type="password"
                              placeholder="Palavra-passe"
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          {loginForm.formState.errors.password && (
                            <p className="text-sm text-red-500">
                              {loginForm.formState.errors.password.message}
                            </p>
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
                          className="w-full bg-primary text-white hover:bg-primary/90 py-6"
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
                  </motion.div>
                ) : (
                  // Register Form
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardHeader className="space-y-2 text-center">
                      <CardTitle className="text-2xl font-bold">
                        Criar conta
                      </CardTitle>
                      <CardDescription>
                        Registe-se para começar a gerir os seus seguros
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={registerForm.handleSubmit(
                          handleRegisterSubmit,
                        )}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              {...registerForm.register("name")}
                              type="text"
                              placeholder="Nome completo"
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          {registerForm.formState.errors.name && (
                            <p className="text-sm text-red-500">
                              {registerForm.formState.errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              {...registerForm.register("email")}
                              type="email"
                              placeholder="Email"
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          {registerForm.formState.errors.email && (
                            <p className="text-sm text-red-500">
                              {registerForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              {...registerForm.register("phone")}
                              type="tel"
                              placeholder="Telefone"
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          {registerForm.formState.errors.phone && (
                            <p className="text-sm text-red-500">
                              {registerForm.formState.errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              {...registerForm.register("password")}
                              type="password"
                              placeholder="Palavra-passe"
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          {registerForm.formState.errors.password && (
                            <p className="text-sm text-red-500">
                              {registerForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                              {...registerForm.register("confirmPassword")}
                              type="password"
                              placeholder="Confirmar palavra-passe"
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          {registerForm.formState.errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                              {
                                registerForm.formState.errors.confirmPassword
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-primary text-white hover:bg-primary/90 py-6"
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
                      </form>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden desktop:block"
          >
            <div className="relative h-[100dvh] w-[full] rounded-2xl overflow-hidden">
              <Image
                src="/insurance-consultation.jpg"
                alt="Login"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
