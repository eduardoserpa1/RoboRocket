function chamaPython(){

    var {PythonShell} = require("python-shell")
    var path = require("path")

    var tipo_vela = 5

    var opcoes = {
        scriptPath : path.join(__dirname, '../engine/'),
        args : [tipo_vela]
    }

    var sapmhi_py = new PythonShell('sapmhi_py.py', opcoes);

    sapmhi_py.on('message', function(message){
        swal(message);
    })
}