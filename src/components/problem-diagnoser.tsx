"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { diagnoseComputerProblem, type DiagnoseComputerProblemOutput } from "@/ai/flows/diagnose-computer-problem";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  problemDescription: z.string().min(10, {
    message: "Por favor, descreva o problema com pelo menos 10 caracteres.",
  }),
});

export function ProblemDiagnoser() {
  const [result, setResult] = useState<DiagnoseComputerProblemOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await diagnoseComputerProblem(values);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao gerar diagnóstico",
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
              name="problemDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Descreva o problema</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Meu computador não liga, a tela fica preta, mas a luz do gabinete acende."
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
                  Diagnosticando...
                </>
              ) : (
                "Obter Diagnóstico Rápido"
              )}
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 p-4 border rounded-md bg-muted/50">
                <div className="flex items-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                    <h3 className="font-headline text-lg">Analisando os sintomas do seu equipamento...</h3>
                </div>
            </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-6 border-2 border-primary/50 rounded-lg bg-background">
              <h3 className="font-headline text-xl mb-2 text-primary">Diagnóstico Preliminar:</h3>
              <p className="whitespace-pre-wrap">{result.diagnosis}</p>
            </div>
             <div className="p-6 border rounded-lg bg-muted/50">
              <h3 className="font-headline text-xl mb-2 text-foreground">Recomendação:</h3>
              <p className="whitespace-pre-wrap">{result.recommendation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
