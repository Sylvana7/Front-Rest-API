import { getCookie, setCookie } from "typescript-cookie";
import { getPokemonJson, getPokemon } from "./pokemon_list";
import { htmlHome } from "./html/pokemonList";
import { displayIcon } from "./icon";
import "./scss/style.scss";

export const secureCookie: boolean = false;
export const hostname: string = window.location.hostname;
let numPage: number = 0;
const limit: number = Number(getCookie("limit"));

const params: string[] = window.location.pathname.split("/");
let offset: number = 0;
console.log(params);

let pokemonJson: any = await getPokemonJson(
  `https://pokeapi.co/api/v2/pokemon/`
);
let htmlDisplay: any = await getPokemon(pokemonJson, 1, limit);

if (!getCookie("limit")) {
  setCookie("limit", 20, { expires: 365, secure: secureCookie });
}
if (!getCookie("display")) {
  setCookie("display", "block", { expires: 365, secure: secureCookie });
}

if (params[1] === "page") {
  numPage = Number(params[2]);
  numPage = numPage == 0 ? 1 : numPage;
  const page = numPage <= 1 ? 0 : numPage - 1;
  offset = page * limit;

  pokemonJson = await getPokemonJson(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );

  htmlDisplay = await getPokemon(pokemonJson, numPage, limit);
} else if (params[1] === "icon") {
  htmlDisplay = displayIcon();
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML =
  htmlHome(htmlDisplay);
