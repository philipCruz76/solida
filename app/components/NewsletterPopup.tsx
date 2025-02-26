"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

// Define the store type
interface NewsletterStore {
  hasInteracted: boolean;
  setHasInteracted: (value: boolean) => void;
  reset: () => void;
}

// Create the Zustand store
const useNewsletterStore = create<NewsletterStore>()(
  persist(
    (set) => ({
      hasInteracted: false,
      setHasInteracted: (value) => set({ hasInteracted: value }),
      reset: () => set({ hasInteracted: false }),
    }),
    {
      name: 'newsletter-storage', // unique name for localStorage key
    }
  )
);

interface NewsletterPopupProps {
  threshold?: number; // Percentage of the article scrolled before showing popup (0-100)
  delay?: number; // Delay in milliseconds before showing the popup
  onlyDesktop?: boolean; // Whether to show the popup only on desktop
}

export function NewsletterPopup({
  threshold = 80,
  delay = 1000,
  onlyDesktop = true,
}: NewsletterPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Get state from Zustand store
  const { hasInteracted, setHasInteracted } = useNewsletterStore();

  useEffect(() => {
    // Check if we're on desktop
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is a common breakpoint for tablets/desktop
    };

    // Initial check
    checkIfDesktop();

    // Add resize listener
    window.addEventListener("resize", checkIfDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  useEffect(() => {
    if (onlyDesktop && !isDesktop) return;

    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      // If user has scrolled past the threshold
      if (scrollPercentage >= threshold) {
        // Clear any existing timeout
        clearTimeout(timeoutId);
        
        // Set a timeout to show the popup after the delay
        timeoutId = setTimeout(() => {
          // Check if the user has already submitted or closed the popup
          if (!hasInteracted) {
            setOpen(true);
          }
        }, delay);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [threshold, delay, onlyDesktop, isDesktop, hasInteracted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Here you would typically send the email to your backend
      console.log("Subscribing email:", email);
      
      // Show success message
      setIsSubmitted(true);
      
      // Mark as interacted in Zustand store
      setHasInteracted(true);
      
      // Close after 3 seconds
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } catch (err) {
      setError("Ocorreu um erro. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Mark as interacted in Zustand store
    setHasInteracted(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-1">
          <div className="bg-white p-5 rounded-t-lg">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-2xl font-serif font-bold text-gray-900">
                Fique por dentro das novidades
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2 text-base">
                Junte-se a mais de 10.000 leitores e receba dicas exclusivas sobre seguros.
              </DialogDescription>
            </DialogHeader>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu-email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border-gray-300 rounded-md"
                    disabled={isLoading}
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      "Subscrever Newsletter"
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Ao subscrever, você concorda com a nossa{" "}
                    <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>.
                    Nunca enviaremos spam.
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Subscrito com sucesso!</h3>
                <p className="text-gray-600">Obrigado por subscrever a nossa newsletter.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-${i*100 + 200}`}></div>
                ))}
              </div>
              <span className="text-sm text-gray-600">Junte-se a milhares de leitores</span>
            </div>
            
            {!isSubmitted && (
              <button 
                type="button" 
                onClick={handleClose}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Agora não
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Export the store for use in other components if needed
export { useNewsletterStore }; 