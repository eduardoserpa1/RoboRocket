function queryString(parameter) {  
    var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    var params = loc.split("&");   
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        }   
    }   
    if (param_value) {   
        return param_value;   
    }   
    else {   
        return undefined;   
    }   
}

function conexao_iq(){

    const {PythonShell} = require("python-shell");
    var path = require("path");
    
    var t = 1;

    var opcoes = {
        scriptPath : path.join(__dirname, '../engine/'),
        args : [t]
    }

    var sapmhi_py = new PythonShell('conexao.py', opcoes);

    sapmhi_py.on('message', function(message){
             
        alert(message);

    })
}

var ativo_selecionado = queryString("nomeAtivo");
alert(ativo_selecionado);
conexao_iq();
