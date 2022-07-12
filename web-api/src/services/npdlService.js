export default class NPDLService {
  constructor({ npdlRepo }) {
    this.repository = npdlRepo;
  }

  uiData() {
    return this.repository.getUI();
  }

  create(data) {
    return this.repository.create(data);
  }
}
