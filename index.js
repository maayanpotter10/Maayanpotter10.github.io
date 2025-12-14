console.log("helo world")
let secret=document.getElementsByClassName('secret-link')[0]
secret.addEventListener('mouseenter',() => {
    secret.style.top = Math.random() * 100 + 'em';
})

let stylish = document.getElementById("stylish");
console.log(stylish);
stylish.addEventListener("click",function() { 
    console.log("click")
    stylish.style.backgroundColor="#00f"
})