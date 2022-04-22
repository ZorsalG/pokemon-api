import { useState, useEffect } from "react";
import { getPokemons, getPokemonData } from "../services/Api";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer, Link
} from '@chakra-ui/react';


export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    fetchPokemons();

  }
  )

  return (
    <TableContainer>
      <Table size='sm'>
        <Tbody>
          {pokemons.map((pokemon) => (
            <Tr key={pokemon.name}>
              {/* EXTRAR EN CONCRETO dentro del key {{pokemon}} {} DESTRUCTURING */}
              <Td>{pokemon.name}</Td>
              <Td><Link to={`/pokemon/${pokemon.name}`}>Ver más</Link></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Pokedex;