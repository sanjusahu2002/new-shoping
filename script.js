
//menu btn
let menuBtn = document.getElementById('menu');
let menuBox = document.getElementById('menu-box');

menuBtn.addEventListener('click',()=>{
    if(menuBtn.getAttribute('src') == './menu.png'){
        menuBtn.setAttribute('src','./close.png');
        menuBox.style.right = '0px';
        menuBox.style.display = 'block';
        
    }
    else{
        menuBtn.setAttribute('src','./menu.png');
        menuBox.style.right = '-65px';
        menuBox.style.display = 'none';
    }
});

// signIn 
let signIn = document.getElementById('signIn');
signIn.addEventListener('click',()=>{
    document.getElementById('signinbox').style.display = 'block';
    document.getElementById('signUp').style.display = 'block';
    document.getElementById('signupbox').style.animationName = '';
    document.getElementById('signupbox').style.display = 'none';

})


// signUp
let signUp = document.getElementById('signUp');
let signUpBox = document.getElementById('signupbox');

signUp.addEventListener('click',()=>{
    document.getElementById('signupbox').style.display = 'block';
    document.getElementById('signinbox').style.display = 'none';
    signUpBox.style.animationName = 'flow';
    signUp.style.display = 'none';
    
});

// sign up procedure
let fName = document.getElementById('fname');
let lName = document.getElementById('lname');
let email = document.getElementById('email');
let password = document.getElementById("password");
let cpassword = document.getElementById('cpassword');
let signupBtn = document.getElementById('signup');

// localStorage.setItem('users',JSON.stringify(users));

signupBtn.addEventListener('click',(e)=>{
    console.log('js')
    if(fName.value.length>0 && lName.value.length>0 && email.value.length>0 && password.value.length>0 && cpassword.value.length>0){

        let mailFormat = /\S+@\S+\.\S+/;
        if(email.value.match(mailFormat)){
            if(password.value == cpassword.value){
                // validation completed further step go on.
                let users = JSON.parse(localStorage.getItem('users')?? '[]');
                let filteredUsers = users.filter((obj)=> obj.email == email.value);
                if(filteredUsers.length>0){
                    alert("Email already exits ! Try to logIn")
                }else{
                    users.push(
                        {
                            fname: fName.value,
                            lname: lName.value,
                            email: email.value,
                            password: password.value
                        }
                    )
                    alert("Successfully Sign up ! You can log in now.");
                    localStorage.setItem('users',JSON.stringify(users));
                    fName.value = '';
                    lName.value = "";
                    email.value = "";
                    password.value = '';
                    cpassword.value = '';
                }
            
                


                
            }
            else{
                alert('Error : Password and Confirm password must be same');
            }
        }
        else{
            alert("Error : Email not correct")
        }
        

    }
    else{
        alert('Error : All field should be fill and correct')
    }

});

// log in procedure.

let signEmail = document.getElementById('signin-email');
let signPassword = document.getElementById('signin-password');
let signInBtn = document.getElementById('signin');
let userLogIn = JSON.parse(localStorage.getItem('logInUser'));

if(!userLogIn.length>0){
        function logInBtn(){
            if(signEmail.value.length>0 && signPassword.value.length>0){
            let users = JSON.parse(localStorage.getItem('users'));
            let user = users.filter((v)=> v.email == signEmail.value);
            if(user.length>0){
                if(signPassword.value == user[0].password){
                    let logInUser = [{
                        logInUserEmail : signEmail.value,
                        logInUserPassword : signPassword.value
                    }];
                    localStorage.setItem('logInUser',JSON.stringify(logInUser));
                    window.location.href = '../shop/index.html';
                    signEmail.value = '';
                    signPassword.value = "";
                    console.log('log in succesfully');
                }
                else{
                    alert('Password incorrect.')
                }
            }
            else{
                alert("Email not found ! Try to sign up.")
            }
        }
        else{
            alert("Email or Password should not be empty !");
        }
    };
}
else{
    function logInBtn(){
        alert("User's already log in ! log out first");
        window.location.href = "./profile/index.html";
    }
}
function logInBtn(){
    if(signEmail.value.length>0 && signPassword.value.length>0){
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.filter((v)=> v.email == signEmail.value);
    if(user.length>0){
        if(signPassword.value == user[0].password){
            let logInUser = [{
                logInUserEmail : signEmail.value,
                logInUserPassword : signPassword.value
            }];
            localStorage.setItem('logInUser',JSON.stringify(logInUser));
            window.location.href = './shop/index.html';
            signEmail.value = '';
            signPassword.value = "";
            console.log('log in succesfully');
        }
        else{
            alert('Password incorrect.')
        }
    }
    else{
        alert("Email not found ! Try to sign up.")
    }
}
else{
    alert("Email or Password should not be empty !");
}
};

// try
