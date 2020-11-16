import React, {useState} from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PokemonSearch from '../PokemonSearch';
import PokemonCard from '../PokemonCard';

import { fetchPokemon, fetchPokemonByType } from '../../services/api';

function HeaderPokedex() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState();

  const getPokemon = async (query) => {
    setLoading(true);
    const response = await fetchPokemon(query);
    const results = await response.json();
    setPokemon(results);
    setLoading(false);
  }

  const formatId = (id) => {
    if (id.length === 1) {
      return "00" + id;
    } else if (id.length === 2) {
      return "0" + id;
    } else {
      return id;
    }
  }

  return (
    <>
      <div className={classes.divTitle}>
        <Typography variant="h1" className={classes.title}>My Pokedex</Typography>
      </div>

      <div className={classes.divSearch}>
        <PokemonSearch 
          getPokemon={getPokemon} 
          // getPokemonByType={getPokemonByType}
        />
      </div>
    </>
  );
}

const useStyles = makeStyles({
  divTitle: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20
  },
  divSearch: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: 72
  }
});

export default HeaderPokedex;