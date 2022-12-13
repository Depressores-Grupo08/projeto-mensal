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
                                    <div class="div_banner">
                                        <img class="imgbanner2" src="${TODOS_JOGOS[0].thumbnail}">
                                    </div>
                                    </a>
                                    <img class="imgbanner1"src="${TODOS_JOGOS[0].thumbnail}">
                                    
                                </div>`


    let exibirPrimeiros = TODOS_JOGOS.slice(primeiraP, primeiraP += 6)
    exibirPrimeiros.forEach(function (exibirRes) {

        mostrar.innerHTML += `<div class="div_jogos">
                            <img class="imagem_jogo" src="${exibirRes.thumbnail}">
                            <p class="p1">${exibirRes.title}</p>
                            <p class="p2">${exibirRes.short_description}</p>
                            <p class="p3">${exibirRes.genre}</p>
                            <div class="sub_jogos">
                            <a class="link_jogo" href="${exibirRes.game_url}"><button class="botao_jogar">Jogar</button></a>
                                <input type="checkbox" class="inputcheck" value="${exibirRes.id}" onclick="salvarFavoritos(this)"></input>
                            </div>
                        </div>`
    })

}

function carregar() {

    let exibirItens = TODOS_JOGOS.slice(primeiraP, primeiraP += 10)
    exibirItens.forEach(function (exibir) {
        mostrar.innerHTML += `<div class="div_jogos">
                            <img class="imagem_jogo" src="${exibir.thumbnail}">
                            <p class="p1">${exibir.title}</p>
                            <p class="p2">${exibir.short_description}</p>
                            <p class="p3">${exibir.genre}</p>
                            <div class="sub_jogos">
                            <a class="link_jogo" href="${exibir.game_url}"><button class="botao_jogar">Jogar</button></a>
                                <input type="checkbox" class="inputcheck" value="${exibir.id}" onclick="salvarFavoritos(this)"></input>
                            </div>
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
    mostrar.innerHTML = null;
    mostraBanner.innerHTML = null;

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
        mostrar.innerHTML += `<div class="div_jogos">
                                    <img class="imagem_jogo" src="${itemFav.thumbnail}">
                                    <p class="p1">${itemFav.title}</p>
                                    <p class="p2">${itemFav.short_description}</p>
                                    <p class="p3">${itemFav.genre}</p>
                                    <div class="sub_jogos">
                                    <a class="link_jogo" href="${itemFav.game_url}"><button class="botao_jogar">Jogar</button></a>
                                        <input type="checkbox" class="inputcheck" value="${itemFav.id}" onclick="salvarFavoritos(this)" checked></input>
                                    </div>
                                </div>`
    })
} printFav.addEventListener('click', printarFavoritos)

function filtrar(categoria) {
    mostrar.innerHTML = null;
    mostraBanner.innerHTML = null;

    let mostrarFiltrados = TODOS_JOGOS.filter((valorAtual) => {
        return valorAtual.genre.includes(categoria);
    })
    console.log(mostrarFiltrados);

    mostraBanner.innerHTML = `<div>
                                    <a href="${mostrarFiltrados[0].game_url}">
                                    <div class="div_banner">
                                        <img class="imgbanner2" src="${mostrarFiltrados[0].thumbnail}">
                                    </div>
                                    </a>
                                    <img class="imgbanner1" src="${mostrarFiltrados[0].thumbnail}">
                                </div>`

    mostrarFiltrados.forEach(function (itensFiltro) {
        mostrar.innerHTML += `<div class="div_jogos">
                                <img class="imagem_jogo" src="${itensFiltro.thumbnail}">
                                <p class="p1">${itensFiltro.title}</p>
                                <p class="p2">${itensFiltro.short_description}</p>
                                <p class="p3">${itensFiltro.genre}</p>
                                    <div class="sub_jogos">
                                        <a class="link_jogo" href="${itensFiltro.game_url}"><button class="botao_jogar">Jogar</button></a>
                                        <input type="checkbox"  class="inputcheck" value="${itensFiltro.id}" onclick="salvarFavoritos(this)"></input>
                                    </div>
                                </div>`
    })
}

function filtrarPlat(plataforma) {
    mostrar.innerHTML = null;
    mostraBanner.innerHTML = null;

    let mostrarPlataforma = TODOS_JOGOS.filter((valorAtual) => {
        return valorAtual.platform.includes(plataforma);
    })
    console.log(mostrarPlataforma);

    mostraBanner.innerHTML = `<div>
                                    <a href="${mostrarPlataforma[0].game_url}">
                                    <div class="div_banner">
                                        <img class="imgbanner2" src="${mostrarPlataforma[0].thumbnail}">
                                    </div>
                                    </a>
                                    <img class="imgbanner1"src="${mostrarPlataforma[0].thumbnail}">
                                </div>`


    mostrarPlataforma.forEach(function (itensPlat) {
        mostrar.innerHTML += `<div class="div_jogos">
                                <img class="imagem_jogo" src="${itensPlat.thumbnail}">
                                <p class="p1">${itensPlat.title}</p>
                                <p class="p2">${itensPlat.short_description}</p>
                                <p class="p3">${itensPlat.genre}</p>
                                <div class="sub_jogos">
                                <a class="link_jogo" href="${itensPlat.game_url}"><button class="botao_jogar">Jogar</button></a>
                                    <input type="checkbox" class="inputcheck" value="${itensPlat.id}" onclick="salvarFavoritos(this)"></input>
                                </div>
                            </div>`
    })
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
