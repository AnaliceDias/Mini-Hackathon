iniciarTela();

function iniciarTela(){
    let resposta = prompt("Deseja pegar sua localização pelo navegador?");

    if(resposta === "sim") {
        pegarLocalizacao();
    }
    else {
        alert("não");
    }
}

function pegarLocalizacao(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicao);
      } else {
        alert("não deu certo");
      } 
}

function mostrarPosicao(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;


    const promessa = axios.post(`api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={{{${lon}}}}&appid=pt&hl=pt-BR&u=https://home.openweathermap.org/f25110b0f83adb9f7c080ee182cd1d00`);    
    
    promessa.then(tratarSucesso);
    promessa.catch(tratarErro);
}

function tratarSucesso(resposta) {
    let tela = document.querySelector("main");

    tela.innerHTML = `
    <p>Latitude:  ${position.coords.latitude}</p>
    <p>Longitude:  ${position.coords.longitude}</p>
    `;
}
function tratarErro(resposta) {
    alert("erro: ", resposta.status);
}