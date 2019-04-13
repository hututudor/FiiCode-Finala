import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as auth from './services/authService';
import * as token from './services/tokenService';
import App from './App';
import actions from './redux/actions';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './components/Auth/style.scss';

window.store = store;

const rend = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

if (token.exists()) {
  auth
    .getUser()
    .then(res => {
      store.dispatch(actions.auth.updateUser({ auth: true, ...res.data.user }));
      rend();
    })
    .catch(err => {
      rend();
      token.remove();
    });
} else {
  rend();
}