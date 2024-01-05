// shared functions

// get needed data
async function getData (url) {
    const response = await fetch(url);
    const response_1 = await response.json();
    return response_1;
}


async function sendPost(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const response_1 = await response.json();
        return response_1;
    } catch (error) {
        console.log(`There was a problem with the fetch operation: ${error}`);
    }
}

function fetchMinicart(response) {
    document.getElementById('counter').innerHTML = response.item_count;
    console.log(response.items);
}

// debounce input on textarea
function debounce(func, timeout = 500){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}