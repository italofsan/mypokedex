import React from 'react';
import { 
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    margin: 10
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  media: {
    height: 320,
  },
});

function PokemonList({ pokemon, pokemonUrl }) {
  const classes = useStyles();

  

  return (
    <div className={classes.cardContainer}>
      {pokemon.map((pokemon, index) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`}
              title={pokemon}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {pokemon}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Mais informações
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default PokemonList;