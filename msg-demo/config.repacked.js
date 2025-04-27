/**
 * @type {import('repacked').AppConfig}
 */
const config = {
  output: {
    dir: "../docs",
  },
  client: {
    entry: "./src/index.tsx",
  },
  development: {
    open: true,
    port: 3000,
  },
  webpack: (config) => {
    return config;
  },
  jest: (config) => {
    return config;
  },
};

module.exports = config;
