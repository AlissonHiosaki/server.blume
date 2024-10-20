
 /*função de login */
 function logar(){
     var login = document.getElementById('login').value;
     var senha = document.getElementById('senha').value;

     if(login == "admin" && senha == "admin"){
          location.href = "./home/home.html";
     }else{
          /**Alert personalizado */
          alert('Usuário ou senha incorreta. Tente novamente.');
          document.getElementById('login').value = "";
          document.getElementById('senha').value = "";
          document.getElementById('login').focus(); // foco no input login após o alert
          return false; // evita que a página seja recarregada
         
     }
 } 

 