import React, { useState } from 'react';
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

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    margin: 10,
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

function PokemonList({ pokemon }) {
  const history = useHistory();
  const classes = useStyles();

  const [offset, setOffset] = useState(0);

  return (
    <div className={classes.cardContainer}>
      {pokemon.map((pokemon, index) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              setOffset={setOffset}
              className={classes.media}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${offset}.png`}
              title={pokemon}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {pokemon}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size='small'
              color='primary'
              onClick={() => history.push(`/${pokemon}/Details`)}
            >
              Mais informações
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default withRouter(PokemonList);
