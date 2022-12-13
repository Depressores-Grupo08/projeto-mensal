const mostrar = document.getElementById("jogos");//pega o elemento html onde os jogos serão mostrados
const mostraBanner = document.getElementById("banner");//pega o elemento html onde o banner será mostrado
const printFav = document.getElementById("favoritos")// pega o elemento html onde os jogos favoritos serão mostrados
const btn = document.getElementById("botaoCarregar");//pega o elemento html do botão de carregar mais jogos



let auxGames = 0;
let TODOS_JOGOS;


function mostrarJogos(JOGOS) {//função que mostra os jogos na tela
    auxGames = JOGOS;
    mostraBanner.innerHTML = `<div>
                                    <a href="${JOGOS[0].game_url}">
                                    <div class="div_banner">
                                        <img class="imgbanner2" src="${JOGOS[0].thumbnail}">
                                    </div>
                                    </a>
                                    <img class="imgbanner1"src="${JOGOS[0].thumbnail}">
                                    
                                </div>`


    let exibirPrimeiros = JOGOS.slice(0, 6);//pega os 6 primeiros jogos do array
    exibirPrimeiros.forEach(function (exibirRes) {//para cada jogo do array, cria um elemento html com as informações do jogo

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

function carregar() {//função que carrega mais jogos na tela
    let JOGOS_TELA = (document.querySelectorAll(".div_jogos").length) + 1;//pega o número de jogos que já estão na tela
    console.log(JOGOS_TELA);
    console.log(auxGames);
    let exibirItens = auxGames.slice(JOGOS_TELA, JOGOS_TELA += 10);//pega os próximos 10 jogos do array
    exibirItens.forEach(function (exibir) {//para cada jogo do array, cria um elemento html com as informações do jogo
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
btn.addEventListener("click", carregar);//adiciona um evento de click no botão de carregar mais jogos



function salvarFavoritos(TODOS_JOGOS) {//função que salva os jogos favoritos no local storage

    let recArray = localStorage.getItem('identidades');//pega o array do local storage

    if (recArray == undefined) {
        localStorage.setItem('identidades', JSON.stringify([]));//se o array não existir, cria um novo
    }

    let novoArray = JSON.parse(recArray);//transforma o array em um objeto javascript
    console.log(novoArray)
    let verifica = novoArray.indexOf(TODOS_JOGOS.value);//verifica se o jogo já está no array

    if (verifica != -1) {
        novoArray.splice(verifica, 1);//se o jogo já estiver no array, remove ele
        localStorage.setItem('identidades', JSON.stringify(novoArray));//salva o array no local storage
        console.log(novoArray)
        return;//para a função
    }
    novoArray.push(TODOS_JOGOS.value);//se o jogo não estiver no array, adiciona ele
    localStorage.setItem('identidades', JSON.stringify(novoArray));//salva o array no local storage
    console.log(novoArray);

}

function printarFavoritos() {
    mostrar.innerHTML = null;
    mostraBanner.innerHTML = null;

    let ids = localStorage.getItem('identidades');//pega o array do local storage
    ids = JSON.parse(ids);//transforma o array em um objeto javascript
    let aux;
    let fav = [];
    for (let i = 0; i < ids.length; i++) {//para cada id do array, procura o jogo correspondente no array de todos os jogos
        let indice = TODOS_JOGOS.findIndex(p => p.id == ids[i]);//pega o indice do jogo no array de todos os jogos
        aux = TODOS_JOGOS[indice];//pega o jogo no array de todos os jogos
        fav.push(aux);//adiciona o jogo no array de jogos favoritos
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
        mostrarPlataforma = mostrarPlataforma.filter((valorAtual) => {//filtra os jogos que possuem a plataforma selecionada
            return valorAtual.platform.includes(plataforma);//retorna os jogos que possuem a plataforma selecionada
        })
    } console.log(mostrarPlataforma);
    if (categoria != "home") {
        mostrarPlataforma = mostrarPlataforma.filter((valorAtual) => {//filtra os jogos que possuem a categoria selecionada
            return valorAtual.genre.includes(categoria);//retorna os jogos que possuem a categoria selecionada
        })
    }
    console.log(mostrarPlataforma);
    mostrarJogos(mostrarPlataforma);//mostra os jogos filtrados

}

const options = {//configurações da requisição
    method: 'GET',//método da requisição
    headers: {//cabeçalho da requisição
        'X-RapidAPI-Key': 'ed04ba597fmsh91f8cb322f43b88p185c74jsn6aa29c859746',//chave da api
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'//host da api
    }
};

fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)//faz a requisição
    .then(resposta => resposta.json())//transforma a resposta em json
    .then(data => {//data é o json
        TODOS_JOGOS = data //atribui o json a variavel TODOS_JOGOS
        mostrarJogos(TODOS_JOGOS);//chama a função mostrarJogos e passa o json como parametro
    })
    .catch(err => console.error(err));//caso ocorra algum erro, mostra no console
