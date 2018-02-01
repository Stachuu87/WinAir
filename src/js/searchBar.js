import React, { Component } from "react";
import ReactDOM from "react-dom";
import apikeys from '../../app/keys.js';
import { clearInterval } from "timers";
const settings = require ('../../app/settings');

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {},
            city: "",
            route: "",
            autoLocation: true,
            airQualityIndex: 0,
            locationName: "",
            newLocation: "",
            lat: null,
        }
    };

    componentDidMount() {
            this.getAutoLocation();
            this.refreshData = setInterval(() => {
                if (this.state.lat != null) {
                    this.getAirlyData(this.state.lat, this.state.lng);
                } else {
                    this.getAutoLocation();
                }
            }, settings.intervals.airly)
    }

    componentWillUnmount() {
        clearInterval(this.refreshData);
    }

    getAutoLocation(fetchData) {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        var success = (pos) => {
            var crd = pos.coords;
            this.setState({
                lat: crd.latitude,
                lng: crd.longitude,
            })
            this.getAirlyData(this.state.lat, this.state.lng);
        };
        var error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    getAirlyData(lat, lng) {
        fetch(`https://airapi.airly.eu/v1/nearestSensor/measurements?latitude=${lat}&longitude=${lng}&maxDistance=9999`, {method: 'GET', headers:{
            'apikey': apikeys.airly
        } })
        .then(res => res.json())
        .then(
            (result) => {
                if(typeof this.props.passData === 'function') {
                    this.props.passData(result);
                }
                this.setTime()
                if(result.address.locality && result.address.route) {
                    this.setState({
                        locationName: `${result.address.locality}, ${result.address.route}`
                    })
                }
            },
            (error) => {
                this.setState({
                    error
                })
            }
        )
    }

    setTime() {
        var date = new Date();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if(seconds < 10) {
            seconds = "0" + seconds.toString();
        }
        if(minutes < 10) {
            minutes = "0" + minutes.toString();
        }
        var timeNow = date.getHours() + ":" + minutes + ":" + seconds;

        if(typeof this.props.passTime === 'function') {
            this.props.passTime(timeNow);
        }
    }

    catchLocationName(e) {
        this.setState({
            locationName: e.target.value
        })
    }

    handleSearchFormSubmit(e) {
        e.preventDefault();
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.locationName}&key=${apikeys.googleMan}`)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.status == "OK") {
                    this.setState({
                        lat: result.results[0].geometry.location.lat,
                        lng: result.results[0].geometry.location.lng
                    })
                    this.getAirlyData(this.state.lat, this.state.lng);
                }
            },
            (error) => {
                this.setState({
                    error
                })
            }
        )
    }

    render() {
        return (
            <div className="c-searchBar">
                <form className="c-searchBar__form">
                    <div className="text-input-container c-searchBar__inputContainer">
                        <i className="icon-location text-input-icon"></i>
                        <input className="text-input border-green-500" type="text" placeholder={this.state.locationName} onChange={e => this.catchLocationName(e)} />
                    </div>
                    <button className="fab bg-green-500 color-yellow small" type="submit" value="Szukaj" onClick={e => this.handleSearchFormSubmit(e)}><i className="icon-check"></i></button>
                </form>
                <button onClick={e => this.getAutoLocation(e)} className="fab bg-yellow-500 color-yellow small c-searchBar__gpsButton"><i className="icon-gps-fixed"></i></button>
            </div>
        )
    }
}

module.exports = SearchBar;