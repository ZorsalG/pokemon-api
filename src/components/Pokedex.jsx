import { useState, useEffect } from 'react';
import { getPokemons, getPokemonsData } from '../services/Api';
import { Image, Box, Heading, IconButton, SimpleGrid } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async pokemon => {
        return await getPokemonsData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const changeBackground = pokemon => {
    if (pokemon.types[0].type.name.includes('grass')) {
      return 'linear-gradient(180deg, rgba(34,195,40,1) 0%, rgba(20,124,24,1) 100%)';
    }
    if (pokemon.types[0].type.name.includes('fire')) {
      return 'linear-gradient(180deg, rgba(195,34,34,1) 0%, rgba(124,20,20,1) 100%)';
    }
    if (pokemon.types[0].type.name.includes('water')) {
      return 'linear-gradient(180deg, rgba(34,174,195,1) 0%, rgba(20,110,124,1) 100%)';
    }
    if (pokemon.types[0].type.name.includes('normal')) {
      return 'linear-gradient(180deg, rgba(145,145,145,1) 0%, rgba(51,51,51,1) 100%)';
    }
    if (pokemon.types[0].type.name.includes('electric')) {
      return 'linear-gradient(180deg, rgba(255,220,0,1) 0%, rgba(150,139,23,1) 100%)';
    }
    if (pokemon.types[0].type.name.includes('poison')) {
      return 'linear-gradient(180deg, rgba(188,37,212,1) 0%, rgba(137,23,150,1) 100%)';
    }
    if (pokemon.types[0].type.name.includes('bug')) {
      return 'linear-gradient(180deg, rgba(14,170,70,1) 0%, rgba(20,124,50,1) 100%)';
    }
    if (pokemon.types[0].type.name.includes('ground')) {
      return 'linear-gradient(180deg, rgba(176,53,31,1) 0%, rgba(115,37,18,1) 100%)';
    }
    return '#000000';
  };

  return (
    <SimpleGrid minChildWidth={250} spacingX={8} spacingY={6} p={3}>
      {pokemons.map(pokemon => (
        <motion.div whileHover={{ scale: 1.04 }}>
          <Box
            bg={changeBackground(pokemon)}
            rounded={'lg'}
            w={'100%'}
            h={'100%'}
            key={pokemon.name}
          >
            <Box>
              <Heading fontSize={'4xl'} color={'white'} align={'center'} pt={3}>
                {'#' + pokemon.id}
              </Heading>
            </Box>
            <Box>
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
              />
            </Box>
            <Box align={'center'}>
              <Box align={'center'}>
                <Heading fontSize={'2xl'} fontWeight={500} color={'white'}>
                  {pokemon.name}
                </Heading>
              </Box>
              <Box align={'center'} p={3}>
                <Link to={`${pokemon.name}`}>
                  <IconButton
                    icon={<FaSearch />}
                    variant={'solid'}
                    colorScheme={'whiteAlpha'}
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </motion.div>
      ))}
    </SimpleGrid>
  );
};

export default Pokedex;
