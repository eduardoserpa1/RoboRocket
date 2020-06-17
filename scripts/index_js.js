//------------------------------------
//Funções e ferramentas da linguagem
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

//------------------------------------
//Funções de verificação     interface/funcionamento

function envia_innerhtml(tipo_conta,saldo,email,ativo,profit){
    document.getElementById("tipo_conta").innerHTML = tipo_conta;   
    document.getElementById("saldo").innerHTML = saldo;
    document.getElementById("email").innerHTML = email;
    document.getElementById("ativo").innerHTML = ativo;
    document.getElementById("profit").innerHTML = profit*100 + "%";
}
function conexao_iq(tipo_conta){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");
    
    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [tipo_conta, ativo_selecionado]
    }

    var pypy = new PythonShell('conexao.py', opcoes);

    pypy.on('message', function(message){
        var aux = message.split(",");
        email = aux[0];
        saldo = aux[1];
        profit = aux[2];

        envia_innerhtml(tipo_conta,saldo,email,ativo_selecionado,profit);
        document.getElementById("avisos").innerHTML = "Dados carregados com sucesso!";

    })
}
function gera_ganho(){
    ganhos = parseFloat(saldo) - parseFloat(saldo_inicial);
    document.getElementById('ganhos').innerHTML = ganhos.toFixed(2);
}
function verifica_stop(){
    conexao_iq(tipo_conta);
    var stop_w = parseFloat(stop_win);
    var stop_l = parseFloat(stop_loss);

     if (stop_w<=saldo) {
         para();
         console.log("XXXXXXXXXXX   STOP WIN   XXXXXXXXXXX");
     }

     if (stop_l>=saldo) {
        para();
        console.log("XXXXXXXXXXX   STOP LOSS   XXXXXXXXXXX");
     }

     gera_ganho();
     
}


//------------------------------------
//Funções de entradas
//MG
function main_code(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code.py', opcoes);

    sapmhi_py.on('message', function(message){
        console.log("1 Entrada");
        ordem_executada = message + "";
        sleep(10000).then(() => {
            verifica_stop();
        });
    })
}
function main_code_mg1(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg1.py', opcoes);

    sapmhi_py.on('message', function(message){
        
        if (message=='win') {
            verificador_win=true;
            console.log("--- WIN ---");
            
            verificador_win=true;
        }
        if(message=="loss"){
            verificador_win=false;
            console.log("MG1");
           
            verificador_win=false;
        }
        if(message=="lossmg0"){
            verificador_win=true;
            console.log("XXX LOSS XXX");
           
            verificador_win=true;
        }

        sleep(10000).then(() => {
            verifica_stop();
        });

    })
}
function main_code_mg2(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg2.py', opcoes);

    sapmhi_py.on('message', function(message){
       
        if(message=='win'){
            verificador_win_mg1=true;
            console.log("--- WIN MG1 ---");
            
        }
        if(message=="loss"){
            verificador_win_mg1=false;
            console.log("MG2");
            
        }
        if(message=="lossmg1"){
            verificador_win_mg1=true;
            console.log("XXX LOSS XXX");
           
            verificador_win_mg1=true;
        }

        sleep(10000).then(() => {
            verifica_stop();
        });
    })
}
function main_code_verifica(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay]
    }

    var sapmhi_py = new PythonShell('main_code_verifica.py', opcoes);

    sapmhi_py.on('message', function(message){
        if (message=="win") {
            console.log("--- WIN MG2 ---");
            
        }
        if(message=="loss"){
            console.log("XXX- LOSS -XXX");
            
        }
        sleep(10000).then(() => {
            verifica_stop();
        });
    })
}
//SOROS
function main_code_soros(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code.py', opcoes);

    sapmhi_py.on('message', function(message){
        console.log("1 Entrada");
        ordem_executada = message + "";
        sleep(10000).then(() => {
            verifica_stop();
        });
    })
}
function main_code_soros_mg1(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg1.py', opcoes);

    sapmhi_py.on('message', function(message){
        
        if (message=='win') {
            verificador_win=true;
            console.log("--- WIN ---");
            verificador_win=true;

            if(conta_nivel_soro<nivel_soro){
                
                var lucro = e1*profit;
                e1 = e1+(lucro*porcento_soro);

                gera_mg_soro();
                conta_nivel_soro++;
            }else{
                e1 = document.getElementById('entrada_soro').value;
                gera_mg_soro();
                conta_nivel_soro=0;
            }
        }
        if(message=="loss"){
            verificador_win=false;
            console.log("MG1");
           
            verificador_win=false;

            e1 = document.getElementById('entrada_soro').value;
                gera_mg_soro();
                conta_nivel_soro=0;
        }
        if(message=="lossmg0"){
            verificador_win=true;
            console.log("XXX LOSS XXX");
           
            verificador_win=true;

            e1 = document.getElementById('entrada_soro').value;
            gera_mg_soro();
            conta_nivel_soro=0;
        }

        sleep(10000).then(() => {
            verifica_stop();
        });

    })
}
function main_code_soros_mg2(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg2.py', opcoes);

    sapmhi_py.on('message', function(message){
       
        if(message=='win'){
            verificador_win_mg1=true;
            console.log("--- WIN MG1 ---");
            
        }
        if(message=="loss"){
            verificador_win_mg1=false;
            console.log("MG2");
            
        }
        if(message=="lossmg1"){
            verificador_win_mg1=true;
            console.log("XXX LOSS XXX");
           
            verificador_win_mg1=true;
        }

        sleep(10000).then(() => {
            verifica_stop();
        });
    })
}
function main_code_soros_verifica(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay]
    }

    var sapmhi_py = new PythonShell('main_code_verifica.py', opcoes);

    sapmhi_py.on('message', function(message){
        if (message=="win") {
            console.log("--- WIN MG2 ---");
            
        }
        if(message=="loss"){
            console.log("XXX- LOSS -XXX");
            
        }
        sleep(10000).then(() => {
            verifica_stop();
        });
    })
}
//CICLOS
function main_code_ciclos(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code.py', opcoes);

    sapmhi_py.on('message', function(message){
        console.log("1 Entrada");
        ordem_executada = message + "";
        
    })
}
function main_code_ciclos_mg1(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg1.py', opcoes);

    sapmhi_py.on('message', function(message){
        
        if (message=='win') {
            verificador_win=true;
            console.log("--- WIN ---");

            verificador_win=true;

            conta_ciclos=0;
          
        }
        if(message=="loss"){
            verificador_win=false;
            console.log("MG1");
           
            verificador_win=false;

            
        }
        if(message=="lossmg0"){
            verificador_win=true;
            console.log("XXX LOSS XXX");
           
            verificador_win=true;

            conta_ciclos++;
        }

        
            verifica_stop();
        

    })
}
function main_code_ciclos_mg2(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg2.py', opcoes);

    sapmhi_py.on('message', function(message){
       
        if(message=='win'){
            verificador_win_mg1=true;
            console.log("--- WIN MG1 ---");
            conta_ciclos=0;
        }
        if(message=="loss"){
            verificador_win_mg1=false;
            console.log("MG2");
            
        }
        if(message=="lossmg1"){
            verificador_win_mg1=true;
            console.log("XXX LOSS XXX");
           
            verificador_win_mg1=true;

            conta_ciclos++;
        }

        
            verifica_stop();
        
    })
}
function main_code_ciclos_verifica(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay]
    }

    var sapmhi_py = new PythonShell('main_code_verifica.py', opcoes);

    sapmhi_py.on('message', function(message){
        if (message=="win") {
            console.log("--- WIN MG2 ---");
            conta_ciclos=0;
            
        }
        if(message=="loss"){
            console.log("XXX- LOSS -XXX");
            conta_ciclos++;
        }
      
            verifica_stop();
    
    })
}
//CICLOSOROS
function main_code_ciclosoros(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code.py', opcoes);

    sapmhi_py.on('message', function(message){
        console.log("1 Entrada");
        ordem_executada = message + "";
        
    })
}
function main_code_ciclosoros_mg1(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada, delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg1.py', opcoes);

    sapmhi_py.on('message', function(message){
        
        if (message=='win') {
            verificador_win=true;
            console.log("--- WIN ---");

            verificador_win=true;

            console.log("conta_nivel_soro:"+conta_nivel_soro+"     nivel_soro:"+nivel_soro);
            console.log("conta_ciclos:"+conta_ciclos);
            if(conta_ciclos==0){
            if(conta_nivel_soro<nivel_soro){
                
                var lucro = e1*profit;
                e1 = e1+(lucro*porcento_soro);
                conta_nivel_soro++;

            }else{
                e1 = document.getElementById('ciclo1_mg0').value;
                conta_nivel_soro=0;
            }
            }
            conta_ciclos=0;
        }
        if(message=="loss"){
            verificador_win=false;
            console.log("MG1");
           
            verificador_win=false;

            e1 = document.getElementById('ciclo1_mg0').value;
                conta_nivel_soro=0;
        }
        if(message=="lossmg0"){
            verificador_win=true;
            console.log("XXX LOSS XXX");
           
            verificador_win=true;

            conta_ciclos++;

            e1 = document.getElementById('ciclo1_mg0').value;
                conta_nivel_soro=0;
        }

        verifica_stop();

    })
}
function main_code_ciclosoros_mg2(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay, tipo_conta]
    }

    var sapmhi_py = new PythonShell('main_code_mg2.py', opcoes);

    sapmhi_py.on('message', function(message){
       
        if(message=='win'){
            verificador_win_mg1=true;
            console.log("--- WIN MG1 ---");
            conta_ciclos=0;
        }
        if(message=="loss"){
            verificador_win_mg1=false;
            console.log("MG2");
            
        }
        if(message=="lossmg1"){
            verificador_win_mg1=true;
            console.log("XXX LOSS XXX");
           
            verificador_win_mg1=true;

            conta_ciclos++;
        }

        verifica_stop();
    })
}
function main_code_ciclosoros_verifica(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");

    

    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [e1, e2, e3, tipo_vela, ativo_selecionado, ordem_executada,delay]
    }

    var sapmhi_py = new PythonShell('main_code_verifica.py', opcoes);

    sapmhi_py.on('message', function(message){
        if (message=="win") {
            console.log("--- WIN MG2 ---");
            conta_ciclos=0;
            
        }
        if(message=="loss"){
            console.log("XXX- LOSS -XXX");
            conta_ciclos++;
        }
        verifica_stop();
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

function seleciona_mg(){
    document.getElementById('entrada').disabled = false;
    document.getElementById('mg1').disabled = false;
    document.getElementById('mg2').disabled = false; 

    document.getElementById('niveis').disabled = true;
    document.getElementById('porcento_soros').disabled = true;
    document.getElementById('entrada_soro').disabled = true;
    document.getElementById('multiplicador').disabled = true;
    document.getElementById('qtd_multiplicador').disabled = true;

    document.getElementById('ciclo1_mg0').disabled = true;
    document.getElementById('ciclo1_mg1').disabled = true;
    document.getElementById('ciclo1_mg2').disabled = true;
    document.getElementById('ciclo2_mg0').disabled = true;
    document.getElementById('ciclo2_mg1').disabled = true;
    document.getElementById('ciclo2_mg2').disabled = true;
    document.getElementById('ciclo3_mg0').disabled = true;
    document.getElementById('ciclo3_mg1').disabled = true;
    document.getElementById('ciclo3_mg2').disabled = true;
    document.getElementById('ciclo4_mg0').disabled = true;
    document.getElementById('ciclo4_mg1').disabled = true;
    document.getElementById('ciclo4_mg2').disabled = true;
    document.getElementById('ciclo5_mg0').disabled = true;
    document.getElementById('ciclo5_mg1').disabled = true;
    document.getElementById('ciclo5_mg2').disabled = true;
}
function seleciona_soros(){
    document.getElementById('entrada').disabled = true;
    document.getElementById('mg1').disabled = true;
    document.getElementById('mg2').disabled = true; 

    document.getElementById('niveis').disabled = false;
    document.getElementById('porcento_soros').disabled = false;
    document.getElementById('entrada_soro').disabled = false;
    document.getElementById('multiplicador').disabled = false;
    document.getElementById('qtd_multiplicador').disabled = false;

    document.getElementById('ciclo1_mg0').disabled = true;
    document.getElementById('ciclo1_mg1').disabled = true;
    document.getElementById('ciclo1_mg2').disabled = true;
    document.getElementById('ciclo2_mg0').disabled = true;
    document.getElementById('ciclo2_mg1').disabled = true;
    document.getElementById('ciclo2_mg2').disabled = true;
    document.getElementById('ciclo3_mg0').disabled = true;
    document.getElementById('ciclo3_mg1').disabled = true;
    document.getElementById('ciclo3_mg2').disabled = true;
    document.getElementById('ciclo4_mg0').disabled = true;
    document.getElementById('ciclo4_mg1').disabled = true;
    document.getElementById('ciclo4_mg2').disabled = true;
    document.getElementById('ciclo5_mg0').disabled = true;
    document.getElementById('ciclo5_mg1').disabled = true;
    document.getElementById('ciclo5_mg2').disabled = true;
}
function seleciona_ciclos(){
    document.getElementById('entrada').disabled = true;
    document.getElementById('mg1').disabled = true;
    document.getElementById('mg2').disabled = true; 

    document.getElementById('niveis').disabled = true;
    document.getElementById('porcento_soros').disabled = true;
    document.getElementById('entrada_soro').disabled = true;
    document.getElementById('multiplicador').disabled = true;
    document.getElementById('qtd_multiplicador').disabled = true;

    document.getElementById('ciclo1_mg0').disabled = false;
    document.getElementById('ciclo1_mg1').disabled = false;
    document.getElementById('ciclo1_mg2').disabled = false;
    document.getElementById('ciclo2_mg0').disabled = false;
    document.getElementById('ciclo2_mg1').disabled = false;
    document.getElementById('ciclo2_mg2').disabled = false;
    document.getElementById('ciclo3_mg0').disabled = false;
    document.getElementById('ciclo3_mg1').disabled = false;
    document.getElementById('ciclo3_mg2').disabled = false;
    document.getElementById('ciclo4_mg0').disabled = false;
    document.getElementById('ciclo4_mg1').disabled = false;
    document.getElementById('ciclo4_mg2').disabled = false;
    document.getElementById('ciclo5_mg0').disabled = false;
    document.getElementById('ciclo5_mg1').disabled = false;
    document.getElementById('ciclo5_mg2').disabled = false;
}
function seleciona_ciclosoros(){
    document.getElementById('entrada').disabled = true;
    document.getElementById('mg1').disabled = true;
    document.getElementById('mg2').disabled = true; 

    document.getElementById('niveis').disabled = false;
    document.getElementById('porcento_soros').disabled = false;
    document.getElementById('entrada_soro').disabled = true;
    document.getElementById('multiplicador').disabled = true;
    document.getElementById('qtd_multiplicador').disabled = true;

    document.getElementById('ciclo1_mg0').disabled = false;
    document.getElementById('ciclo1_mg1').disabled = false;
    document.getElementById('ciclo1_mg2').disabled = false;
    document.getElementById('ciclo2_mg0').disabled = false;
    document.getElementById('ciclo2_mg1').disabled = false;
    document.getElementById('ciclo2_mg2').disabled = false;
    document.getElementById('ciclo3_mg0').disabled = false;
    document.getElementById('ciclo3_mg1').disabled = false;
    document.getElementById('ciclo3_mg2').disabled = false;
    document.getElementById('ciclo4_mg0').disabled = false;
    document.getElementById('ciclo4_mg1').disabled = false;
    document.getElementById('ciclo4_mg2').disabled = false;
    document.getElementById('ciclo5_mg0').disabled = false;
    document.getElementById('ciclo5_mg1').disabled = false;
    document.getElementById('ciclo5_mg2').disabled = false;
}

function gera_mg_soro(){
    if(multiplicador!=0 && qtd_multiplicador!=0 && e1!=0){
        if(qtd_multiplicador==1){
            e2 = e1*multiplicador;
        }
        if(qtd_multiplicador==2){
            e2 = e1*multiplicador;
            e3 = e2*multiplicador;
        }
    }
}


//------------------------------------
//Globais referente aos campos da interface
var ativo_selecionado = queryString("nomeAtivo");
var tipo_conta = "PRACTICE";                                
var email="";
var saldo=0;
var saldo_inicial;
var stop_win;
var stop_loss;
var ganhos=0;
var delay=0;
var profit=0;
var ganhos = 0;
var tipo_vela;
//-----referentes às estratégias 
//-----MG
var e1=0;
var e2=0;
var e3=0;
var diferenciador = false;
var diferenciador_mg1 = false;
var diferenciador_mg2 = false;
var diferenciador_verifica = false;
var verificador_win = false;
var verificador_win_mg1 = false;
//-----SOROS
var nivel_soro=0;
var porcento_soro=0;
var multiplicador=0;
var qtd_multiplicador=0;
var verificador_soro=false;
var conta_nivel_soro=0;
var backup_e1;
//-----CICLOS
var conta_ciclos=0;
//Globais referente ao funcionamento interno do software
var limite = 1000;
var executa;
var tipo_vela;
var ordem_executada="";
//Determinações iniciais 
document.getElementById("avisos").innerHTML = "Carregando dados da conta...";
document.getElementById('stop_win').value = 0;
document.getElementById('stop_loss').value = 0;
conexao_iq(tipo_conta);
sleep(10000).then(() => {
    document.getElementById('saldo_inicial').innerHTML = saldo;
    saldo_inicial = saldo;
});


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
    console.log("O ROBO COMECOU A OPERAR");
if (document.getElementById('m1').checked==true) {
        tipo_vela=60

    if(document.getElementById('mg').checked == true){

            executa = setInterval(function() {
                var date = new Date();
                var min = date.getMinutes();
                var sec = date.getSeconds();
              
                e1 = document.getElementById('entrada').value;
                e2 = document.getElementById('mg1').value;
                e3 = document.getElementById('mg2').value;
                e1 = parseFloat(e1);
                e2 = parseFloat(e2);
                e3 = parseFloat(e3);
    
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
            
            if (diferenciador==true && diferenciador_mg1==true) {
                if (verificador_win==false) {
                    if(diferenciador_mg2==false && verificador_win==false){
                        if(min%5==1){
                        diferenciador_mg2=true;
                        
                        main_code_mg2();
                        
                        }
                    }
                }
            }
            
            if (diferenciador == true && diferenciador_mg1==true) {
                if (verificador_win==false && verificador_win_mg1==false) {
                    if(diferenciador_mg2==true) {
                        if(diferenciador_verifica==false){
                            if(min%5==2){
                                main_code_verifica();
                                diferenciador_verifica=true;
                            }
                        }
                    }
                }
            }
    
            if (min%5==3) {
                diferenciador=false;
                diferenciador_mg1=false;
                diferenciador_mg2=false;
                diferenciador_verifica=false;
                verificador_win=false;
                verificador_win_mg1=false;
                if (sec==15) {
                    verifica_stop();
                }
            }
        },
        limite);
    }
    
    if(document.getElementById('soros').checked == true){

        executa = setInterval(function() {
            var date = new Date();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            e1 = parseInt(e1);
            e2 = parseInt(e2);
            e3 = parseInt(e3);
            
        if(min%5==4){
            if(diferenciador==false){
                
                diferenciador=true; 
                main_code_soros();
               
            }
        }

        if (min%5==0 && sec>20 && diferenciador_mg1==false) {
            if (diferenciador==true) {
                main_code_soros_mg1();
                diferenciador_mg1=true;
                
            }
        }
        
        if (diferenciador==true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==false && verificador_win==false){
                    if(min%5==1){
                    diferenciador_mg2=true;
                    
                    main_code_soros_mg2();
                    
                    }
                }
            }
        }
        
        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false && verificador_win_mg1==false) {
                if(diferenciador_mg2==true) {
                    if(diferenciador_verifica==false){
                        if(min%5==2){
                            main_code_soros_verifica();
                            diferenciador_verifica=true;
                        }
                    }
                }
            }
        }

        if (min%5==3) {
            diferenciador=false;
            diferenciador_mg1=false;
            diferenciador_mg2=false;
            diferenciador_verifica=false;
            verificador_win=false;
            verificador_win_mg1=false;
            if (sec==15) {
                verifica_stop();
            }
        }
    },
    limite);
    }

    if(document.getElementById('ciclos').checked == true){

        executa = setInterval(function() {
            var date = new Date();
            var min = date.getMinutes();
            var sec = date.getSeconds();
                
            

            if (conta_ciclos==0) {
                e1 = document.getElementById('ciclo1_mg0').value;
                e2 = document.getElementById('ciclo1_mg1').value;
                e3 = document.getElementById('ciclo1_mg2').value;
            }
            if (conta_ciclos==1) {
                e1 = document.getElementById('ciclo2_mg0').value;
                e2 = document.getElementById('ciclo2_mg1').value;
                e3 = document.getElementById('ciclo2_mg2').value;
            }
            if (conta_ciclos==2) {
                e1 = document.getElementById('ciclo3_mg0').value;
                e2 = document.getElementById('ciclo3_mg1').value;
                e3 = document.getElementById('ciclo3_mg2').value;
            }
            if (conta_ciclos==3) {
                e1 = document.getElementById('ciclo4_mg0').value;
                e2 = document.getElementById('ciclo4_mg1').value;
                e3 = document.getElementById('ciclo4_mg2').value;
            }
            if (conta_ciclos==4) {
                e1 = document.getElementById('ciclo5_mg0').value;
                e2 = document.getElementById('ciclo5_mg1').value;
                e3 = document.getElementById('ciclo5_mg2').value;
            }
            if (conta_ciclos>=5) {
                conta_ciclos=0;
            }

            e1 = parseInt(e1);
            e2 = parseInt(e2);
            e3 = parseInt(e3);
            
        if(min%5==4){
            if(diferenciador==false){
                
                diferenciador=true; 
                main_code_ciclos();
                
            }
        }
        if (min%5==0 && sec>20 && diferenciador_mg1==false) {
            if (diferenciador==true) {
                main_code_ciclos_mg1();
                diferenciador_mg1=true;
               
            }
        }
        
        if (diferenciador==true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==false && verificador_win==false){
                    if(min%5==1){
                    diferenciador_mg2=true;
                    
                    main_code_ciclos_mg2();
                   
                    }
                }
            }
        }
        
        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false && verificador_win_mg1==false) {
                if(diferenciador_mg2==true) {
                    if(diferenciador_verifica==false){
                        if(min%5==2){
                            main_code_ciclos_verifica();
                            diferenciador_verifica=true;
                        
                        }
                    }
                }
            }
        }

        if (min%5==3) {
            diferenciador=false;
            diferenciador_mg1=false;
            diferenciador_mg2=false;
            diferenciador_verifica=false;
            verificador_win=false;
            verificador_win_mg1=false;
            if (sec==15) {
                verifica_stop();
            }
        }
    },
    limite);
    }

    if(document.getElementById('ciclosoros').checked == true){

        executa = setInterval(function() {
            var date = new Date();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            if (conta_ciclos==0) {
                if (conta_nivel_soro==0) {
                    e1 = document.getElementById('ciclo1_mg0').value;   
                }
                e2 = document.getElementById('ciclo1_mg1').value;
                e3 = document.getElementById('ciclo1_mg2').value;
            }
            if (conta_ciclos==1) {
                e1 = document.getElementById('ciclo2_mg0').value;
                e2 = document.getElementById('ciclo2_mg1').value;
                e3 = document.getElementById('ciclo2_mg2').value;
            }
            if (conta_ciclos==2) {
                e1 = document.getElementById('ciclo3_mg0').value;
                e2 = document.getElementById('ciclo3_mg1').value;
                e3 = document.getElementById('ciclo3_mg2').value;
            }
            if (conta_ciclos==3) {
                e1 = document.getElementById('ciclo4_mg0').value;
                e2 = document.getElementById('ciclo4_mg1').value;
                e3 = document.getElementById('ciclo4_mg2').value;
            }
            if (conta_ciclos==4) {
                e1 = document.getElementById('ciclo5_mg0').value;
                e2 = document.getElementById('ciclo5_mg1').value;
                e3 = document.getElementById('ciclo5_mg2').value;
            }
            if (conta_ciclos>=5) {
                conta_ciclos=0;
            }

            e1 = parseInt(e1);
            e2 = parseInt(e2);
            e3 = parseInt(e3);
            
        if(min%5==4){
            if(diferenciador==false){
                
                diferenciador=true; 
                main_code_ciclosoros();
                
               
            }
        }
        if (min%5==0 && sec>20 && diferenciador_mg1==false) {
            if (diferenciador==true) {
                main_code_ciclosoros_mg1();
                diferenciador_mg1=true;
                
            }
        }
        
        if (diferenciador==true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==false && verificador_win==false){
                    if(min%5==1){
                    diferenciador_mg2=true;
                    
                    main_code_ciclosoros_mg2();
                    
                    }
                }
            }
        }
        
        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false && verificador_win_mg1==false) {
                if(diferenciador_mg2==true) {
                    if(diferenciador_verifica==false){
                        if(min%5==2){
                            main_code_ciclosoros_verifica();
                            diferenciador_verifica=true;
                        }
                    }
                }
            }
        }

        if (min%5==3) {
            diferenciador=false;
            diferenciador_mg1=false;
            diferenciador_mg2=false;
            diferenciador_verifica=false;
            verificador_win=false;
            verificador_win_mg1=false;
            if (sec==15) {
                verifica_stop();
            }
        }
        
    },
    limite);
    }

}
    //------------------------------------------------------------------------------//
if (document.getElementById('m5').checked==true) {
    tipo_vela=300

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
            e1 = parseFloat(e1);
            e2 = parseFloat(e2);
            e3 = parseFloat(e3);

        if(min==59 || min==24){
            if(diferenciador==false){
                
                diferenciador=true; 
                main_code();
                
            }
        }
        if ((min==4 || min==29) && sec>20 && diferenciador_mg1==false) {
            if (diferenciador==true) {
                main_code_mg1();
                diferenciador_mg1=true;
                
            }
        }
        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==false){
                    if(min==9 || min==34){
                    main_code_mg2();
                    diferenciador_mg2=true;
                    }
                }
            }
        }

        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==true){
                    if(diferenciador_verifica==false)
                        if(min==14 ||  min==39){
                            main_code_verifica();
                            diferenciador_verifica=true;
                    }
                }
            }
        }

        if (min==20 || min==55) {
            diferenciador=false;
            diferenciador_mg1=false;
            diferenciador_mg2=false;
            diferenciador_verifica=false;
            verificador_win=false;
            verificador_win_mg1=false;
            if (sec==15) {
                verifica_stop();
            }
        }
    },
    limite);
    }

    if(document.getElementById('soros').checked == true){

        executa = setInterval(function() {
            var date = new Date();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            e1 = parseInt(e1);
            e2 = parseInt(e2);
            e3 = parseInt(e3);
            
        if(min==59 || min==24){
            if(diferenciador==false){
                
                diferenciador=true; 
                main_code_soros();
               
            }
        }
        if ((min==4 || min==29) && diferenciador_mg1==false) {
            if (diferenciador==true) {
                main_code_soros_mg1();
                diferenciador_mg1=true;
                
            }
        }
        
        if (diferenciador==true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==false && verificador_win==false){
                    if(min==9 || min==34){
                    diferenciador_mg2=true;
                    
                    main_code_soros_mg2();
                    
                    }
                }
            }
        }
        
        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false && verificador_win_mg1==false) {
                if(diferenciador_mg2==true) {
                    if(diferenciador_verifica==false){
                        if(min==14 || min==39){
                            main_code_soros_verifica();
                            diferenciador_verifica=true;
                        }
                    }
                }
            }
        }

        if (min==20 || min==55) {
            diferenciador=false;
            diferenciador_mg1=false;
            diferenciador_mg2=false;
            diferenciador_verifica=false;
            verificador_win=false;
            verificador_win_mg1=false;
            if (sec==15) {
                verifica_stop();
            }
        }
    },
    limite);
    }

    if(document.getElementById('ciclos').checked == true){

        executa = setInterval(function() {
            var date = new Date();
            var min = date.getMinutes();
            var sec = date.getSeconds();
                
            

            if (conta_ciclos==0) {
                e1 = document.getElementById('ciclo1_mg0').value;
                e2 = document.getElementById('ciclo1_mg1').value;
                e3 = document.getElementById('ciclo1_mg2').value;
            }
            if (conta_ciclos==1) {
                e1 = document.getElementById('ciclo2_mg0').value;
                e2 = document.getElementById('ciclo2_mg1').value;
                e3 = document.getElementById('ciclo2_mg2').value;
            }
            if (conta_ciclos==2) {
                e1 = document.getElementById('ciclo3_mg0').value;
                e2 = document.getElementById('ciclo3_mg1').value;
                e3 = document.getElementById('ciclo3_mg2').value;
            }
            if (conta_ciclos==3) {
                e1 = document.getElementById('ciclo4_mg0').value;
                e2 = document.getElementById('ciclo4_mg1').value;
                e3 = document.getElementById('ciclo4_mg2').value;
            }
            if (conta_ciclos==4) {
                e1 = document.getElementById('ciclo5_mg0').value;
                e2 = document.getElementById('ciclo5_mg1').value;
                e3 = document.getElementById('ciclo5_mg2').value;
            }
            if (conta_ciclos>=5) {
                conta_ciclos=0;
            }

            e1 = parseInt(e1);
            e2 = parseInt(e2);
            e3 = parseInt(e3);
            
        if(min==59 || min==24){
            if(diferenciador==false){
                
                diferenciador=true; 
                main_code_ciclos();
                
            }
        }
        if ((min==4 || min==29) && diferenciador_mg1==false) {
            if (diferenciador==true) {
                main_code_ciclos_mg1();
                diferenciador_mg1=true;
               
            }
        }
        
        if (diferenciador==true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==false && verificador_win==false){
                    if(min==9 || min==34){
                    diferenciador_mg2=true;
                    
                    main_code_ciclos_mg2();
                   
                    }
                }
            }
        }
        
        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false && verificador_win_mg1==false) {
                if(diferenciador_mg2==true) {
                    if(diferenciador_verifica==false){
                        if(min==14 || min==39){
                            main_code_ciclos_verifica();
                            diferenciador_verifica=true;
                        
                        }
                    }
                }
            }
        }

        if (min==20 || min==55) {
            diferenciador=false;
            diferenciador_mg1=false;
            diferenciador_mg2=false;
            diferenciador_verifica=false;
            verificador_win=false;
            verificador_win_mg1=false;
            if (sec==15) {
                verifica_stop();
            }
        }
    },
    limite);
    }

    if(document.getElementById('ciclosoros').checked == true){

        executa = setInterval(function() {
            var date = new Date();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            if (conta_ciclos==0) {
                if (conta_nivel_soro==0) {
                    e1 = document.getElementById('ciclo1_mg0').value;   
                }
                e2 = document.getElementById('ciclo1_mg1').value;
                e3 = document.getElementById('ciclo1_mg2').value;
            }
            if (conta_ciclos==1) {
                e1 = document.getElementById('ciclo2_mg0').value;
                e2 = document.getElementById('ciclo2_mg1').value;
                e3 = document.getElementById('ciclo2_mg2').value;
            }
            if (conta_ciclos==2) {
                e1 = document.getElementById('ciclo3_mg0').value;
                e2 = document.getElementById('ciclo3_mg1').value;
                e3 = document.getElementById('ciclo3_mg2').value;
            }
            if (conta_ciclos==3) {
                e1 = document.getElementById('ciclo4_mg0').value;
                e2 = document.getElementById('ciclo4_mg1').value;
                e3 = document.getElementById('ciclo4_mg2').value;
            }
            if (conta_ciclos==4) {
                e1 = document.getElementById('ciclo5_mg0').value;
                e2 = document.getElementById('ciclo5_mg1').value;
                e3 = document.getElementById('ciclo5_mg2').value;
            }
            if (conta_ciclos>=5) {
                conta_ciclos=0;
            }

            e1 = parseInt(e1);
            e2 = parseInt(e2);
            e3 = parseInt(e3);
            
        if(min==59 || min==24){
            if(diferenciador==false){
                
                diferenciador=true; 
                main_code_ciclosoros();
                
               
            }
        }
        if ((min==4 || min==29) && diferenciador_mg1==false) {
            if (diferenciador==true) {
                main_code_ciclosoros_mg1();
                diferenciador_mg1=true;
                
            }
        }
        
        if (diferenciador==true && diferenciador_mg1==true) {
            if (verificador_win==false) {
                if(diferenciador_mg2==false && verificador_win==false){
                    if(min==9 || min==34){
                    diferenciador_mg2=true;
                    
                    main_code_ciclosoros_mg2();
                    
                    }
                }
            }
        }
        
        if (diferenciador == true && diferenciador_mg1==true) {
            if (verificador_win==false && verificador_win_mg1==false) {
                if(diferenciador_mg2==true) {
                    if(diferenciador_verifica==false){
                        if(min==14 || min==39){
                            main_code_ciclosoros_verifica();
                            diferenciador_verifica=true;
                        }
                    }
                }
            }
        }

        if (min==20 || min==55) {
            diferenciador=false;
            diferenciador_mg1=false;
            diferenciador_mg2=false;
            diferenciador_verifica=false;
            verificador_win=false;
            verificador_win_mg1=false;
            if (sec==15) {
                verifica_stop();
            }
        }
        
    },
    limite);
    }

}

}


function para(){
    clearInterval(executa);
    console.log("O ROBO PAROU DE OPERAR");
}




    



