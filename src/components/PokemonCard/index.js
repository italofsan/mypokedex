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

  const [name, setName] = useState(props.name); 
  const [id, setId] = useState(props.id);
  const [image, setImage] = useState(props.image);
  const [types, setTypes] = useState(props.types);
  const [abilities, setAbilities] = useState(props.abilities);
  const [stats, setStats] = useState(props.stats);
  const [moves, setMoves] = useState(props.moves);

  const normalise = value => (value) * 100 / (255);

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push({
          pathname: `/${name}`, 
          state: {
            id: id,
            name: name,
            image: image,
            types: types,
            abilities: abilities,
            stats: stats,
            moves: moves
          } 
        })}>
        <CardContent style={{display: "flex", justifyContent: 'space-between'}}> 
          <Typography variant='h6' component='h2' style={{textTransform: "capitalize"}}>
            {name}
          </Typography>
          <Typography variant='h6' component='h2' style={{textTransform: "capitalize", color: '#CCC'}}>
            #{id}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
          title={name}
        />
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => history.push({
              pathname: `/${name}`, 
              state: {
                id: id,
                name: name,
                image: image,
                types: types,
                abilities: abilities,
                stats: stats,
                moves: moves
            } 
          })}>
            More Informations
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
    display: 'inline-block'
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