import { Box, BoxProps } from '@mui/material';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  transition: all 0.3s;
`;

export const FlexBox = (props: BoxProps) => (
  <StyledBox
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    gap={3}
    alignItems={'center'}
    {...props}
  />
);
