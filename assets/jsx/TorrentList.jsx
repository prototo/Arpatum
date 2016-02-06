import React from 'react';
import TorrentRow from './TorrentRow.jsx';

export default React.createClass({
    getInitialState() {
        return { torrents: 0 };
    },
    componentDidMount() {
        $.ajax({
            url: '/anime/' + this.props.data.anime_id + '/torrents',
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.setState({ torrents: data.length ? data : -1 });
            }.bind(this),
            error: function(data) {
                this.setState({ torrents: -1 });
            }.bind(this)
        });
    },
    render() {
        let torrent_rows;
        switch (this.state.torrents) {
            case -2:
                torrent_rows = "Nyaa is probably broken again";
                break;
            case -1:
                torrent_rows = "No torrents!";
                break;
            case 0:
                torrent_rows = "Loading torrents...";
                break;
            default:
                torrent_rows = this.state.torrents.map(torrent => {
                    return <TorrentRow data={torrent} />
                });
        }
        return (
            <div className="torrentList">
                <h3>Torrents</h3>
                <ul>
                    {torrent_rows}
                </ul>
            </div>
        )
    }
});
