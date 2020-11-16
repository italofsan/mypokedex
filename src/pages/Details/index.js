import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardMedia,
  Typography,
  Container,
  LinearProgress
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import PokemonSearch from '../../components/PokemonSearch';

const Details = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const pokemonName = location.state.pokeName;
 
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const [pokeTypes, setPokeTypes] = useState();
  
  useEffect(()=>{
    getPokemon();
  },[pokemonName])

  const formatId = (id) => {
    if (id.length === 1) {
      return "00" + id;
    } else if (id.length === 2) {
      return "0" + id;
    } else {
      return id;
    }
  }
  
  const getPokemon = async () => {
    setLoading(true);
    
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
      
      setPokeTypes(response.data.types);
      
      setPokemon({
        id: response.data.id,
        name: response.data.name,
        types: response.data.types,
        stats: response.data.stats,
        moves: response.data.moves,
        abilities: response.data.abilities
      });
      setLoading(false);
      // setPokemon(results);
      
    } catch (error) {
    console.log(error.message);
  }}
  //   setLoading(false);
  // }


  if (loading) {
    return (
      <div>Carregando...</div>
    );
  }

  return (
    <>
      {pokeTypes && pokemon ? (
        <Container>
           <div className={classes.title}>
                <Typography variant="h2" className={classes.titleText}>{pokemon.name}</Typography>
                <Typography variant="h2" className={classes.titleId}>#{formatId(pokemon.id.toString())}</Typography>
              </div>
          <div className={classes.mainDiv}>
            
            <div className={classes.cardDiv}>
              <Card className={classes.card}>
                <div>
                  <CardMedia
                    className={classes.media}
                    image={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + formatId(pokemon.id.toString()) + ".png"}
                    title={pokemon.name}
                  />
                  <div className={classes.section}>
                    <div className={classes.sectionTitle}>
                      <Typography className={classes.sectionTitleText} variant="h5" style={{marginLeft: 10}}>Stats</Typography>
                    </div>

                    <div style={{marginBottom: 10}}>
                      {pokemon["stats"].map((stat, key)=>(
                        <div key={key} className={classes.statCard}>
                          <Typography className={classes.text}>{stat.stat.name}:</Typography>
                          <Typography className={classes.text} style={{marginLeft: 10}}>{stat.base_stat}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>  
              </Card>
            </div>
            

            <div className={classes.contenteDiv}>
              {/* <div className={classes.title}>
                <Typography variant="h2" className={classes.titleText}>{pokemon.name}</Typography>
                <Typography variant="h2" className={classes.titleId}>#{formatId(pokemon.id.toString())}</Typography>
              </div> */}

              <div className={classes.section}>
                <div className={classes.informations}>
                  <div className={classes.types}>
                    <div className={classes.sectionTitle}>
                      <Typography className={classes.sectionTitleText} variant="h5">Types</Typography>
                    </div>

                    <div>
                      {pokemon["types"].map((type, key)=>(
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
                      {pokemon["abilities"].map((ability, key) => (
                        <div key={key}>
                          <Typography variant="p" className={classes.text}>{ability.ability.name}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.section}>
                <div className={classes.sectionTitle}>
                  <Typography className={classes.sectionTitleText} variant="h5">Moves</Typography>
                </div>

                <div>
                  {pokemon["moves"].map((move, key)=>(
                    <Typography variant="p" key={key} className={classes.text}>{move.move.name}, </Typography>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.buttonDiv}>
              <Button className={classes.button} onClick={history.goBack}>Voltar</Button>
          </div>
        </Container>
      ) : (<div>Aguardando...</div>) }
    </>
  );
};

const useStyles = makeStyles({
  mainDiv: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    height: '100vh'
  },
  contenteDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  cardDiv: {
    display: 'flex', 
    width: '50%'
  },
  buttonDiv: {
    display: "flex", 
    justifyContent: "center"
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
  statCard: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  text:{
    textTransform: 'capitalize',
  },
  title:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
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
  },
  button:{
    color: '#FFF',
    backgroundColor: '#e84848',
    '&:hover': {
      backgroundColor: 'rgba(232, 72, 72, 0.9)'
    }, 
    margin: 10
  }
});

export default Details;
