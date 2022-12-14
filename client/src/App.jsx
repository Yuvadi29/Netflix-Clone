import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signnup from './pages/Signnup';
import Netflix from './pages/Netflix';
import Player from './pages/Player';
import Movies from './pages/Movies';
import Tv from './pages/Tv';
import UserList from './pages/UserList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<Netflix/>}/>
        <Route exact path="/login" element = {<Login/>}/>
        <Route exact path="/signup" element = {<Signnup/>}/>
        <Route exact path="player" element = {<Player/>}/>
        <Route exact path="/movies" element = {<Movies/>}/>
        <Route exact path="/tv" element = {<Tv/>}/>
        <Route exact path="/mylist" element = {<UserList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App