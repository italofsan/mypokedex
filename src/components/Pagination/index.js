import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Pagination({ goNextPage, goPrevPage }) {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {goPrevPage && (
        <Button onClick={goPrevPage} className={classes.button}>
            Anterior
        </Button>
      )}
      
      {goNextPage && (
        <Button onClick={goNextPage} className={classes.button}>
            Próxima
        </Button>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  button:{
    color: '#FFF',
    backgroundColor: '#e84848',
    '&:hover': {
      backgroundColor: 'rgba(232, 72, 72, 0.9)'
    }, 
    margin: 20
  }
});

export default Pagination;