const btns=document.querySelectorAll('.subnav>a')
const tabs=document.querySelectorAll('.box>li')
for(let i=0;i<btns.length;i++){
    btns[i].onclick=function(){
        for(let j=0;j<btns.length;j++){
            btns[j].classList.remove('active')
            tabs[j].classList.remove('active')
        }
        btns[i].classList.add('active')
        tabs[i].classList.add('active')
    }      
}
      