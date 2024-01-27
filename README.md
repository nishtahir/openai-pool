# openai-pool

A simple round robin pool for OpenAI clients.

## Usage

```js
import { OpenAIPoolBuilder } from "openai-pool";

const clientA = new OpenAI({ apiKey: "your key" });
const clientB = new OpenAI({ apiKey: "your key" });

const pool = new OpenAIPoolBuilder()
  .withClient(clientA)
  .withClient(clientB)
  .create();

// The pool mimics the OpenAI client API
// but invokations are round robin load balanced between client instances

// Uses clientA
pool.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [],
});

// Uses clientB
pool.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [],
});

// Uses clientA
pool.embeddings.create({
  model: "text-embedding-ada-002",
  input: [],
});
```
