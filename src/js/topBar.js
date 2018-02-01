import React, {Component} from "react";
import { clearInterval, setTimeout } from "timers";
const electron = require('electron');
const {ipcRenderer} = require('electron');

const version = require('../../package.json').version;
const settings = require('../../app/settings.js');

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'online',
            className: 'toolbar bg-green-500 color-white c-topbar',
            updateAvailable: true
        }
    }

    componentDidMount() {
        this.setState({
            presentVersion: version,
            latestVersion: version
        })

        this.checkConnection();
        this.checkForUpdates();
        var checkConnection = setInterval(() => {
            this.checkConnection();
        }, settings.intervals.onlineStatus);

        var checkUpdates = setInterval(() => {
            this.checkForUpdates();
        }, settings.intervals.updates)
    }

    componentWillUnmount() {
        clearInterval(this.checkConnection);
        clearInterval(this.checkUpdates);
        clearTimeout(this.delayChecks);
    }

    checkConnection() {
        if (navigator.onLine) {
            this.setState({
                status: 'online',
                className: 'toolbar bg-green-500 color-white c-topbar'
            })
        } else {
            this.setState({
                status: 'offline',
                className: 'toolbar bg-red-500 color-white c-topbar'
            })
        }
    }

    checkForUpdates() {
        fetch(settings.updateUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result[0]) {
                        result.sort((a, b) => {
                            return b.id - a.id
                        });
                        this.setState({
                            latestVersion: result[0].tag_name
                        }, this.notifyUpdate);
                    } else {
                        this.setState({
                            latestVersion: this.state.presentVersion
                        }, this.notifyUpdate);
                    }
                },
                (error) => {
                }
             )
    }

    notifyUpdate() {
        if (this.state.latestVersion != this.state.presentVersion) {
            this.setState({
                updateAvailable: true
            })
        } else {
            this.setState({
                updateAvailable: false
            })
        }
    }

    handleUpdateLinkClick() {
        ipcRenderer.send('updatenLink:clicked', settings.downloadUpdateUrl);
    }
    
    render () {
        if(!this.state.updateAvailable) {
            return (
                <div className={this.state.className}><i className="icon-cloud"></i> WinAir <span className="c-topbar__status">{this.state.status} <i className=" icon-wifi-tethering"></i></span></div>
            )
        } else {
            return (
                <div className={this.state.className}><i className="icon-cloud"></i> WinAir <a onClick={this.handleUpdateLinkClick} target="_blank" className="c-topbar__update">Pobierz nową wersję <i className="icon-file-download"></i></a></div>
            )
        }

    }
}

module.exports = TopBar;