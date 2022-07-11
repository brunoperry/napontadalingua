import NPDLRepository from "../repositories/npdlRepository.js";
import NPDLService from "../services/npdlService.js";

const generateInstance = ({ filePath }) => {
  //here goes all db connections

  const npdlRepo = new NPDLRepository({
    file: filePath,
  });

  const npdlService = new NPDLService({ npdlRepo });

  return npdlService;
};

export { generateInstance };
