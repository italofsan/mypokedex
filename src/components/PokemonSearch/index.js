import React, { useState } from 'react';
import {
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const PokemonSearch = (props) => {
  const [pokemon, setPokemon] = useState('');
  const [type, setType] = useState();
  const [ability, setAbility] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          
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
                  onClick={(e) => props.getPokemon(pokemon)}
                >
                  <Search fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
          />

          <OutlinedInput
            color='secondary'
            style={{ backgroundColor: '#FFF' }}
            placeholder='Search Pokemon by Type'
            onChange={(e) => setType(e.target.value)}
            onSubmit={(e) => props.fetchPokemonsByType(type)}
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={(e) => props.fetchPokemonsByType(type)}>
                  <Search fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
          />

          <OutlinedInput
            color='secondary'
            style={{ backgroundColor: '#FFF' }}
            placeholder='Search Pokemon by Ability'
            onChange={(e) => setAbility(e.target.value)}
            onSubmit={(e) => props.fetchPokemonsByAbility(ability)}
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={(e) => props.fetchPokemonsByAbility(ability)}>
                  <Search fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        
      </Container>
    </ThemeProvider>
  );
};

export default PokemonSearch;
