import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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

  const [pokemon, setPokemon] = useState('');
  const [type, setType] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <OutlinedInput
          color='secondary'
          style={{ backgroundColor: '#FFF' }}
          placeholder='Search Pokemon by Name or Id'
          onChange={(e) => setPokemon(e.target.value)}
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={(e) => {
                  if(pokemon === ""){
                    return
                  }
                  props.getPokemon(pokemon)
                }}
              >
                <Search fontSize='small' />
              </IconButton>
            </InputAdornment>
          }
        />

        <OutlinedInput
          color='primary'
          placeholder='Search Pokemon by Type'
          onChange={(e) => setType(e.target.value)}
          onSubmit={(e) => props.fetchAllPokemonByType(type)}
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={(e) => props.fetchAllPokemonByType(type)}>
                <Search fontSize='small' />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  search: {
    borderColor: '#FFF',
  },
});

export default PokemonSearch;
