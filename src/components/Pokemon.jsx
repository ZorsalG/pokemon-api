import { Table, TableContainer, Tbody, Tr, Td, Thead, Th, Badge } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  const { name } = useParams();

  const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        return res.json();
      })
      .catch((error) => {
        console.log(error)
      })
      .then(data => {
        setPokemon(data)
      })
  }
  useEffect(() => {
    fetchPokemon();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TableContainer >
      <Table size='sm' colorScheme='black'>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            {pokemon?.stats?.map(stat => (
              <Th key={stat.stat.name}>{stat.stat.name}</Th>
            ))}
            <Th>Height</Th>
            <Th>Base Experience</Th>
            <Th>Type 1</Th>
            <Th>Type 2</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td><Badge>{pokemon.name}</Badge></Td>
            {pokemon.stats?.map(stat => (
              <Td key={stat.stat.name}>{stat.base_stat}</Td>
            ))}
            <Td>{pokemon.height}</Td>
            <Td>{pokemon.base_experience}</Td>
            {pokemon.types?.map(pokemon => (
              <Td key={pokemon.type.name}><Badge>{pokemon.type.name}</Badge></Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}