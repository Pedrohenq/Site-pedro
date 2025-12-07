'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting meal options based on dietary preferences.
 *
 * It includes:
 * - `suggestMealOptions`: An asynchronous function that takes dietary preferences as input and returns suggested meal options.
 * - `SuggestMealOptionsInput`: The input type for the `suggestMealOptions` function, defining the expected schema for dietary preferences.
 * - `SuggestMealOptionsOutput`: The output type for the `suggestMealOptions` function, defining the schema for the meal options suggestion.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for dietary preferences using Zod
const SuggestMealOptionsInputSchema = z.object({
  dietaryPreferences: z
    .string()
    .describe(
      'A description of dietary preferences, including any allergies or restrictions.'
    ),
});

// Define the output schema for meal options suggestion using Zod
const SuggestMealOptionsOutputSchema = z.object({
  mealOptions: z
    .string()
    .describe('A list of suggested meal options based on the dietary preferences.'),
});

// Define the Typescript types corresponding to the Zod schemas
export type SuggestMealOptionsInput = z.infer<typeof SuggestMealOptionsInputSchema>;
export type SuggestMealOptionsOutput = z.infer<typeof SuggestMealOptionsOutputSchema>;

// Exported function to suggest meal options based on dietary preferences
export async function suggestMealOptions(
  input: SuggestMealOptionsInput
): Promise<SuggestMealOptionsOutput> {
  return suggestMealOptionsFlow(input);
}

// Define the Genkit prompt for suggesting meal options
const suggestMealOptionsPrompt = ai.definePrompt({
  name: 'suggestMealOptionsPrompt',
  input: {schema: SuggestMealOptionsInputSchema},
  output: {schema: SuggestMealOptionsOutputSchema},
  prompt: `Suggest meal options based on the following dietary preferences: {{{dietaryPreferences}}}. Provide a variety of options suitable for a corporate client.`,
});

// Define the Genkit flow for suggesting meal options
const suggestMealOptionsFlow = ai.defineFlow(
  {
    name: 'suggestMealOptionsFlow',
    inputSchema: SuggestMealOptionsInputSchema,
    outputSchema: SuggestMealOptionsOutputSchema,
  },
  async input => {
    const {output} = await suggestMealOptionsPrompt(input);
    return output!;
  }
);
