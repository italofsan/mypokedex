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
  
  const pokemonListNamesByAbility = props.pokemonListNamesByAbility;
  const [pokemonsList, setPokemonsList] = useState([]);
 
  useEffect(()=>{
    pokemonListNamesByAbility.map((pokemon) => {
  
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
    return setPokemonsList([]);
  },[pokemonListNamesByAbility]);

  const formatId = (id) => {
    if (id.length === 1) {
      return '00' + id;
    } else if (id.length === 2) {
      return '0' + id;
    } else {
      return id;
    }
  };

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
                image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(pokemon.id.toString())}.png`}
                title={pokemon.name}
              />
            </CardActionArea>
            <CardActions>
              <Button
                size='small'
                color='primary'
                onClick={() => history.push({
                  pathname: `/${pokemon.name}`, 
                  state: {
                    pokeName: pokemon.name
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
