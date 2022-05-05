import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Image, Heading, Badge, Text, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const { name } = useParams();

  const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        return res.json();
      })
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        setPokemon(data);
      });
  };

  useEffect(() => {
    fetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundType = pokemon => {
    if (pokemon.type.name.includes('grass')) {
      return '#20bf00';
    }
    if (pokemon.type.name.includes('fire')) {
      return '#bf0000';
    }
    if (pokemon.type.name.includes('water')) {
      return '#49abbb';
    }
    if (pokemon.type.name.includes('normal')) {
      return '#626262';
    }
    if (pokemon.type.name.includes('electric')) {
      return '#b9bf00';
    }
    if (pokemon.type.name.includes('poison')) {
      return '#bf0085';
    }
    if (pokemon.type.name.includes('bug')) {
      return '#00bf46';
    }
    if (pokemon.type.name.includes('ground')) {
      return '#915a19';
    }
    return '#000000';
  };

  return (
    <Box
      color={'white'}
      align={'center'}
      p={5}
      display={'flex'}
      alignItems={'center'}
    >
      <Box rounded={'lg'} bg={'gray.700'}>
        <Box>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
            <Image
              src={pokemon?.sprites?.other['official-artwork'].front_default}
            />
          </motion.div>
        </Box>
        <Box>
          <Heading fontSize={'3xl'} fontWeight={500}>
            {'ID #' + pokemon.id}
          </Heading>
          <Heading fontSize={'3xl'} fontWeight={500}>
            {pokemon.name}
          </Heading>
        </Box>
        <Box>
          {pokemon.types?.map(pokemon => (
            <Badge
              m={5}
              bg={backgroundType(pokemon)}
              rounded={'lg'}
              color={'white'}
              key={pokemon.type.name}
            >
              <Heading>{pokemon.type.name}</Heading>
            </Badge>
          ))}
        </Box>
        <Box>
          <Heading>Stats</Heading>
          {pokemon?.stats?.map(stat => (
            <Badge
              m={5}
              colorScheme={'purple'}
              fontSize="1.1em"
              rounded={'lg'}
              key={stat.stat.name}
              display={'flex'}
            >
              <Text>{stat.stat.name + ' ' + stat.base_stat}</Text>
            </Badge>
          ))}
        </Box>
        <Box mb={4}>
          <NavLink to={'/pokedex'}>
            <IconButton
              icon={<ArrowLeftIcon />}
              variant={'solid'}
              colorScheme={'whiteAlpha'}
            />
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};
