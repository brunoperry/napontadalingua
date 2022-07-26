export default class NPDLService {
  constructor({ npdlRepo }) {
    this.repository = npdlRepo;
  }

  async data() {
    const UI = await this.repository.getData("ui");
    const SERVICES = await this.repository.getData("services");
    const ABOUT = await this.repository.getData("about");
    const IMAGES = await this.repository.getImages();
    return JSON.stringify({
      ui: UI,
      services: SERVICES,
      about: ABOUT[0],
      images: IMAGES,
    });
  }

  create(data) {
    return this.repository.create(data);
  }
}
