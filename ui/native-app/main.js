
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
        window.interface_native_app.start(program)

        return program.id
    }

    get_program_list () {
        return this.programs
    }
}

var native_app = new NativeApp()


