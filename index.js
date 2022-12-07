const mostrar = document.getElementById("jogos");
const mostraBanner = document.getElementById("banner");
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
                                </div>`
        })
    }
    
    btn.addEventListener("click", carregar);
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

