globalThis.process = { env: { NODE_ENV: "development" } };
globalThis.require = path => {
    const elements = path.split("../");
    return (elements.length > 0) ? elements[elements.length - 1] : path;
};

const globals = {
    process: globalThis.process,
    require: globalThis.require
};

export default globals;