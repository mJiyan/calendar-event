import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import routes from './routes';
import './assets/style/tailwind.css';

export const store = configureStore({});
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {routes.map((prop) => (
            <Route exact path={prop.path} component={prop.component} key={prop.path} />
          ))}
        </Switch>
      </Router>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root'),
);
