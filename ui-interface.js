
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
    }
)

contextBridge.exposeInMainWorld(
    "interface_native_app", {
        start: (settings) => {
            ipcRenderer.send('native-app-start', settings)
        }
    }
)


