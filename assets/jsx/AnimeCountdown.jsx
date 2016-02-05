import React from 'react';

export default React.createClass({
    getInitialState() {
        if (this.props.data.airing) {
            let air_time = moment(this.props.data.airing.time);
            return {
                air_time: air_time,
                duration: this.getDurationString(air_time)
            };
        }
        return { duration: '' };
    },
    getDurationString(air_time) {
        air_time = air_time || this.state.air_time;
        if (air_time) {
            var diff = air_time.diff();
            var duration = moment.duration(diff);
            if (duration.days() > 0) {
                return air_time.fromNow(true);
            }
            return moment(diff).format('HH:mm:ss');
        }
    },
    updateDurationString() {
        this.setState({ duration: this.getDurationString() });
    },
    componentDidMount() {
        this.interval = setInterval(this.updateDurationString, 1000);
    },
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    },
    render() {
        if (this.props.data.type && this.props.data.type === 'dd') {
            return (
                <dd>{this.state.duration}</dd>
            )
        }
        return (
            <div className="animeCountDown">
                Airs in {this.state.duration}
            </div>
        )
    }
});
