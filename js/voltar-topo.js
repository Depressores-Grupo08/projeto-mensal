const btnTopo = document.getElementById("voltar-topo");

window.addEventListener("scroll", (event) => {
        if (window.scrollY == 0) {
            btnTopo.classList.remove("visible");
        } else {
            btnTopo.classList.add("visible");
        }
    });

btnTopo.addEventListener("click", function() {
	window.scrollTo(0, 0);
    });