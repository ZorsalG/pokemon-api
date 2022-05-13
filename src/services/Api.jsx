export const getPokemons = async () => {
  // TODO: TRANFORMAR FETCH EN AXIOS
  // axios
  //   .get(`https://pokeapi.co/api/v2/pokemon?limit=30`)
  //   .then(response => {
  //     console.log(response);
  //     return response;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPokemonsData = async url => {
  // axios
  //   .get(url)
  //   .then(response => {
  //     return response;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
