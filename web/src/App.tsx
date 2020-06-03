import React from 'react';
import './App.css';

// JSX: SINTAXE DE XML(html) DENTRO DO JAVASCRIPT
// COMPONENTE: tudo aquilo que pode replicar na pagina
// obs: todo componente comeca com letra maiuscula

import Home from './pages/Home';

function App() {
  return (
      <div>
        <Home />
      </div>
  );
}

export default App;
