function chamaPy(){

    const {PythonShell} = require("python-shell");
    var path = require("path");
    
    var selectBox = document.getElementById("sel");
    var tipo_vela = selectBox.options[selectBox.selectedIndex].value;
    
    var tempo_vela = document.getElementById('tempo').value;

    var opcoes = {
        scriptPath : path.join(__dirname, '../engine/'),
        args : [tipo_vela, tempo_vela]
    }

    var sapmhi_py = new PythonShell('sapmhi_py.py', opcoes);

    sapmhi_py.on('message', function(message){
        document.getElementById('teste').innerHTML = message;
        
    })
}