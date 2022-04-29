import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Image, Heading, Badge, Text, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

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
      return '#20bf00';
    } if (pokemon.type.name.includes('fire')) {
      return '#bf0000';
    } if (pokemon.type.name.includes('water')) {
      return '#49abbb';
    } if (pokemon.type.name.includes('normal')) {
      return '#626262';
    } if (pokemon.type.name.includes('electric')) {
      return '#b9bf00';
    } if (pokemon.type.name.includes('poison')) {
      return '#bf0085';
    } if (pokemon.type.name.includes('bug')) {
      return '#00bf46';
    } if (pokemon.type.name.includes('ground')) {
      return '#915a19';
    }
    return '#000000';
  }
  
  return (
    <Box color={'white'} align={'center'} width={500} p={5} justifyContent={'center'}>
      <Box rounded={'lg'} bg={'gray.700'} minH={775}>
        <Box align={'center'} pt={5}>
          <Image
            height={300}
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
            <Badge m={5} bg={backgroundType(pokemon)} rounded={'lg'} color={'white'} key={pokemon.type.name}><Heading>{pokemon.type.name}</Heading></Badge>
          ))}
        </Box>
        <Box align={'center'}>
          <Heading>
            Stats
          </Heading>
          {pokemon?.stats?.map(stat => (
            <Badge m={5} colorScheme={'purple'} fontSize='1.1em' rounded={'lg'} key={stat.stat.name}><Text >{stat.stat.name + ' ' + stat.base_stat}</Text></Badge>
          ))}
        </Box>
        <Box>
          <NavLink to={'/pokedex'} >
            <IconButton icon={<ArrowLeftIcon />} variant={'solid'} colorScheme={'whiteAlpha'} />
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};