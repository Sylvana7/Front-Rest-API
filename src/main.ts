
import { setupCounter } from './counter.ts'
import { getPokemon } from "./pokemon_list.ts"
import "./scss/style.scss";
import { htmlVite } from "./html/vite";


// console.log(fileContent);
document.querySelector<HTMLDivElement>("#app")!.innerHTML = htmlVite;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

console.log("container");
getPokemon("https://pokeapi.co/api/v2/pokemon");

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

