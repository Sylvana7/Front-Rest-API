export class FilterPokemon {
  public test() {
    fetch("https://pokeapi.co/api/v2/pokemon-species").then((result) => {
      result.json().then((data) => {
        // We filter the array of flavor texts only for the ones that have the language `en`
        const fileterdFlavorTextEntries = data.flavor_text_entries.filter(
          (element: any) => element.language.name === "en"
        );
        // If there's any entries, let's get the first one
        const flavorTextEntry =
          fileterdFlavorTextEntries.length > 0
            ? fileterdFlavorTextEntries[0]
            : {};
        console.log(flavorTextEntry);

        // If we want, we can reassign the `flavor_text_entries` array to one with just the entry we have
        data.flavor_text_entries = [flavorTextEntry];
        console.log(data);

        // Or if we just want the flavor text itself
        const flavorText = flavorTextEntry.flavor_text;
        console.log(flavorText);
      });
    });
    return "test";
  }
}
