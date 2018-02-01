import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from './searchBar';
import Results from "./results";
import TopBar from "./topBar";
import BottomBar from "./bottomBar";
const messages = require('./../../app/messages');
const electron = require('electron');
const {ipcRenderer} = require('electron');

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            airlyResponse: {
                address: {
                    locality: "",
                    route: ""
                },
                airQualityIndex: 0
            },
            values: {},
            newTime: ""
        }
    }

    getQueryResult(airlyResponse) {
        let message;
        let pm25;
        let pm10;
        let pollutionLevel;
        let distance;

        if (airlyResponse.pm25 / 2 === airlyResponse.pm25 / 2) {
            pm25 = Math.round(airlyResponse.pm25 / 25 * 100);
        } else {
            pm25 = "--";
        }

        if (airlyResponse.pm10 /2 === airlyResponse.pm10 /2) {
            pm10 = Math.round(airlyResponse.pm10 / 50 * 100);
        } else {
            pm10 = "--";
        }

        if (airlyResponse.distance /2 === airlyResponse.distance /2) {
            distance = Math.round(airlyResponse.distance) / 1000;
        } else {
            distance = "--";
        }

        if(airlyResponse.pollutionLevel / 2 === airlyResponse.pollutionLevel / 2) {
            pollutionLevel = airlyResponse.pollutionLevel;

            if(airlyResponse.pollutionLevel <=2) {
                message = messages.goodQual;
            } else if(airlyResponse.pollutionLevel <= 4) {
                message = messages.mediumQual;
            } else {
                message = messages.lowQual;
            }
        } else {
            message = messages.wrongData;
            pollutionLevel = "--";
        }


        if(typeof airlyResponse.pm25)
        this.setState({
            airlyResponse: airlyResponse,
            values: {
                distance: distance,
                pm25percent: pm25,
                pm10percent: pm10,
                qualityIndex: pollutionLevel,
                message: message
            }
        })

        ipcRenderer.send('response:quality', airlyResponse.pollutionLevel);
    }

    getTime(newTime) {
        this.setState ({
            time: newTime
        })
    }

    render() {
        return (
            <div>
                <TopBar />
                <Results airlyResponse={this.state.airlyResponse} values={this.state.values} status={this.state.status}/>
                <SearchBar passData={e => this.getQueryResult(e)} passTime={e => this.getTime(e)} />
                <BottomBar newTime={this.state.time}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
    );

