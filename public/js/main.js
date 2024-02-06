const burgerMenu = document.querySelector("#imgBurger")
const menuDesplegable = document.querySelector("#menu-desplegable")

document.addEventListener('click', (ev) => {
    
    if (ev.target.matches("#imgBurger")) {
        //console.log("hamburguesa")
       if (!menuDesplegable.classList.contains("navVisible")){
        menuDesplegable.classList.add("navVisible")
       }else {
        menuDesplegable.classList.remove("navVisible")
       }
        
    } 
    
})