import { getPokemonJson, getPokemon } from "./pokemon_list";
import "./scss/style.scss";
import { htmlHome } from "./html/pokemonList.ts";

const params: string[] = window.location.pathname.split("/");
console.log(params);

const pokemonJson: any = await getPokemonJson(
  "https://pokeapi.co/api/v2/pokemon"
);

const htmlPokemon: any = await getPokemon(pokemonJson);
document.querySelector<HTMLDivElement>("#app")!.innerHTML = htmlHome(
    htmlPokemon
);
