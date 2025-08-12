import OpenAI from 'openai';

export interface VibeIsEvenOptions {
  apiKey?: string;
  model?: string;
  temperature?: number;
}

export interface VibeIsEvenResult {
  number: number;
  isEven: boolean;
  confidence: number;
  reasoning: string;
}

export class VibeIsEven {
  private openai: OpenAI;
  private model: string;
  private temperature: number;

  constructor(options: VibeIsEvenOptions = {}) {
    const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is required. Provide it via options.apiKey or OPENAI_API_KEY environment variable.');
    }

    this.openai = new OpenAI({ apiKey });
    this.model = options.model || 'gpt-3.5-turbo';
    this.temperature = options.temperature || 0.7;
  }

  /**
   * Determines if a number is even using AI
   * @param number The number to check
   * @returns Promise with the result including AI reasoning
   */
  async checkIsEven(number: number): Promise<VibeIsEvenResult> {
    if (!Number.isInteger(number)) {
      throw new Error('Input must be an integer');
    }

    const prompt = `You are a mathematical assistant with deep analytical skills.
    
Your task is to determine if the number ${number} is even or odd using mathematical reasoning.

Please respond with a JSON object containing:
- isEven: boolean (true if even, false if odd)
- confidence: number between 0 and 1 (how confident you are)
- reasoning: string (your mathematical reasoning)

Ensure the mathematical answer is correct.

Example format:
{
  "isEven": true,
  "confidence": 0.95,
  "reasoning": "The number divides evenly by 2 with no remainder"
}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that responds only with valid JSON objects.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: this.temperature,
        max_tokens: 500
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const aiResult = JSON.parse(content);
      
      // Validate the response structure
      if (typeof aiResult.isEven !== 'boolean' || 
          typeof aiResult.confidence !== 'number' ||
          typeof aiResult.reasoning !== 'string') {
        throw new Error('Invalid response structure from AI');
      }

      return {
        number,
        isEven: aiResult.isEven,
        confidence: Math.max(0, Math.min(1, aiResult.confidence)), // Clamp between 0-1
        reasoning: aiResult.reasoning
      };

    } catch (error) {
      if (error instanceof SyntaxError) {
        // Fallback to mathematical calculation if AI response is invalid
        const isEven = number % 2 === 0;
        return {
          number,
          isEven,
          confidence: 1.0,
          reasoning: `Mathematical calculation: ${number} % 2 = ${number % 2}`
        };
      }
      throw error;
    }
  }

  /**
   * Batch check multiple numbers
   * @param numbers Array of numbers to check
   * @returns Promise with array of results
   */
  async checkMultiple(numbers: number[]): Promise<VibeIsEvenResult[]> {
    const results = await Promise.all(
      numbers.map(num => this.checkIsEven(num))
    );
    return results;
  }
}

// Convenience function for single-use
export async function vibeIsEven(number: number, options?: VibeIsEvenOptions): Promise<VibeIsEvenResult> {
  const checker = new VibeIsEven(options);
  return checker.checkIsEven(number);
}

// Default export
export default VibeIsEven;

