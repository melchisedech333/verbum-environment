
$(document).ready(() => {
    console.log("Verbum Environment - Iesus Hominum Salvator - Melchisedech333")

    $('#open').on('click', ()=>{
        var settings = {
            program: $('#program').val(),
            resolution: $('#resolution').val(),
            window_id: 'window-id-1'
        }

        var program_id = native_app.start(settings)

        $('#program-id').val(program_id)
        console.table(native_app.get_program_list())
    })

    $('#close').on('click', ()=> {

    })
})


