const fs = require('fs');

const fsHandle = {
    fpath: `${process.env.APPDATA}/WinAir/Conf`,
    defaultConf: {
        "location": "undefined",
        "locationMode": "auto",
        "notifications": "on"
    },

    readConf: function () {
        fs.readFile(this.fpath, "utf-8", (err, data) => {
            process.winair = process.winair || {};
            if (err) {
                console.log("ReadError: " + err);
                this.writeConf(this.defaultConf);
                process.winair.config = this.defaultConf;
                return
            }
            console.log("File readed: " + this.fpath);
            console.log("Content: " + data);
            process.winair.config = JSON.parse(data);
        });
    },
    
    writeConf: function (object) {
        content = JSON.stringify(object);
        fs.writeFile(this.fpath, content, (err) => {
            if(err) {
                console.log("Write error: " + err)
            }
            console.log("File: " + this.fpath + " saved with following content: " + content);
        })
    }
}

module.exports = fsHandle;