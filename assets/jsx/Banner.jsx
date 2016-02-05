import React from 'react';
import { Link } from 'react-router'

export default React.createClass({
    render() {
        if (this.props.image) {
            return (
                <header style={{ backgroundImage: this.props.image }}>
                    <h1><Link to={'/'}>Apartum</Link></h1>
                </header>
            )
        }
        return (
            <header>
                <h1><Link to={'/'}>Apartum</Link></h1>
            </header>
        );
    }
});
