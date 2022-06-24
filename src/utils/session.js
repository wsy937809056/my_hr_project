
export  function getuserinfo(){
    return JSON.parse(sessionStorage.getItem('userinfo'))
}

export  function setuserinfo(data){
    return sessionStorage.setItem('userinfo',JSON.stringify(data))
}

export  function removeuserinfo(){
    return sessionStorage.removeItem('userinfo')
}