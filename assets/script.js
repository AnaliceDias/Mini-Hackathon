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
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;


    const promessa = axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f25110b0f83adb9f7c080ee182cd1d00`,{"lon":`${lon}`, "lat":`${lat}`});    
    
    promessa.then(tratarSucesso);
   // promessa.catch(tratarErro);
}

function tratarSucesso(resposta) {
    console.log(resposta.data);
    // let tela = document.querySelector("main");

    // tela.innerHTML = `
    // <p>Latitude:  ${position.coords.latitude}</p>
    // <p>Longitude:  ${position.coords.longitude}</p>
    // `;
}
function tratarErro(resposta) {
    alert("erro: ", resposta.status);
}