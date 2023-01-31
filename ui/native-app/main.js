
class NativeApp {
    programs = []

    constructor () {
        console.log("Module: NativeApp started.")
    }

    start (program) {
        program.id = 10 + this.programs.length
        program.rfbport = 10000 + this.programs.length

        program.active = true

        this.programs.push(program)
        this.send_command(program)
        return program.id
    }

    get_program_list () {
        return this.programs
    }

    send_command (program) {
        var dirname = window.interface_general.get_dirname()
        var param = 
            'path='+ dirname +'/ui/native-app/container/start-container.sh&'+
            'id='+ program.id +'&'+
            'resolution='+ program.resolution +'&'+
            'name='+ program.name +'&'+
            'rfbport='+ program.rfbport

        $.get('http://localhost:1337?'+ param, (data) => {
            console.log(data)
        })
    }
}

var native_app = new NativeApp()


