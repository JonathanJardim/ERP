// Menu
const menu = document.querySelector('.expandMenu');
menu.addEventListener("click", function(){
    expandSidebar();
    
    function expandSidebar(){
        let expand = document.querySelector("body")
        if(expand.className == ""){
            document.querySelector("nav").classList.toggle("expand");
        }else{
            expand.classList.remove("expand")
        }
    }
});

// menu handler
const body = document.querySelector("div.set")
body.addEventListener("click", function(){
    let nav = document.querySelector("nav")
    function checkNav(status){
        if(nav.className == "expand"){
            status = "close"
        }else{
            status = "leave"
        }
        return status
    }
    if(checkNav() == "close"){
        nav.classList.remove("expand")
    }
})
let openedmenu = document.querySelector("nav")
if(openedmenu.className == "expand"){
    openedmenu.classList.remove("expand")
}

let openedMenu = document.querySelector("nav");
if (openedMenu.className === "expand") {
    openedMenu.classList.remove("expand");
}


