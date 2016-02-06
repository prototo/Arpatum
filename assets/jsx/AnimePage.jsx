import React from 'react';
import { Link } from 'react-router';
import Banner from './Banner.jsx';
import TorrentList from './TorrentList.jsx';
import AnimeCountdown from './AnimeCountdown.jsx';

export default React.createClass({
    componentDidMount() {
        $.ajax({
            url: '/anime/' + this.props.params.anime_id,
            dataType: 'json',
            cache: true,
            success: function(data) {
                data.start_date = moment(data.start_date).format('MMMM Do YYYY');
                this.setState({ anime: data });
            }.bind(this)
        });
    },
    render() {
        if (!this.state) {
            return (
                <div className="App">
                    <Banner />
                </div>
            );
        }
        let image = this.state.anime.image_url_banner || this.state.anime.image_url_lge;
        let banner = image ? <Banner image={`url('${image}')`} /> : <Banner />;
        let genres = this.state.anime.genres.map(genre => {
            return <dd>{genre}</dd>;
        });
        return (
            <div className="App">
                {banner}
                <div className="content">
                    <div className="animePage">
                        <h1>{this.state.anime.title_romaji}</h1>
                        <h2>{this.state.anime.title_japanese}{this.state.anime.title_english ? ` / ${this.state.anime.title_english}` : ''}</h2>
                        <div className="details">
                            <div className="misc">
                                <h3>Details</h3>
                                <dl>
                                    <dt>Started</dt>
                                    <dd>{this.state.anime.start_date}</dd>
                                    <dt>Total Episodes</dt>
                                    <dd>{this.state.anime.total_episodes}</dd>
                                    <dt>Airing Status</dt>
                                    <dd>{this.state.anime.airing_status}</dd>
                                    <dt>Average Score</dt>
                                    <dd>{this.state.anime.average_score}</dd>
                                    <dt>Genres</dt>
                                    {genres}
                                    <dt>Airs In</dt>
                                    <AnimeCountdown data={{ airing: this.state.anime.airing, type: 'dd' }} />
                                </dl>
                            </div>
                            <div className="description">
                                <h3>Description</h3>
                                <p>{this.state.anime.description}</p>
                            </div>
                            <TorrentList data={this.props.params} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
