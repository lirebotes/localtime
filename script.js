window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const gmtTime = params.get('time');
    if(gmtTime) {
        const localTime = new Date(`1970-01-01T${gmtTime}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('displayTime').innerText = localTime;
    }

    // Set current time and timezone as default input
    const now = new Date();
    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localTimeString = `${localHours}:${localMinutes}`;
    document.getElementById('inputTime').value = localTimeString;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('inputTZ').value = userTimeZone;
};


function generateURL() {
    const time = document.getElementById('inputTime').value;
    const tz = document.getElementById('inputTZ').value;
    
    const timezoneOffset = {
    "UTC": 0,
    "EST": -5, "EDT": -4,
    "CST": -6, "CDT": -5,
    "MST": -7, "MDT": -6,
    "PST": -8, "PDT": -7,
    "CET": 1,
    "BST": 1
};


    let date = new Date(`1970-01-01T${time}:00Z`);
    date.setUTCHours(date.getUTCHours() + timezoneOffset[tz]);

    const timeInGMT = date.toISOString().substr(11, 5);
    const generatedURL = `https://lirebotes.github.io/localtime/?time=${timeInGMT}`;
    document.getElementById('generatedURL').href = generatedURL;
    document.getElementById('generatedURL').innerText = generatedURL;
}

function copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = document.getElementById('generatedURL').innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
