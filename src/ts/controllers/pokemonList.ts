import { FetchPokemon, JSONObject } from "../services/fetch";
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
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    this.fetchPokemon = await new FetchPokemon(url).list();

    const pagination = new PaginationPokemon(this.fetchPokemon.count);
    const pokemon: any = this.fetchPokemon.results;

    // Create Pagination for Pokemon List
    const navigation: HTMLDivElement = await pagination.getPaginationPokemon();

    const htmlDisplay: HTMLDivElement = new DocumentCreate().div();

    htmlDisplay.appendChild(new DocumentCreate().titleDisplay("Pokemon list"));
    htmlDisplay.appendChild(navigation);

    const listDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__list",
    }).div();

    let i: number = 0;
    for (let array of pokemon) {
      i++;
      const name = array.name;
      listDisplay.appendChild(displayPokemon(i.toString(), name));
    }

    htmlDisplay.appendChild(listDisplay);
    const navigation2: HTMLDivElement = await pagination.getPaginationPokemon();
    htmlDisplay.appendChild(navigation2);

    return htmlDisplay;
  }

  public async loading(): Promise<void> {
    const limit: number = Number(getCookie("limit"));
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * limit;
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    this.fetchPokemon = await new FetchPokemon(url).list();
    const pokemon: any = this.fetchPokemon.results;

    let i: number = 0;
    for (let array of pokemon) {
      i++;
      const url = array.url;
      const infoPokemon: any = await new FetchPokemon(url).list();
      const idPoke: string = infoPokemon.id.toString();
      const app_a: HTMLLinkElement | null = document.querySelector(`#__${i}`);
      if (app_a) {
        app_a.href = `${hostname}/pokemon/${idPoke}`;
      }
      const app_color: HTMLSpanElement | null = document.querySelector(
        `#__${i} div div characteristic`
      );

      if (app_color) {
        const color: string = infoPokemon.fetchSpecies.color.name;
        app_color.innerHTML = color;
      }

      const app_img: HTMLImageElement | null = document.querySelector(
        `#__${i} div div img`
      );

      if (app_img) {
        const urlSVG: string =
          infoPokemon.sprites.other.dream_world.front_default;
        const urlImg: string =
          urlSVG != undefined ? urlSVG : `${hostname}/src/img/no_photo.png`;
        app_img.src = urlImg;
      }

      const app_span: HTMLSpanElement | null = document.querySelector(
        `#__${i} div span`
      );

      if (app_span) {
        const idPokemon: string = "#" + idPoke.padStart(5, "0");
        app_span.innerHTML = idPokemon;
      }
    }
  }
}
