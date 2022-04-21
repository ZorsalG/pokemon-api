import { useEffect, useState } from "react";

export function Api () {
  const [pokemons, setPokemons] = useState([]);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const data = await response.json();

        setPokemons(data.results);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchData();
    },[])
  }

  export default Api;