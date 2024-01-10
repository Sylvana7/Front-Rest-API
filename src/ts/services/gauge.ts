import { DocumentCreate } from "./createElements";

export class PokemonStat {
  constructor(
    public name: string,
    public value: number,
    public percentage: number
  ) {}
}

class PokemonStatsGenerator {
  private stats: PokemonStat[];

  constructor(stats: PokemonStat[]) {
    this.stats = stats;
  }

  generateHTML(): string {
    const ulElement: HTMLUListElement = new DocumentCreate({
      className: "stats-info",
    }).ul();

    this.stats.forEach((stat, index) => {
      const first: string = index === 0 ? "first" : "";
      const liElement = new DocumentCreate({
        className: first,
      }).ul();

      const gaugeElement = new DocumentCreate({ className: "gauge" }).ul();
      const meterElement = new DocumentCreate({ className: "meter" }).li();

      meterElement.classList.add("meter");
      meterElement.setAttribute("data-value", stat.value.toString());
      meterElement.style.top = `${stat.percentage}%`;

      for (let i = 0; i < 16; i++) {
        gaugeElement.appendChild(document.createElement("li"));
      }

      gaugeElement.appendChild(meterElement);

      const spanElement = document.createElement("span");
      spanElement.textContent = stat.name;

      liElement.appendChild(gaugeElement);
      liElement.appendChild(spanElement);
      ulElement.appendChild(liElement);
    });

    return ulElement.outerHTML;
  }
}

// Exemple d'utilisation
const statsData: PokemonStat[] = [
  { name: "PV", value: 3, percentage: 80 },
  { name: "Attaque", value: 3, percentage: 80 },
  { name: "Défense", value: 4, percentage: 73.3333 },
  { name: "Attaque Spéciale", value: 3, percentage: 80 },
  { name: "Défense Spéciale", value: 4, percentage: 73.3333 },
  { name: "Vitesse", value: 3, percentage: 80 },
];

const generator = new PokemonStatsGenerator(statsData);
const generatedHTML = generator.generateHTML();
console.log(generatedHTML);
