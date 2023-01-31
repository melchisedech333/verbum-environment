
class NativeApp {
    programs = []

    constructor () {
        console.log("Module: NativeApp started.")
    }

    start (program) {
        program.id = 10 + this.programs.length
        program.rfbport = 10000 + this.programs.length
        program.vncport = 20000 + this.programs.length
        program.active = true
        program.vnc_address = 'http://localhost:'+ program.vncport +
            '/vnc.html?autoconnect=true'
        program.geometry = program.resolution.split('x')

        this.programs.push(program)
        this.send_command(program)
        return program
    }

    get_program_list () {
        return this.programs
    }

    send_command (program) {
        var dirname = window.interface_general.get_dirname()
        var param = 
            'path='+ dirname +'/ui/native-app/container/start-container.sh&'+
            'vnc='+ dirname +'/../dependencies/noVNC-1.4.0/utils/novnc_proxy&'+
            'id='+ program.id +'&'+
            'resolution='+ program.resolution +'&'+
            'name='+ program.name +'&'+
            'rfbport='+ program.rfbport +'&'+
            'vncport='+ program.vncport

        $.get('http://localhost:1337?'+ param, (data) => {
            console.log(data)
        })
    }
}

var native_app = new NativeApp()

// Search window:
// xwininfo -display :10 -root -children | grep "thunar" | grep $(whoami)
// xwininfo -display :10 -id 0x600007 # show width, height
// or...
// xprop _NET_WM_OPAQUE_REGION -display :10 -id 0x600007 # show width, height

// Change size:
// export DISPLAY=:10
// xdotool windowsize WINDOW-ID WIDTH HEIGHT

// Search windows and change size:
// xwininfo -display :10 -root -children | grep thunar | grep $(whoami) | sed 's/[^0-9 x]//g' | awk '{ system("export DISPLAY=:10; xdotool windowsize " $1 " 333 333") }'

