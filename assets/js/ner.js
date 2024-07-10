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
        const response = await fetch('https://your-yemba-ner-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        loader.style.display = 'none';

        if (!data.entities || data.entities.length === 0) {
            outputArea.textContent = 'No entities found.';
            toggleOutputVisibility();
            return;
        }

        data.entities.forEach(entity => {
            const span = document.createElement('span');
            span.classList.add('entity', entity.type.toLowerCase());

            // Create the entity text span
            const entityText = document.createElement('span');
            entityText.textContent = entity.text;
            span.appendChild(entityText);

            // Create the sub element for entity type
            const sub = document.createElement('sub');
            sub.textContent = " (" + entity.type + ")";
            span.appendChild(sub);

            outputArea.appendChild(span);
            outputArea.appendChild(document.createTextNode(' ')); // Add space between entities
        });

        toggleOutputVisibility();
    } catch (error) {
        loader.style.display = 'none';
        console.error('Error:', error);
        errorArea.textContent = 'An error occurred while processing the text.';



        let inputText = 'John Doe, the President of Africa, visited New York with 500 dollars and 5 kilometers to spare. This was his first visit to the USA, and he donated $1000 to local charities at 10AM.';
        let entities = [
            { "entity": "John Doe", "type": "name" },
            { "entity": "President", "type": "title" },
            { "entity": "Africa", "type": "location" },
            { "entity": "New York", "type": "city" },
            { "entity": "500", "type": "cardinal" },
            { "entity": "5 kilometers", "type": "distance" },
            { "entity": "first", "type": "ordinal" },
            { "entity": "USA", "type": "geopolitical" },
            { "entity": "$1000", "type": "money" },
            { "entity": "10AM", "type": "time" }
        ];


        outputArea.innerHTML = formatTextWithEntities(inputText, entities);
        toggleOutputVisibility();
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


function formatTextWithEntities(inputText, entities) {
    // Create a map to store entity types by their entity text for quick lookup
    const entityMap = new Map();
    entities.forEach(({ entity, type }) => {
        entityMap.set(entity, type);
    });

    // Split the text into words to process each word individually
    const words = inputText.split(/\b/);
    const formattedWords = words.map(word => {
        const type = entityMap.get(word);
        if (type) {
            return `<span class="entity ${type}">${word} <sub>(${type})</sub></span>`;
        }
        return word;
    });

    // Join the formatted words back into a single string
    return formattedWords.join('');
}



