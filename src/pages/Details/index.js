import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const Details = ({ history }) => {
  const [pokemon, setPokemon] = useState({});
  const { pokemonName } = useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      const { data } = await api.get(`/${pokemonName}`);
      setPokemon(data);
    };
    fetchPokemon();
  }, [pokemonName]);

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <Button onClick={history.goBack}>Voltar</Button>
    </div>
  );
};

export default Details;
