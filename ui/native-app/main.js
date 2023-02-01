
class NativeApp {
    gateway = 'http://localhost:1337?'
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
            '/vnc_lite.html?autoconnect=true'
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
            'action=start&'+ 
            'path='+ dirname +'/ui/native-app/container/start-container.sh&'+
            'vnc='+ dirname +'/../dependencies/noVNC-1.4.0/utils/novnc_proxy&'+
            'id='+ program.id +'&'+
            'resolution='+ program.resolution +'&'+
            'name='+ program.name +'&'+
            'rfbport='+ program.rfbport +'&'+
            'vncport='+ program.vncport

        $.get(this.gateway + param, (data) => {
            console.log(data)
        })
    }

    change_resolution (program_id, resolution) {
        var dirname = window.interface_general.get_dirname()
        var program_name = ''

        for (var a=0; a<this.programs.length; a++) {
            if (this.programs[a].id == program_id) {
                program_name = this.programs[a].name
                break
            }
        }

        var param = 
            'action=change-resolution&'+
            'path='+ dirname +'/ui/native-app/container/set-resolution.sh&'+
            'id='+ program_id +'&'+
            'resolution='+ resolution +'&'+
            'name='+ program_name

        $.get(this.gateway + param, (data) => {
            console.log(data)
        })
    }

    get_window_id (program_id) {
        var window_id = -1

        for (var a=0; a<this.programs.length; a++) {
            if (this.programs[a].id == program_id) {
                window_id = this.programs[a].window_id
                break
            }
        }

        return window_id
    }
}

var native_app = new NativeApp()


