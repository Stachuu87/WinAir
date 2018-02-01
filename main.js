const electron = require('electron');
const {app, Menu, BrowserWindow, Tray, globalShortcut, ipcMain, shell} = require('electron');
const apikeys = require('./app/keys');
const messages = require('./app/messages');
const balloonNotifications = require('./app/balloonNotifications');
const settings = require('./app/settings');

let tray = null;
let window = null;
let x = 0;
let y = 0;
let frames = false;
let airQuality = 0;
let lastQual = 0;
let windowW = 350;
let windowH = 550;

process.env.GOOGLE_API_KEY = apikeys.googleAuto;
process.env.NODE_ENV = settings.environment;;

app.on('ready', () => {

    const {screen} = require('electron');

    tray = new Tray(`${__dirname}/assets/icons/icon.ico`);
    window = new BrowserWindow({show: false, frame: frames, resizable: false, width: windowW, height: windowH, maxHeight:550, maxWidth:350, x:x, y:y, alwaysOnTop: false, minimizable: true});
    window.loadURL(`file://${__dirname}/main.html`);

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
        if(lastQual == 0) {
            setBalloonContent(balloonNotifications.title, balloonNotifications.dataReceived);
        } else if(airQuality == 0) {
        } else if(lastQual != airQuality) {
            setBalloonContent(balloonNotifications.title, balloonNotifications.airQualityChanged);
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
        const windowPosX = boundsX + width - windowW - 3;
        const windowPosY = boundsY + height - windowH;
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
        window.isVisible() ? null : window.show();
    });

    window.on('blur', () => {
        if(process.env.NODE_ENV === 'production') {
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
