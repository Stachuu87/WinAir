import React, {Component} from 'react';

class Offline extends Component {
    render() {
        return (
            <div>
                <h1 className="c-alert--offline"><i className="icon-sync-problem"></i>Jesteś offline</h1>
            </div>
        )
    }
}

module.exports = Offline;