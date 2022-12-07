var arrow = document.querySelector('.arrow');
var menuLateral = document.querySelector('.menu-lateral');

/*função para mostrar e esconder o menu lateral*/
arrow.onclick = e => {
    if(!menuLateral.classList.contains('oculto')){ /* Se o menu nao tem a classe oculta, adiciona a classe oculta */
        menuLateral.classList.add('oculto');
    }else{
        menuLateral.classList.remove('oculto'); /* Se o menu tem a classe oculta, remove a classe oculta */
    }
}