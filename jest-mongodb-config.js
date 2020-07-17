module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      port: 55010,
      dbName: 'codex_accounting',
    },
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    autoStart: false,
  },
};
