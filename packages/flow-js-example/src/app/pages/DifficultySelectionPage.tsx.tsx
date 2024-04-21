import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import { useGameStore } from '../store';

export const DifficultySelectionPage = () => {
  const triggerEvent = useGameStore((state) => state.triggerEvent);
  return (
    <FormControl>
      <InputLabel>Questions difficulty</InputLabel>
      <Select
        autoWidth={true}
        inputProps={{ 'data-testid': 'difficulty-select' }}
        value={'-1'}
        onChange={(e) =>
          triggerEvent('difficultyPicked', { difficulty: e.target.value })
        }
      >
        <MenuItem value="-1" disabled>
          Choose Difficulty
        </MenuItem>
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>
    </FormControl>
  );
};
