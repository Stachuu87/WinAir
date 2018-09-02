const electron = require('electron');
const {app, Menu, BrowserWindow, Tray, globalShortcut, ipcMain, shell} = require('electron');
const apikeys = require('./app/keys');
const messages = require('./app/messages');
const balloonNotifications = require('./app/balloonNotifications');
const settings = require('./app/settings');
const fsHandle = require('./app/fsHandle');

let tray = null;
let window = null;
let lastQual = 0;
let airQuality = 0;

const windowSettings = { 
    show: false,
    resizable: false,
    x: 0,
    y: 0,
    frame: false,
    width: 350,
    height: 550,
    maxWidth: 350,
    maxHeight: 550,
    allwaysOnTop: false,
    minimizable: true
}

process.env.GOOGLE_API_KEY = apikeys.googleAuto;
process.env.NODE_ENV = settings.environment;

app.on('ready', () => {

    tray = new Tray(`${__dirname}/assets/icons/icon.ico`); 
    window = new BrowserWindow(windowSettings);
    window.loadURL(`file://${__dirname}/main.html`);

    fsHandle.readConf();

    ipcMain.on('response:quality', (e, item) => {
        airQuality = item;
        setIcons();
        displayBalloonNotification();
        lastQual = airQuality;
    });

    ipcMain.on('updatenLink:clicked', (e, link) => {
        shell.openExternal(link);
    });

    setIcons = () => {
        if (airQuality == 0) {
            tray.setImage(`${__dirname}/assets/icons/icon.ico`, messages.noData);
            window.setOverlayIcon(null, messages.noData);
            tray.setToolTip(messages.noData);
        } else if (airQuality <= 2) {
            tray.setImage(`${__dirname}/assets/icons/green.ico`);
            window.setOverlayIcon(`${__dirname}/assets/icons/green.ico`, messages.goodQual);
            tray.setToolTip(messages.goodQual);
        } else if(airQuality <= 4) {
            tray.setImage(`${__dirname}/assets/icons/yellow.ico`);
            window.setOverlayIcon(`${__dirname}/assets/icons/yellow.ico`, messages.mediumQual);
            tray.setToolTip(messages.mediumQual);
        } else {
            tray.setImage(`${__dirname}/assets/icons/red.ico`);
            window.setOverlayIcon(`${__dirname}/assets/icons/red.ico`, messages.lowQual);
            tray.setToolTip(messages.lowQual);
        };
    };

    displayBalloonNotification = () => {
        if(process.winair.config.notification == "on") {
            if(lastQual == 0) {
                setBalloonContent(balloonNotifications.title, balloonNotifications.dataReceived);
            } else if(airQuality == 0) {
            } else if(lastQual != airQuality) {
                setBalloonContent(balloonNotifications.title, balloonNotifications.airQualityChanged);
            }
        }
    }

    setBalloonContent = (title, content) => {
        tray.displayBalloon({title: title, content: content});
    }

    setWindowPosition = () => {
        let cursorPosition = electron.screen.getCursorScreenPoint()
        let display = electron.screen.getDisplayNearestPoint(cursorPosition)
        const {width, height} = display.workAreaSize;
        const boundsX = display.bounds.x;
        const boundsY = display.bounds.y;
        const windowPosX = boundsX + width - windowSettings.width - 3;
        const windowPosY = boundsY + height - windowSettings.height;
        window.setPosition(windowPosX, windowPosY);
    }

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click() {
                app.quit()
            }
        }
    ]);

    tray.setToolTip(messages.noData);
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        setWindowPosition();
        process.winair.config.notifications = "off";
        window.isVisible() ? null : window.show();
    });

    window.on('blur', () => {
        if(process.env.NODE_ENV === 'production') {
            process.winair.config.notifications = "on";
            window.hide();
        }
    });

    if(process.env.NODE_ENV === 'production') {
        app.setLoginItemSettings({
            openAtLogin: true
        })
    } else {
        app.setLoginItemSettings({
            openAtLogin: false
        })
    }

    window.on('show', () => {
        setIcons();
    });
});
