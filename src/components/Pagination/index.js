import React from 'react';

function Pagination({ goNextPage, goPrevPage }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {goPrevPage && (
        <button onClick={goPrevPage} style={{ margin: 10 }}>
          Anterior
        </button>
      )}
      {goNextPage && (
        <button onClick={goNextPage} style={{ margin: 10 }}>
          Próxima
        </button>
      )}
    </div>
  );
}

export default Pagination;
