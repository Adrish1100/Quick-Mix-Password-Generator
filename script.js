    const genbtn = document.getElementById('inputbtn')
const length = document.getElementById('length')
let passlen;
const outputs = document.querySelectorAll('.pass')
const Chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','!','@','#','$','%','^','&','*','_','-','+','=','|',';',':','?','/','.'];
let genpass = '';

console.log(genbtn)

genbtn.addEventListener('click', ()=>{
    passlen = parseInt(length.value)
    for (let i=0; i<5; i++) {
    genpass = '';
        for (let j=0; j<passlen; j++) {
            genpass += Chars[Math.floor(Math.random() * Chars.length)]
        }
        outputs[i].textContent = genpass;
    }
})
