export async function getPokemonJson(url: string): Promise<any> {
  const container: Response = await fetch(url);
  const pokemon: any = await container.json();
  // console.log(pokemon);
  return Promise.resolve(pokemon);
}

export async function getPokemon(list: any): Promise<string> {
  console.log(list);
  const pokemon = list.results;
  const hostname: string = window.location.hostname;
  let html: string = "";

  
  for (let array of pokemon) {
      const name = array.name;
      const url = array.url;
      const infoPokemon: any = await getPokemonJson(url);
      console.log(infoPokemon);
    const urlImg: string = infoPokemon.sprites.other.dream_world.front_default;
    const idPokemon: number = infoPokemon.id;

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
  return html;
}
