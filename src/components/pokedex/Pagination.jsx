import { Box, Flex, Button } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export function Pagination(props) {
  const { onLeftClick, onRightClick, page, totalPages } = props;

  return (
    <Flex m={3} alignItems={'center'}>
      <Box>
        <Button colorScheme="gray" size="sm" onClick={onLeftClick} mr={2}>
          <ArrowBackIcon />
        </Button>
      </Box>
      <Box>
        {page} de {totalPages}
      </Box>
      <Box>
        <Button colorScheme="gray" size="sm" onClick={onRightClick} ml={2}>
          <ArrowForwardIcon colorScheme="blue" />
        </Button>
      </Box>
    </Flex>
  );
}
