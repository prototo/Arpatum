import React from 'react';
import { Link } from 'react-router'
import AnimeCountdown from './AnimeCountdown.jsx';

export default React.createClass({
    render() {
        var url = `https://anilist.co/anime/${this.props.data.id}`;
        return (
            <div className="animeBox" style={{backgroundImage: 'url('+this.props.data.image_url_lge+')'}}>
                <h2>
                    <Link to={`/${this.props.data.id}`}>
                        {this.props.data.title_romaji}
                    </Link>
                </h2>
                <AnimeCountdown data={this.props.data} />
            </div>
        );
    }
});
