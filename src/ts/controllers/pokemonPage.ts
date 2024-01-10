//  import { stat } from "fs";
import { DocumentCreate } from "../services/createElements";
import { FetchPokemon, JSONpokemon, JSONspecies } from "../services/fetch";

export class PokemonPage {
  private urlApi: string = "https://pokeapi.co/api/v2/pokemon/";
  private urlApiSpecies: string = "https://pokeapi.co/api/v2/pokemon-species/";

  constructor(public readonly number: number) {}

  public async page(): Promise<HTMLDivElement> {
    let fetchPokemon: JSONpokemon = {};
    let fetchSpecies: JSONspecies = {};

    fetchPokemon = await new FetchPokemon(this.urlApi + this.number).info();
    fetchSpecies = await new FetchPokemon(
      this.urlApiSpecies + this.number
    ).infoSpecies();
    const color: string = fetchSpecies.color
      ? fetchSpecies.color.name
      : "no-color";

    // const stats: string = fetchStats.stats ? fetchStats.stats.url : "";

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

    if (fetchPokemon.forms) {
      const titleDisplay: HTMLDivElement = new DocumentCreate({
        className: "title",
      }).titleDisplay(fetchPokemon.forms[0].name);
      htmlDisplay.appendChild(titleDisplay);

      const attacksDisplay: HTMLDivElement = createDiv("characteristic");
      attacksDisplay.appendChild(title("Attacks"));

      htmlDisplay.appendChild(attacksDisplay);

      // const familyColorDisplay: HTMLDivElement = createDiv("characteristic");
      // familyColorDisplay.appendChild(title("Color"));
      // htmlDisplay.appendChild(familyColorDisplay);

      const abilitiesDisplay: HTMLDivElement = createDiv("characteristic");
      abilitiesDisplay.appendChild(title("Abilities"));
      for (let line of fetchPokemon.abilities || []) {
        abilitiesDisplay.appendChild(
          new DocumentCreate().span({ texte: line.ability.name })
        );
      }
      htmlDisplay.appendChild(abilitiesDisplay);

      const typeDisplay: HTMLDivElement = createDiv("characteristic");
      typeDisplay.appendChild(title("Type"));

      for (let line of fetchPokemon.types || []) {
        // const slot: number = line.slot;
        const name: string = line.type.name;
        // const url: string = line.type.url;

        const pokeType: HTMLSpanElement = new DocumentCreate({
          className: `types ${name}`,
        }).span({ texte: name });
        typeDisplay.appendChild(pokeType);
      }

      htmlDisplay.appendChild(typeDisplay);

      const statsDisplay: HTMLDivElement = createDiv("characteristic");
      statsDisplay.appendChild(title("Stats"));

      for (let line of fetchPokemon.stats || []) {
        const name: string = line.stat.name;
        const baseStat: number = line.base_stat;
        const effort: number = line.effort;

        const pokeStats: HTMLSpanElement = new DocumentCreate().span({
          texte: `name: ${name}`,
        });
        console.log(pokeStats);

        const pokeStatsBaseStat: HTMLSpanElement = new DocumentCreate().span({
          texte: `baseStat: ${baseStat}`,
        });

        console.log(pokeStatsBaseStat);

        const pokeStatsEffort: HTMLSpanElement = new DocumentCreate().span({
          texte: `effort: ${effort}`,
        });
        console.log(pokeStatsEffort);

        statsDisplay.appendChild(pokeStats);
        statsDisplay.appendChild(pokeStatsBaseStat);
        statsDisplay.appendChild(pokeStatsEffort);
      }
      htmlDisplay.appendChild(statsDisplay);

      const characteristicDisplay: HTMLDivElement = createDiv("characteristic");
      characteristicDisplay.appendChild(title("Characteristic"));
      const weight: string = fetchPokemon.weight
        ? fetchPokemon.weight / 10 + "kg"
        : "";
      const height: string = fetchPokemon.height
        ? fetchPokemon.height * 10 + "cm"
        : "";
      const colorChar: HTMLSpanElement = new DocumentCreate({
        className: `characteristic ${color}`,
      }).span({ texte: color });

      const pokeCharW: HTMLSpanElement = new DocumentCreate({
        className: `characteristic ${weight}`,
      }).span({ texte: weight });

      const pokeCharH: HTMLSpanElement = new DocumentCreate({
        className: `characteristic ${height}`,
      }).span({ texte: height });

      characteristicDisplay.appendChild(colorChar);
      characteristicDisplay.appendChild(pokeCharW);
      characteristicDisplay.appendChild(pokeCharH);

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
