import HeroRepository from "../repositories/heroRepository.js";
import HeroService from "../services/heroService.js";

const generateInstance = ({ filePath }) => {
  //here goes all db connections

  const heroRepo = new HeroRepository({
    file: filePath,
  });

  const heroService = new HeroService({ heroRepo });

  return heroService;
};

export { generateInstance };
