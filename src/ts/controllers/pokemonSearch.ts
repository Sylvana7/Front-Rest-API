import { FetchPokemon, JSONObject } from "../services/fetch";
import { hostname } from "../../main";
import { displayPokemon } from "../services/pokemonsDisplay";

export class SearchPokemon {
  private fetchPokemon: JSONObject = { count: 0, results: [] };
  private search: JSONObject = { count: 0, results: [] };

  constructor(public readonly post: string) {}

  private async number(): Promise<number> {
    this.fetchPokemon = await new FetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1`
    ).list();
    return Number(this.fetchPokemon.count);
  }

  public async getSearchPokemon(): Promise<InnerHTML> {
    this.fetchPokemon = await new FetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=1&limit=${await this.number()}`
    ).list();
    let regexPost: string = this.post;
    regexPost = regexPost.startsWith("*")
      ? regexPost.replace(/[^*]/, "")
      : "^" + regexPost;
    regexPost = regexPost.endsWith("*")
      ? regexPost.replace(/[*$]/, "")
      : regexPost + "$";

    const regex = new RegExp(regexPost);
    console.log(regex);

    let i = 0;
    for (const line of this.fetchPokemon.results) {
      if (line.name.match(regex)) {
        i++;
        this.search.results.push(line);
      }
    }
    this.search.count = i;

    const htmlDisplay = document.createElement(`div`);
    htmlDisplay.classList.add("pokemon__list");

    for (let array of this.search.results) {
      const name: string = array.name.toString();
      const url: string = array.url.toString();
      const infoPokemon: any = await new FetchPokemon(url).list();

      const urlSVG: string =
        infoPokemon.sprites.other.dream_world.front_default;
      const urlImg: string =
        urlSVG != undefined ? urlSVG : `${hostname}/src/img/no_photo.png`;
      const idPokemon: string =
        "#" + infoPokemon.id.toString().padStart(5, "0");
      htmlDisplay.innerHTML += displayPokemon(
        infoPokemon.id.toString(),
        name,
        urlImg,
        idPokemon
      ).innerHTML;
    }
    console.log(htmlDisplay);
    return htmlDisplay;
  }
}
