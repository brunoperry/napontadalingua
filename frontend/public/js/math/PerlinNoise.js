import PVector from "./PVector.js";

export default class PerlinNoise {
  #p = new Array(512);
  #permutation = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
    234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
    134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
    230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
    1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130,
    116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
    124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
    154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
    108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34,
    242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121,
    50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
    141, 128, 195, 78, 66, 215, 61, 156, 180,
  ];
  #AA = null;
  #AB = null;
  #BA = null;
  #BB = null;

  #u;
  #v;
  #w;

  data = null;
  constructor(vec = new PVector()) {
    for (let i = 0; i < 256; i++) {
      this.#p[256 + i] = this.#p[i] = this.#permutation[i];
    }

    const X = Math.floor(vec.x) & 255; // FIND UNIT CUBE THAT
    const Y = Math.floor(vec.y) & 255; // CONTAINS POINT.
    const Z = Math.floor(vec.z) & 255;

    // vec.x -= Math.floor(vec.x); // FIND RELATIVE X,Y,Z
    // vec.y -= Math.floor(vec.y); // OF POINT IN CUBE.
    // vec.z -= Math.floor(vec.z);

    this.#u = this.#fade(vec.x); // COMPUTE FADE CURVES
    this.#v = this.#fade(vec.y); // FOR EACH OF X,Y,Z.
    this.#w = this.#fade(vec.z);

    console.log(vec);

    let A = this.#p[X] + Y;
    this.#AA = this.#p[A] + Z;
    this.#AB = this.#p[A + 1] + Z; // HASH COORDINATES OF
    let B = this.#p[X + 1] + Y;
    this.#BA = this.#p[B] + Z;
    this.#BB = this.#p[B + 1] + Z; // THE 8 CUBE CORNERS,

    this.data = this.#noise(vec);
  }

  #fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  #lerp(t, a, b) {
    return a + t * (b - a);
  }
  #grad(hash, x, y, z) {
    let h = hash & 15; // CONVERT LO 4 BITS OF HASH CODE
    let u = h < 8 ? x : y, // INTO 12 GRADIENT DIRECTIONS.
      v = h < 4 ? y : h == 12 || h == 14 ? x : z;
    return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
  }

  #scale(n) {
    return (1 + n) / 2;
  }

  #noise(vec) {
    return this.#scale(
      this.#lerp(
        this.#w,
        this.#lerp(
          this.#v,
          this.#lerp(
            this.#u,
            this.#grad(this.#p[this.#AA], vec.x, vec.y, vec.z), // AND ADD
            this.#grad(this.#p[this.#BA], vec.x - 1, vec.y, vec.z)
          ), // BLENDED
          this.#lerp(
            this.#u,
            this.#grad(this.#p[this.#AB], vec.x, vec.y - 1, vec.z), // RESULTS
            this.#grad(this.#p[this.#BB], vec.x - 1, vec.y - 1, vec.z)
          )
        ), // FROM  8
        this.#lerp(
          this.#v,
          this.#lerp(
            this.#u,
            this.#grad(this.#p[this.#AA + 1], vec.x, vec.y, vec.z - 1), // CORNERS
            this.#grad(this.#p[this.#BA + 1], vec.x - 1, vec.y, vec.z - 1)
          ), // OF CUBE
          this.#lerp(
            this.#u,
            this.#grad(this.#p[this.#AB + 1], vec.x, vec.y - 1, vec.z - 1),
            this.#grad(this.#p[this.#BB + 1], vec.x - 1, vec.y - 1, vec.z - 1)
          )
        )
      )
    );
  }
}
