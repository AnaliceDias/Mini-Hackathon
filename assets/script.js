let tela = document.querySelector("main");

function iniciarTela() {
    tela.innerHTML = `
        <p>Deseja fornecer a localização pelo navegador?</p>
        <button type="button" onclick="pegarLocalizacaoDoNavegador()">Sim</button>
        <button type="button" onclick="pedirDadosManualmente()">Prefiro inserir manualmente</button>
    `;
}
function pedirDadosManualmente() {
    tela.innerHTML = `
        <input type="text" id="cep" placeholder="Insira CEP da sua CIDADE (Ex.: 97000-000)">
        <button type="button" onclick="requerirDadosInseridos()">Buscar dados</button>
    `;
}
function pegarLocalizacaoDoNavegador(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(requerirDadosDoNavegador, tratarErro);
      } else {
        tratarErro();
      } 
}
function requerirDadosDoNavegador(resposta) {
    let lat = resposta.coords.latitude;
    let lon = resposta.coords.longitude;

    const promessa = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f25110b0f83adb9f7c080ee182cd1d00&units=metric&lang=pt_br`);    
    promessa.then(mostrarDados);
    promessa.catch(tratarErro);
}
function requerirDadosInseridos() {
    const cep = document.getElementById("cep").value;

    const promessa = axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${cep},BR&appid=f25110b0f83adb9f7c080ee182cd1d00&units=metric&lang=pt_br`);    
    promessa.then(mostrarDados);
    promessa.catch(() => alert("Valor inválido. Tente novamente. Se atente que o CEP é da CIDADE."));
}
function mostrarDados(resposta) {
    let dadosClima = resposta.data;

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
    <p class="id ${dadosClima.weather[0].id}">Condições Meteorológicas:  ${dadosClima.weather[0].description}</p>
    <p>Nuvens:  ${dadosClima.clouds.all}%</p>
    <p>Velocidade do Vento:  ${dadosClima.wind.speed * 3.6} km/h</p>
    
    <button type="button" onclick="location.reload()">Reiniciar</button>
    `;
    adicionarTemas();
}
function tratarErro() {
    alert("error");
}
function adicionarTemas(){
    switch (document.querySelector(".id").attributes[0].value[3]) {
        case '2':
            document.querySelector(".id").parentNode.parentNode.classList.add("tempestade");
            break;
        case '3':
            document.querySelector(".id").parentNode.parentNode.classList.add("chuvisco");
            break;
        case '5':
            document.querySelector(".id").parentNode.parentNode.classList.add("chuva");
            break;   
        case '6':
            document.querySelector(".id").parentNode.parentNode.classList.add("neve");
            break;       
        case '7':
            document.querySelector(".id").parentNode.parentNode.classList.add("nevoa");
            break;    
        case '8':
            if(document.querySelector(".id").attributes[0].value[5] === 0) {
                document.querySelector(".id").parentNode.parentNode.classList.add("limpo");
            } else {
                document.querySelector(".id").parentNode.parentNode.classList.add("nuvens");
            }
            break;    
        default:            
            break;    
    }
}

iniciarTela();