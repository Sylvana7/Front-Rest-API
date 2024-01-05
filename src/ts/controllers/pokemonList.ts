import { fetchPokemon, JSONObject } from "../services/fetch";
import { Routes } from "../routes/routes";
import { getCookie } from "typescript-cookie";
import { hostname } from "../../main";
import { PaginationPokemon } from "./pokemonPagination";
import { Form } from "../services/form";
import { displayPokemon } from "../services/pokemonsDisplay";

export class ListPokemon {
  private fetchPokemon: JSONObject = { count: 0, results: [] };
  private currentPage: number;
  private navigation: string;

  constructor() {
    this.currentPage = Routes.getNumPage();
    this.navigation = "";
  }

  public async getListPokemon(): Promise<InnerHTML> {
    return await this.init();
  }

  private async init(): Promise<InnerHTML> {
    const limit: number = Number(getCookie("limit"));
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * limit;

    this.fetchPokemon = await fetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );

    const pagination = new PaginationPokemon(this.fetchPokemon.count);
    const pokemon: any = this.fetchPokemon.results;
    this.navigation = await pagination.getPaginationPokemon();
    const htmlDisplay: HTMLDivElement = document.createElement("div");
    htmlDisplay.appendChild(
      new Form("GET").getSearch(
        "text",
        "Search...",
        "pokemon",
        "<i class='fa fa-search'></i>"
      )
    );

    htmlDisplay.innerHTML += `<div class='title'><h2>Pokemon list</h2></div>`;
    htmlDisplay.innerHTML += this.navigation;
    const listDisplay = document.createElement(`div`);
    listDisplay.classList.add("pokemon__list");

    for (let array of pokemon) {
      const name = array.name;
      const url = array.url;
      const infoPokemon: any = await fetchPokemon(url);

      const urlSVG: string =
        infoPokemon.sprites.other.dream_world.front_default;
      const urlImg: string =
        urlSVG != undefined ? urlSVG : `${hostname}/src/img/no_photo.png`;
      const idPokemon: string =
        "#" + infoPokemon.id.toString().padStart(5, "0");

      listDisplay.innerHTML += displayPokemon(
        infoPokemon.id.toString(),
        name,
        urlImg,
        idPokemon
      ).innerHTML;
    }

    htmlDisplay.appendChild(listDisplay);
    htmlDisplay.innerHTML += this.navigation;

    return htmlDisplay;
  }
}
