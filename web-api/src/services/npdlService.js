export default class NPDLService {
  constructor({ npdlRepo }) {
    this.repository = npdlRepo;
  }

  find() {
    return this.repository.find();
  }

  create(data) {
    return this.repository.create(data);
  }
}
