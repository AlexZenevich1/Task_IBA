function check(){
   
    var fLogin = document.getElementById('login');
    var fPass = document.getElementById('password1');
    var rpass = document.getElementById('password2');
    var fname = document.getElementById('realname');
    if (fLogin.value.length<4){
        alert('Логин должен состоять минимум из 4 символов!');
        return false;
    }
    if (fLogin.value.length>30){
        alert('Логин должен состоять максимум из 30 символов!');
        return false;
    }
    if (fPass.value.length<5){
        alert('Пароль не может быть меньше 5-ти символов!');
        return false;
    }
    if (fPass.value.length>30){
        alert('Пароль не может быть больше 30-ти символов!');
        return false;
    }
    if (fPass.value!=rpass.value){
        alert ('Пароли должны совпадать.');
        return false
    }
    if (realname.value<4 && realname.value!="Зоя"){
    (alert('Имя не может быть меньше 4-х символов!(кроме Зоя)'));
    return false
}
    return true;
}

