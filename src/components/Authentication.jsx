import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

const Authentication = (props) => {

  return (
    <div className='authentication'>
      <BrowserRouter>
        <Route exact path="/">
          <Login isAuthing={props.isAuthing} />
        </Route>
        <Route path="/register">
          <Register isAuthing={props.isAuthing} />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default Authentication;
