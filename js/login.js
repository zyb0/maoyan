$(function(){
     $('.btn').click(async(e)=>{
      if(e.preventDefault()){
        e.preventDefault()
       }else{e.returnValue = false}
       const username=$('#login-email').val()
       const password=$('#login-password').val()
       if(!username||!password)return alert('请完整填写表单')
       if(!/^1[3-9]\d{9}$/.test(username)||!/^\w{6,12}$/i.test(password))return alert('表单不符合规则')
       const {code,nickname}=await $.post('./../php/login.php',{username,password},null,'json')
       // 解构赋值的用法
       console.log({code,nickname})
       if(!code)return alert('用户名密码错误')
       setCookie('nickname',nickname,60*60*24)
       const url = window.sessionStorage.getItem('url')
       window.location.href = `./${ url ? url : 'sy' }.html`
   
     })



     
    $('.eig').click(async()=>{
      const username = $('.phone-input').val()
      const password = $('.pw-input').val()
      const nickname = $('.btn').val()
      console.log(username)
      console.log(password)
      console.log(nickname)
      if(!username || !password ||!nickname) return alert('注册你就好好注')
      if(!/^1[3-9]\d{9}$/.test(username) || !/^\w{6,12}$/i.test(password)) return alert('用户名字母数字开头5-12位，密码6-12位，昵称随便')
      const {code} =  await $.post('./../login.php',{username , password, nickname},null,'json')
      if(!code){
          alert('注册失败')
      }else{
          alert('注册成功')
          $('.box').css({'display':'block'})
          $('.box1').css({'display':'none'})
      }
  })
     
   })


   