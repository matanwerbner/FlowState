import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { useGameStore } from '../store';

export const CategorySelectionPage = () => {
  const triggerEvent = useGameStore((state) => state.triggerEvent);
  return (
    <FormControl>
      <InputLabel>Questions category</InputLabel>
      <Select
        autoWidth={true}
        inputProps={{ 'data-testid': 'category-select' }}
        value={'-1'}
        onChange={(e) =>
          triggerEvent('categoryPicked', { category: e.target.value })
        }
      >
        <MenuItem disabled value="-1">
          Choose category
        </MenuItem>
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="9">General Knowledge</MenuItem>
        <MenuItem value="10">Entertainment: Books</MenuItem>
        <MenuItem value="11">Entertainment: Film</MenuItem>
        <MenuItem value="12">Entertainment: Music</MenuItem>
        <MenuItem value="13">Entertainment: Musicals &amp; Theatres</MenuItem>
        <MenuItem value="14">Entertainment: Television</MenuItem>
        <MenuItem value="15">Entertainment: Video Games</MenuItem>
        <MenuItem value="16">Entertainment: Board Games</MenuItem>
        <MenuItem value="17">Science &amp; Nature</MenuItem>
        <MenuItem value="18">Science: Computers</MenuItem>
        <MenuItem value="19">Science: Mathematics</MenuItem>
        <MenuItem value="20">Mythology</MenuItem>
        <MenuItem value="21">Sports</MenuItem>
        <MenuItem value="22">Geography</MenuItem>
        <MenuItem value="23">History</MenuItem>
        <MenuItem value="24">Politics</MenuItem>
        <MenuItem value="25">Art</MenuItem>
        <MenuItem value="26">Celebrities</MenuItem>
        <MenuItem value="27">Animals</MenuItem>
        <MenuItem value="28">Vehicles</MenuItem>
        <MenuItem value="29">Entertainment: Comics</MenuItem>
        <MenuItem value="30">Science: Gadgets</MenuItem>
        <MenuItem value="31">
          Entertainment: Japanese Anime &amp; Manga
        </MenuItem>
        <MenuItem value="32">Entertainment: Cartoon &amp; Animations</MenuItem>
      </Select>
    </FormControl>
  );
};
