const mostrar = document.getElementById("jogos");
const mostraBanner = document.getElementById("banner");
const printFav = document.getElementById("favoritos")
const btn = document.getElementById("botaoCarregar");


let primeiraP = 0;
let segundaP = 0;
let TODOS_JOGOS;

function mostrarJogos() {


    mostraBanner.innerHTML = `<div>
                                    <a href="${TODOS_JOGOS[0].game_url}">
                                    <img src="${TODOS_JOGOS[0].thumbnail}">
                                    </a>
                                </div>`

    let exibirPrimeiros = TODOS_JOGOS.slice(primeiraP, primeiraP += 6)
    exibirPrimeiros.forEach(function (exibirRes) {

        mostrar.innerHTML += `<div>
                            <a href="${exibirRes.game_url}">
                            <img src="${exibirRes.thumbnail}">
                            <p>${exibirRes.title}</p>
                            <p>${exibirRes.short_description}</p>
                            <p>${exibirRes.genre}</p>
                            </a>
                            <button type="button"  value="${exibirRes.id}" onclick="salvarFavoritos(this)">Favoritar</button>
                        </div>`
    })
}

function carregar() {

    let exibirItens = TODOS_JOGOS.slice(primeiraP, primeiraP += 10)
    exibirItens.forEach(function (exibir) {
        mostrar.innerHTML += `<div>
                            <a href="${exibir.game_url}">
                            <img src="${exibir.thumbnail}">
                            <p>${exibir.title}</p>
                            <p>${exibir.short_description}</p>
                            <p>${exibir.genre}</p>
                            </a>
                            <button type="button"  value="${exibir.id}" onclick="salvarFavoritos(this)">Favoritar</button>
                            </div>`
    })
}
btn.addEventListener("click", carregar);



function salvarFavoritos(TODOS_JOGOS) {

    let recArray = localStorage.getItem('identidades');

    if (recArray == undefined) {
        localStorage.setItem('identidades', JSON.stringify([]));
    }

    let novoArray = JSON.parse(recArray);
    console.log(novoArray)
    let verifica = novoArray.indexOf(TODOS_JOGOS.value);

    if (verifica != -1) {
        novoArray.splice(verifica, 1);
        localStorage.setItem('identidades', JSON.stringify(novoArray));
        console.log(novoArray)
        return;
    }
    novoArray.push(TODOS_JOGOS.value);
    localStorage.setItem('identidades', JSON.stringify(novoArray));
    console.log(novoArray);

}

function printarFavoritos() {
    let ids = localStorage.getItem('identidades');
    ids = JSON.parse(ids);
    let aux;
    let fav = [];
    for (let i = 0; i < ids.length; i++) {
        let indice = TODOS_JOGOS.findIndex(p => p.id == ids[i]);
        aux = TODOS_JOGOS[indice];
        fav.push(aux);
    }   

    fav.forEach(function (itemFav) {
        printFav.innerHTML += `<div>
                                <a href="${itemFav.game_url}">
                                <img src="${itemFav.thumbnail}">
                                <p>${itemFav.title}</p>
                                <p>${itemFav.short_description}</p>
                                <p>${itemFav.genre}</p>
                                </a>
                                <button type="button"  value="${itemFav.id}" onclick="salvarFavoritos(this)">Favoritar</button>
                            </div>`
    })
} printFav.addEventListener('click', printarFavoritos)

function filtrar(categoria) {

    let mostrarFiltrados = TODOS_JOGOS.filter((valorAtual) => {
        return valorAtual.genre.includes(categoria);
    })
    console.log(mostrarFiltrados);
    
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
    .then(data => {
        TODOS_JOGOS = data
        mostrarJogos()
    })
    .catch(err => console.error(err));

