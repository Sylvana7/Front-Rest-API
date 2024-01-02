export const getPokemon = async (url: string):  Promise<void> => {
    const container: Response = await fetch(url);
    const pokemon: any = await container.json();
    console.log("pokemon");
    console.log(pokemon.results);
    for (let array of pokemon.results) {
        const name = array.name;
        console.log(name);
        
        const url = array.url
        console.log(url)
        
        }
       
        let params = window.location.pathname;
            console.log(params);
        }
       


