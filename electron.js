const {app, BrowserWindow} = require('electron'); // I use electron globally: npm i -g electron
const url = require('url');
const path = require('path');

let win = null;

app.on('ready', function () {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({width: 1000, height: 600});


    // Specify entry point to default entry point of vue.js

    // serve from development server
    // win.loadURL('http://maxbook.local:8003');

    // serve from build folder
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'hbud.app-v.build/index.html'),
        protocol: 'file:',
        slashes: true
    }));


    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });

});

//create the application window if the window variable is null
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

//quit the app once closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
