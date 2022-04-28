import { useState, useEffect } from "react";
import { getPokemons, getPokemonsData } from "../services/Api";
import {
  Image, Box, Stack, Heading, Grid, IconButton
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
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

  }, [])

  const changeBackground = (pokemon) => {
    if (pokemon.types[0].type.name.includes('grass')) {
      return '#227441';
    } if (pokemon.types[0].type.name.includes('fire')) {
      return '#8D1A1A';
    } if (pokemon.types[0].type.name.includes('water')) {
      return '#216473';
    } if (pokemon.types[0].type.name.includes('normal')) {
      return '#2D2D2D';
    } if (pokemon.types[0].type.name.includes('electric')) {
      return '#AF9E00';
    } if (pokemon.types[0].type.name.includes('poison')) {
      return '#662363';
    } if (pokemon.types[0].type.name.includes('bug')) {
      return '#568203';
    } if (pokemon.types[0].type.name.includes('ground')) {
      return '#894F2B';
    }
    return '#000000'
  }

  console.log(pokemons)
  /* EXTRAR EN CONCRETO dentro del key {{pokemon}} {} DESTRUCTURING */

  return (
    <Grid templateColumns='repeat(6, 1fr)'>
      {pokemons.map((pokemon) => (
        <Box
          minH={420}
          bg={changeBackground(pokemon)}
          rounded={'lg'}
          m={5}
          key={pokemon.name}
        >
          <Heading fontSize={'3xl'} fontWeight={500} color={'white'} fontStyle={'bold'} align={'center'} pt={3}>
            {'#' + pokemon.id}
          </Heading>
          <Image
            height={275}
            width={300}
            src={pokemon.sprites.other["official-artwork"].front_default}
          />
          <Stack align={'center'}>
            <Heading fontSize={'2xl'} fontWeight={500} color={'white'}>
              {pokemon.name}
            </Heading>
            <Stack align={'center'}>
              <Link to={`${pokemon.name}`}>
                <IconButton icon={<FaSearch />} variant={'solid'} colorScheme={'whiteAlpha'} />
              </Link>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Grid>
  );
};

export default Pokedex;