import React, {useState} from 'react';
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

const PokemonCard = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [id, setId] = useState(props.pokeId);
  const [pokeName, setPokeName] = useState(props.pokeName);
  const pokeImage = props.pokeImage;
  const pokeTypes = props.pokeTypes;
  const pokeAbilities = props.pokeAbilities;
  const pokeStats = props.pokeStats;
  const pokeMoves = props.pokeMoves;

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
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push({
          pathname: `/${id}/details`, 
          state: {
            pokeId: id,
            pokeName: pokeName,
            pokeImage: pokeImage,
            pokeTypes: pokeTypes,
            pokeAbilities: pokeAbilities,
            pokeStats: pokeStats,
            pokeMoves: pokeMoves
          } 
        })}>
        <CardContent style={{display: "flex", justifyContent: 'space-between'}}> 
          <Typography variant='h5'style={{textTransform: "capitalize"}}>
            {pokeName}
          </Typography>
          <Typography variant='h5'style={{textTransform: "capitalize", color: '#CCC'}}>
            #{formatId(id.toString())}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(id.toString())}.png`}
          title={pokeName}
        />
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => history.push({
              pathname: `/${id}/details`, 
              state: {
                pokeId: id,
                pokeName: pokeName,
                pokeImage: pokeImage,
                pokeTypes: pokeTypes,
                pokeAbilities: pokeAbilities,
                pokeStats: pokeStats,
                pokeMoves: pokeMoves
            } 
          })}>
            <Typography variant='p'>More Informations</Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  text:{
    textTransform: 'capitalize'
  },
  card: {
    width: 250,
    display: 'inline-block',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  media: {
    height: 250,
  },
  title:{
    display: 'flex',
    flexDirection: 'row'
  },
  titleText:{
    textTransform: 'capitalize'
  },
  titleId:{
    color: '#ccc',
    marginLeft: 20
  },
  informations:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section:{
    marginTop: 20
  },
  sectionTitleText:{
    marginBottom: 10
  }
});

export default withRouter(PokemonCard);