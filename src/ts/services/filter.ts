export class FilterPokemon {
  public filterPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon-color").then((result) => {
      result.json().then((pokemonList) => {
        // We filter the array of flavor texts only for the ones that have the language `en`
        const fileterdpokemonColorEntries =
          pokemonList.pokemon_color_entries.filter(
            (element: any) => element.language.name === "en"
          );
        // If there's any entries, let's get the first one
        const pokemonColorEntry =
          fileterdpokemonColorEntries.length > 0
            ? fileterdpokemonColorEntries[0]
            : {};

        // If we want, we can reassign the `flavor_text_entries` array to one with just the entry we have
        pokemonList.flavor_text_entries = [pokemonColorEntry];

        // Or if we just want the flavor text itself
        const pokemonColor = pokemonColorEntry.pokemon_color;
        return pokemonColor;
      });
    });
    return "";
  }
}
