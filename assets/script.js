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
    
    alert(`Latitude:  ${position.coords.latitude}
    Longitude:  ${position.coords.longitude}`);
    console.log("dados: ", position.coords);
}