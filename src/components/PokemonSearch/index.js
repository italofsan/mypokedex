import React, { useState } from 'react';
import {
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const PokemonSearch = (props) => {
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
                    if(pokemon !== ''){
                      props.getPokemon(pokemon)
                    } else {
                      toast.error("Please, insert a name ou id!", {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                      // window.location.reload();
                    }
                  }}
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
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={(e) => {
                  if(isNaN(type) && type !== ''){
                    props.fetchPokemonsByType(type)
                  } else {
                    toast.error("Please, insert a valid type of pokemon!", {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  }
                }}
                >
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
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={(e) => {
                  if(isNaN(ability) && ability !== ''){
                    props.fetchPokemonsByAbility(ability)
                  } else {
                    toast.error("Please, insert a valid ability of pokemon!", {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  }
                }}
                >
                  <Search fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
          />
          
        </div>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default PokemonSearch;
