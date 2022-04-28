export const getPokemons = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=25`);
    const data = await response.json();
    return data;
  } catch (err) { 
    console.log(err)
  }
};

export const getPokemonsData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err)
   }
};

