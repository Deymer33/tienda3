"use client";

import { useState } from "react";
import { generativeFAQ } from "@/ai/flows/generative-faq";
import { fullCompanyInfoForAI } from "@/lib/company-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Loader2, Send } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function FAQClient() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer("");
    try {
      const result = await generativeFAQ({
        question,
        companyInformation: fullCompanyInfoForAI,
      });
      setAnswer(result.answer);
    } catch (error) {
      console.error("Error fetching FAQ answer:", error);
      setAnswer("Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ej: ¿Qué tipo de mantenimiento ofrecen?"
          className="flex-1 text-base"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} aria-label="Enviar pregunta">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>

      {isLoading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {answer && !isLoading && (
        <Card className="bg-secondary">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <p className="text-muted-foreground pt-1">{answer}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
