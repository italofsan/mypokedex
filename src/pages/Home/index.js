import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// import { fetchPokemon } from '../../services/api';
import axios from 'axios';

import api from '../../services/api';

import Pagination from '../../components/Pagination';
import PokemonCard from '../../components/PokemonCard';
import PokemonSearch from '../../components/PokemonSearch';
import PokemonListAll from '../../components/PokemonListAll';
import PokemonListTypes from '../../components/PokemonListTypes';
import PokemonListAbilities from '../../components/PokemonListAbilities';

import loadingImage from '../../assets/loading.gif';

const Home = () => {
  const classes = useStyles();

  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);
  const [pokemonListNamesByType, setPokemonListNamesByType] = useState([]);
  const [pokemonListNamesByAbility, setPokemonListNamesByAbility] = useState(
    []
  );

  // Estados que fazem o funcionamento da lista de todos os Pokemons
  const [offset, setOffset] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
  );
  const [pokemonListNames, setPokemonListNames] = useState([]);

  // Estados criados para gerenciar a exibicao dos componentes
  const [visibleCard, setVisibleCard] = useState('flex');
  const [visibleListAll, setVisibleListAll] = useState('flex');
  const [visibleListType, setVisibleListType] = useState('flex');
  const [visibleListAbility, setVisibleListAbility] = useState('flex');

  // Funcao que executa a pesquisa de todos os Pokemon de forma paginada
  useEffect(() => {
    setLoading(true);
    const fetchAllPokemon = async () => {
      await axios.get(currentPageUrl).then((response) => {
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemonListNames(
          response.data.results.map((pokemon) => pokemon.name)
        );
      });
    };
    fetchAllPokemon();
  }, [currentPageUrl]);

  // Função que carrega a página seguinte
  function goNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setOffset(offset + 20);
  }

  // Função que carrega a página anterior
  function goPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    setOffset(offset - 20);
  }

  // Função que executa a pesquisa Pokemon por nome ou id
  const getPokemon = async (query) => {
    setVisibleCard('flex');
    setVisibleListAll('none');
    setVisibleListType('none');
    setVisibleListAbility('none');
    setLoading(true);

    try{
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}/`)
      .then((response) => {
        setPokemon(response.data)
      })
    } catch (error){
      alert("Pokemon não encontrado!");
      window.location.reload();
    }
    setLoading(false);
  };

  // Função que executa a pesquisa Pokemon por tipo
  const fetchPokemonsByType = async (type) => {
    setVisibleCard("none");
    setVisibleListAll("none");
    setVisibleListType("flex");
    setVisibleListAbility("none");
    setLoading(true);

    try{
    await api.get(`/type/${type}/`)
      .then((response) => {
        setPokemonListNamesByType(
          response.data.pokemon.map((pokemon) => pokemon.pokemon.name)
        );
      })
    } catch (error){
      alert("Please, insert a valid type of pokemon!");
      window.location.reload();
    }
    setLoading(false);
  };

  // Função que executa pesquisa Pokemon por abilidade
  const fetchPokemonsByAbility = async (ability) => {
    setVisibleCard("none");
    setVisibleListAll("none");
    setVisibleListType("none");
    setVisibleListAbility("flex");
    setLoading(true);

    try{
    await axios.get(`https://pokeapi.co/api/v2/ability/${ability}/`)
      .then((response) => {
        setPokemonListNamesByAbility(
          response.data.pokemon.map((pokemon) => pokemon.pokemon.name)
        );        
      })
    } catch (error){
      alert("Please, insert a valid ability of pokemon!");
      window.location.reload();
    }
    setLoading(false);
  };

  // Mostrado quando está sendo realizada alguma requisição
  if (loading) {
    return (
      <Container maxWidth='lg'>
        <div className={classes.divTitle}>
          <Typography variant='h1' className={classes.title}>
            My Pokedex
          </Typography>
        </div>

        <div className={classes.divSearch}>
          <PokemonSearch
            getPokemon={getPokemon}
            fetchPokemonsByType={fetchPokemonsByType}
            fetchPokemonsByAbility={fetchPokemonsByAbility}
          />
        </div>

        <div className={classes.divLoading}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.loading} style={{display: 'flex'}}>
              <img src={loadingImage} alt="Loading" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Container maxWidth='lg'>
        <div className={classes.divTitle}>
          <Typography variant='h1' className={classes.title}>
            My Pokedex
          </Typography>
        </div>

        <div className={classes.divSearch}>
          <PokemonSearch
            getPokemon={getPokemon}
            fetchPokemonsByType={fetchPokemonsByType}
            fetchPokemonsByAbility={fetchPokemonsByAbility}
          />
        </div>

        {/* Div que mostra Pokemon pesquisado por Nome ou ID */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!loading && pokemon ? (
            <div
              style={{ display: `${visibleCard}`, justifyContent: 'center' }}
            >
              {console.log(pokemon)}
              <PokemonCard
                pokeName={pokemon.name}
                pokeId={pokemon.id}
                pokeImage={
                  pokemon.sprites.other['official-artwork'].front_default
                }
                pokeTypes={pokemon.types}
                pokeStats={pokemon.stats}
                pokeAbilities={pokemon.abilities}
                pokeMoves={pokemon.moves}
              />
            </div>
          ) : null}
        </div>

        {/* Div que mostra Pokemons pesquisados por tipo */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!loading && pokemonListNamesByType ? (
            <div
              style={{
                display: `${visibleListType}`,
                justifyContent: 'center',
              }}
            >
              <PokemonListTypes
                pokemonListNamesByType={pokemonListNamesByType}
                getPokemon={getPokemon}
              />
            </div>
          ) : null}
        </div>

        {/* Div que mostra Pokemons pesquisados por Abilidade */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!loading && pokemonListNamesByAbility ? (
            <div
              style={{
                display: `${visibleListAbility}`,
                justifyContent: 'center',
              }}
            >
              <PokemonListAbilities
                pokemonListNamesByAbility={pokemonListNamesByAbility}
                getPokemon={getPokemon}
              />
            </div>
          ) : null}
        </div>

        {/* Div que mostra a lista de todos os Pokemons */}
        <div style={{ display: `${visibleListAll}`, justifyContent: 'center' }}>
          {!loading ? (
            <div>
              <PokemonListAll
                pokemonListNames={pokemonListNames}
                getPokemon={getPokemon}
                offset={offset}
              />
              <Pagination
                goNextPage={nextPageUrl ? goNextPage : null}
                goPrevPage={prevPageUrl ? goPrevPage : null}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  divTitle: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
  },
  divSearch: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  divLoading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 72,
  },
  loading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default withRouter(Home);
