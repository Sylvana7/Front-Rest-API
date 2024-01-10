// Importing necessary modules and services
import { FetchPokemon, JSONObject } from "../services/fetch";
import { Routes } from "../routes/routes";
import { getCookie } from "typescript-cookie";
import { hostname } from "../../main";
import { PaginationPokemon } from "./pokemonPagination";
import { displayPokemon } from "../services/pokemonsDisplay";
import { DocumentCreate } from "../services/createElements";

// Definition of the ListPokemon class
export class ListPokemon {
  // Private member variables for storing fetched Pokemon data and current page number
  private fetchPokemon: JSONObject = { count: 0, results: [] };
  private currentPage: number;

  // Constructor for initializing the class instance
  constructor() {
    // Get the current page number from the Routes class
    this.currentPage = Routes.getNumPage();
  }

  // Asynchronous method to fetch and display the list of Pokemon
  public async getListPokemon(): Promise<InnerHTML> {
    // Retrieve the limit value from the cookie
    const limit: number = Number(getCookie("limit"));

    // Calculate the offset based on the current page and limit
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * limit;

    // Construct the URL for fetching Pokemon data
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    // Fetch Pokemon data using the FetchPokemon class
    this.fetchPokemon = await new FetchPokemon(url).list();

    // Create a PaginationPokemon instance to handle pagination
    const pagination = new PaginationPokemon(this.fetchPokemon.count);
    const pokemon: any = this.fetchPokemon.results;

    // Create HTML elements for displaying the Pokemon list and pagination
    const navigation: HTMLDivElement = await pagination.getPaginationPokemon();
    const htmlDisplay: HTMLDivElement = new DocumentCreate().div();

    // Append title and pagination to the main HTML display
    htmlDisplay.appendChild(new DocumentCreate().titleDisplay("Pokemon list"));
    htmlDisplay.appendChild(navigation);

    // Create a container for the Pokemon list
    const listDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__list",
    }).div();

    // Iterate over the fetched Pokemon and display them
    let i: number = 0;
    for (let array of pokemon) {
      i++;
      const name = array.name;
      listDisplay.appendChild(displayPokemon(i.toString(), name));
    }

    // Append the Pokemon list to the main HTML display
    htmlDisplay.appendChild(listDisplay);

    // Append pagination again for the bottom part of the list
    const navigation2: HTMLDivElement = await pagination.getPaginationPokemon();
    htmlDisplay.appendChild(navigation2);

    // Return the complete HTML display
    return htmlDisplay;
  }

  // Asynchronous method for loading additional information for each Pokemon
  public async loading(): Promise<void> {
    // Retrieve the limit value from the cookie
    const limit: number = Number(getCookie("limit"));

    // Calculate the offset based on the current page and limit
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * limit;

    // Construct the URL for fetching Pokemon data
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    // Fetch Pokemon data using the FetchPokemon class
    this.fetchPokemon = await new FetchPokemon(url).list();
    const pokemon: any = this.fetchPokemon.results;

    // Iterate over the fetched Pokemon to load additional information
    let i: number = 0;
    for (let array of pokemon) {
      i++;
      const url = array.url;
      const infoPokemon: any = await new FetchPokemon(url).list();
      const idPoke: string = infoPokemon.id.toString();

      // Update the href attribute of the anchor element for Pokemon details
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

      // Update the source attribute of the image element for Pokemon sprite
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

      // Update the inner HTML of the span element for Pokemon ID
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
