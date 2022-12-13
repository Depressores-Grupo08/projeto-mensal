const mostrar = document.getElementById("jogos");
const mostraBanner = document.getElementById("banner");
const printFav = document.getElementById("favoritos")
const btn = document.getElementById("botaoCarregar");



let auxGames = 0;
let TODOS_JOGOS;


function mostrarJogos(JOGOS) {
    auxGames = JOGOS;
    mostraBanner.innerHTML = `<div>
                                    <a href="${JOGOS[0].game_url}">
                                    <div class="div_banner">
                                        <img class="imgbanner2" src="${JOGOS[0].thumbnail}">
                                    </div>
                                    </a>
                                    <img class="imgbanner1"src="${JOGOS[0].thumbnail}">
                                    
                                </div>`


    let exibirPrimeiros = JOGOS.slice(0, 6);
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
    // console.log(JOGOS[1].id)
}

function carregar() {
    let JOGOS_TELA = (document.querySelectorAll(".div_jogos").length) + 1;
    console.log(JOGOS_TELA);
    console.log(auxGames);
    let exibirItens = auxGames.slice(JOGOS_TELA, JOGOS_TELA += 10);
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
    mostrarJogos(fav);

} printFav.addEventListener('click', printarFavoritos)

function filtrar(categoria) {
    document.querySelector(".menu-lateral").querySelector(".ativo").classList.remove("ativo");//remove a classe ativo do elemento que a possui
    mostrar.innerHTML = null;
    mostraBanner.innerHTML = null;
    document.querySelector(`[data-categoria="${categoria}"]`).classList.add("ativo");//adiciona a classe ativo ao elemento que foi clicado

    let plataforma = document.querySelector(".barra").querySelector(".ativo").dataset.plataforma;
    let mostrarFiltrados = TODOS_JOGOS;
    console.log(categoria, plataforma)

    if (categoria != "home") {
        mostrarFiltrados = mostrarFiltrados.filter((valorAtual) => {//filtra os jogos que possuem a categoria selecionada
            return valorAtual.genre.includes(categoria);//retorna os jogos que possuem a categoria selecionada
        })
    } console.log(mostrarFiltrados);
    if (plataforma != "All") {
        mostrarFiltrados = mostrarFiltrados.filter((valorAtual) => {//filtra os jogos que possuem a plataforma selecionada
            return valorAtual.platform.includes(plataforma);//retorna os jogos que possuem a plataforma selecionada
        })
    }
    console.log(mostrarFiltrados);
    mostrarJogos(mostrarFiltrados);//mostra os jogos filtrados

}

function filtrarPlat(plataforma) {
    document.querySelector(".barra").querySelector(".ativo").classList.remove("ativo");//remove a classe ativo do elemento que a possui
    mostrar.innerHTML = null;
    mostraBanner.innerHTML = null;
    document.querySelector(`[data-plataforma="${plataforma}"]`).classList.add("ativo");//adiciona a classe ativo ao elemento que foi clicado

    let categoria = document.querySelector(".menu-lateral").querySelector(".ativo").dataset.categoria;
    let mostrarPlataforma = TODOS_JOGOS;
    console.log(categoria, plataforma)
    if (plataforma != "All") {
        mostrarPlataforma = mostrarPlataforma.filter((valorAtual) => {
            return valorAtual.platform.includes(plataforma);
        })
    } console.log(mostrarPlataforma);
    if (categoria != "home") {
        mostrarPlataforma = mostrarPlataforma.filter((valorAtual) => {
            return valorAtual.genre.includes(categoria);
        })
    }
    console.log(mostrarPlataforma);
    mostrarJogos(mostrarPlataforma);

}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ed04ba597fmsh91f8cb322f43b88p185c74jsn6aa29c859746',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    .then(resposta => resposta.json())//transforma a resposta em json
    .then(data => {//data é o json
        TODOS_JOGOS = data //atribui o json a variavel TODOS_JOGOS
        mostrarJogos(TODOS_JOGOS);//chama a função mostrarJogos e passa o json como parametro
    })
    .catch(err => console.error(err));
