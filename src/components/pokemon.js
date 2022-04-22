import { useState } from "react";
import { getPokemons, getPokemonData } from "../services/api";
import { useEffect } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer, Button
} from '@chakra-ui/react'

export const Pokemon = () => {
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
              {/* EXTRAR EN CONCRETO {} DESTRUCTURING */}
              <Td>{pokemon.name}</Td>
              <Td><Button colorScheme='blue'>Ver más detalles</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Pokemon;