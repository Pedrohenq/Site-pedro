"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { suggestMealOptions, type SuggestMealOptionsOutput } from "@/ai/flows/suggest-meal-options";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  dietaryPreferences: z.string().min(10, {
    message: "Por favor, descreva suas preferências com pelo menos 10 caracteres.",
  }),
});

export function MenuSuggester() {
  const [suggestion, setSuggestion] = useState<SuggestMealOptionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryPreferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestMealOptions(values);
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao gerar sugestão",
        description: "Ocorreu um erro ao tentar se comunicar com a IA. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="dietaryPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Descreva sua necessidade</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Equipe de 20 pessoas, com 2 vegetarianos e 1 com intolerância a lactose. Preferência por comida mineira, sem pimenta."
                      {...field}
                      rows={4}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Sugestões...
                </>
              ) : (
                "Gerar Sugestão de Cardápio"
              )}
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 p-4 border rounded-md bg-muted/50">
                <div className="flex items-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                    <h3 className="font-headline text-lg">Analisando seu pedido e criando o cardápio perfeito...</h3>
                </div>
            </div>
        )}

        {suggestion && (
          <div className="mt-6 p-6 border-2 border-primary/50 rounded-lg bg-background">
            <h3 className="font-headline text-xl mb-4 text-primary">Nossa Sugestão de Cardápio:</h3>
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">{suggestion.mealOptions}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
