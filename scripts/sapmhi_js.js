var valor ="";
var id_ativos = [];

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

    var formata = queryString("usuario");
    formata = formata.split(",");
    var login = formata[0];
    var senha = formata[1];

function redireciona_index(){
    window.location.href = "../index.html?usuario="+login+","+senha;
}
var passaValor = function(valor){

    if(id_ativos.length >= 2){
        for (var i = 0; i < id_ativos.length; i+=2) {
            if(valor==id_ativos[i]){
                valor = id_ativos[i+1];
            }
        }
    }
 
    var r = confirm("Você tem certeza que deseja operar no ativo '"+valor+"'");

    if(r==true){
        window.location.href = "../index.html?nomeAtivo="+valor+"&usuario="+login+","+senha;
    }else{
        
    }
}

function chamaPy(){

    const {PythonShell} = require("python-shell");
    var path = require("path");
    
    var selectBox = document.getElementById("sel");
    var tipo_vela = selectBox.options[selectBox.selectedIndex].value;
    
    var tempo_vela = document.getElementById('tempo').value;

    document.getElementById('qtd_ativos').innerHTML = "Processando análise..."
    document.getElementById('main').style = "cursor:wait;";

    var opcoes = {
        scriptPath : path.join(__dirname, '../engine/'),
        args : [tipo_vela, tempo_vela, login, senha]
    }

    var sapmhi_py = new PythonShell('sapmhi_py.py', opcoes);

    sapmhi_py.on('message', function(message){
        document.getElementById('main').style = "cursor:pointer;";
        document.getElementById('resultado_div').innerHTML = "";
        var index=0;

        var vet1 = message.split(",");
        
        document.getElementById('qtd_ativos').innerHTML = vet1[0];
        document.getElementById('qtd_ativos').style.opacity = 100;

        var len_for = parseInt(vet1[0]);

        len_for = len_for*4

        document.getElementById('resultado_div').innerHTML += 
        "<div id='info_div_item'>"+
            "<b>ATIVO</b>"+
            "<b>-</b>"+
            "<b>WIN DIRETO</b>"+
            "<b>-</b>"+
            "<b>1 MG</b>"+
            "<b>-</b>"+
            "<b>2 MG</b>"
        "</div>";

        var contador=0;

        for (index = 1; index < len_for; index+=4) {

            id_ativos[contador] = index;
            contador++;
            id_ativos[contador] = vet1[index];
            contador++;
            
            document.getElementById('resultado_div').innerHTML += 
            "<div class='resultado_div_item' onclick=passaValor("+index+")>"+
            "<b>"+vet1[index]+"</b>"+
           
            "<b>"+vet1[index+1]+" %</b>"+
           
            "<b>"+vet1[index+2]+" %</b>"+
            
            "<b>"+vet1[index+3]+" %</b>"+
            "</div>";

            

            if(index % 4==0){
                
                document.getElementById('resultado_div').innerHTML += "<br><br>";
            } 
        }
        
    })
}

window.addEventListener('resize', function() {
    if(window.outerWidth < 1300 || window.outerWidth > 1300) {
        window.resizeTo(1300, 800);
    }
    if(window.outerHeight < 800 || window.outerHeight > 800) {
        window.resizeTo(1300, 800);
    }
}, true);



