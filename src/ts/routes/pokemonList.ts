import { fetchPokemon } from "../services/fetch";
import { Routes } from "./routes";
import { getCookie } from "typescript-cookie";
import { hostname } from "../../main";
import { PaginationPokemon } from "./pokemonPagination";

export class ListPokemon {
  private fetchPokemon: any;
  private currentPage: number;
  private navigation: string;

  constructor() {
    this.currentPage = Routes.getNumPage();
    this.navigation = "";
  }

  public async getListPokemon(): Promise<string> {
    return await this.init();
  }

  private async init(): Promise<string> {
    const limit: number = Number(getCookie("limit"));
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * limit + 1;

    this.fetchPokemon = await fetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );

    const pagination = new PaginationPokemon(this.fetchPokemon.count);
    const pokemon: any = this.fetchPokemon.results;
    this.navigation = await pagination.getPaginationPokemon();

    let html: string = "";
    html += `<form method='POST' action='${hostname}/search' class='pokemon__search'><input type='text' placeholder='Search...' name='pokemon' required><button type='submit'><i class='fa fa-search'></i></button></form>`;
    html += `<div class='title'><h2>Pokemon list</h2></div>`;
    html += this.navigation;
    html += "<div class='pokemon__list'>";

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

      html += `
          <a href='${hostname}/pokemon/${infoPokemon.id.toString()}'>
            <div>
                <h3>${name}</h3>
                <img src=${urlImg}>
                <span>${idPokemon}</span>
            </div>
          </a>
        `;
    }
    html += "</div>";

    html += this.navigation;
    return html;
  }
}
