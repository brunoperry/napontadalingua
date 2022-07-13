import http from "node:http";
import handler from "./handler.js";

const PORT = process.env.PORT || 9000;

export const server = http.createServer(handler).listen(PORT, () => {
  console.log(`Na Ponta da Língua (backend) is running on port ${PORT}`);
});
