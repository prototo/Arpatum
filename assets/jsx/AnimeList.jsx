import React from 'react';
import Banner from './Banner.jsx';
import AnimeBox from './AnimeBox.jsx';

export default React.createClass({
   getInitialState() {
       return { data: [] };
   },
   componentDidMount() {
       $.ajax({
           url: '/airing',
           dataType: 'json',
           cache: true,
           success: function(data) {
               // sort in order of average score descending
               var animes = data.sort((a, b) => {
                   return parseFloat(b.average_score) - parseFloat(a.average_score);
               });
               this.setState({ data: animes });
           }.bind(this)
       });
   },
   render() {
       var animeBoxes = this.state.data.map(anime => {
           return (
               <AnimeBox data={anime} key={anime.id} />
           );
       });
       return (
           <div className="App">
               <Banner />
               <div className="content">
                   <div className="animeList">
                       {animeBoxes}
                   </div>
               </div>
           </div>
       );
   }
});
