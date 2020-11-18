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

function PokemonListTypes(props) {
  const history = useHistory();
  const classes = useStyles();
  
  
  const pokemonListNamesByType = props.pokemonListNamesByType;
 
  const [pokemonsList, setPokemonsList] = useState([]);
 
  useEffect(()=>{
    pokemonListNamesByType.map((pokemon, index) => {
  
      const getPokemon = async (pokemon) => {
        const response = await fetchPokemon(pokemon);
        const results = await response.json();
        setPokemonsList(pokemonsList => [...pokemonsList, {
          id: results.id,
          name: results.name
        }])
        }
      getPokemon(pokemon);
    })
    console.log(pokemonsList);
    return setPokemonsList([]);
  },[pokemonListNamesByType]);



  return (
    <div className={classes.cardContainer}>
      {pokemonsList.map((pokemon, i) => {
        if(pokemon.id > 893){
          return
        }

        return (
          <Card className={classes.root} key={i}>
            <CardActionArea 
            onClick={() => history.push({
              pathname: `/${pokemon.name}`, 
              state: {
                pokeName: pokemon.name
              }
              })}
            >
            <CardContent style={{display: "flex", justifyContent: 'space-between'}}> 
                <Typography variant='h5' style={{textTransform: "capitalize"}}>
                  {pokemon.name}
                </Typography>
                <Typography variant='h5' style={{textTransform: "capitalize", color: '#CCC'}}>
                  #{pokemon.id}
                </Typography>
              </CardContent>
              <CardMedia
                className={classes.media}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                title={pokemon.name}
              />
            </CardActionArea>
            <CardActions>
              <Button
                size='small'
                color='primary'
                onClick={() => history.push({
                  pathname: `/${pokemon}`, 
                  state: {
                    pokeName: pokemon
                  }
                  })}
                >
                <Typography variant='p'>More Informations</Typography>
              </Button>
            </CardActions>
          </Card>
        )}
      )}
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

export default withRouter(PokemonListTypes);
