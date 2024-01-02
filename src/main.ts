import "./scss/style.scss";
import { htmlVite } from "./html/vite";
import { setupCounter } from "./counter";

// console.log(fileContent);
document.querySelector<HTMLDivElement>("#app")!.innerHTML = htmlVite;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
