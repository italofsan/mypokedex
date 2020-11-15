import React from 'react';
import {
  Button,
  Card,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const Details = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const pokemonId = location.state.id;
  const pokemonName = location.state.name;
  const pokemonImage = location.state.image;
  const pokemonTypes = location.state.types;
  const pokemonAbilities = location.state.abilities;
  const pokemonStats = location.state.stats;
  const pokemonMoves = location.state.moves;

  

  return (
    <>
      <div style={{ width: '50%' }}>
        <Card className={classes.card}>
          <div>
            <CardMedia
              className={classes.media}
              image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`}
              title={pokemonName}
            />
            <div className={classes.section}>
              <div className={classes.sectionTitle}>
                <Typography className={classes.sectionTitleText} variant="h5">Stats</Typography>
              </div>

              <div>
                {pokemonStats.map((stat, key)=>(
                  <div key={key} style={{display: 'flex', flexDirection: 'row'}}>
                    <Typography className={classes.text}>{stat.stat.name}:</Typography>
                    <Typography className={classes.text} style={{marginLeft: 10}}>{stat.base_stat}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>  
        </Card>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
        <div className={classes.title}>
          <Typography variant="h2" className={classes.titleText}>{pokemonName}</Typography>
          <Typography variant="h2" className={classes.titleId}>#{pokemonId}</Typography>
        </div>

        <div className={classes.section}>
          <div className={classes.informations}>
            <div className={classes.types}>
              <div className={classes.sectionTitle}>
                <Typography className={classes.sectionTitleText} variant="h5">Types</Typography>
              </div>

              <div>
                {pokemonTypes.map((type, key)=>(
                  <div key={key}>
                    <Typography className={classes.text}>{type.type.name}</Typography>
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.abilities}>
              <div className={classes.sectionTitle}>
                <Typography className={classes.sectionTitleText} variant="h5">Abilities</Typography>
              </div>

              <div>
                {pokemonAbilities.map((ability, key) => (
                  <div key={key}>
                    <Typography className={classes.text}>{ability.ability.name}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>
            <Typography className={classes.sectionTitleText} variant="h5">Stats</Typography>
          </div>

          <div>
            {pokemonStats.map((stat, key)=>(
              <div key={key} style={{display: 'flex', flexDirection: 'row'}}>
                <Typography className={classes.text}>{stat.stat.name}:</Typography>
                <Typography className={classes.text} style={{marginLeft: 10}}>{stat.base_stat}</Typography>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>
            <Typography className={classes.sectionTitleText} variant="h5">Moves</Typography>
          </div>

          <div>
            {pokemonMoves.map((move, key)=>(
              <Typography variant="p" key={key} className={classes.text}>{move.move.name}, </Typography>
            ))}
          </div>
        </div>
      </div>

      <Button className={classes.button} onClick={history.goBack}>Voltar</Button>
    
    </>
  );
};

const useStyles = makeStyles({
  button:{
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }, 
    margin: 10
  },

  text:{
    textTransform: 'capitalize'
  },
  card: {
    width: 500,
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  media: {
    height: 500,
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

export default Details;
