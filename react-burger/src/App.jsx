import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/bureger-ingredients/burger-ingredients';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className='wrapper'>
        <BurgerIngredients />

      </div>
    </div>
  );
}

export default App;
