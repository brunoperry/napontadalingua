import { once } from "node:events";
import NPDL from "../entities/npdl.js";
import { DEFAULT_HEADER } from "../util/util.js";
import { writeFile } from "fs";

import * as NPDLData from "../../db/data.json" assert { type: "json" };

const routes = ({ npdlService }) => ({
  "/update_data:get": async (req, res) => {
    const data = await npdlService.data();
    res.writeHead(200, DEFAULT_HEADER);

    writeFile("./db/data.json", data, "utf8", (err) => {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
    });

    return res.end(data);
  },
  "/data:get": async (req, res) => {
    return res.end(JSON.stringify(NPDLData.default));
  },
  // "/ui:get": async (req, res) => {
  //   const ui = await npdlService.uiData();
  //   res.writeHead(200, DEFAULT_HEADER);
  //   return res.end(ui);
  // },
  // "/ui:post": async (req, res) => {
  //   // const data = await once(req, "data");
  //   const item = JSON.parse(await once(req, "data"));
  //   const npdl = new NPDL(item);
  //   const id = await npdlService.create(npdl);

  //   res.writeHead(201, DEFAULT_HEADER);
  //   res.write(
  //     JSON.stringify({
  //       id: id,
  //       success: "User created successfully!",
  //     })
  //   );
  //   res.end();
  // },
  // "/services:get": async (req, res) => {
  //   const services = await npdlService.servicesData();
  //   res.writeHead(200, DEFAULT_HEADER);
  //   return res.end(services);
  // },

  // "/images:get": (req, res) => {
  //   return res.end(JSON.stringify(NPDLData.default));
  // },
  // "/update_images:get": async (req, res) => {
  //   const images = await npdlService.imagesData();
  //   res.writeHead(200, DEFAULT_HEADER);
  //   return res.end(images);
  // },
});

export { routes };
