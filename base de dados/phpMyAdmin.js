function logar(){

     var login = document.getElementById('usuario').value;
     var senha = document.getElementById('senha').value;
 
     if(login == "admin" && senha == "admin"){

         
         location.href = "../home/home.html";
    }else{
         alert('Usuario ou senha incorreta')
    }
 }