const electron = require('electron');
const {app, Menu, BrowserWindow, Tray, globalShortcut, ipcMain} = require('electron');
const apikeys = require('./keys');
const messages = require('./messages');
const balloonNotifications = require('./balloonNotifications');
const settings = require('./settings');

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

    tray = new Tray(`${__dirname}/../assets/icons/icon.ico`);
    window = new BrowserWindow({show: false, frame: frames, resizable: false, width: windowW, height: windowH, x:x, y:y, alwaysOnTop: false, minimizable: true});
    window.loadURL(`file://${__dirname}/main.html`);

    ipcMain.on('response:quality', function(e, item){
        airQuality = item;
        setIcons();
        displayBalloonNotification();
        lastQual = airQuality;
    });

    function setIcons() {
        if (airQuality == 0) {
            tray.setImage(`${__dirname}/../assets/icons/icon.ico`, messages.noData);
            window.setOverlayIcon(null, messages.noData);
            tray.setToolTip(messages.noData);
        } else if (airQuality <= 2) {
            tray.setImage(`${__dirname}/../assets/icons/green.ico`);
            window.setOverlayIcon(`${__dirname}/../assets/icons/green.ico`, messages.goodQual);
            tray.setToolTip(messages.goodQual);
        } else if(airQuality <= 4) {
            tray.setImage(`${__dirname}/../assets/icons/yellow.ico`);
            window.setOverlayIcon(`${__dirname}/../assets/icons/yellow.ico`, messages.mediumQual);
            tray.setToolTip(messages.mediumQual);
        } else {
            tray.setImage(`${__dirname}/../assets/icons/red.ico`);
            window.setOverlayIcon(`${__dirname}/../assets/icons/red.ico`, messages.lowQual);
            tray.setToolTip(messages.lowQual);
        };
    };

    function displayBalloonNotification() {
        if(lastQual == 0) {
            setBalloonContent(balloonNotifications.title, balloonNotifications.dataReceived);
        } else if(airQuality == 0) {
        } else if(lastQual != airQuality) {
            setBalloonContent(balloonNotifications.title, balloonNotifications.airQualityChanged);
        }
    }

    function setBalloonContent(title, content) {
        tray.displayBalloon({title: title, content: content});
    }

    function setWindowPosition() {
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

    const mainMenu = Menu.buildFromTemplate([
        {}
    ])

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
        window.setMenu(mainMenu);
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
