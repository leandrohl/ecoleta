import React from 'react';
import ReactDOM from 'react-dom'; //integrar o react com o dom
import App from './App';

// primeiro arquivo carregado pelo react 

ReactDOM.render( //o react mostra na tela o arquivo app dentro da div root 
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);
