import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  
  const pokemonListNames = props.pokemonListNames;
  const offset = props.offset;

  return (
    <div className={classes.cardContainer}>
      {pokemonListNames.map((pokemon, i) => {
        if((i + offset)> 893){
          return
        }

        return (
          <Card className={classes.root} key={i}>
            <CardActionArea 
            onClick={() => history.push({
              pathname: `/${pokemon}`, 
              state: {
                pokeName: pokemon
              }
              })}
            >
            <CardContent style={{display: "flex", justifyContent: 'space-between'}}> 
                <Typography variant='h5' style={{textTransform: "capitalize"}}>
                  {pokemon}
                </Typography>
                <Typography variant='h5' style={{textTransform: "capitalize", color: '#CCC'}}>
                  #{i + offset}
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

export default withRouter(PokemonList);
