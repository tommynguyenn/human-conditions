import { OpenAI } from 'openai'
import {
  OPENAI_MODELS,
  PROMPT,
  OPENAI_MAX_TOKENS,
  ERROR_MESSAGES
} from './constants';

/**
 * Evaluates an object based on a condition, given in natural human language, using AI.
 * @param condition a string in a natural human language.
 * @param data an object to evaluate the condition.
 * @returns a boolean, true or false.
 */
export async function check(
  condition: string,
  data: Record<string, any>
): Promise<boolean> {
  if (!process.env.OPENAI_API_KEY) throw new Error(ERROR_MESSAGES.UNSET_ENV_VAR);

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
    ${PROMPT}
    Condition: ${condition} //END_CONDITION
    Data: ${JSON.stringify(data)} //END_DATA
    
    Respond with "true" or "false".
  `;

  try {
    const response = await openai.completions.create({
      model: OPENAI_MODELS.o1Mini,
      prompt,
      max_tokens: OPENAI_MAX_TOKENS,
    });

    const responseText = response.choices[0].text.trim().toLowerCase();
    return responseText === 'true';
  } catch (error) {
    console.error(ERROR_MESSAGES.API_CALL, error);
    throw new Error(ERROR_MESSAGES.EVALUATION_FAILURE);
  }
}
