import { useState, useEffect } from 'react';
import { getPokemons, getPokemonsData } from '../services/Api';
import { Image, Box, Heading, IconButton, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { backgroundPokedex } from './styles';
import { InfoIcon } from '@chakra-ui/icons';

export function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async pokemon => {
        return await getPokemonsData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);


  return (
    <SimpleGrid minChildWidth={250} spacingX={8} spacingY={6} p={3}>
      {pokemons.map(pokemon => (
        <motion.div whileHover={{ scale: 1.04 }} key={pokemon.name}>
          <Box
            bg={backgroundPokedex(pokemon)}
            rounded={'lg'}
            w={'100%'}
            h={'100%'}
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
                    icon={<InfoIcon />}
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
}

export default Pokedex;
