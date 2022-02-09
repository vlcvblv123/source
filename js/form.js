
window.onload = () => {
    if(sessionStorage.user){
        user =JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loader');

const submitBtn = document.querySelector('.submit-btn');
const names = document.querySelector('#names') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;
const tac = document.querySelector('#terms-and-cond') || null;
const notification = document.querySelector('#notification')  || null;

submitBtn.addEventListener('click', () => {
    if(names != null){ // sign up
        if(names.value.length < 3){
            showAlert('name must be 3 letters long');
        } else if(!email.value.length){
            showAlert('enter your email');
        } else if(password.value.length < 8){
           showAlert('password should be 8 letters long');
        } else if(!number.value.length){
            showAlert('enter your phone number');
        } else if(!Number(number.value) || number.length < 10){
            showAlert('invalid number, pleaese enter vailid one');
        } else if(!tac){
            showAlert('you must agree to our terms and conditions');
        } else {
            loader.style.display = 'block';
            sendData('/signup',{
                names : names.value,
                email: email.value,
                password : password.value,
                number : number.value,
                tac : tac.checked,
                notification: notification.checked,
                seller: false
            })
        }
    } else {
        //login
        if(!email.value.length || !password.value.length){
            showAlert('fill all the inputs');
        } else {
            loader.style.display = 'block';
            sendData('/login',{
                email: email.value,
                password : password.value,
            })
        }
    }
 

})
