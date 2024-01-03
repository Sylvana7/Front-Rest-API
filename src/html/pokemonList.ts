// console.log(fileContent);
export function htmlHome(pokemon: string): string {
  return `
  <div>
    <h2>Pokemon list</h2>
  </div>
  <div>
    ${pokemon}
  </div>
`;
}
