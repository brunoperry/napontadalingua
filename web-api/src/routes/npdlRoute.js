import { once } from "node:events";
import NPDL from "../entities/npdl.js";
import { DEFAULT_HEADER } from "../util/util.js";

const routes = ({ npdlService }) => ({
  "/npdlUI:get": async (req, res) => {
    const ui = await npdlService.find();
    res.write(JSON.stringify({ results: ui }));
    return res.end();
  },
  "/npdlUI:post": async (req, res) => {
    // const data = await once(req, "data");
    const item = JSON.parse(await once(req, "data"));
    const npdl = new NPDL(item);
    const id = await npdlService.create(npdl);

    res.writeHead(201, DEFAULT_HEADER);
    res.write(
      JSON.stringify({
        id: id,
        success: "User created successfully!",
      })
    );
    res.end();
  },
});

export { routes };
