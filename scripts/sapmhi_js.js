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
        
        document.getElementById('resultado_div').innerHTML = "";
        var index=0;

        var vet1 = message.split("-");
        
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

        for (index = 1; index < len_for; index+=4) {
            document.getElementById('resultado_div').innerHTML += 
            "<div class='resultado_div_item'>"+
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


