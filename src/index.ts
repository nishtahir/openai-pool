import OpenAI from "openai";

/**
 * A builder for creating a pool of OpenAI clients.
 * This is useful for when you have multiple API keys or clients and want to
 * balance traffic between them.
 */
export class OpenAIPoolBuilder {
  private clients: OpenAI[] = [];

  /**
   * Adds an OpenAI client to the pool
   * @param client The client to add
   * @returns The builder
   */
  withClient(client: OpenAI) {
    this.clients.push(client);
    return this;
  }

  /**
   * Creates a new OpenAI client with the given API key and add it to the pool.
   * This assumes default options.
   * @param apiKey The API key to use
   * @returns The builder
   */
  withApiKey(apiKey: string) {
    const client = new OpenAI({ apiKey });
    this.clients.push(client);
    return this;
  }

  create() {
    // Dummy client for the typings
    const dummy = new OpenAI({ apiKey: "dummy" });

    // Select an OpenAi client to use in a round-robin fashion
    // for each use of the proxy
    let nextIndex = 0;
    const proxy = new Proxy(dummy, {
      get: (_, prop) => {
        const client = this.clients[nextIndex];
        console.log("Using client", nextIndex);
        nextIndex = (nextIndex + 1) % this.clients.length;
        return client[prop as keyof OpenAI];
      },
    });
    return proxy;
  }
}
