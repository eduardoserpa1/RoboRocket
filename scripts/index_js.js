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
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
function sleepjs(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

function envia_innerhtml(tipo_conta,saldo,email){
    document.getElementById("tipo_conta").innerHTML = tipo_conta;   
    document.getElementById("saldo").innerHTML = saldo;
    document.getElementById("email").innerHTML = email;
}
function conexao_iq(tipo_conta){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");
    
    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [tipo_conta]
    }

    var pypy = new PythonShell('conexao.py', opcoes);

    pypy.on('message', function(message){
        var aux = message.split(",");
        email = aux[0];
        saldo = aux[1];

        envia_innerhtml(tipo_conta,saldo,email);
        document.getElementById("avisos").innerHTML = "Dados carregados com sucesso!";

    })
}



function main_code(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado]
    }

    var sapmhi_py = new PythonShell('main_code.py', opcoes);

    sapmhi_py.on('message', function(message){
        console.log("Entrada  ---  "+message);
        ordem_executada = message + "";
    })
}
function main_code_mg1(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada]
    }

    var sapmhi_py = new PythonShell('main_code_mg1.py', opcoes);

    sapmhi_py.on('message', function(message){
        
        if (message=='win') {
            verificador_win=true;
            console.log("--- WIN ---");
        }else{
            verificador_win=false;
            console.log("loss - gale 1");
        }
    })
}
function main_code_mg2(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada]
    }

    var sapmhi_py = new PythonShell('main_code_mg2.py', opcoes);

    sapmhi_py.on('message', function(message){
        console.log("resultado  ---  "+message);
        if (message=='win') {
            verificador_win_mg1=true;
            console.log("--- WIN MG1 ---");
        }else{
            verificador_win_mg1=false;
            console.log("loss - gale 2");
        }
    })
}
function main_code_verifica(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada]
    }

    var sapmhi_py = new PythonShell('main_code_verifica.py', opcoes);

    sapmhi_py.on('message', function(message){
        console.log("R:"+message);
        
    })
}
//------------------------------------
//Funções da interface

function trocaTipoConta(){
    var elemento_html = document.getElementById('troca_tipo_conta').innerHTML;

    if (elemento_html == "TROCAR PARA REAL") {
        tipo_conta = "REAL";
        document.getElementById('troca_tipo_conta').innerHTML = "TROCAR PARA PRACTICE";
        document.getElementById('tipo_conta').innerHTML = "REAL";
    }else{
        tipo_conta = "PRACTICE";
        document.getElementById('troca_tipo_conta').innerHTML = "TROCAR PARA REAL";
        document.getElementById('tipo_conta').innerHTML = "PRACTICE";
    }
    console.log(tipo_conta);
    conexao_iq(tipo_conta);
    
}
function calculaStop_w(valor){
    var radio;
    valor = parseFloat(valor);
    if (document.getElementById('porcento').checked == true) {
        radio = 'porcento';
    }
    if (document.getElementById('valor').checked == true) {
        radio = 'valor';
    }
    
    if (radio == 'porcento') {
        var porcento = parseFloat(valor/100);
        var qtd_aumento = parseFloat(saldo*porcento);
        var r = parseFloat(parseFloat(saldo) + parseFloat(qtd_aumento));
        document.getElementById('total_stop_win').innerHTML = r.toFixed(2) + "  -  Lucro: $"+qtd_aumento.toFixed(2);
        stop_win = r.toFixed(2);
    }
    if (radio == 'valor') {
        var r = parseFloat(parseFloat(saldo) + parseFloat(valor));
        document.getElementById('total_stop_win').innerHTML = r.toFixed(2);
        stop_win = r.toFixed(2);
    }
}
function calculaStop_l(valor){
    var radio;
    valor = parseFloat(valor);
    if (document.getElementById('porcento').checked == true) {
        radio = 'porcento';
    }
    if (document.getElementById('valor').checked == true) {
        radio = 'valor';
    }
    
    if (radio == 'porcento') {
        var porcento = parseFloat(valor/100);
        var qtd_aumento = parseFloat(saldo*porcento);
        var r = parseFloat(saldo-qtd_aumento);
        document.getElementById('total_stop_loss').innerHTML = r.toFixed(2) + "  -  Prejuizo: $"+qtd_aumento.toFixed(2);
        stop_loss = r.toFixed(2);
    }
    if (radio == 'valor') {
        var r = parseFloat(saldo-valor);
        document.getElementById('total_stop_loss').innerHTML = r.toFixed(2);
        stop_loss = r.toFixed(2);
    }
}

//------------------------------------
//Globais referente aos campos da interface
var ativo_selecionado = "EURUSD-OTC"//queryString("nomeAtivo");
var tipo_conta = "PRACTICE";                                
var email;
var saldo;
var stop_win;
var stop_loss;
var ganhos=0;
var delay=0;
//-----referentes às estratégias 
var e1=0;
var e2=0;
var e3=0;
//Globais referente ao funcionamento interno do software
var limite = 5000;
var executa;
var orientador=0;
var diferenciador = false;
var diferenciador_mg1 = false;
var diferenciador_mg2 = false;
var verificador_win = false;
var verificador_win_mg1 = false;

var tipo_vela;
var ordem_executada="";
//Determinações iniciais 
document.getElementById("avisos").innerHTML = "Carregando dados da conta...";
document.getElementById('stop_win').value = 0;
document.getElementById('stop_loss').value = 0;
conexao_iq(tipo_conta);


//------------------------------------
/*executa = setInterval(function() {
    var date = new Date();
    var min = date.getMinutes();
    console.log("orientador: "+orientador++);


    
    if(min%5==4 && orientador>12){
        if(diferenciador==false){
            console.log("ENTRADA DISPARADA"); 

            diferenciador=true;
        }
    }else{
        diferenciador = false;
    }

},
limite);*/

function inicia(){  



if (document.getElementById('m1').checked==true) {tipo_vela=60}
if (document.getElementById('m5').checked==true) {tipo_vela=300}

if(document.getElementById('mg').checked == true){
    executa = setInterval(function() {
        var date = new Date();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        //orientador++;
        //console.log("orientador: "+orientador);

        var e1 = document.getElementById('entrada').value;
        var e2 = document.getElementById('mg1').value;
        var e3 = document.getElementById('mg2').value;
        e1 = parseFloat(e1)
        e2 = parseFloat(e2)
        e3 = parseFloat(e3)


    if(min%5==4){
        if(diferenciador==false){
            
            diferenciador=true; 
            main_code();
            
        }
    }

    if (min%5==0 && sec>20 && diferenciador_mg1==false) {
        if (diferenciador==true) {
            main_code_mg1();
            diferenciador_mg1=true;
            
        }
    }
/*
    if (diferenciador == true && diferenciador_mg1==true) {
        if (verificador_win==false) {
            if(diferenciador_mg2==false){
                main_code_mg2();
                diferenciador_mg2=true;
            }
        }
    }
*/

    if (min%5==3) {
        diferenciador=false;
        diferenciador_mg1=false;
        diferenciador_mg2=false;
        verificador_win=false;
        verificador_win_mg1=false;

    }


},
limite);
}

}


function para(){
    clearInterval(executa);
}




    



