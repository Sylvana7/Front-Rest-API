import { hostname } from "../../main";

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
                <h3>${name}</h3>
                <img src=${urlImg}>
                <span>${idPokemon}</span>
            </div>
          </a>
        `;
  return display;
}
