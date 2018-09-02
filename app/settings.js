let settings = {
    intervals: {
        airly: 10*60*1000,
        onlineStatus: 2*60*1000,
        updates: 2*60*60*1000
    },
    environment: 'production',
    updateUrl:'https://api.github.com/repos/Stachuu87/winair/releases',
    downloadUpdateUrl: 'https://github.com/Stachuu87/WinAir/releases'
}

module.exports = settings;