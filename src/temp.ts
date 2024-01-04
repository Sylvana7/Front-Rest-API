import { hostname } from "./main";

interface pokemon {
  id: number;
}

class Pagination {
  constructor (public readonly counItem: number, limit: number, offset: number = 0)

  currentPage
  nextPage
  previousPage
  pageCount
}

export async function fetchPokemon(url: string): Promise<pokemon> {
  const container: Response = await fetch(url);
  const pokemon = (await container.json()) as pokemon;
  // console.log(pokemon);
  return Promise.resolve(pokemon);
}

function poke(pagination: Pagination) {
  const pageMax: number = Math.ceil(Number(list.count) / limitDisplay);
  const previous: number = page < 1 ? 1 : page - 1;
  const next: number = page > pageMax ? pageMax : page + 1;
  let navigation = "";
  navigation += `<div><h2>Pokemon list</h2></div>`;
  navigation += `<div class='pokemon__pagination'>`;
  navigation += `<a href='http://${hostna  const pageMax: number = Math.ceil(Number(list.count) / limitDisplay);
  const previous: number = page < 1 ? 1 : page - 1;
  const next: number = page > pageMax ? pageMax : page + 1; - 5) {
        navigation += `<a href='http://${hostname}:5173/page/${i}' class='${classNav}'>${i}</a>`;
      }
      if (i === pageMax - 6) {
        navigation += span;
      }
    } else {
      if (i <= numPermanent || i >= pageMax - numPermanent + 1) {
        navigation += `<a href='http://${hostname}:5173/page/${i}' class='${classNav}'>${i}</a>`;
      }
      if (
        i > numPermanent &&
        i < pageMax - numPermanent + 1 &&
        i >= page - Math.ceil(numInter / 2) &&
        i <= page + Math.ceil(numInter / 2)
      ) {
        navigation += `<a href='http://${hostname}:5173/page/${i}' class='${classNav}'>${i}</a>`;
      }
      if (
        (i === numPermanent &&
          page > numPermanent + 1 + Math.ceil(numInter / 2)) ||
        (i === pageMax - numPermanent &&
          page < pageMax - numPermanent - Math.ceil(numInter / 2))
      ) {
        navigation += span;
      }
    }
  }
  // navigation += "</div>";
  classNav = "";
  if (!list.next) {
    classNav = "disabled";
  }
  navigation += `<a href='http://${hostname}:5173/page/${next}' class='${classNav}' title='next page'><span class='icon icon_arrow_sm_right'></span></a>`;
  navigation += `<a href='http://${hostname}:5173/page/${pageMax}' class='${classNav}' title='last page'><span class='icon double icon_arrow_sm_right'></span><span class='icon icon_arrow_sm_right'></span></a>`;
  navigation += "</div>";

  return NavigationPreloadManager;
}

export async function getPokemon(
  list: any,
  page: number,
  limitDisplay: number
): Promise<string> {
  const pokemon = list.resul  const pageMax: number = Math.ceil(Number(list.count) / limitDisplay);
  const previous: number = page < 1 ? 1 : page - 1;
  const next: number = page > pageMax ? page  const pageMax: number = Math.ceil(Number(list.count) / limitDisplay);
  const previous: number = page < 1 ? 1 : page - 1;
  const next: number = page > pageMax ? pageMax : page + 1;
    const infoPokemon: any = await getPokemonJson(url);
    const urlSVG: string = infoPokemon.sprites.other.dream_world.front_default;
    const urlImg: string =
      urlSVG != undefined
        ? urlSVG
        : `http://${hostname}:5173/src/img/no_photo.png`;
    const idPokemon: string = "#" + infoPokemon.id.toString().padStart(5, "0");

    html += `
    <a href='http://${hostname}:5173/pokemon/${idPokemon}'>
      <div>
          <h3>${name}</h3>
          <img src=${urlImg}>
          <span>${idPokemon}</span>
      </div>
    </a>
        `;
  }
  html += "</div>";
  html += navigation;
  return html;
}
