import { useState } from "react";
import { getPokemons, getPokemonData } from "../services/Api";
import { useEffect } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer, Image, Th, Thead, Badge
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
  //console.log(pokemons);
  return (
    <TableContainer>
      <Table size='sm' colorScheme='black'>
        <Thead>
          <Tr>
            <Th>Pokemon</Th>
            <Th>Type</Th>
            <Th>Sprite</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pokemons.map((pokemon) => (
            <Tr key={pokemon.name}>
              <Td>{pokemon.name}</Td>
              <Td><Badge>{pokemon.types[0].type.name}</Badge></Td>
              <Td>
                <Image boxSize='100px' src={pokemon.sprites.front_default} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Pokemon;