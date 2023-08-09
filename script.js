function getCurrentTimezone() {
    const timeZoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZoneString.split('/')[1] || timeZoneString;
}

function displayLocalTime(utcTimestamp, timezone) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(utcTimestamp);
    document.getElementById('local-time').textContent = formattedTime;
    document.getElementById('time-zone').textContent = getCurrentTimezone();
}

// Main display logic
const urlParams = new URLSearchParams(window.location.search);
let utcTimestamp = new Date(urlParams.get("time"));
let timezone = urlParams.get("timezone") || getCurrentTimezone();

if (isNaN(utcTimestamp.getTime())) {
    document.getElementById('local-time').textContent = "Invalid time provided.";
} else {
    displayLocalTime(utcTimestamp, timezone);
}

// Input interactions
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const tzInput = document.getElementById('tz-input');
const generatedLink = document.getElementById('generated-link');
const copyBtn = document.getElementById('copy-btn');

dateInput.valueAsDate = new Date();
tzInput.value = getCurrentTimezone();

dateInput.addEventListener('input', generateLink);
timeInput.addEventListener('input', generateLink);
tzInput.addEventListener('input', generateLink);

function generateLink() {
    const date = dateInput.value;
    const time = timeInput.value;
    const tz = tzInput.value;
    const link = `${window.location.origin}${window.location.pathname}?time=${date}T${time}:00.000Z&timezone=${tz}`;
    generatedLink.href = link;
    generatedLink.textContent = link;
}

copyBtn.addEventListener('click', function() {
    const el = document.createElement('textarea');
    el.value = generatedLink.textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Link copied to clipboard!');
});

generateLink();
