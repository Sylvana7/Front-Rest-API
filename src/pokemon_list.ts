export const getPokemon = async (url: string): Promise<string> => {
  const container: Response = await fetch(url);
  const pokemon: any = await container.json();
  console.log("pokemon");
  console.log(pokemon.results);

  const hostname: string = window.location.hostname;
  let html: string = "";

  for (let array of pokemon.results) {
    const name = array.name;
    console.log(name);

    const url = array.url;
    console.log(url);
    html += `<div>
        <a href=${hostname} + "/pokemon/1">
        <h3>${name}</h3>
        </a>
        </div>`;
  }
  return html;
};
