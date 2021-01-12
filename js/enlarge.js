function Enlarge(select){
    this.ele=document.querySelector(select)
    this.show=this.ele.querySelector('.show')
    this.mask=this.ele.querySelector('.mask')
    this.enlarge=this.ele.querySelector('.enlarge')
    this.list=this.ele.querySelector('.list')
    this.showwidth=this.show.clientWidth
    this.showheight=this.show.clientHeight
    this.bgwidth=parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    this.bgheight=parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
    this.enlargewidth=parseInt(window.getComputedStyle(this.enlarge).width)
    this.enlargeheight=parseInt(window.getComputedStyle(this.enlarge).height)
    // console.log(this.showwidth,this.bgwidth,this.enlargewidth)
    this.init()
}
Enlarge.prototype.init=function(){
    this.overout()
    this.setScale()
    this.setMove()
    this.changeList()
}
// 移入移出事件
Enlarge.prototype.overout=function(){
    this.show.addEventListener('mouseover',()=>{
        this.mask.style.display='block'
        this.enlarge.style.display='block'
    })
    this.show.addEventListener('mouseout',()=>{
        this.mask.style.display='none'
        this.enlarge.style.display='none'
    })
}
// 调整比例事件
// mask盒子尺寸    enlarge盒子的尺寸
// ------------ = ----------------
// show盒子尺寸     背景图的尺寸
Enlarge.prototype.setScale=function(){
    this.maskwidth=this.showwidth*this.enlargewidth/this.bgwidth
    this.maskheight=this.showheight*this.enlargeheight/this.bgheight
    this.mask.style.width=this.maskwidth+'px'
    this.mask.style.height=this.maskheight+'px'
}
// 移动联动事件
Enlarge.prototype.setMove=function(){
    this.show.addEventListener('mousemove',e=>{
        e=e||window.event
        let moveX=e.offsetX-this.maskwidth/2
        let moveY=e.offsetY-this.maskheight/2
        if(moveX<=0)moveX=0
        if(moveY<=0)moveY=0
        if(moveX>=this.showwidth-this.maskwidth){moveX=this.showwidth-this.maskwidth}
        if(moveY>=this.showheight-this.maskheight){moveY=this.showheight-this.maskheight}
        this.mask.style.left=moveX+'px'
        this.mask.style.top=moveY+'px'
        // 盒子移动的距离        背景图移动的距离
        // -------------  =  ------------------
        //   盒子的尺寸           放大镜盒子的尺寸      
        const bgX=moveX*this.enlargewidth/this.maskwidth
        const bgY=moveY*this.enlargeheight/this.maskheight
        this.enlarge.style.backgroundPosition=`-${bgX}px -${bgY}px`
    })
}
// 点击列表切换
Enlarge.prototype.changeList=function(){
    this.list.addEventListener('click',(e)=>{
        e=e||window.event
        const target =e.target||e.srcElement
        if(target.nodeName==='IMG'){
           const showUrl=target.dataset.show
           const enlargeUrl=target.dataset.enlarge 
            this.show.firstElementChild.src=showUrl
            this.enlarge.style.backgroundImage=`url(${enlargeUrl})`
            for(let i=0;i<this.list.children.length;i++){
                this.list.children[i].classList.remove('active')
            }
           target.parentElement.classList.add('active')
        }
    })
}