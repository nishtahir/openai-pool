"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIPoolBuilder = void 0;
const openai_1 = __importDefault(require("openai"));
/**
 * A builder for creating a pool of OpenAI clients.
 * This is useful for when you have multiple API keys or clients and want to
 * balance traffic between them.
 */
class OpenAIPoolBuilder {
    constructor() {
        this.clients = [];
    }
    /**
     * Adds an OpenAI client to the pool
     * @param client The client to add
     * @returns The builder
     */
    withClient(client) {
        this.clients.push(client);
        return this;
    }
    /**
     * Creates a new OpenAI client with the given API key and add it to the pool.
     * This assumes default options.
     * @param apiKey The API key to use
     * @returns The builder
     */
    withApiKey(apiKey) {
        const client = new openai_1.default({ apiKey });
        this.clients.push(client);
        return this;
    }
    create() {
        // Dummy client for the typings
        const dummy = new openai_1.default({ apiKey: "dummy" });
        // Select an OpenAi client to use in a round-robin fashion
        // for each use of the proxy
        let nextIndex = 0;
        const proxy = new Proxy(dummy, {
            get: (_, prop) => {
                const client = this.clients[nextIndex];
                console.log("Using client", nextIndex);
                nextIndex = (nextIndex + 1) % this.clients.length;
                return client[prop];
            },
        });
        return proxy;
    }
}
exports.OpenAIPoolBuilder = OpenAIPoolBuilder;
