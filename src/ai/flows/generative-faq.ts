// src/ai/flows/generative-faq.ts
'use server';

/**
 * @fileOverview A flow for answering questions about SYS Govil based on provided company information.
 *
 * - generativeFAQ - A function that takes a question and company information and returns an answer.
 * - GenerativeFAQInput - The input type for the generativeFAQ function.
 * - GenerativeFAQOutput - The return type for the generativeFAQ function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerativeFAQInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
  companyInformation: z.string().describe('The company information to use for answering the question.'),
});
export type GenerativeFAQInput = z.infer<typeof GenerativeFAQInputSchema>;

const GenerativeFAQOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, based on the company information.'),
});
export type GenerativeFAQOutput = z.infer<typeof GenerativeFAQOutputSchema>;

export async function generativeFAQ(input: GenerativeFAQInput): Promise<GenerativeFAQOutput> {
  return generativeFAQFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generativeFAQPrompt',
  input: {schema: GenerativeFAQInputSchema},
  output: {schema: GenerativeFAQOutputSchema},
  prompt: `You are an AI assistant answering questions about SYS Govil.
  Use the following company information to answer the question.
  If the question cannot be answered using the provided information, respond with "I am sorry, I cannot answer that question with the information I have."

  Company Information:
  {{companyInformation}}

  Question: {{question}}`,
});

const generativeFAQFlow = ai.defineFlow(
  {
    name: 'generativeFAQFlow',
    inputSchema: GenerativeFAQInputSchema,
    outputSchema: GenerativeFAQOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
