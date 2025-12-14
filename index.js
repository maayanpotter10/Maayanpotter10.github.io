console.log("helo world")
let secret=document.getElementsByClassName('secret-link')[0]
secret.addEventListener('mouseenter',() => {
    secret.style.top = Math.random() * 100 + 'em';
})

let stylish = document.getElementById("stylish");
console.log(stylish);
stylish.addEventListener("click",function() { 
    console.log("click")
    stylish.style.backgroundColor=makeRandomColor()
    stylish.style.color=makeRandomColor();
})
function makeRandomColor () {
    let r=Math.floor(Math.random() * 256);
    let g=Math.floor(Math.random() * 256);
    let b=Math.floor(Math.random() * 256);

    let color = `rgb(${r}, ${g},${b})`
    return color
}