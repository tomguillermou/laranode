import http from "http";
import app from "./app";

import { PORT } from "./boot/env";

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT);
console.log(`Listening on port: ${PORT}`);
