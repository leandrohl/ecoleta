import React, {useState} from 'react';
import './App.css';

// JSX: SINTAXE DE XML(html) DENTRO DO JAVASCRIPT
// COMPONENTE: tudo aquilo que pode replicar na pagina
// obs: todo componente comeca com letra maiuscula
import Header from './Header';

function App() {
  let [counter, setCounter] = useState(0); // [valor do estado, função para atualizar o valor do estado]
  function handleButtonClick(){
    setCounter(counter + 1); 
  }

  return (
      <div>
        <Header title = "Hello World"/> 

        <h1>{counter}</h1>
        <button type="button" onClick={handleButtonClick}>Aumentar</button>
      </div>
  );
}

export default App;
