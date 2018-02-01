import React, {Component} from "react";

class BottomBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <div className="toolbar bg-green-500 color-white c-bottomBar">powered by Airly <span className="c-bottomBar__lastUpdate">czas pomiaru: {this.props.newTime}</span></div>
        )
    }
}

module.exports = BottomBar;