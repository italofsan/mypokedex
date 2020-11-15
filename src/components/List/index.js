import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { fetchPokemon } from '../../services/api';


function PokemonList(props) {
  const history = useHistory();
  const classes = useStyles();
  
  
  const pokemonNames = props.pokemonName;
  const offset = props.offset;
 
  const [pokemonsList, setPokemonsList] = useState([]);
  
  useEffect(()=>{
    pokemonNames.map((pokemon) => {
      const p = pokemon;
  
      const getPokemon = async (query) => {
        const response = await fetchPokemon(query);
        const results = await response.json();
        setPokemonsList(pokemonsList.push(results));
        console.log(pokemonsList);
        }
      getPokemon(p);
    })
  },[pokemonNames]);

  return (
    <div className={classes.cardContainer}>
      {pokemonNames.map((pokemon, i) => (
        <Card className={classes.root} key={i}>
          <CardActionArea onClick={() => history.push(`/${pokemon}`)}>
          <CardContent style={{display: "flex", justifyContent: 'space-between'}}> 
              <Typography variant='h6' component='h2' style={{textTransform: "capitalize"}}>
                {pokemon}
              </Typography>
              <Typography variant='h6' component='h2' style={{textTransform: "capitalize"}}>
                {i + offset}
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + offset}.png`}
              title={pokemon}
            />
          </CardActionArea>
          <CardActions>
            <Button
              size='small'
              color='primary'
              onClick={() => history.push(`/${pokemon}`)}
              >
              More Informations
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    margin: 10,
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  media: {
    height: 250,
  },
});

export default withRouter(PokemonList);
