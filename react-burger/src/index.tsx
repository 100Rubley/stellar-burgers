import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './components/app/app-container';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './services/redusers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend} >
          <AppContainer />
        </DndProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
