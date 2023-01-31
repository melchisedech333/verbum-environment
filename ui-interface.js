
const { contextBridge, ipcRenderer } = require("electron")
const net = require('net')

contextBridge.exposeInMainWorld(
    "interface_general", {
        restart_application: () => {
            ipcRenderer.send('restart-application', null)
        },

        quit_application: () => {
            ipcRenderer.send('quit-application', null)
        },

        toggle_dev_tools: () => {
            ipcRenderer.send('open-dev-tools', null)
        },

        get_dirname: () => {
            return __dirname
        }
    }
)


