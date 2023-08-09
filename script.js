// Function to parse the URL for query parameters
function getQueryParam(param) {
    let result = new URLSearchParams(window.location.search).get(param);
    return result;
}

// Function to display the local time for the user
function displayLocalTime(utcTimestamp, timezone) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone: timezone
    };
    
    let formattedTime = new Intl.DateTimeFormat('en-US', options).format(utcTimestamp);
    document.getElementById('local-time').textContent = formattedTime;
}

// Main logic
let utcTimestamp = new Date(getQueryParam("time"));
let timezone = getQueryParam("timezone") || Intl.DateTimeFormat().resolvedOptions().timeZone;

if (isNaN(utcTimestamp.getTime())) {
    document.getElementById('local-time').textContent = "Invalid time provided.";
} else {
    displayLocalTime(utcTimestamp, timezone);
}
