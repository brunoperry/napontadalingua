export default class NPDLService {
  constructor({ npdlRepo }) {
    this.repository = npdlRepo;
  }

  async data() {
    return JSON.stringify({
      ui: await this.repository.getData("ui"),
      services: await this.repository.getData("services"),
      images: await this.repository.getImages(),
    });
  }

  // uiData() {
  //   return this.repository.getData("ui");
  // }
  // servicesData() {
  //   return this.repository.getData("services");
  // }
  // imagesData() {
  //   return this.repository.getImages();
  // }

  create(data) {
    return this.repository.create(data);
  }
}
