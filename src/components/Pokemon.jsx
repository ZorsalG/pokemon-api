import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Heading,
  Badge,
  Text,
  IconButton,
  Button,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [typePokemon, setTypePokemon] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name } = useParams();

  const fetchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
      setPokemon(response.data);
    });
    // .catch(error => {
    //   console.log(error);
    // });
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

  const fetchType = type => {
    axios
      //.get(`https://pokeapi.co/api/v2/type/${type}`)
      .get(`https://pokeapi.co/api/v2/type/grass`)
      .then(response => {
        setTypePokemon(response.data);
      });
    // .catch(error => {
    //   console.log(error);
    // });
  };

  const num = 3; //Math.floor(Math.random() * 100);
  // TODO: MODAL QUE AL HACER CLICK, MUESTRE 3 POKEMONS DEL MISMO TIPO                                                                          3. DEVOLVER SOLO 1 ALEATORIO CON MATH RANDOM.                                4. PINTAR LA IMAGEN DE DICHO POKEMON

  // TODO: TRAER SOLO UN TIPO DEL ARRAY

  // * BUSCAR PORQUE ONCLICK, SIN HACER CLICK, REDENRIZA
  // ? UTIL: https://pokeapi.co/api/v2/type/{id or name}/

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
          <NavLink to={''}>
            <IconButton
              icon={<ArrowRightIcon />}
              variant={'solid'}
              colorScheme={'whiteAlpha'}
              onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Tipos</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                  {pokemon.types?.map(pokemon => (
                    <Stack spacing={5} onClick={() => console.log('funciona')}>
                        <Checkbox
                          size="md"
                          colorScheme="orange"
                        >
                          {pokemon.type.name}
                        </Checkbox>
                    </Stack>
                  ))}
                  {typePokemon.pokemon?.map(pokemon => (
                    <p>{pokemon.pokemon.name}</p>
                  ))}
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};
