interface pokemon {
  id: number;
}

export async function fetchPokemon(url: string): Promise<pokemon> {
  const container: Response = await fetch(url);
  const pokemon = (await container.json()) as pokemon;

  return Promise.resolve(pokemon);
}
