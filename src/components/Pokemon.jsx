import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Flex, Image, Heading, Badge, Text, Link, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

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

  const backgroundType = (pokemon) => {
    if (pokemon.type.name.includes('grass')) {
      return '#227441';
    } if (pokemon.type.name.includes('fire')) {
      return '#8D1A1A';
    } if (pokemon.type.name.includes('water')) {
      return '#216473';
    } if (pokemon.type.name.includes('normal')) {
      return '#2D2D2D';
    } if (pokemon.type.name.includes('electric')) {
      return '#AF9E00';
    } if (pokemon.type.name.includes('poison')) {
      return '#662363';
    } if (pokemon.type.name.includes('bug')) {
      return '#568203';
    } if (pokemon.type.name.includes('ground')) {
      return '#894F2B';
    }
    return '#000000'
  }



  console.log(pokemon)
  return (
    <Flex color={'white'} align={'center'} width={500} p={5}>
      <Box bg={'black'} flex={1} rounded={'lg'}>
        <Box align={'center'}>
          <Image
            height={275}
            width={300}
            src={pokemon?.sprites?.other["official-artwork"].front_default}
          />
        </Box>
        <Box align={'center'}>
          <Heading fontSize={'3xl'} fontWeight={500}>
            {'ID #' + pokemon.id}
          </Heading>
          <Heading fontSize={'3xl'} fontWeight={500} align={'center'}>
            {pokemon.name}
          </Heading>
        </Box>
        <Box align={'center'}>
          {pokemon.types?.map(pokemon => (
            <Badge m={5} bg={backgroundType(pokemon)} rounded={'lg'} color={'white'}><Heading key={pokemon.type.name}>{pokemon.type.name}</Heading></Badge>
          ))}
        </Box>
        <Box align={'center'}>
          <Heading>
            Estadísticas
          </Heading>
          {pokemon?.stats?.map(stat => (
            <Badge m={5} rounded={'lg'}><Text key={stat.stat.name}>{stat.stat.name + ' ' + stat.base_stat}</Text></Badge>
          ))}
        </Box>
        <Box>
          <Link to={'/pokedex'}>
            <IconButton icon={<ArrowBackIcon />} variant={'solid'} colorScheme={'whiteAlpha'} />
          </Link>
        </Box>
      </Box>
    </Flex>

    // <TableContainer >
    //   <Table size='sm' colorScheme='black'>
    //     <Thead>
    //       <Tr>
    //         <Th>Nombre</Th>
    //         {pokemon?.stats?.map(stat => (
    //           <Th key={stat.stat.name}>{stat.stat.name}</Th>
    //         ))}
    //         <Th>Height</Th>
    //         <Th>Base Experience</Th>
    //         <Th>Type 1</Th>
    //         <Th>Type 2</Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       <Tr>
    //         <Td><Badge>{pokemon.name}</Badge></Td>
    //         {pokemon.stats?.map(stat => (
    //           <Td key={stat.stat.name}>{stat.base_stat}</Td>
    //         ))}
    //         <Td>{pokemon.height}</Td>
    //         <Td>{pokemon.base_experience}</Td>
    //         {pokemon.types?.map(pokemon => (
    //           <Td key={pokemon.type.name}><Badge>{pokemon.type.name}</Badge></Td>
    //         ))}
    //       </Tr>
    //     </Tbody>
    //   </Table>
    // </TableContainer>
  )
}