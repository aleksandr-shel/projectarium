import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout';
import Main from '../features/Main/Main';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='*' element={<div>Not found</div>}/>
          <Route index element={<Main/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
