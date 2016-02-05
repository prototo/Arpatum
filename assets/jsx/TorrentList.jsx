import React from 'react';
import TorrentRow from './TorrentRow.jsx';

export default React.createClass({
    getInitialState() {
        return { torrents: [] };
    },
    componentDidMount() {
        $.ajax({
            url: '/anime/' + this.props.data.anime_id + '/torrents',
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.setState({ torrents: data });
            }.bind(this)
        });
    },
    render() {
        var torrent_rows = this.state.torrents.map(torrent => {
            return <TorrentRow data={torrent} />
        });
        return (
            <ul className="torrentList">
                {torrent_rows}
            </ul>
        )
    }
});
