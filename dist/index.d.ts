import OpenAI from "openai";
/**
 * A builder for creating a pool of OpenAI clients.
 * This is useful for when you have multiple API keys or clients and want to
 * balance traffic between them.
 */
export declare class OpenAIPoolBuilder {
    private clients;
    /**
     * Adds an OpenAI client to the pool
     * @param client The client to add
     * @returns The builder
     */
    withClient(client: OpenAI): this;
    /**
     * Creates a new OpenAI client with the given API key and add it to the pool.
     * This assumes default options.
     * @param apiKey The API key to use
     * @returns The builder
     */
    withApiKey(apiKey: string): this;
    create(): OpenAI;
}
