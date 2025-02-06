// nav bar menu
let menuBtn = document.getElementById('menu');
let menuBox = document.getElementById('menu-box');

menuBtn.addEventListener('click',()=>{
    if(menuBtn.getAttribute('src') == '../loginSignup/menu.png'){
        menuBtn.setAttribute('src','../loginSignup/close.png');
        menuBox.style.right = '0px';
        menuBox.style.display = 'block';
        
    }
    else{
        menuBtn.setAttribute('src','../loginSignup/menu.png');
        menuBox.style.right = '-65px';
        menuBox.style.display = 'none';
    }
});

// password change procedure
let logInUser = JSON.parse(localStorage.getItem('logInUser'));
let users = JSON.parse(localStorage.getItem('users'));

let oldP = document.getElementById('old-password');
let newP = document.getElementById('new-password');
let confirmP = document.getElementById('c-password');

function changePassword(){
    if(logInUser.length>0){
        if(oldP.value == logInUser[0].logInUserPassword){
            if(newP.value == confirmP.value){
                logInUser[0].logInUserPassword = newP.value;
                for (let i = 0; i<users.length;i++){
                    if(users[i].email == logInUser[0].logInUserEmail){
                        users[i].password = newP.value;
                        console.log(users[i])
                    }

                }
                localStorage.setItem('users',JSON.stringify(users));
                localStorage.setItem('logInUser',JSON.stringify(logInUser));
                newP.value = '';
                oldP.value = '';
                confirmP.value = '';
                alert('Password Change Successfully.')
            }
            else{
                alert('Confirm password should be same !');
            }
        }
        else{
            alert('Enter correct old password !');
        }
    }
    else{
        alert('User not log in ! log in first.')
    }
}




// log out procedure
  
let logOutBtn = document.getElementById('log-out');


function logOut(){
    if(logInUser.length>0){
            logInUser.length = 0;
            localStorage.setItem('logInUser',JSON.stringify(logInUser));
            alert('Log Out Successfull');
    }
    else{
        alert('User not log in ! log in first.');
    }
}