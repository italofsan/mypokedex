import React, { useState } from 'react';
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput
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
            color='secondary'
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

          <OutlinedInput
            color='secondary'
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
          

          {/* <div style={{display: 'flex', alignItems: 'center'}}>
            <Button onClick={() => window.location.reload(false)} className={classes.button} size='small'>
              Limpar Pesquisas
            </Button>
          </div> */}
        </div>
        
      </Container>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  search: {
    borderColor: '#FFF',
  },
  button:{
    color: '#FFF',
    backgroundColor: '#e84848',
    '&:hover': {
      backgroundColor: 'rgba(232, 72, 72, 0.9)'
    },
    marginTop: 10
  }
});

export default PokemonSearch;
