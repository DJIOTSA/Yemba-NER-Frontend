// Ensure the output visibility is toggled on page load
document.addEventListener("DOMContentLoaded", toggleOutputVisibility);

document.getElementById('submitBtn').addEventListener('click', async function (e) {
  e.preventDefault();
  const inputText = document.getElementById('inputText').value;
  const outputArea = document.getElementById('outputArea');
  const errorArea = document.getElementById('errorArea');
  const loader = document.getElementById('loader');

  // Clear previous output and errors
  outputArea.innerHTML = '';
  errorArea.textContent = '';

  if (!inputText.trim()) {
    errorArea.textContent = 'Please enter some text.';
    toggleOutputVisibility();
    return;
  }

  loader.style.display = 'inline-block';

  try {
    // Function to handle the process
    async function handleTextFormatting() {
      // Example data for the POST request
      const postData = { text: inputText };
      const apiUrl = "https://mhulo-yembaner.hf.space/predict/";
      const entities = await sendPostRequest(apiUrl, postData);
      if (entities) {
        const formattedText = formatTextWithEntities(inputText, entities);
        outputArea.innerHTML = `${formattedText}`;
        loader.style.display = 'none';
        toggleOutputVisibility();
        if (retrieveLoginState()) {
          const historyCreateApiUrl = "https://yembaner.onrender.com/app/history/create/";
          const History = {
            "input": inputText,
            "output": formattedText
          }
          const createHistory = await sendPostAuthenticateRequest(historyCreateApiUrl, History);
          // console.log("create history result:", createHistory)
        }

      }
    }

    handleTextFormatting()

  } catch (error) {
    loader.style.display = 'none';
    console.error('Error:', error);
    errorArea.textContent = 'An error occurred while processing the text.';
  }
});

function toggleOutputVisibility() {
  const outputElement = document.getElementById('outputArea');
  if (outputElement.innerHTML.trim() === '') {
    outputElement.style.display = 'none';
  } else {
    outputElement.style.display = 'block';
  }
}


// Function to send a POST request and get the response
async function sendPostRequest(url, data) {
  try {

    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const access_token = localStorage.getItem('access_token');
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Response:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}


// Example usage for a POST request
async function sendPostAuthenticateRequest(url, data) {
  try {
    input = data["input"]
    output =data["output"]
    user = 1
    accuracy = 0.0
    const options = {
      method: 'POST',
      body: JSON.stringify({ input, output, user, accuracy })
    };

    const response = await apiRequest2(url, options);
    // console.log('Response:', response);
    return response.status;
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw the error to allow the caller to handle it if needed
  }
}

// Function to handle API requests with automatic token refresh and retry mechanism
async function apiRequest2(endpoint, options = {}) {
  let access_token = localStorage.getItem('access_token');

  if (!access_token) {
    console.error('No access token found');
    return;
  }

  const fetchOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'  // Ensure the Content-Type header is set for POST requests
    }
  };

  let response = await fetch(endpoint, fetchOptions);

  if (response.status === 401) {
    // Token might be expired, try to refresh it
    await refreshToken();

    // Retry the request with the new access token
    access_token = localStorage.getItem('access_token');
    if (!access_token) {
      console.error('Failed to refresh token');
      return;
    }

    const retryOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    };

    response = await fetch(endpoint, retryOptions);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse the response as JSON and return it
  const result = await response.json();
  return result;
}


/**
 * Format input text into HTML format using defined named entities.
 * 
 * @param {string} inputText - The input text to format.
 * @param {Array} entities - The list of entities with their positions and types.
 * @returns {string} - The formatted HTML string.
 */
function formatTextWithEntities(inputText, entities) {
  const entityDescriptions = {
    'GPE': 'geopolitical location',
    'TIME': 'time',
    'QUAN': 'quantity',
    'GEO': 'geographic location',
    'PER': 'person'
  };


  // Sort entities by their start position
  entities.sort((a, b) => a.start - b.start);

  // Merge sub-words into complete words or phrases and group them by the first entity
  let mergedEntities = [];
  let currentEntity = null;

  for (const entity of entities) {
    if (entity.word.startsWith("##")) {
      if (currentEntity !== null) {
        currentEntity.word += entity.word.slice(2);
        currentEntity.end = entity.end;
      }
    } else {
      if (currentEntity !== null) {
        mergedEntities.push(currentEntity);
      }
      currentEntity = {
        entity: entity.entity,
        word: entity.word,
        start: entity.start,
        end: entity.end
      };
    }
  }

  if (currentEntity !== null) {
    mergedEntities.push(currentEntity);
  }

  // Group words with the same entity type together
  let groupedEntities = [];
  let currentGroup = null;

  for (const entity of mergedEntities) {
    if (currentGroup === null) {
      currentGroup = entity;
    } else if (entity.entity.startsWith('I-') && currentGroup.entity.startsWith('B-')) {
      currentGroup.word += ' ' + entity.word;
      currentGroup.end = entity.end;
    } else {
      groupedEntities.push(currentGroup);
      currentGroup = entity;
    }
  }

  if (currentGroup !== null) {
    groupedEntities.push(currentGroup);
  }

  // Initialize variables
  let formattedText = "";
  let lastIndex = 0;

  // Iterate through each grouped entity and format the text
  for (const entity of groupedEntities) {
    const start = entity.start;
    const end = entity.end;
    const entityText = inputText.slice(start, end);

    // Use the first entity type for the entire group
    const entityType = entity.entity.split('-')[1];
    const entityDescription = entityDescriptions[entityType] || entityType;

    // Append the text before the entity
    formattedText += inputText.slice(lastIndex, start);

    // Format the entity text
    formattedText += `<span class="entity ${entityType}">${entityText} <sub>(${entityDescription})</sub></span>`;

    // Update the last index
    lastIndex = end;
  }

  // Append the remaining text after the last entity
  formattedText += inputText.slice(lastIndex);

  return formattedText;
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
    // logout the user
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // handle login button
    storeLoginState(false);
    updateLoginButton();
    document.body.classList.toggle("show-popup-logreg");
    showAlert("Please login to continue!", "login");
  }
}


function updateLoginButton() {
  const loginButton = document.querySelector('.login-btn'); // Replace with your button's ID

  if (retrieveLoginState()) { // Replace 'isLoggedIn' with your authentication state check
    loginButton.textContent = 'Logout';
  } else {
    loginButton.textContent = 'Login';
  }
}


function storeLoginState(isLoggedIn) {
  localStorage.setItem('isLoggedIn', isLoggedIn); // Or use sessionStorage if needed
}


function retrieveLoginState() {
  const storedState = localStorage.getItem('isLoggedIn'); // Or sessionStorage
  return storedState === 'true'; // Parse the stored value
}



