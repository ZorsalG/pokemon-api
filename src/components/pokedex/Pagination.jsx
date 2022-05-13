import { Box, Button } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export function Pagination(props) {
  const { onLeftClick, onRightClick, page, totalPages } = props;

  return (
    <Box m={3}>
      <Button colorScheme="gray" size="sm" onClick={onLeftClick} mr={2}>
        <ArrowBackIcon />
      </Button>
      {page} de {totalPages}
      <Button colorScheme="gray" size="sm" onClick={onRightClick} ml={2}>
        <ArrowForwardIcon colorScheme="blue" />
      </Button>
    </Box>
  );
}
