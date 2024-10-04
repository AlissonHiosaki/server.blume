

var baseurl = 'http://ua-appweb02:8090/DataSnap/Rest/TServerMethods1/Colaboradores/0/';

function loadColab(){
    var xmlhttp = new XMLHttpRequest();
    var loja = localStorage.getItem('unidade')
    xmlhttp.open("GET", baseurl + loja, true);
    localStorage.clear();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var colab = JSON.parse(xmlhttp.responseText);
            var card = "";
            for (i=0; i < colab.length; i++){

                var txtAdmissao = '';

                var dataAtual = new Date;
                ano_atual = dataAtual.getFullYear();
                mes_atual = dataAtual.getMonth() + 1;
                dia_atual = dataAtual.getDate();

                // Calculo do tempo de empresa
                var dataAdmissao  = String(colab[i].equipe_admissao);
                var anoE = dataAdmissao.slice(6);
                var mesE = dataAdmissao.slice(3, -5);
                var diaE = dataAdmissao.slice(0, -8)
                var dataFormatE = mesE + "/" + diaE + "/" + anoE;
                
                var formatE = new Date(dataFormatE);
                ano_aniversarioE = formatE.getFullYear();
                mes_aniversarioE = formatE.getMonth() + 1;
                dia_aniversarioE = formatE.getDate();
                
                quantos_anosE = ano_atual - ano_aniversarioE;
                
                if (mes_atual < mes_aniversarioE || mes_atual == mes_aniversarioE && dia_atual < dia_aniversarioE) {
                    var anosE = quantos_anosE - 1;
                    var mesesE = (12 - mes_aniversarioE) + mes_atual;
                }else{
                    var anosE = quantos_anosE;
                    var mesesE = mes_atual - mes_aniversarioE;
                }

                txtAdmissao = anosE + " anos e " + mesesE + " meses";

                if (anosE == 0){
                    txtAdmissao = mesesE + " meses";
                }

                if (mesesE == 12){
                    txtAdmissao = anosE + " anos";
                }

                if (mesesE == 0){
                    txtAdmissao = anosE + " anos";
                }

                if (anosE == 0 && mesesE == 0){
                    txtAdmissao = "Contratado este mês";
                }

                // Calculo do tempo na unidade
                var dataFilial  = String(colab[i].equipe_data_filial);
                var anoF = dataFilial.slice(6);
                var mesF = dataFilial.slice(3, -5);
                var diaF = dataFilial.slice(0, -8)
                var dataFormatF = mesF + "/" + diaF + "/" + anoF;
                
                var formatF = new Date(dataFormatF);
                ano_aniversarioF = formatF.getFullYear();
                mes_aniversarioF = formatF.getMonth() + 1;
                dia_aniversarioF = formatF.getDate();
                
                quantos_anosF = ano_atual - ano_aniversarioF;
                
                if (mes_atual < mes_aniversarioF || mes_atual == mes_aniversarioF && dia_atual < dia_aniversarioF) {
                    var anosF = quantos_anosF - 1;
                    var mesesF = (12 - mes_aniversarioF) + mes_atual;
                }else{
                    var anosF = quantos_anosF;
                    var mesesF = mes_atual - mes_aniversarioF;
                }

                txtFilial = anosF + " anos e " + mesesF + " meses";

                if (anosF == 0){
                    txtFilial = mesesF + " meses";
                }

                if (mesesF == 12){
                    txtFilial = anosF + " anos";
                }

                if (mesesF == 0){
                    txtFilial = anosF + " anos";
                }

                if (anosF == 0 && mesesF == 0){
                    txtFilial = "Novo na Unidade / Função";
                }

                var title = "Equipe HTN - Unidade "+ colab[0].equipe_filial;
                var cabeca = "Unidade " + colab[0].equipe_filial;
                let img = colab[i].equipe_foto;

                var imagem = img.slice(46);

                card += `<div class="col l4 m6 s12"> 
                <div class="card medium waves-effect hoverable">
                    <div class="card-image">` +
                "<img src=./files/"+ imagem +` style="object-fit:cover; object-position: top;" height="300">` +
                        `<a id="card4" class="btn-floating btn-large halfway-fab lime accent-4 activator z-depth-2"><i class="material-icons black-text">info_outline</i></a>
                    </div>
                    <div class="card-content">
                        <span class="card-title" style="font-weight: bolder; font-size: 22px;">`+ colab[i].equipe_cargo +`</span>
                        <span class="card-title" style="font-size: 20px;">` + colab[i].equipe_nome + `</span>
                    </div>
                    <div class="card-reveal lime accent-4">
                        <span class="card-title" style="font-weight: bolder; font-size: 22px; color: black;"><i class="material-icons right">close</i><br>`+ colab[i].equipe_cargo + `</span><h6>` + colab[i].equipe_nome + `</h6>
                        <p style="color: black;"><br><b>Matricula: </b>` + colab[i].equipe_matricula + `<br><br>
                            <b>Data de Nascimento: </b>` + colab[i].equipe_nasc + `<br><br>
                            <b>Tempo de Empresa: </b>` + txtAdmissao + `<br><br>
                            <b>Tempo de Unidade / Função: </b>` + txtFilial + ` <br><br>
                        </p>
                    </div>
                </div>
            </div>`;}
            document.getElementById("loja").innerHTML = cabeca;
            document.getElementById("titulo").innerHTML = title;
            document.getElementById("cards").innerHTML = card;
        }
    };
    xmlhttp.send()
}
window.onload = function(){
    loadColab();
}