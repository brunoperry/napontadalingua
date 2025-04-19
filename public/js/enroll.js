/** Module javascript here */
let currentStep = 0;
let previousStep = 0;

let stepsInfo;
let totalSteps;
let stepsContainer;
let steps;
let stepObjects = [];

let previsousButton;
let nextButton;
let footer;

let loader;

let enrollData = {
  service: "",
  modality: "",
  timetable: [],
  student: null,
  tutor: null,
};
window.onload = () => {
  stepsInfo = document.querySelector("#steps-info");
  stepsContainer = document.querySelector("#steps-container");
  steps = document.querySelectorAll(".form-step");
  totalSteps = steps.length;
  document.querySelector("#total-steps").innerText =
    "/" + totalSteps.toString().padStart(2, "0");

  previsousButton = document.querySelector("#previous-button");
  nextButton = document.querySelector("#next-button");

  previsousButton.onclick = (e) => {
    e.preventDefault();
    backStep();
  };

  nextButton.onclick = (e) => {
    e.preventDefault();
    nextStep();
  };

  const nextStep = () => {
    previousStep = currentStep;
    currentStep++;

    if (currentStep >= totalSteps) {
      submitEnroll();
      return;
      // currentStep = totalSteps - 1;
    }
    gotoStep(currentStep);

    if (currentStep === totalSteps - 1) {
      enrollData.service = serviceForm.getReviewData();
      enrollData.modality = modalityForm.getReviewData();
      enrollData.timetable = timetableForm.getReviewData();
      enrollData.student = studentForm.getReviewData();
      enrollData.tutor = tutorForm.getReviewData();
      review.setData(enrollData);
    } else {
      nextButton.innerText = "Seguinte >";
    }
  };
  const backStep = () => {
    previousStep = currentStep;
    currentStep--;
    if (currentStep < 0) currentStep = 0;
    gotoStep(currentStep);
  };

  footer = new Footer();

  //   FORMS
  const serviceForm = new ServicesForm((service) => {
    document.querySelector("#service-type").innerText = `(${service})`;
    modalityForm.reset();
    nextStep();
  });
  stepObjects.push(serviceForm);

  const modalityForm = new ModalitiesForm((value) => {
    timetableForm.reset(value);
    nextStep();
  });
  stepObjects.push(modalityForm);

  const timetableForm = new TimetableForm(() => {
    nextButton.disabled = !timetableForm.isReady;
  });
  stepObjects.push(timetableForm);

  const studentForm = new StudentForm(() => {
    nextButton.disabled = !studentForm.isReady;
  });
  stepObjects.push(studentForm);

  const tutorForm = new TutorForm((value) => {
    if (value === "same-address") tutorForm.setData(studentForm.getData());
    nextButton.disabled = !tutorForm.isReady;
  });
  stepObjects.push(tutorForm);

  const review = new Review();
  stepObjects.push(review);

  loader = new Loader();

  document.documentElement.style.setProperty("--num-steps", totalSteps);
  document.body.style.opacity = 1;
  steps[currentStep].style.opacity = 1;

  // loader.show();
};

const updateSteps = () => {
  previsousButton.disabled = currentStep === 0 ? true : false;
  if (currentStep === totalSteps - 1) nextButton.disabled = true;
  else if (stepObjects[currentStep].isReady) nextButton.disabled = false;
  else nextButton.disabled = true;

  if (currentStep === totalSteps - 1) {
    nextButton.innerText = "Submeter";
    nextButton.disabled = false;
  } else nextButton.innerText = "Seguinte >";
  updateCounter();
};

const updateCounter = () => {
  stepsInfo.querySelector("#step-label").innerText = (currentStep + 1)
    .toString()
    .padStart(2, "0");
  stepsInfo.querySelector("#step-title").innerText = steps[currentStep].dataset.title;
};

const gotoStep = (step) => {
  steps[previousStep].style.opacity = 0;
  stepsContainer.style.transform = `translateX(-${step * window.innerWidth}px)`;
  steps[currentStep].style.opacity = 1;
  updateSteps();
  footer.update(currentStep);
};

const submitEnroll = async () => {
  loader.show();
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const req = await fetch("/enroll", {
    method: "POST",
    body: formData,
  });
  const res = await req.json();

  setTimeout(() => loader.hide(), 1000);
  console.log(res);
};

class ServicesForm {
  constructor(callback) {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.onclick = (e) => {
        if (e.target.tagName !== "INPUT") return;
        callback(card.querySelector(".title").innerText);
      };
    });
  }
  reset() {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.querySelector("input").checked = false;
    });
  }
  getReviewData() {
    let val = "...";
    switch (document.querySelector(".service-card input:checked").value) {
      case "rooms":
        val = "Salas de estudo";
        break;
      case "tutoring":
        val = "Explicações";
        break;
      case "plans":
        val = "Planos pontuais de estudo";
        break;
    }

    return val;
  }
  getData() {
    return document.querySelector(".service-card input:checked").value;
  }

  get isReady() {
    return document.querySelector(".service-card input:checked") ? true : false;
  }
}
class ModalitiesForm {
  constructor(callback) {
    document.querySelectorAll(".modality-item").forEach((item) => {
      item.onclick = (e) => {
        if (e.target.tagName !== "INPUT") return;
        callback(e.target.getAttribute("data-turns"));
      };
    });
  }
  reset() {
    document.querySelectorAll(".modality-item").forEach((item) => {
      item.querySelector("input").checked = false;
    });
  }
  getReviewData() {
    let val = "...";
    switch (document.querySelector(".modality-item input:checked").value) {
      case "3":
        val = "2x por semana - 100€";
        break;
      case "4":
        val = "3x por semana - 125€";
        break;
      case "5":
        val = "4x por semana - 145€";
        break;
      case "6":
        val = "5x por semana - 160€";
        break;
      case "7":
        val = "Manhãs/Tardes - 20€";
        break;
    }
    return val;
  }
  getData() {
    return document.querySelector(".modality-item input:checked").value;
  }
  get isReady() {
    return document.querySelector(".modality-item input:checked") ? true : false;
  }
}
class TimetableForm {
  #cells;
  #maxCells;
  #totalCells = 0;
  #callback;
  constructor(callback) {
    this.#cells = document.querySelector("#timetable").querySelectorAll(".cell");
    this.#callback = callback;
    this.#cells.forEach((cell) => {
      cell.onclick = (e) => {
        const input = e.target;
        if (input.tagName !== "INPUT") return;
        if (input.checked) this.#totalCells++;
        else this.#totalCells--;

        if (this.#totalCells > this.#maxCells) {
          input.checked = false;
          this.#totalCells--;
        }
        this.#callback(this.#totalCells);
      };
    });
  }
  reset(max) {
    const val = max === "Infinity" ? Infinity : parseInt(max);
    if (val == this.#maxCells) {
      this.#callback(this.#totalCells);
      return;
    }
    this.#maxCells = val;
    this.#totalCells = 0;
    this.#cells.forEach((cell) => {
      const input = cell.querySelector("input");
      if (input) input.checked = false;
    });
  }
  getReviewData() {
    const dataOut = [];
    this.#cells.forEach((cell) => {
      const input = cell.querySelector("input");
      if (input && input.checked) {
        let val = "";
        switch (input.value) {
          case "mm":
            val = "Segunda-Manhã";
            break;
          case "mt":
            val = "Terça-Manhã";
            break;
          case "mw":
            val = "Quarta-Manhã";
            break;
          case "mth":
            val = "Quinta-Manhã";
            break;
          case "mf":
            val = "Sexta-Manhã";
            break;

          case "am":
            val = "Segunda-Tarde";
            break;
          case "at":
            val = "Terça-Tarde";
            break;
          case "aw":
            val = "Quarta-Tarde";
            break;
          case "ath":
            val = "Quinta-Tarde";
            break;
          case "af":
            val = "Sexta-Tarde";
            break;
        }
        dataOut.push(val);
      }
    });
    if (dataOut.length === 0) dataOut.push("...");
    return dataOut;
  }
  getData() {
    const dataOut = [];
    this.#cells.forEach((cell) => {
      const input = cell.querySelector("input");
      if (input && input.checked) dataOut.push(input.value);
    });
    return dataOut;
  }
  get isReady() {
    return this.#totalCells === this.#maxCells ? true : false;
  }
}
class StudentForm {
  #container;
  constructor(callback) {
    this.#container = document.querySelector("#student");
    this.#container.querySelector("#student-fullname-input").oninput = () => callback();
    this.#container.querySelector("#student-address-input").oninput = () => callback();
    this.#container.querySelector("#student-pob-input").oninput = () => callback();
    this.#container.querySelector("#student-mobile-input").oninput = () => callback();
    this.#container.querySelector("#student-dob-input").oninput = () => callback();
    this.#container.querySelector("#student-cc-input").oninput = () => callback();
    this.#container.querySelector("#student-nif-input").oninput = () => callback();
    this.#container.querySelector("#student-sns-input").oninput = () => callback();
    this.#container.querySelector("#school-input").oninput = () => callback();
    this.#container.querySelector("#notes-input").oninput = () => callback();
  }
  getReviewData() {
    return {
      name: this.#container.querySelector("#student-fullname-input").value || "...",
      address: this.#container.querySelector("#student-address-input").value || "...",
      pob: this.#container.querySelector("#student-pob-input").value || "...",
      mobile: this.#container.querySelector("#student-mobile-input").value || "...",
      dob: this.#container.querySelector("#student-dob-input").value || "...",
      cc: this.#container.querySelector("#student-cc-input").value || "...",
      nif: this.#container.querySelector("#student-nif-input").value || "...",
      sns: this.#container.querySelector("#student-sns-input").value || "...",
      school: this.#container.querySelector("#school-input").value || "...",
      notes: this.#container.querySelector("#notes-input").value || "...",
    };
  }
  getData() {
    return {
      studentNum: this.#container.querySelector("#student-num").innerText,
      year: this.#container.querySelector("#year").innerText,
      name: this.#container.querySelector("#student-fullname-input").value,
      address: this.#container.querySelector("#student-address-input").value,
      pob: this.#container.querySelector("#student-pob-input").value,
      mobile: this.#container.querySelector("#student-mobile-input").value,
      dob: this.#container.querySelector("#student-dob-input").value,
      cc: this.#container.querySelector("#student-cc-input").value,
      nif: this.#container.querySelector("#student-nif-input").value,
      sns: this.#container.querySelector("#student-sns-input").value,
      school: this.#container.querySelector("#school-input").value,
      notes: this.#container.querySelector("#notes-input").value,
    };
  }
  get isReady() {
    const ready =
      this.#container.querySelector("#student-fullname-input").value !== "" &&
      this.#container.querySelector("#student-address-input").value !== "" &&
      this.#container.querySelector("#student-pob-input").value !== "" &&
      this.#container.querySelector("#student-mobile-input").value !== "" &&
      this.#container.querySelector("#student-dob-input").value !== "" &&
      this.#container.querySelector("#school-input").value !== ""
        ? true
        : false;
    return ready;
  }
}
class TutorForm {
  #callback;
  #container;
  constructor(callback) {
    this.#callback = callback;
    this.#container = document.querySelector("#tutor");
    this.#container.querySelector("#same-address").onclick = (e) => {
      e.preventDefault();
      this.#callback("same-address");
    };

    const authInput = this.#container.querySelector("#auth-input");
    this.#container.querySelector("#add-button").onclick = (e) => {
      e.preventDefault();
      if (authInput.value === "") return;
      this.#addPerson(authInput.value);
      authInput.value = "";
    };

    this.#container.querySelector("#tutor-fullname-input").oninput = () => callback();
    this.#container.querySelector("#tutor-address-input").oninput = () => callback();
    this.#container.querySelector("#tutor-pob-input").oninput = () => callback();
    this.#container.querySelector("#tutor-mobile-input").oninput = () => callback();
    this.#container.querySelector("#next-of-kin-input").oninput = () => callback();
    this.#container.querySelector("#email-input").oninput = () => callback();
    this.#container.querySelector("#auth-yes").onchange = () => callback();
    this.#container.querySelector("#auth-no").onchange = () => callback();
  }
  #addPerson(name) {
    const personsContainer = this.#container.querySelector("#persons-container");
    const div = document.createElement("div");
    div.classList.add("person");
    const p = document.createElement("p");
    p.innerText = name;
    const btn = document.createElement("button");
    btn.classList.add("remove-button");
    btn.innerText = "X";
    btn.onclick = (e) => {
      personsContainer.removeChild(div);
    };
    div.appendChild(p);
    div.appendChild(btn);
    personsContainer.appendChild(div);
  }

  setData(data) {
    this.#container.querySelector("#tutor-address-input").value = data.address;
    this.#container.querySelector("#tutor-pob-input").value = data.pob;
  }
  getReviewData() {
    let authPersons = Array.from(this.#container.querySelectorAll(".person p")).map(
      (p) => p.innerText
    );
    if (authPersons.length === 0) authPersons = ["..."];
    return {
      name: this.#container.querySelector("#tutor-fullname-input").value || "...",
      nextOfKin: this.#container.querySelector("#next-of-kin-input").value || "...",
      address: this.#container.querySelector("#tutor-address-input").value || "...",
      pob: this.#container.querySelector("#tutor-pob-input").value || "...",
      mobile: this.#container.querySelector("#tutor-mobile-input").value || "...",
      homePhone: this.#container.querySelector("#home-phone-input").value || "...",
      workPhone: this.#container.querySelector("#work-phone-input").value || "...",
      email: this.#container.querySelector("#email-input").value || "...",
      auth: this.#container.querySelector("#auth-yes").checked
        ? "Autorizado"
        : "Não autorizado",
      authPersons: authPersons,
    };
  }
  getData() {
    return {
      name: this.#container.querySelector("#tutor-fullname-input").value,
      nextOfKin: this.#container.querySelector("#next-of-kin-input").value,
      address: this.#container.querySelector("#tutor-address-input").value,
      pob: this.#container.querySelector("#tutor-pob-input").value,
      mobile: this.#container.querySelector("#tutor-mobile-input").value,
      homePhone: this.#container.querySelector("#home-phone-input").value,
      workPhone: this.#container.querySelector("#work-phone-input").value,
      email: this.#container.querySelector("#email-input").value,
      auth: this.#container.querySelector("#auth-yes").checked ? true : false,
      authPersons: Array.from(this.#container.querySelectorAll(".person p")).map(
        (p) => p.innerText
      ),
    };
  }
  get isReady() {
    const isAuth =
      this.#container.querySelector("#auth-yes").checked ||
      this.#container.querySelector("#auth-no").checked;
    const ready =
      this.#container.querySelector("#tutor-fullname-input").value !== "" &&
      this.#container.querySelector("#tutor-address-input").value !== "" &&
      this.#container.querySelector("#next-of-kin-input").value !== "" &&
      this.#container.querySelector("#tutor-pob-input").value !== "" &&
      this.#container.querySelector("#tutor-mobile-input").value !== "" &&
      this.#container.querySelector("#email-input").value !== "" &&
      isAuth
        ? true
        : false;
    return ready;
  }
}
class Review {
  #container;
  constructor() {
    this.#container = document.querySelector("#review");
  }

  setData(data) {
    this.#container.querySelector("#review-service").innerText = data.service;
    this.#container.querySelector("#review-modality").innerText = data.modality;

    this.#container.querySelector("#review-timetable").innerHTML = "";
    data.timetable.forEach((time) => {
      this.#container.querySelector("#review-timetable").innerHTML += `<li>${time}</li>`;
    });
    this.#container.querySelector("#review-student-fullname").innerText =
      data.student.name;
    this.#container.querySelector("#review-student-address").innerText =
      data.student.address;
    this.#container.querySelector("#review-student-pob").innerText = data.student.pob;
    this.#container.querySelector("#review-student-mobile").innerText =
      data.student.mobile;
    this.#container.querySelector("#review-student-dob").innerText = data.student.dob;
    this.#container.querySelector("#review-student-cc").innerText = data.student.cc;
    this.#container.querySelector("#review-student-nif").innerText = data.student.nif;
    this.#container.querySelector("#review-student-sns").innerText = data.student.sns;
    this.#container.querySelector("#review-student-school").innerText =
      data.student.school;
    this.#container.querySelector("#review-student-notes").innerText = data.student.notes;
    this.#container.querySelector("#review-tutor-fullname").innerText = data.tutor.name;
    this.#container.querySelector("#review-tutor-next-of-kin").innerText =
      data.tutor.nextOfKin;
    this.#container.querySelector("#review-tutor-address").innerText = data.tutor.address;
    this.#container.querySelector("#review-tutor-pob").innerText = data.tutor.pob;
    this.#container.querySelector("#review-tutor-mobile").innerText = data.tutor.mobile;
    this.#container.querySelector("#review-tutor-home-phone").innerText =
      data.tutor.homePhone;
    this.#container.querySelector("#review-tutor-work-phone").innerText =
      data.tutor.workPhone;
    this.#container.querySelector("#review-tutor-email").innerText = data.tutor.email;
    this.#container.querySelector("#review-auth-leave").innerText = data.tutor.auth;
    const authPersons = this.#container.querySelector("#review-auth-persons");
    authPersons.innerHTML = "";
    data.tutor.authPersons.forEach((person) => {
      authPersons.innerHTML += `<li>${person}</li>`;
    });
  }
}

class Loader {
  #container;
  #isOpened = false;
  constructor() {
    this.#container = document.querySelector("#loader");
  }
  show() {
    if (this.#isOpened) return;
    this.#container.toggleAttribute("show");
    this.#isOpened = true;
  }
  hide() {
    if (!this.#isOpened) return;
    this.#container.toggleAttribute("show");
    this.#isOpened = false;
  }
}
class Footer {
  #content;
  constructor() {
    this.#content = Array.from(document.querySelector("#footer-content").children);
  }

  update(currentStep) {
    this.#content.forEach((element) => {
      element.style.display = "none";
    });
    switch (currentStep) {
      case 1:
        this.#content[0].style.display = "block";
        break;
      case 2:
        this.#content[1].style.display = "block";
        break;
      case 3:
      case 4:
        this.#content[2].style.display = "block";
        break;

      default:
        break;
    }
  }
}
