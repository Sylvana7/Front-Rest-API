import { DocumentCreate } from "../services/createElements";
import { FetchPokemon, JSONpokemon } from "../services/fetch";

export class PokemonPage {
  private urlApi: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(public readonly number: number) {}
  public async page(): Promise<HTMLDivElement> {
    let fetchPokemon: JSONpokemon = { forms: [] };
    const htmlDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__identity",
    }).div();
    fetchPokemon = await new FetchPokemon(this.urlApi + this.number).info();
    console.log(fetchPokemon);

    if (fetchPokemon.forms.length != 0) {
      const titleDisplay: HTMLDivElement = new DocumentCreate({
        className: "title",
      }).div();

      for (let i = 0; i < 2; i++) {
        const h1Div: HTMLDivElement = new DocumentCreate().div();
        h1Div.appendChild(
          new DocumentCreate().title({
            h: "h1",
            text: fetchPokemon.forms[0].name,
          })
        );
        titleDisplay.appendChild(h1Div);
      }
      htmlDisplay.appendChild(titleDisplay);
      const attacksDisplay: HTMLDivElement = new DocumentCreate({
        className: "characteristic",
      }).div();
      attacksDisplay.appendChild(
        new DocumentCreate().title({
          h: "h2",
          text: "Attacks",
        })
      );
      for (let line of fetchPokemon.abilities || []) {
        console.log(line.ability.name);
        console.log(line.ability.url);
        attacksDisplay.appendChild(
          new DocumentCreate().span({ text: line.ability.name })
        );
      }
      htmlDisplay.appendChild(attacksDisplay);
      htmlDisplay.appendChild(
        new DocumentCreate().span({
          text: fetchPokemon.sprites?.other.showdown.back_default,
        })
      );
      htmlDisplay.appendChild(
        new DocumentCreate().span({
          text: fetchPokemon.sprites?.other.showdown.front_default,
        })
      );
    } else {
      htmlDisplay.classList.add("not_found");
      htmlDisplay.innerHTML = "Not found";
    }
    return htmlDisplay;
  }
}
