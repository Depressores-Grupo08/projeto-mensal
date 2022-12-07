
const mostrar = document.getElementById("jogos");

function mostrarJogos(resposta){

    resposta.slice(0, 6).forEach(function(item){

        mostrar.innerHTML += `<div id="div_jogos">
                            <a id="link_jogo"href="${item.game_url}">
                            <img id="imagem_jogo" src="${item.thumbnail}">
                            <p>${item.title}</p>
                            <p>${item.short_description}</p>
                            </a>
                            <div id="div_comprar_favoritos">
                            
                                <button id="botao_comprar">JOGAR</button>

                                <input type="checkbox" id="input_favoritos">
                                </input>
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
    .then(data => mostrarJogos(data))
	.catch(err => console.error(err));