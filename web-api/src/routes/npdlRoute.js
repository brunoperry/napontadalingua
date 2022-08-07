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
});

export { routes };
