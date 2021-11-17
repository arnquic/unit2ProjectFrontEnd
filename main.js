//nav links

document.querySelector('#home-link').addEventListener('click', () => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#home-content').classList.remove('hidden');
});

document.querySelector('#signup-link').addEventListener('click', (event) => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#signup-content').classList.remove('hidden'); 
});

document.querySelector('#login-link').addEventListener('click', () => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#login-content').classList.remove('hidden');
});

document.querySelector('#logout-link').addEventListener('click', () => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#home-content').classList.remove('hidden');
    localStorage.removeItem('userId');
    document.querySelector('#signup-link').classList.remove('hidden');
    document.querySelector('#login-link').classList.remove('hidden');
    document.querySelector('#logout-link').classList.add('hidden');
    document.querySelector('#history-link').classList.add('hidden');
});

document.querySelector('#search-link').addEventListener('click', () => {
    document.querySelectorAll('#search-content').forEach(s => s.classList.remove('hidden'));
});

document.querySelector('#history-link').addEventListener('click', () => {
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
    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value
    try {
        const response = await axios.post('http://localhost:3001/users', {
            email: email,
            password: password
        });
        const userId = response.data.user.userId
        localStorage.setItem('userId', userId)
        if (localStorage.getItem('userId')) {
            document.querySelector('#logout-link').classList.add('hidden')
            document.querySelector('#history-link').classList.add('hidden')
        }
    } catch (error) {
        console.log({error: error.message}, 'email is already taken');
    }
});

document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value
    try {
        const response = await axios.post('http://localhost:3001/', {
            email: email,
            password: password
        });
        const userId = response.data.user.userId
        localStorage.setItem('userId', userId)
        if (localStorage.getItem('userId')) {
            document.querySelector('#signup-link').classList.add('hidden')
            document.querySelector('#login-link').classList.add('hidden')
        }
    } catch (error) {
        console.log({error: error.message}, 'login failed');
    }
});

if (localStorage.getItem('userId')) {
    document.querySelector('#signup-link').classList.add('hidden');
    document.querySelector('#login-link').classList.add('hidden');
} else {
    document.querySelector('#logout-link').classList.add('hidden');
    document.querySelector('#history-link').classList.add('hidden');
}