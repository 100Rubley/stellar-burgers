import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/bureger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className='wrapper'>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
