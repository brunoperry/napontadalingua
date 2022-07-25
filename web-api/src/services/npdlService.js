export default class NPDLService {
  constructor({ npdlRepo }) {
    this.repository = npdlRepo;
  }

  uiData() {
    return this.repository.getUI();
  }
  imagesData() {
    return this.repository.getImages();
  }

  create(data) {
    return this.repository.create(data);
  }
}
