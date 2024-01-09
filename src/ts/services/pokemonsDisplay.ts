import { strUcFirst } from "./functions";

export function displayPokemon(
  idPokemon: string,
  name: string
): HTMLDivElement {
  const display: HTMLDivElement = document.createElement("div");
  display.innerHTML = `
          <a href='' id='__${idPokemon}' class="upload">
            <div>
                <h3>${strUcFirst(name)}</h3>
                <div><img src='' ></div>
                <span> Charging in loading </span>
            </div>
          </a>
        `;
  return display;
}
