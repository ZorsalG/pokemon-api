import { useState, useEffect } from "react";
import { getPokemons, getPokemonsData } from "../services/Api";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer, Thead, Th, Badge, Image, Button
} from '@chakra-ui/react';
import { Link } from "react-router-dom";


export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonsData(pokemon.url);
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

  {/* EXTRAR EN CONCRETO dentro del key {{pokemon}} {} DESTRUCTURING */ }

  return (
    <TableContainer>
      <Table size='sm' colorScheme='black'>
        <Thead>
          <Tr>
            <Th>Pokemon</Th>
            <Th>Tipo</Th>
            <Th>Dibujo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pokemons.map((pokemon) => (
            <Tr key={pokemon.name}>
              <Td>{pokemon.name}</Td>
              <Td><Badge>{pokemon.types[0].type.name}</Badge></Td>
              <Td>
                <Image boxSize='100px' src={pokemon.sprites.front_default} />
                <Button colorScheme='teal' variant='outline'>
                  <Link to={`${pokemon.name}`}>Detalles</Link>
                  </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Pokedex;