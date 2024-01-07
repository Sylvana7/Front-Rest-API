import { fetchPokemon, JSONObject } from "../services/fetch";
import { Routes } from "../routes/routes";
import { getCookie } from "typescript-cookie";
import { hostname } from "../../main";
import { PaginationPokemon } from "./pokemonPagination";
// import { Form } from "../services/form";
import { displayPokemon } from "../services/pokemonsDisplay";
import { DocumentCreate } from "../services/createElements";

export class ListPokemon {
  private fetchPokemon: JSONObject = { count: 0, results: [] };
  private currentPage: number;
  // private navigation: HTMLDivElement;

  constructor() {
    this.currentPage = Routes.getNumPage();
    // this.navigation = ";
  }

  public async getListPokemon(): Promise<InnerHTML> {
    const limit: number = Number(getCookie("limit"));
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * limit;

    this.fetchPokemon = await fetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );

    const pagination = new PaginationPokemon(this.fetchPokemon.count);
    const pokemon: any = this.fetchPokemon.results;

    // Create Pagination for Pokemon List
    const navigation: HTMLDivElement = await pagination.getPaginationPokemon();

    const htmlDisplay: HTMLDivElement = new DocumentCreate().div();

    // Create Title
    const titleDisplay: HTMLDivElement = new DocumentCreate({
      className: "title",
    }).div();

    for (let i = 0; i < 2; i++) {
      const h1Div: HTMLDivElement = new DocumentCreate().div();
      h1Div.appendChild(
        new DocumentCreate().title({ h: "h1", text: "Pokemon list" })
      );
      titleDisplay.appendChild(h1Div);
    }
    htmlDisplay.appendChild(titleDisplay);
    htmlDisplay.appendChild(navigation);

    const listDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__list",
    }).div();

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

      listDisplay.appendChild(
        displayPokemon(infoPokemon.id.toString(), name, urlImg, idPokemon)
      );
    }

    htmlDisplay.appendChild(listDisplay);
    const navigation2: HTMLDivElement = await pagination.getPaginationPokemon();
    htmlDisplay.appendChild(navigation2);

    return htmlDisplay;
  }
}
