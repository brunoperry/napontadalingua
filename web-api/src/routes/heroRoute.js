import { once } from "node:events";
import Hero from "../entities/hero.js";
import { DEFAULT_HEADER } from "../util/util.js";

const routes = ({ heroService }) => ({
  "/heroes:get": async (req, res) => {
    const heros = await heroService.find();
    res.write(JSON.stringify({ results: heros }));
    return res.end();
  },
  "/heroes:post": async (req, res) => {
    // const data = await once(req, "data");
    const item = JSON.parse(await once(req, "data"));
    const hero = new Hero(item);
    const id = await heroService.create(hero);

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
