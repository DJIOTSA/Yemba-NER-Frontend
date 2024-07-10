/* fetch data history data */
const historyLoader = document.querySelector("#loader-history");

// history function
function fetchUserHistory() {
    const history = document.querySelector('#history');
    history.querySelector('h2').innerHTML = "";
    history.querySelector('.table').style.display = "none";
    setInterval(() => {
        if (!retrieveLoginState()) {
            history.querySelector('h2').innerHTML = "You must have an account and logged in to see your history.";
            history.querySelector('.table').style.display = "none";
            return;
        }
        history.querySelector('h2').innerHTML = "All Your Previous Works Range From The Recent To The Oldest!";
    });

    if (retrieveLoginState()) {
        try {
            getHistoryData();
        } catch {
            try{
                getHistoryData();
            } catch{
                showAlert("Something went wrong! Please, check your internet connection.");
            }
            
        }

    }

}


async function getHistoryData() {
    historyLoader.style.display ='';
    const response = await apiRequest('https://yembaner.onrender.com/app/history/');
    if (response.ok) {
        const data = await response.json();
        elements = data['results'].reverse()
        if (elements.length >= 1) {
            history.querySelector('.table').style.display = "block";
            historyContent.innerHTML = ''
            for (element of elements) {
                let template = `<tr><td>${element['input']}</td><td>${element['output']}</td></tr>`
                historyContent.innerHTML += template;
            }
            historyLoader.style.display ='none';
        } else {
            historyLoader.style.display ='none';
            history.querySelector('.table').innerHTML = `<p class="text-ner text-lead"> You don't have stored history yet!</p>`
        }
    } else {
        historyLoader.style.display ='none';
        console.log('Failed to fetch data:', response.statusText);
        showAlert("Something went wrong! please check your internet connection and try again later. Else contact us if the issue persists.", 'history', true, 7000)
    }
}

function storeLoginState(isLoggedIn) {
    localStorage.setItem('isLoggedIn', isLoggedIn); // Or use sessionStorage if needed
}

function retrieveLoginState() {
    const storedState = localStorage.getItem('isLoggedIn'); // Or sessionStorage
    return storedState === 'true'; // Parse the stored value
}

async function refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');

    if (!refresh_token) {
        document.body.classList.toggle("show-popup-logreg");
        showAlert("Please login to continue!", "login");
    }

    const response = await fetch('https://yembaner.onrender.com/user/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refresh_token })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
    } else {
        // Handle token refresh failure (e.g., log out the user)
        document.body.classList.toggle("show-popup-logreg");
        showAlert("Please login to continue!", "login");
    }
}


async function apiRequest(endpoint, options = {}) {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
        console.error('No access token found');
        return;
    }

    const response = await fetch(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (response.status === 401) {
        // Token might be expired, try to refresh it
        await refreshToken();

        // Retry the request with the new access token
        const newAccessToken = localStorage.getItem('access_token');
        const retryResponse = await fetch(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${newAccessToken}`
            }
        });

        return retryResponse;
    }

    return response;
}

function showAlert(message, path = "", isError = false, duration = 5000) {
    let element = null;
    switch (path) {
        case "login":
            element = document.querySelector('.alert-container-login');
            displayAlert({ element: element, message: message, duration: duration, isError: isError });
            break;
        case "signup":
            element = document.querySelector('.alert-container-signup');
            displayAlert({ element: element, message: message, duration: duration, isError: isError });
            break;
        case "profile":
            element = document.querySelector('.alert-container-profile');
            displayAlert({ element: element, message: message, duration: duration, isError: isError });
            break;
        case "resetPass":
            element = document.querySelector('.alert-container-resetPass');
            displayAlert({ element: element, message: message, duration: duration, isError: isError });
            break;
        case "history":
            element = document.querySelector('.alert-container-history');
            displayAlert({ element: element, message: message, duration: duration, isError: isError });
            break;
        default:
            element = document.querySelector('#alert-container');
            displayAlert({ element: element, message: message, duration: duration, isError: isError });
    }
}


function displayAlert({ element, message, duration, isError = false }) {
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.style.backgroundColor = isError ? '#f44336' : '#4CAF50'; // Red for error, green for success
    alert.innerText = message;

    element.appendChild(alert);

    // Fade out and remove the alert after 3 seconds
    setTimeout(() => {
        alert.style.opacity = '0.5';
        setTimeout(() => {
            alert.remove();
        }, 600); // Match the transition duration
    }, duration);

}

// Ensure the output visibility is toggled on page load
document.addEventListener("DOMContentLoaded", fetchUserHistory);
