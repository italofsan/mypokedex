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

import api from '../../services/api';

function PokemonListTypes(props) {
  const history = useHistory();
  const classes = useStyles();

  const pokemonListNamesByType = props.pokemonListNamesByType;
  const [pokemonsList, setPokemonsList] = useState([]);

  useEffect(() => {
    pokemonListNamesByType.map((pokemon) => {
        const getPokemon = async (pokemon) => {
          await api.get(`/pokemon/${pokemon}/`)
            .then((response)=>{
              const { data } = response;
              setPokemonsList(pokemonsList => [...pokemonsList, {
                id: data.id,
                name: data.name
              }])
            })
        }
      getPokemon(pokemon);    
    })
    return setPokemonsList([]);
  }, [pokemonListNamesByType]);

  // Função que formata o ID do Pokemon para um número de três algarismos
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
      {pokemonsList.sort((a, b) => {
	    	return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
      }).map((pokemon, i) => {
        if(pokemon.id > 893){
          return
        }

        return (
          <Card className={classes.card} key={i}>
            <CardActionArea 
            onClick={() => history.push({
              pathname: `/${pokemon.id}/details`, 
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
                  #{formatId(pokemon.id.toString())}
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
                  pathname: `/${pokemon.id}/details`, 
                  state: {
                    pokeName: pokemon.name
                  }})
                }
                >
                  <Typography variant='p'>More Informations</Typography>
                </Button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
}

const useStyles = makeStyles({
  card: {
    minWidth: 250,
    margin: 10,
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
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
