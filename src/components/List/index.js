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

import PokemonCard from '../PokemonCard';


function PokemonList(props) {
  const history = useHistory();
  const classes = useStyles();
  
  
  const pokemonListNames = props.pokemonListNames;
  const offset = props.offset;
 
  const [pokemonsList, setPokemonsList] = useState([""]);
 
  // useEffect(()=>{
  //   pokemonListNames.map((pokemon, index) => {
  
  //     const getPokemon = async (pokemon) => {
  //       const response = await fetchPokemon(pokemon);
  //       const results = await response.json();
  //       // setPokemonsList(pokemonsList.push(results));
  //       setPokemonsList([...pokemonsList, results.name])
        
        
  //       // console.log(results.name);
  //       // console.log(pokemonsList[index].types);
  //       // console.log(pokemonsList[index].stats);
  //       // console.log(pokemonsList[index].moves);
  //       // console.log(pokemonsList[index].abilities);
  //       }
  //     getPokemon(pokemon);
  //   })
  // },[]);



  return (
    <div className={classes.cardContainer}>
      {pokemonListNames.map((pokemon, i) => {


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
                <Typography variant='h6' component='h2' style={{textTransform: "capitalize"}}>
                  {pokemon}
                </Typography>
                <Typography variant='h6' component='h2' style={{textTransform: "capitalize", color: '#CCC'}}>
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
                More Informations
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
