
var window_id_counter = 0

$(document).ready(() => {
    console.log("Verbum Environment - Iesus Hominum Salvator - Melchisedech333")

    $('#open').on('click', ()=>{
        var settings = {
            name: $('#program').val(),
            resolution: $('#resolution').val(),
            window_id: 'window-id-'+ window_id_counter
        }

        window_id_counter++

        var program = native_app.start(settings)
        console.log(program)

        $('#window-content').append(
            `<div class="window" id="window-id-`+ program.window_id +`" >
                Starting...
            </div>
            `
        )

        setTimeout((program) => {
            $('#window-id-'+ program.window_id).html(
                `<webview
                    style="display:inline-flex; width: `+ program.geometry[0] +`px; height:`+ program.geometry[1] +`px;"
                    id="webview-`+ program.window_id +`"
                    src="`+ program.vnc_address +`"
                    data-home="`+ program.vnc_address +`"
                    disablewebsecurity
                 ></webview>`
            )
        }, 3000, program)
    })
})


