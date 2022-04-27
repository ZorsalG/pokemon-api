import { Table, TableContainer, Tbody, Tr, Td, Thead, Th } from "@chakra-ui/react";
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
      .then(data => {
        setPokemon(data)
      })
  }

  useEffect(() => {
    fetchPokemon();
  }, [])
  
  console.log(pokemon)
  return (
    <TableContainer>
      <Table size='sm' colorScheme='black'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            {pokemon?.stats?.map(stat => (
              <Th key={stat.stat.name}>{stat.stat.name}</Th>
            ))}
            <Th>Height</Th>
            <Th>Base Experience</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{pokemon.name}</Td>
            {pokemon?.stats?.map(stat => (
              <Th key={stat.stat.name}>{stat.base_stat}</Th>
            ))}
            <Td>{pokemon.height}</Td>
            <Td>{pokemon.base_experience}</Td>
          </Tr>
          <Tr>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}