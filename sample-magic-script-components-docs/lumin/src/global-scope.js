// This is a required workaround which expects NODE_ENV
globalThis.process = { env: { NODE_ENV: "development" } };
export default process;
