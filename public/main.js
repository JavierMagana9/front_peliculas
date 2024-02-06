const menuBurger = document.querySelector("#menuBurger")
const menuDesplegable = document.querySelector("#menu-desplegable")

document.addEventListener('click', (ev) => {
    console.log(ev.target)
    if (ev.target.matches("#menuBurger")) {
        //console.log("hamburguesa")
        menuDesplegable.classList.add("navVisible")
    } else {
        if (ev.target.matches(".cerrar")) {
            menuDesplegable.classList.remove("navVisible")
        }
    }
})