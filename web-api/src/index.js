import http from "node:http";
import handler from "./handler.js";

const PORT = process.env.PORT || 3000;

export const server = http.createServer(handler).listen(PORT, () => {
  console.log(`Na Ponta da Língua is running on port ${PORT}`);
});
