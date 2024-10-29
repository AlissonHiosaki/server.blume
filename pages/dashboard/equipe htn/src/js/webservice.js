 // Calculo do tempo de empresa//
 function tempoEmpresa(anoNascimento, mesNascimento, diaNascimento, anoAtual, mesAtual, diaAtual) {
  // Calcula o ano atual
  var anoAtual = new Date().getFullYear();
  // Calcula o mês atual
  var mesAtual = new Date().getMonth() + 1;
  // Calcula o dia atual
  var diaAtual = new Date().getDate();

  // Calcula o ano do nascimento
  var anoNascimento = parseInt(anoNascimento);
  // Calcula o mês do nascimento
  var mesNascimento = parseInt(mesNascimento);
  // Calcula o dia do nascimento
  var diaNascimento = parseInt(diaNascimento);

  // Calcula a idade em anos
  var idadeAnos = anoAtual - anoNascimento;

  // Calcul
  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
    idadeAnos--;
  }
  // Calcula a idade em meses
  var idadeMeses = mesAtual - mesNascimento;
  if (diaAtual < diaNascimento) {
    idadeMeses--;
  }
  // Calcula a idade em dias
  var idadeDias = diaAtual - diaNascimento;
  if (idadeMeses < 0) {
    idadeDias = 30 + (idadeMeses + 1) * 30;
    idadeMeses = 11;
    idadeAnos--;
  }
  // Calcula a idade em horas
  var idadeHoras = (idadeDias * 24) + (idadeMeses * 60) + (idadeAnos * 365 * 24);
  // Calcula a idade em minutos
  var idadeMinutos = (idadeHoras * 60);
  // Calcula a idade em segundos
  var idadeSegundos = (idadeMinutos * 60);
  // Calcula a idade em milisegundos
  var idadeMilisegundos = (idadeSegundos * 1000);
  // Retorna a idade em anos, meses, dias, horas, minutos, segundos e milisegundos
  return {
    anos: idadeAnos,
    meses: idadeMeses,
    dias: idadeDias,
    horas: Math.floor(idadeHoras % 24),
    minutos: Math.floor((idadeHoras % 1) * 60),
    segundos: Math.floor(((idadeHoras % 1) * 60) % 1 * 60),
    milisegundos: Math.floor((((idadeHoras % 1) * 60) % 1 * 60) % 1 * 1000)
  };
}

// Teste

var dataNascimento = "1995-01-15";
var dataAtual = new Date();

var anoNascimento = parseInt(dataNascimento.substr(0, 4));
var mesNascimento = parseInt(dataNascimento.substr(5, 2));

var diaNascimento = parseInt(dataNascimento.substr(8, 2));

var anoAtual = dataAtual.getFullYear();

var mesAtual = dataAtual.getMonth() + 1;

var diaAtual = dataAtual.getDate();

var resultado = tempoEmpresa(anoNascimento, mesNascimento, diaNascimento, anoAtual, mesAtual, diaAtual);

console.log("Idade em anos: " + resultado.anos);

console.log("Idade em meses: " + resultado.meses);

console.log("Idade em dias: " + resultado.dias);

console.log("Idade em horas: " + resultado.horas);

console.log("Idade em minutos: " + resultado.minutos);

console.log("Idade em segundos: " + resultado.segundos);

console.log("Idade em milisegundos: " + resultado.milisegundos);

