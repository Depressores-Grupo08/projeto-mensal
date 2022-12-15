const btnTopo = document.getElementById("voltar-topo"); //pega o elemento do botão voltar para o topo.

window.addEventListener("scroll", (event) => { //evento para remover/mostrar botão.
        if (window.scrollY == 0) { 
            btnTopo.classList.remove("visible"); // se o scroll da tela é igual a 0, remove o visible do id do botão.
        } else {
            btnTopo.classList.add("visible"); // se a tela descer, adiciona o visible no id.
        }
    });

btnTopo.addEventListener("click", function() { // função anônima ao clicar no botão, ele sclolla a tela para o início. 
	window.scrollTo(0, 0);
    });