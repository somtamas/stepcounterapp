async function registration(){
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let passwd = document.querySelector('#passwd').value;
    let confirm = document.querySelector('#confirm').value;
 
    // meg kell szolitani a servert
 
    let user = {
        name, // name : name,
        email,
        passwd,
        confirm
    }
    const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(user)
    });
 
    const res = await response.json();
 
    if(response.status != 200){
        showMessage('danger', 'ERROR', res.error);
    }
    else
    {
        showMessage('success', 'ok', res.message);
        navigate('views/users/login');
    }
}

async function login() {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    let user = {
        email,
        password
    }

    const response = await fetch(`http://localhost:3000/users/login`, {
        method: 'POST',
        headers: {
            "Content-Type" : "Application/json"
        },
        body: JSON.stringify(user)
    })

    const res = await response.json();

    if (response.status != 200) {
        showMessage('danger', 'ERROR', res.error);
    } else {
        showMessage('success', 'OK', res.message);
        sessionStorage.setItem('SCU', JSON.stringify(res.loggedUser));
        navigate('users/steps');
    }
}

function logout() {
    clearUser();
    loginCheck();
    navigate('/users/login');
}

function storeUser(user) {
    sessionStorage.setItem('SCU', JSON.stringify(user));
}

function loadUser() {
    let user = JSON.parse(sessionStorage.getItem('SCU'));
    return user;
}

function clearUser() {
    sessionStorage.removeItem('SCU')
}

function loginCheck() {
    if (user = loadUser()) { // két művelet egyben, 1: ellenőrizzük a loadUser-el a sessionStorage kulcsot, majd 2. a visszaadott értéket eltároljuk a user...
        if(user.role == 'admin') {
            //alert('admin belépve');
            setMenuItems('admin')
        } else {
            //alert('user belépve');
            setMenuItems('user');
        }
    }
    else {
        //alert('nincs belépve');
        setMenuItems('');
    }
}

function setMenuItems(param) {
    let baseMenu = document.querySelector('#baseMenu');
    let adminMenu = document.querySelector('#adminMenu');
    let userMenu = document.querySelector('#userMenu');

    switch(param) {
        case 'admin' : {
            baseMenu.classList.add('hide');
            userMenu.classList.add('hide');
            adminMenu.classList.remove('hide');
            break;
        }
        case 'user' : {
            baseMenu.classList.add('hide');
            userMenu.classList.remove('hide');
            adminMenu.classList.add('hide');
            break;
        }
        default : {
            baseMenu.classList.remove('hide');
            userMenu.classList.add('hide');
            adminMenu.classList.add('hide');
            break;
        }
    };
}

async function updateProfile() {

}

async function updatePassword() {
    let oldpass = document.querySelector('#oldpass');
    let newpass = document.querySelector('#newpass');
    let confirm = document.querySelector('#confirm');

    let data = {
        oldpass: oldpass.value,
        newpass: newpass.value,
        confirm: confirm.value
    }

    let uid = loadUser() ? loadUser().ID : 0;

    const response = await fetch(`http://localhost:3000/users/${uid}/passmod`, {
        method: 'POST',
        headers: {
            "Content-Type" : "Application/json"
        },
        body: JSON.stringify(data)
    });

    let res = await response.json();

    if(response.status != 200) {
        showMessage('danger', 'ERROR', res.error);
    } else {
        showMessage('success', 'OK', res.message);
        oldpass.value = '';
        newpass.value = '';
        confirm.value = '';
    }
}