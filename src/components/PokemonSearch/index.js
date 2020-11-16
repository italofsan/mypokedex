import React, { useState } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const PokemonSearch = (props) => {
  const classes = useStyles();
  // const history = useHistory()

  const [pokemon, setPokemon] = useState('');
  const [type, setType] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
      >
        <OutlinedInput
          color='secondary'
          style={{ backgroundColor: '#FFF' }}
          placeholder='Search Pokemon by Name or Id'
          onChange={(e) => setPokemon(e.target.value)}
          // onSubmit={(e)=> props.getPokemon(pokemon)}
          // onKeyDown={(evento) => {
          //   if(evento.key !== "Enter") return;
          //   setPokemon(evento.target.value)
          // }}
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={(e) => {
                  props.getPokemon(pokemon);
                }}
              >
                <Search fontSize='small' />
              </IconButton>
            </InputAdornment>
          }
        />

        <OutlinedInput
          color='primary'
          // style={{ margin: 10, backgroundColor: '#FFF' }}
          placeholder='Search Pokemon by Type'
          onChange={(e) => setPokemon(e.target.value)}
          onSubmit={(e) => props.fetchAllPokemonByType(pokemon)}
          // onKeyDown={(evento) => {
          //   if(evento.key !== "Enter") return;
          //   setPokemon(evento.target.value)
          // }}
          size='small'
          // margin="normal"
          // fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={(e) => props.fetchAllPokemonByType(pokemon)}>
                <Search fontSize='small' />
              </IconButton>
            </InputAdornment>
          }
        />

        {/* <TextField
        select      
        value={type}
        onChange={(event) => {
          setType(event.target.value);
          props.getPokemonByType(event.target.value);
        }}
        SelectProps={{
          native: true,
        }}
        variant="outlined"
      >
        {types.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField> */}
      </div>
    </ThemeProvider>
  );
};

const types = ['fire', 'water', 'normal', 'poison'];

const useStyles = makeStyles({
  search: {
    borderColor: '#FFF',
  },
});

export default PokemonSearch;
