const mostrar = document.getElementById("jogos");
const mostraBanner = document.getElementById("banner");
const printFav = document.getElementById("")
const btn = document.getElementById("botaoCarregar");

let primeiraP = 0;
let segundaP = 0;

function mostrarJogos(resposta) {

    mostraBanner.innerHTML = `<div>
                                    <a href="${resposta[0].game_url}">
                                    <img src="${resposta[0].thumbnail}">
                                    </a>
                                </div>`

    resposta.slice(primeiraP, primeiraP += 6).forEach(function (item) {

        mostrar.innerHTML += `<div>
                            <a href="${item.game_url}">
                            <img src="${item.thumbnail}">
                            <p>${item.title}</p>
                            <p>${item.short_description}</p>
                            <p>${item.genre}</p>
                            </a>
                            <button type="button"  value="${item.id}" onclick="salvarFavoritos(this)">Favoritar</button>
                        </div>`
    })
    

    function carregar(){
    
        resposta.slice(primeiraP, primeiraP += 10).forEach(function (item) {
    
            mostrar.innerHTML += `<div>
                                <a href="${item.game_url}">
                                <img src="${item.thumbnail}">
                                <p>${item.title}</p>
                                <p>${item.short_description}</p>
                                <p>${item.genre}</p>
                                </a>
                                <button type="button"  value="${item.id}" onclick="salvarFavoritos(this)">Favoritar</button>
                                </div>`
        })
    }

    btn.addEventListener("click", carregar);

}

function salvarFavoritos(identidade) {

    let recArray = localStorage.getItem('identidades');

    if(recArray == undefined){
        localStorage.setItem('identidades', JSON.stringify([]));
    }

    let novoArray = JSON.parse(recArray);

    let verifica = novoArray.indexOf(identidade.value);
    console.log(achei)

    if(verifica != -1){
        novoArray.splice(verifica, 1);
        localStorage.setItem('identidades', JSON.stringify(novoArray));
        return;
    }
    novoArray.push(identidade.value);
    localStorage.setItem('identidades', JSON.stringify(novoArray));
    console.log(novoArray);
}

function printarFavoritos(){
    
}


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ed04ba597fmsh91f8cb322f43b88p185c74jsn6aa29c859746',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    .then(resposta => resposta.json())
    .then(data => mostrarJogos(data))
    .catch(err => console.error(err));

