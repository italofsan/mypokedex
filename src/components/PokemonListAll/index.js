import React from 'react';
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

function PokemonListAll(props) {
  const history = useHistory();
  const classes = useStyles();
  
  const pokemonListNames = props.pokemonListNames;
  const offset = props.offset;

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
      {pokemonListNames.map((pokemon, i) => {
        if((i + offset)> 893){
          return
        }

        return (
          <Card className={classes.root} key={i}>
            <CardActionArea 
            onClick={() => history.push({
              pathname: `/${(i +offset)}/details`, 
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
                  #{formatId((i + offset).toString())}
                </Typography>
              </CardContent>
              <CardMedia
                className={classes.media}
                image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId((i + offset).toString())}.png`}
                title={pokemon}
              />
            </CardActionArea>
            <CardActions>
              <Button
                size='small'
                color='primary'
                onClick={() => history.push({
                  pathname: `/${(i + offset)}/details`, 
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

export default withRouter(PokemonListAll);
