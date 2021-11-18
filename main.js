// ----------------------------------------------------------------------------------------
// *** Check login status on page load, so that the appropriate nav links are shown/hidden.
// ----------------------------------------------------------------------------------------
window.addEventListener('load', showHideNavLinks);

// --------------------------------------------------------------------------------------
// *** Nav Links.
// --------------------------------------------------------------------------------------

// Home
document.querySelector('#home-link').addEventListener('click', () => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#home-content').classList.remove('hidden');
    document.querySelector('#result').classList.add('hidden');
    showHideNavLinks();
});

// Sign-up
document.querySelector('#signup-link').addEventListener('click', (event) => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#signup-content').classList.remove('hidden');
    showHideNavLinks();
});

// Login
document.querySelector('#login-link').addEventListener('click', () => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelector('#login-content').classList.remove('hidden');
    showHideNavLinks();
});

// Logout
document.querySelector('#logout-link').addEventListener('click', () => {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    localStorage.removeItem('userId');
    showHideNavLinks();
});

// Search
document.querySelector('#search-link').addEventListener('click', () => {
    document.querySelectorAll('#search-content').forEach(s => s.classList.remove('hidden'));
    showHideNavLinks();
});

// History
document.querySelector('#history-link').addEventListener('click', handleHistoryNavClick);

// ---------------------------------------------------------------------------------------
// *** User History page.
// ---------------------------------------------------------------------------------------


async function handleHistoryNavClick(event) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('history-content').classList.remove('hidden');

    const userInfo = await axios.get('http://localhost:3001/users/userinfo', {
        headers: {
            Authorization: localStorage.getItem('userId')
        }
    });
    const userHistory = await axios.get('http://localhost:3001/users/history', {
        headers: {
            Authorization: localStorage.getItem('userId')
        }
    });
    document.getElementById('history-welcome').innerHTML = `Welcome back, ${userInfo.data.user.username}`;
    console.log(userHistory);
    for (let i = 0; i < userHistory.data.length; i++) {
        const newEl = await createHistoricPacklist(userHistory.data[i].recordId, userHistory.data[i].cityId, userHistory.data[i].weatherReturn, userHistory.data[i].packListReturn);
        document.getElementById('history-info').append(newEl);
    }
    showHideNavLinks();
}


// --------------------------------------------------------------------------------------
// *** Sign-up form submission.
// --------------------------------------------------------------------------------------

document.querySelector('#signup-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const username = document.querySelector('#signup-username').value
    const password = document.querySelector('#signup-password').value
    try {
        const response = await axios.post('http://localhost:3001/users', {
            username: username,
            password: password
        });
        console.log(response);
        const userId = response.data.user.id;
        localStorage.setItem('userId', userId)
    } catch (error) {
        console.log({ error: error.message }, 'username is already taken');
    }
    showHideNavLinks();
});

// --------------------------------------------------------------------------------------
// *** Login form submission.
// --------------------------------------------------------------------------------------

document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const username = document.querySelector('#login-username').value
    const password = document.querySelector('#login-password').value
    try {
        const response = await axios.post('http://localhost:3001/users/login', {
            username: username,
            password: password
        });
        console.log(response);
        const userId = response.data.user.id;
        localStorage.setItem('userId', userId)
        document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    } catch (error) {
        console.log({ error: error.message }, 'login failed');
    }
    showHideNavLinks();
});

// --------------------------------------------------------------------------------------
// *** Search form submission.
// --------------------------------------------------------------------------------------

document.querySelector('#search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    document.querySelector('#result-content').classList.remove('hidden');
    const city = document.querySelector('#search-city').value
    const country = document.querySelector('#search-country').value
    try {
        console.log(city, country);
        const response = await axios.post('http://localhost:3001/users/search', {
            city: city,
            country: country
        }).then((response) => {
            console.log(response);
            document.querySelector('#result').innerText = `Destination: ${city}, ${country}, Past Five Days: ${response.data.weatherReturn.past5days}, Today: ${response.data.weatherReturn.today}, Next Seven Days: ${response.data.weatherReturn.next7days}`
        })
    } catch (error) {
        console.log({ error: error.message }, 'invalid city/country combination');
    }
});

// ---------------------
// | Helper Functions. |
// ---------------------

function showHideNavLinks() {
    if (localStorage.getItem('userId')) {
        document.querySelector('#signup-link').classList.add('hidden');
        document.querySelector('#signup-form').classList.add('hidden');
        document.querySelector('#login-form').classList.add('hidden');
        document.querySelector('#login-link').classList.add('hidden');
        document.querySelector('#search-link').classList.remove('hidden');
        document.querySelector('#logout-link').classList.remove('hidden');
        document.querySelector('#history-link').classList.remove('hidden');
    } else {
        document.querySelector('#logout-link').classList.add('hidden');
        document.querySelector('#history-link').classList.add('hidden');
        document.querySelector('#search-link').classList.add('hidden');
        document.querySelector('#search-form').classList.add('hidden');
        document.querySelector('#result').classList.add('hidden');
        document.querySelector('#signup-link').classList.remove('hidden');
        document.querySelector('#signup-form').classList.remove('hidden');
        document.querySelector('#login-link').classList.remove('hidden');
    }
}

// ------------------------------------------------
// *** Used to create a historic packlist element
// ------------------------------------------------
async function createHistoricPacklist(recordId, cityId, weatherInfoObj, packItemsArr) {
    try {
        let containerDiv = document.createElement('div');
        containerDiv.setAttribute('data-recordId', recordId);
        containerDiv.setAttribute('class', 'history-card');
        let leftContainerDiv = document.createElement('div');
        let rightContainerDiv = document.createElement('div');

        // Set the container header to be the City, Country
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=89de7727b1752cbeafa3942937797633`);
        console.log(response);
        let headerEl = document.createElement('h2');
        headerEl.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
        // Append the City, Country header to the div.
        containerDiv.appendChild(headerEl);

        // Create elements for the weather info.
        past5DaysEl = document.createElement('h4');
        todayEl = document.createElement('h4');
        next7DaysEl = document.createElement('h4');
        past5DaysEl.innerHTML = `Past 5 Days: ${weatherInfoObj.past5days}`;
        todayEl.innerHTML = `Today: ${weatherInfoObj.today}`;
        next7DaysEl.innerHTML = `Next 7 Days: ${weatherInfoObj.next7days}`;
        // Append the weather info to the div.
        leftContainerDiv.appendChild(past5DaysEl);
        leftContainerDiv.appendChild(todayEl);
        leftContainerDiv.appendChild(next7DaysEl);

        // Create the Packlist elements.
        let packListHeaderEl = document.createElement('h4');
        packListHeaderEl.innerHTML = 'Pack List:'
        let packListEl = document.createElement('ul');
        for (let i = 0; i < packItemsArr.length; i++) {
            const packItemEl = document.createElement('li');
            packItemEl.innerHTML = packItemsArr[i].name;
            // Append the packItem to the Packlist.
            packListEl.appendChild(packItemEl);
        }
        // Append the Packlist element to the right div.
        rightContainerDiv.appendChild(packListHeaderEl);
        rightContainerDiv.appendChild(packListEl);

        // Append the left and right divs to the main div.
        containerDiv.appendChild(leftContainerDiv);
        containerDiv.appendChild(rightContainerDiv);

        return containerDiv;

    }
    catch (err) {
        console.log(err);
    }
}

window.addEventListener('load', checkLoginState);