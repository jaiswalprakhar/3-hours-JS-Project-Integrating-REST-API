import { handleFormSubmit } from "./bus.js";

const form = document.querySelector("form");
form.addEventListener('submit', handleFormSubmit);