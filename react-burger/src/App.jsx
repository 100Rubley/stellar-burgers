import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/bureger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { API_URL } from './utils/constants'

function App() {
  const [data, setData] = React.useState()
  React.useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <AppHeader />
      {/* тут ниже пытался засунуть в одно условие, ла-ла ? отрисуй два компонента : загрузка
      но получается, что через логическое && отрисовывается тот, кто вернул true последним, а как оба компонента отрисовать - туплю
      по-этому код продублировал */}
      <div className='wrapper'>
        {
          data
            ? <BurgerIngredients data={data} /> 
            : <div>Loading...</div>
        }
        {
          data
          ? <BurgerConstructor data={data} />
          : <div>Loading...</div>
        }
      </div>
    </div>
  );
}

export default App;
