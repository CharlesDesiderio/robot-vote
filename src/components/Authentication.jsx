import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

const Authentication = () => {

  return (
    <div className='authentication'>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
};

export default Authentication;
