import { ButtonProps, Button as MuiButton } from '@mui/material';

export const Button = (props: ButtonProps) => (
  <MuiButton variant={'contained'} {...props} />
);
