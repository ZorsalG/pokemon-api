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

export const getPokemonsData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err)
   }
};

export const getPokemon = async (name) => {
  return getPokemonsData.find((pokemon) => pokemon.name === name);
}

export const fetchPokemon = async (name) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) { 
    console.log(err)
  }
}