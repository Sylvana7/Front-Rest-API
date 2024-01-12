//  import { stat } from "fs";
import { hostname } from "../../main";
import { DocumentCreate } from "../services/createElements";
import { FetchPokemon, JSONpokemon, JSONspecies } from "../services/fetch";
import { PokemonStat, PokemonStatsGenerator } from "../services/gauge";

export class PokemonPage {
  private urlApi: string = "https://pokeapi.co/api/v2/pokemon/";
  private urlApiSpecies: string = "https://pokeapi.co/api/v2/pokemon-species/";
  private color: string = "";
  private title = (texte: string, className: string): HTMLElement => {
    return new DocumentCreate({ className }).title({
      h: "h3",
      texte,
    });
  };
  private createDiv = (className: string): HTMLDivElement => {
    return new DocumentCreate({
      className,
    }).div();
  };

  constructor(public readonly number: string) {}

  public async page(): Promise<HTMLDivElement> {
    let fetchPokemon: JSONpokemon = {};
    let fetchSpecies: JSONspecies = {};

    fetchPokemon = await new FetchPokemon(this.urlApi + this.number).info();
    fetchSpecies = await new FetchPokemon(
      this.urlApiSpecies + this.number
    ).infoSpecies();
    this.color = fetchSpecies.color ? fetchSpecies.color.name : "no-color";

    const htmlDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__identity",
    }).div();
    const contentDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__identity--display",
    }).div();
    const contentDisplayL: HTMLDivElement = new DocumentCreate({
      className: "pokemon__identity--display--left",
    }).div();
    const contentDisplayR: HTMLDivElement = new DocumentCreate({
      className: "pokemon__identity--display--right",
    }).div();
    const contentDisplayI: HTMLDivElement = new DocumentCreate({
      className: `pokemon__identity--img`,
      idName: "identity",
    }).div();

    if (fetchPokemon.forms) {
      const titleDisplay: HTMLDivElement = new DocumentCreate({
        className: "title",
      }).titleDisplay(fetchPokemon.forms[0].name);
      htmlDisplay.appendChild(titleDisplay);

      const attacksDisplay: HTMLDivElement = this.createPage({
        className: "attack",
        title: "Attacks",
      });
      contentDisplayR.appendChild(attacksDisplay);

      let span: span[] = [];
      for (let line of fetchPokemon.abilities || []) {
        span.push({ texte: line.ability.name });
      }
      const abilitiesDisplay: HTMLDivElement = this.createPage({
        className: "ability",
        title: "Abilities",
        span,
      });
      contentDisplayR.appendChild(abilitiesDisplay);

      span = [];
      for (let line of fetchPokemon.types || []) {
        const name: string = line.type.name;
        span.push({ className: `types ${name}`, texte: line.type.name });
      }
      const typeDisplay: HTMLDivElement = this.createPage({
        className: "type",
        title: "Types",
        span,
      });
      contentDisplayR.appendChild(typeDisplay);

      const statsDisplay: HTMLDivElement = this.createDiv(
        "characteristic stat"
      );
      statsDisplay.appendChild(this.title("Stats", this.color));

      const statsData: PokemonStat[] = [];

      for (let line of fetchPokemon.stats || []) {
        const name: string = line.stat.name;
        const baseStat: number = line.base_stat;
        const effort: number = line.effort;
        statsData.push({
          name: name,
          value: effort,
          percentage: baseStat,
          stat: undefined,
          effort: undefined,
          base_stat: undefined,
        });
      }
      const generator = new PokemonStatsGenerator(statsData);
      const generatedHTML = generator.generateHTML();
      const divGenerator: HTMLDivElement = new DocumentCreate().div();
      divGenerator.appendChild(generatedHTML);
      statsDisplay.appendChild(divGenerator);
      contentDisplayL.appendChild(statsDisplay);

      span = [];
      const weight: string = fetchPokemon.weight
        ? fetchPokemon.weight / 10 + "kg"
        : "";
      const height: string = fetchPokemon.height
        ? fetchPokemon.height * 10 + "cm"
        : "";
      span.push({ texte: this.color });
      span.push({ texte: weight });
      span.push({ texte: height });

      const characteristicDisplay: HTMLDivElement = this.createPage({
        className: "char",
        title: "Characteristic",
        span,
      });
      contentDisplayR.appendChild(characteristicDisplay);

      const flavorTextEntriesDisplay: HTMLDivElement = this.createPage({
        className: "flavor",
        title: "Flavor",
      });
      contentDisplayL.appendChild(flavorTextEntriesDisplay);
      const arraySrc: string[] = [];
      arraySrc.push(
        fetchPokemon.sprites
          ? fetchPokemon.sprites.other.showdown.back_default
          : `${hostname}/src/img/no_photo.png`
      );
      arraySrc.push(
        fetchPokemon.sprites
          ? fetchPokemon.sprites?.other.showdown.front_default
          : `${hostname}/src/img/no_photo.png`
      );

      for (let line of arraySrc) {
        const div: HTMLDivElement = new DocumentCreate({
          className: "default",
        }).div();
        div.appendChild(
          new DocumentCreate().img({
            src: line,
          })
        );
        contentDisplayI.appendChild(div);
      }

      contentDisplay.appendChild(contentDisplayL);
      contentDisplay.appendChild(contentDisplayR);
      htmlDisplay.appendChild(contentDisplayI);
      htmlDisplay.appendChild(contentDisplay);
    } else {
      htmlDisplay.classList.add("not_found");
      htmlDisplay.innerHTML = "Not found";
    }
    return htmlDisplay;
  }

  private createPage(options: pokePage): HTMLDivElement {
    const char: HTMLDivElement = this.createDiv("characteristic");
    if (options.className) char.classList.add(options.className);
    char.appendChild(this.title(options.title, this.color));
    const div: HTMLDivElement = this.createDiv("");
    for (let line of options.span || []) {
      line.className = this.color + " " + line.className;
      const className: string = line.className ? line.className : "";
      const texte: string = line.texte;
      const pokeCharH: HTMLSpanElement = new DocumentCreate({ className }).span(
        {
          texte,
        }
      );
      div.appendChild(pokeCharH);
    }
    char.appendChild(div);
    return char;
  }
}

interface pokePage {
  className?: string;
  title: string;
  span?: span[];
}
interface span {
  className?: string;
  texte: string;
}
