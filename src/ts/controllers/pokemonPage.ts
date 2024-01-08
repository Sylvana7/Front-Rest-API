import { DocumentCreate } from "../services/createElements";
import { FetchPokemon, JSONpokemon } from "../services/fetch";

export class PokemonPage {
  private urlApi: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(public readonly number: number) {}
  public async page(): Promise<HTMLDivElement> {
    let fetchPokemon: JSONpokemon = { forms: [] };
    const htmlDisplay: HTMLDivElement = new DocumentCreate().div();
    fetchPokemon = await new FetchPokemon(this.urlApi + this.number).info();
    console.log(fetchPokemon);

    if (fetchPokemon.forms.length != 0) {
      htmlDisplay.innerHTML = fetchPokemon.forms[0].name;
    } else {
      htmlDisplay.classList.add("not_found");
      htmlDisplay.innerHTML = "Not found";
    }
    return htmlDisplay;
  }
}
