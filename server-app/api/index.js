// Vercel serverless entrypoint.
// Re-exports the Express app so Vercel can invoke it as a function.
module.exports = require('../server/index.js');
