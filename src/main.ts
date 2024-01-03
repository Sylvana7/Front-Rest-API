import { getPokemonJson, getPokemon } from "./pokemon_list.ts";
import "./scss/style.scss";
import { htmlHome } from "./html/pokemonList.ts";

const params: string[] = window.location.pathname.split("/");
console.log(params);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = htmlHome(
  getPokemon(getPokemonJson("https://pokeapi.co/api/v2/pokemon"))
);
