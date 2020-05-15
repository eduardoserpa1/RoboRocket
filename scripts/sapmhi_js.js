function chamaPy(){

    const {PythonShell} = require("python-shell");
    var path = require("path");
    
    var select = document.getElementById('vela');
    var tipo_vela = select.options[select.selectedIndex].value;
    var tempo_vela = document.getElementById('tempo').value;

    var opcoes = {
        scriptPath : path.join(__dirname, '../engine/'),
        args : [tipo_vela, tempo_vela]
    }

    var sapmhi_py = new PythonShell('sapmhi_py.py', opcoes);

    sapmhi_py.on('message', function(message){
        alert(message);
        
    })
}