// In this file you can configure migrate-mongo
const dotenv = require('dotenv');
dotenv.config();

const config = {
  mongodb: {
    url: `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
