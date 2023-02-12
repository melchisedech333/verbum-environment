
## Examples

main.html
```html
    <style>
        .window {
            position: absolute;
            top: 10px;
            left: 300px;
            width: 500px;
            height: 400px;
            background-color: gray;
        }
    </style>
    
    Program: <input type="text" id="program" value="thunar" placeholder="program --param" /><br>
    Resolution: <input type="text" id="resolution" value="400x300" /><br>
    Program ID: <input type="text" id="program-id" value="" /><br>
    <button id="open" >open</button>
    <button id="close" >close</button>
    <button id="change-resolution" >change resolution</button>

    <div id="window-content" ></div>

    <!-- Libraries. -->
    <script src='./libraries/jquery/jquery-3.6.3.min.js' ></script>

    <!-- Module: native apps. -->
    <script src='./native-app/main.js' ></script>
```

main.js
```js
var window_id_counter = 0

$(document).ready(() => {
    console.log("Verbum Environment - Iesus Hominum Salvator - Melchisedech333")

    $('#open').on('click', ()=>{
        var settings = {
            name: $('#program').val(),
            resolution: $('#resolution').val(),
            window_id: window_id_counter
        }

        window_id_counter++

        var program = native_app.start(settings)
        $('#program-id').val(program.id)
        console.log(program)

        $('#window-content').append(
            `<div class="window" id="window-id-`+ program.window_id +`" >
                Starting...
            </div>
            `
        )

        setTimeout((program) => {
            var resolution = program.resolution.split('x')
            $('#window-id-'+ program.window_id).css('width', resolution[0] + 'px')
            $('#window-id-'+ program.window_id).css('height', resolution[1] + 'px')
            
            $('#window-id-'+ program.window_id).html(
                `<webview
                    style="display:inline-flex; width: 100%; height:100%;"
                    id="webview-`+ program.window_id +`"
                    src="`+ program.vnc_address +`"
                    data-home="`+ program.vnc_address +`"
                    disablewebsecurity
                 ></webview>`
            )
        }, 3000, program)
    })

    $('#change-resolution').on('click', ()=>{
        var resolution = $('#resolution').val()
        var r = resolution.split('x')
        var program_id = $('#program-id').val()
        var window_id = native_app.get_window_id(program_id)

        $('#window-id-'+ window_id).css('width', r[0] + 'px')
        $('#window-id-'+ window_id).css('height', r[1] + 'px')
        
        native_app.change_resolution(program_id, resolution)
    })

    $('#close').on('click', ()=>{
        var program_name = $('#program').val()
        var program_id = $('#program-id').val()
    })
})
```


