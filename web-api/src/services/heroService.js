export default class HeroService {
  constructor({ heroRepo }) {
    this.repository = heroRepo;
  }

  find() {
    return this.repository.find();
  }

  create(data) {
    return this.repository.create(data);
  }
}
