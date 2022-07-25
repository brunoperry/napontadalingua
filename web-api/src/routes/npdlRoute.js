import { once } from "node:events";
import NPDL from "../entities/npdl.js";
import { DEFAULT_HEADER } from "../util/util.js";

import * as NPDLData from "../../db/data.json" assert { type: "json" };

const routes = ({ npdlService }) => ({
  "/ui:get": async (req, res) => {
    const ui = await npdlService.uiData();
    res.writeHead(200, DEFAULT_HEADER);
    return res.end(ui);
  },
  "/ui:post": async (req, res) => {
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
  "/images:get": (req, res) => {
    return res.end(JSON.stringify(NPDLData.default.images));
  },
  "/update_images:get": async (req, res) => {
    const images = await npdlService.imagesData();
    res.writeHead(200, DEFAULT_HEADER);
    return res.end(images);
  },
});

export { routes };
