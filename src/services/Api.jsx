export const getPokemons = async () => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=25`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) { 
    console.log(err)
  }
};

export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err)
   }
};

