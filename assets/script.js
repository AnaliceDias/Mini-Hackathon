iniciarTela();

function iniciarTela() {
    let tela = document.querySelector("main");

    tela.innerHTML = `
        <p>Deseja fornecer a localização pelo navegador?</p>
        <button type="button" onclick="pegarLocalizacaoDoNavegador()">Sim</button>
        <button type="button" onclick="pedirDadosManualmente()">Prefiro inserir manualmente</button>
    `;
}

function pedirDadosManualmente() {
    let tela = document.querySelector("main");

    tela.innerHTML = `
        <input type="text" id="cep" placeholder="Insira CEP da sua CIDADE (Ex.: 97000-000)">
        <button type="button" onclick="requerirDadosDoCEP()">Buscar dados</button>
    `;
}

function pegarLocalizacaoDoNavegador(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(requerirDadosDoNavegador, tratarErro);
      } else {
        alert("Error");
      } 
}

function requerirDadosDoNavegador(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    const promessa = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f25110b0f83adb9f7c080ee182cd1d00&units=metric&lang=pt_br`);    
    promessa.then(tratarSucesso);
    promessa.catch(tratarErro);
}

function requerirDadosDoCEP() {
    const cep = document.getElementById("cep").value;

    const promessa = axios.get(`https://api.openweathermap.org/geo/1.0/zip?zip=${cep},BR&appid=f25110b0f83adb9f7c080ee182cd1d00&units=metric&lang=pt_br`);    
    promessa.then(requerirDadosInseridos);
    promessa.catch(() => alert("Valor inválido. Tente novamente. Se atente que o CEP é da CIDADE."));
}

function requerirDadosInseridos(resposta) {
    let lat = resposta.data.lat;
    let lon = resposta.data.lon;
       
    const promessa = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f25110b0f83adb9f7c080ee182cd1d00&units=metric&lang=pt_br`);    
    promessa.then(tratarSucesso);
    promessa.catch(tratarErro);
}

function tratarSucesso(resposta) {
    let dadosClima = resposta.data;
    let tela = document.querySelector("main");
    console.log(dadosClima);

    tela.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${dadosClima.weather[0].icon}@2x.png">
    <p>Localização : ${dadosClima.name} - ${dadosClima.sys.country}</p>
    <p>Latitude:  ${dadosClima.coord.lat}º</p>
    <p>Longitude:  ${dadosClima.coord.lon}º</p>
    <p>Temperatura:  ${dadosClima.main.temp}º C</p>
    <p>Sensação Térmica:  ${dadosClima.main.feels_like}º C</p>
    <p>Temperatura Máxima:  ${dadosClima.main.temp_max}º C</p>
    <p>Temperatura Mínima:  ${dadosClima.main.temp_min}º C</p>
    <p>Humidade:  ${dadosClima.main.humidity}%</p>
    <p>Pressão Atmosférica:  ${dadosClima.main.pressure} hPa</p>
    <p>Condições Meteorológicas:  ${dadosClima.weather[0].description}.</p>
    <p>Nuvens:  ${dadosClima.clouds.all}%</p>
    <p>Velocidade do Vento:  ${dadosClima.wind.speed * 3.6} km/h</p>
    
    <button type="button" onclick="location.reload()">Reiniciar</button>
    `;
}
function tratarErro(resposta) {
    console.log("error");
}