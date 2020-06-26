const { createGzip } = require("zlib");

function login(){
    
    const {PythonShell} = require("python-shell");
    var path = require("path");
    
    document.getElementById('main').style = "cursor:wait;";

    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    var verifica=true;
    for (let index = 0; index < user.length; index++) {
        if( !((user[index]>='-' && user[index]<='9')  ||  (user[index]>='@' && user[index]<='z')) ){
            verifica=false;
        }
    }
    console.log(verifica);
    if(verifica==false){
        user = "xxx";
        pass = "xxx";
    }
   
    var opcoes = {
        scriptPath : path.join(__dirname, 'engine/'),
        args : [user, pass]
    }

    var pypy = new PythonShell('login.py', opcoes);

    pypy.on('message', function(message){
        var avisos = document.getElementById("avisos");
        document.getElementById('main').style = "cursor:default;";
        if (message=='True') {
            
            window.location.href = "index.html?usuario="+user+","+pass;
        }
        if (message=='False') {

            avisos.innerHTML =  "<br><b>ERRO</b><p>* Email ou senha inválido, tente novamente *</p>";
            
        }
        if (message=='tempo') {
            avisos.innerHTML =  "<br><b>ERRO</b><p>* O robo não conseguiu conectar-se à iqoption, aguarde 10 min e tente novamente* </p>";
           
        }

    })
}



    