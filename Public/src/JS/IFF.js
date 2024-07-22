let screenWidth = window.innerWidth
if(screenWidth >700){
const menu = document.querySelector('.expandMenu');
menu.addEventListener("click", function(){
    expandSidebar();
    
    function expandSidebar(){
        let expand = document.querySelector("nav")
        if(expand.className == ""){
            document.querySelector("nav").classList.toggle("expand");
        }else{
            expand.classList.remove("expand")
        }
    }
});
}else if(screenWidth <699){
    const bar = document.getElementById("bar")
    bar.classList.toggle("hide")
    const menu = document.querySelector(".expandMenu")
    menu.addEventListener("click", function(){
        showSide();
        
        function showSide(){
            let expand = document.querySelector("nav")
            if(expand.className == "hide"){
                expand.classList.toggle("show");
                expand.classList.remove("hide")
            }else{
                expand.classList.remove("show")
                expand.classList.toggle("hide")
            }
        }
    });
}
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

function identScreen(SCW, type){
    SCW = window.screenWidth
    if(SCW >=1050){
        type = "monitor"
    }else if(SCW <=1049 && SCW>=701){ 
        type = "laptop"
    }else if(SCW<=700){
        type = "phone"
    }
return type;
}
let variable = identScreen()

console.log(variable)