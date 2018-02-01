import React, { Component } from "react";
import ReactDOM from "react-dom";
import NoData from "./nodata";
import Offline from "./offline";

class Results extends Component {
    constructor(props){
        super(props);
    }

    render() {
        if(navigator.onLine) {
            if(this.props.airlyResponse.address) {
                return (
                    <div className="c-results">
                        <h2 className="c-results__header">Lokalizacja najbliższego czujnika to:</h2>
                        <p className="c-results__location">{this.props.airlyResponse.address.locality}, {this.props.airlyResponse.address.route} <i className="icon-location"></i>{this.props.values.distance} km</p>
                        <div className="c-results__measurements">
                            <div className="c-results__pm">
                                <span className="c-results__pmHeader">PM 2.5</span>
                                <span className="c-results__percentageValue">{this.props.values.pm25percent} %</span>
                            </div>
                            <div className="c-results__pm">
                                <span className="c-results__pmHeader">PM 10</span>
                                <span className="c-results__percentageValue">{this.props.values.pm10percent} %</span>
                            </div>
                        </div>
                        <div className="c-results__summary">
                            <h2 className="c-results__header">Ogólna klasa czystości powietrza:</h2>
                            <span className="c-results__qualityIndex">{this.props.values.qualityIndex}</span>
                        </div>
                        <p className="o-results__message">{this.props.values.message}</p>

                    </div>
                )
            } else {
                return (
                    <NoData />
                )
            }
        } else {
            return (
                <Offline />
            )
        }
    }
}

module.exports = Results;

