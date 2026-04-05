const palette = document.getElementById("palette");
const btn = document.getElementById("bouton");
let seed = Date.now(); 

function pseudoRandom(){
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280; 
    }

function randomIndex(max){
    return parseInt(pseudoRandom()*max); 
}

function couleurAleatoire(){
    const lettres = "0123456789ABCDEF";
    let couleur = "#";
    for (l = 0; l <= 5; l++){
    couleur += lettres[randomIndex(16)]; 
    } 
    return couleur;
}    

function genererPalette(){
    palette.innerHTML = "";
    
    for (i = 0; i < 5; i++){
        const couleur = couleurAleatoire(); 
        const div = document.createElement("div");
            div.classList.add("couleur"); 
            div.style.background = couleur;  
   
     const span = document.createElement("span");
        span.textContent = couleur;

    div.addEventListener("click", function(){
        navigator.clipboard.writeText(couleur); 
        document.body.style.backgroundColor = couleur;
        showToast("Copié : "+ couleur); 
    });
    div.appendChild(span);
    palette.appendChild(div); 
}
} 

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.8); color: white; padding: 10px 20px;
        border-radius: 8px; font-size: 14px; z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; }, 1500);
    setTimeout(() => { toast.remove(); }, 2000);
}

btn.addEventListener("click", genererPalette);
genererPalette();