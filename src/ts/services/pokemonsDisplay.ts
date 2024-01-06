import { hostname } from "../../main";
import { strUcFirst } from "./functions";

export function displayPokemon(
  infoPokemon: string,
  name: string,
  urlImg: string,
  idPokemon: string
): InnerHTML {
  const display: InnerHTML = document.createElement("div");
  display.innerHTML = `
          <a href='${hostname}/pokemon/${infoPokemon}'>
            <div>
                <h3>${strUcFirst(name)}</h3>
                <div><img src=${urlImg}></div>
                <span>${idPokemon}</span>
            </div>
          </a>
        `;
  return display;
}
