'use server';

/**
 * @fileOverview Este arquivo define um fluxo Genkit para diagnosticar problemas de computador.
 *
 * Inclui:
 * - `diagnoseComputerProblem`: Uma função assíncrona que recebe a descrição de um problema e retorna um diagnóstico e recomendação.
 * - `DiagnoseComputerProblemInput`: O tipo de entrada para a função `diagnoseComputerProblem`.
 * - `DiagnoseComputerProblemOutput`: O tipo de saída para a função `diagnoseComputerProblem`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define o esquema de entrada para a descrição do problema usando Zod
const DiagnoseComputerProblemInputSchema = z.object({
  problemDescription: z
    .string()
    .describe(
      'Uma descrição do problema do computador, incluindo quaisquer sintomas ou mensagens de erro.'
    ),
});

// Define o esquema de saída para o diagnóstico do problema usando Zod
const DiagnoseComputerProblemOutputSchema = z.object({
  diagnosis: z
    .string()
    .describe('Uma análise do possível problema com base na descrição.'),
  recommendation: z
    .string()
    .describe('Etapas ou ações recomendadas para resolver o problema.'),
});

// Define os tipos TypeScript correspondentes aos esquemas Zod
export type DiagnoseComputerProblemInput = z.infer<typeof DiagnoseComputerProblemInputSchema>;
export type DiagnoseComputerProblemOutput = z.infer<typeof DiagnoseComputerProblemOutputSchema>;

// Função exportada para diagnosticar o problema do computador
export async function diagnoseComputerProblem(
  input: DiagnoseComputerProblemInput
): Promise<DiagnoseComputerProblemOutput> {
  return diagnoseComputerProblemFlow(input);
}

// Define o prompt Genkit para diagnosticar o problema
const diagnoseComputerProblemPrompt = ai.definePrompt({
  name: 'diagnoseComputerProblemPrompt',
  input: {schema: DiagnoseComputerProblemInputSchema},
  output: {schema: DiagnoseComputerProblemOutputSchema},
  prompt: `Você é um técnico de TI especialista em diagnosticar problemas de hardware e software. Com base na descrição a seguir, forneça um possível diagnóstico e uma recomendação.

Descrição do Problema: {{{problemDescription}}}

Seja claro e conciso no diagnóstico e ofereça as próximas etapas práticas na recomendação.`,
});

// Define o fluxo Genkit para diagnosticar o problema do computador
const diagnoseComputerProblemFlow = ai.defineFlow(
  {
    name: 'diagnoseComputerProblemFlow',
    inputSchema: DiagnoseComputerProblemInputSchema,
    outputSchema: DiagnoseComputerProblemOutputSchema,
  },
  async input => {
    const {output} = await diagnoseComputerProblemPrompt(input);
    return output!;
  }
);
