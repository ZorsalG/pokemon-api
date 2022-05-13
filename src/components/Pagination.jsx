import { Box } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export function Pagination(props) {
  const { onLeftClick, onRightClick, page, totalPages } = props;

  return (
    <Box>
      <Box>
        <ArrowBackIcon onClick={onLeftClick} colorScheme="blue" />
        {page} de {totalPages}
        <ArrowForwardIcon onClick={onRightClick} colorScheme="blue" />
      </Box>
    </Box>
  );
}
