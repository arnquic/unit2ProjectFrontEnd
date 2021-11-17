//nav links
const checkLoginState = () => {
    if (localStorage.getItem('userId')) {
        document.querySelector('#signup-link').classList.add('hidden');
        document.querySelector('#login-link').classList.add('hidden');
        document.querySelector('#search-link').classList.remove('hidden');
        document.querySelector('#logout-link').classList.remove('hidden');
        document.querySelector('#history-link').classList.remove('hidden');
    } else {
        document.querySelector('#logout-link').classList.add('hidden');
        document.querySelector('#history-link').classList.add('hidden');
        document.querySelector('#search-link').classList.add('hidden');
        document.querySelector('#signup-link').classList.remove('hidden');
        document.querySelector('#login-link').classList.remove('hidden');
    }
}

document.querySelector('#home-link').addEventListener('click', () => {
    checkLoginState();
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#home-content').classList.remove('hidden');
});

document.querySelector('#signup-link').addEventListener('click', (event) => {
    checkLoginState();
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#signup-content').classList.remove('hidden'); 
});

document.querySelector('#login-link').addEventListener('click', () => {
    checkLoginState();
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#login-content').classList.remove('hidden');
    document.querySelector('#search-link').classList.add('hidden');
});

document.querySelector('#logout-link').addEventListener('click', () => {
    checkLoginState();
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#home-content').classList.remove('hidden');
    localStorage.removeItem('userId');
    document.querySelector('#signup-link').classList.remove('hidden');
    document.querySelector('#login-link').classList.remove('hidden');
    document.querySelector('#logout-link').classList.add('hidden');
    document.querySelector('#history-link').classList.add('hidden');
});

document.querySelector('#search-link').addEventListener('click', () => {
    checkLoginState();
    document.querySelectorAll('#search-content').forEach(s => s.classList.remove('hidden'));
});

document.querySelector('#history-link').addEventListener('click', () => {
    checkLoginState();
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('profile-content').classList.remove('hidden');

    axios.get('http://localhost:3001/users/profile', {headers: { // confirm the URL route here
        Authorization: localStorage.getItem('userId')
        }
    }).then((response) => {
        document.querySelector('#history-info').innerText = `Welcome back, ${response.data.user}`
    })
});

document.querySelector('#signup-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const username = document.querySelector('#signup-username').value
    const password = document.querySelector('#signup-password').value
    try {
        const response = await axios.post('http://localhost:3001/users', {
            username: username,
            password: password
        });
        const userId = response.user.userId
        localStorage.setItem('userId', userId)
    } catch (error) {
        console.log({error: error.message}, 'username is already taken');
    }
    checkLoginState();
});

document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const username = document.querySelector('#login-username').value
    const password = document.querySelector('#login-password').value
    try {
        const response = await axios.post('http://localhost:3001/users/login', {
            username: username,
            password: password
        });
        const userId = response.user.userId
        localStorage.setItem('userId', userId)
    } catch (error) {
        console.log({error: error.message}, 'login failed');
    }
    checkLoginState();
});

if (localStorage.getItem('userId')) {
    document.querySelector('#signup-link').classList.add('hidden');
    document.querySelector('#login-link').classList.add('hidden');
} else {
    document.querySelector('#logout-link').classList.add('hidden');
    document.querySelector('#history-link').classList.add('hidden');
}