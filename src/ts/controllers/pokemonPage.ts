import { types } from "util";
import { DocumentCreate } from "../services/createElements";
import { FetchPokemon, JSONpokemon } from "../services/fetch";
import { type } from "os";
import { constants } from "buffer";

export class PokemonPage {
  private urlApi: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(public readonly number: number) {}
  public async page(): Promise<HTMLDivElement> {
    let fetchPokemon: JSONpokemon = {};

    const title = (title: string): HTMLElement => {
      return new DocumentCreate().title({
        h: "h3",
        texte: title,
      });
    };
    const createDiv = (className: string): HTMLDivElement => {
      return new DocumentCreate({
        className: className,
      }).div();
    };

    const htmlDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__identity",
    }).div();
    fetchPokemon = await new FetchPokemon(this.urlApi + this.number).info();
    if (fetchPokemon.forms) {
      const titleDisplay: HTMLDivElement = new DocumentCreate({
        className: "title",
      }).titleDisplay(fetchPokemon.forms[0].name);
      htmlDisplay.appendChild(titleDisplay);

      const attacksDisplay: HTMLDivElement = createDiv("characteristic");
      attacksDisplay.appendChild(title("Attacks"));
      for (let line of fetchPokemon.abilities || []) {
        attacksDisplay.appendChild(
          new DocumentCreate().span({ texte: line.ability.name })
        );
      }
      htmlDisplay.appendChild(attacksDisplay);

      const familyColorDisplay: HTMLDivElement = createDiv("characteristic");
      familyColorDisplay.appendChild(title("Color"));
      htmlDisplay.appendChild(familyColorDisplay);

      const abilitiesDisplay: HTMLDivElement = createDiv("characteristic");
      abilitiesDisplay.appendChild(title("Abilities"));
      htmlDisplay.appendChild(abilitiesDisplay);

      const typeDisplay: HTMLDivElement = createDiv("characteristic");
      typeDisplay.appendChild(title("Type"));

      for (let line of fetchPokemon.types || []) {
        const slot: number = line.slot;
        const name: string = line.type.name;
        const url: string = line.type.url;

        const pokeType: HTMLSpanElement = new DocumentCreate({
          className: `types ${name}`,
        }).span({ texte: name });
        typeDisplay.appendChild(pokeType);
      }

      htmlDisplay.appendChild(typeDisplay);

      const weaknessDisplay: HTMLDivElement = createDiv("characteristic");
      weaknessDisplay.appendChild(title("Weakness"));
      htmlDisplay.appendChild(weaknessDisplay);

      const characteristicDisplay: HTMLDivElement = createDiv("characteristic");
      characteristicDisplay.appendChild(title("Characteristic"));
      htmlDisplay.appendChild(characteristicDisplay);

      const flavorTextEntriesDisplay: HTMLDivElement =
        createDiv("characteristic");
      flavorTextEntriesDisplay.appendChild(title("Flavor text entries"));
      htmlDisplay.appendChild(flavorTextEntriesDisplay);

      const img: HTMLDivElement = createDiv("img characteristic");
      img.appendChild(
        new DocumentCreate().img({
          src: fetchPokemon.sprites?.other.showdown.back_default,
        })
      );
      img.appendChild(
        new DocumentCreate().img({
          src: fetchPokemon.sprites?.other.showdown.front_default,
        })
      );
      htmlDisplay.appendChild(img);
    } else {
      htmlDisplay.classList.add("not_found");
      htmlDisplay.innerHTML = "Not found";
    }
    return htmlDisplay;
  }
}
