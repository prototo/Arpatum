import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import AnimeList from './AnimeList.jsx';
import AnimePage from './AnimePage.jsx';

render((
    <Router>
        <Route path="/" component={AnimeList} />
        <Route path="/:anime_id" component={AnimePage} />
    </Router>
), document.getElementById('App'))
