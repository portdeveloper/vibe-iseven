# 🔮 vibe-iseven

> Determines if a number is even using OpenAI API - because why not add some AI magic to basic math!

Have you ever wondered if a number is even, but wanted to get that answer with a mystical AI twist? Look no further! `vibe-iseven` combines the power of artificial intelligence with the ancient mathematical concept of even numbers to give you not just the answer, but the *vibe* behind it.

## ✨ Features

- 🤖 **AI-Powered**: Uses OpenAI's GPT models to determine if numbers are even
- 🎭 **Mystical Vibes**: Get creative reasoning and energy readings for each number
- 📊 **Confidence Scoring**: AI provides confidence levels for its mathematical intuition
- 🛡️ **Fallback Logic**: Mathematical backup in case the AI gets too creative
- 🚀 **TypeScript**: Full type safety and IntelliSense support
- ⚡ **Batch Processing**: Check multiple numbers at once

## 🚀 Installation

```bash
npm install vibe-iseven
```

## 🔑 Setup

You'll need an OpenAI API key. Get one from [OpenAI's website](https://platform.openai.com/api-keys).

Set your API key as an environment variable:
```bash
export OPENAI_API_KEY="your-api-key-here"
```

Or pass it directly when creating the instance (see usage examples below).

## 📖 Usage

### Basic Usage

```javascript
import { vibeIsEven } from 'vibe-iseven';

// Simple check
const result = await vibeIsEven(42);
console.log(result);
// {
//   number: 42,
//   isEven: true,
//   confidence: 0.95,
//   reasoning: "The number 42 divides perfectly by 2, leaving no remainder",
//   vibe: "This number radiates cosmic harmony and balance ✨"
// }
```

### Class Instance with Options

```javascript
import VibeIsEven from 'vibe-iseven';

const checker = new VibeIsEven({
  apiKey: 'your-api-key',  // Optional if using env var
  model: 'gpt-4',          // Optional, defaults to 'gpt-3.5-turbo'
  temperature: 0.8         // Optional, defaults to 0.7
});

const result = await checker.checkIsEven(13);
console.log(result);
// {
//   number: 13,
//   isEven: false,
//   confidence: 0.99,
//   reasoning: "13 divided by 2 gives 6.5, indicating an odd number",
//   vibe: "This prime number pulses with rebellious, untamed energy 🔥"
// }
```

### Batch Processing

```javascript
const checker = new VibeIsEven();
const numbers = [2, 3, 4, 5, 6];
const results = await checker.checkMultiple(numbers);

results.forEach(result => {
  console.log(`${result.number}: ${result.isEven ? 'Even' : 'Odd'} - ${result.vibe}`);
});
```

### Error Handling

```javascript
try {
  const result = await vibeIsEven(3.14);
} catch (error) {
  console.error(error.message); // "Input must be an integer"
}

try {
  const checker = new VibeIsEven(); // No API key provided
} catch (error) {
  console.error(error.message); // "OpenAI API key is required..."
}
```

## 🔧 API Reference

### `vibeIsEven(number, options?)`

Convenience function for one-off checks.

**Parameters:**
- `number: number` - The integer to check
- `options?: VibeIsEvenOptions` - Optional configuration

**Returns:** `Promise<VibeIsEvenResult>`

### `new VibeIsEven(options?)`

Create a reusable instance.

**Options:**
- `apiKey?: string` - OpenAI API key (defaults to `OPENAI_API_KEY` env var)
- `model?: string` - OpenAI model to use (defaults to `'gpt-3.5-turbo'`)
- `temperature?: number` - AI creativity level 0-1 (defaults to `0.7`)

### `checker.checkIsEven(number)`

Check if a single number is even.

**Parameters:**
- `number: number` - The integer to check

**Returns:** `Promise<VibeIsEvenResult>`

### `checker.checkMultiple(numbers)`

Check multiple numbers at once.

**Parameters:**
- `numbers: number[]` - Array of integers to check

**Returns:** `Promise<VibeIsEvenResult[]>`

## 📊 Response Format

```typescript
interface VibeIsEvenResult {
  number: number;        // The input number
  isEven: boolean;       // true if even, false if odd
  confidence: number;    // AI confidence level (0-1)
  reasoning: string;     // AI's mathematical explanation
  vibe: string;         // Mystical energy reading of the number
}
```

## 🎯 Why This Exists

This package is a playful exploration of combining AI with simple mathematical operations. While checking if a number is even is trivial (`number % 2 === 0`), sometimes you want to add a little magic and personality to your code. 

Perfect for:
- 🎮 Fun side projects
- 🎨 Creative coding experiments
- 🧪 Testing AI integration patterns
- 😄 Making your math operations more entertaining
- 🎪 Demonstrating API integration in workshops

## 🔒 Security & Privacy

- API keys are never logged or stored
- Only the number being checked is sent to OpenAI
- No personal data is transmitted
- Fallback mathematical calculation if AI fails

## 📝 License

MIT - Feel free to use this in your projects!

## 🤝 Contributing

Found a bug or have a feature idea? Open an issue or submit a PR!

## 🙏 Credits

- OpenAI for making AI accessible
- The mathematical concept of even numbers (ancient mathematicians)
- You, for appreciating the absurdity of AI-powered modulo operations

---

*Remember: With great power comes great responsibility. Use your AI-powered even number detection wisely.* ✨

