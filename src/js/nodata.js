import React, {Component} from "react";

class NoData extends Component {
    render() {
        return(
            <div>
                <h2 className="c-alert__nodata"><i className="icon-report"></i>Nie znaleźliśmy czujnika w Twojej okolicy, lub jest czasowo nieaktywny</h2>
            </div>
        )
    }
}

module.exports = NoData;