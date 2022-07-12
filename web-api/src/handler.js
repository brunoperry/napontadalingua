import { parse } from "node:url";
import { generateInstance } from "./factories/npdlFactory.js";
import { routes } from "./routes/npdlRoute.js";
import { DEFAULT_HEADER } from "./util/util.js";

const npdlService = generateInstance();

const npdlRoutes = routes({
  npdlService,
});

const allRoutes = {
  ...npdlRoutes,
  //404 routes
  default: (req, res) => {
    res.writeHead(404, DEFAULT_HEADER);
    res.write("ooops! Page not found...");
    res.end();
  },
};
const handler = (req, res) => {
  const { url, method } = req;

  const { pathname } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;
  const chosenRoute = allRoutes[key] || allRoutes.default;

  return Promise.resolve(chosenRoute(req, res)).catch(handleError(res));
};

const handleError = (res) => {
  return (error) => {
    console.log("Something bad happened..", error.stack);
    res.writeHead(500, DEFAULT_HEADER);
    res.write(
      JSON.stringify({
        error: "Internal Server Error...",
      })
    );
    return res.end();
  };
};
export default handler;
