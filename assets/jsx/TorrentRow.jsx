import React from 'react';

export default React.createClass({
    render() {
        let group = this.props.data.group ? `[${this.props.data.group}]` : '';
        let title = this.props.data.title ? `${this.props.data.title}` : '';
        let episode = this.props.data.episode ? `${this.props.data.episode}` : '';
        let quality = this.props.data.quality ? `[${this.props.data.quality}]` : '';
        return (<li className="torrentRow">
            <a href={this.props.data.link}>
                {group} {title} - {episode} {quality}
            </a>
        </li>);
    }
});
