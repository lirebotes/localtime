function getUserTimeZoneAbbreviation(offset) {
    for (let tz in timezoneOffset) {
        if (timezoneOffset[tz].offset === offset) {
            return timezoneOffset[tz].abbr;
        }
    }
    return ''; // default if no match found
}

window.onload = () => {
    
    const params = new URLSearchParams(window.location.search);
    const gmtTime = params.get('time');
    if (gmtTime) {
        const localTimeObj = new Date(`1970-01-01T${gmtTime}Z`);
        const localTime = localTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const offset = -(new Date().getTimezoneOffset() / 60); // timezone offset in hours
        const shortTimeZone = getUserTimeZoneAbbreviation(offset);
        
        document.getElementById('displayTime').innerText = `${localTime} ${shortTimeZone}`;
    }


    // Set current time and timezone as default input
    const now = new Date();
    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localTimeString = `${localHours}:${localMinutes}`;
    document.getElementById('inputTime').value = localTimeString;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const abbreviatedUserTimeZone = getAbbreviatedTimeZone(userTimeZone);
    document.getElementById('inputTZ').value = abbreviatedUserTimeZone;
    generateURL();
    document.getElementById('inputTime').addEventListener('change', generateURL);
document.getElementById('inputTZ').addEventListener('change', generateURL);

};

const timezoneOffset = {
    "UTC": { offset: 0, abbr: "UTC" },
    "EST": { offset: -5, abbr: "EST" },
    "EDT": { offset: -4, abbr: "EDT" },
    "CST": { offset: -6, abbr: "CST" },
    "CDT": { offset: -5, abbr: "CDT" },
    "MST": { offset: -7, abbr: "MST" },
    "MDT": { offset: -6, abbr: "MDT" },
    "PST": { offset: -8, abbr: "PST" },
    "PDT": { offset: -7, abbr: "PDT" },
    "CET": { offset: 1, abbr: "CET" },
    "BST": { offset: 1, abbr: "BST" } // BST and CET often have the same offset but do be cautious, BST is used in the UK during summer
};


function generateURL() {
    const time = document.getElementById('inputTime').value;
    const tz = document.getElementById('inputTZ').value;
    if (!timezoneOffset[tz]) {
        alert("Invalid timezone selected.");
        return;
    }
    const hour = parseInt(time.split(':')[0], 10);
    const minute = parseInt(time.split(':')[1], 10);

    // Create a new date. We'll ignore the year, month, and day.
    let date = new Date();
    date.setUTCFullYear(1970, 0, 1);  // Set to a fixed date.
    date.setUTCHours(hour - timezoneOffset[tz].offset, minute, 0, 0);  // Adjust the time.

    const timeInGMT = date.toISOString().substr(11, 5);
    const generatedURL = `https://lirebotes.github.io/localtime/?time=${timeInGMT}`;
    document.getElementById('generatedURL').href = generatedURL;
    document.getElementById('generatedURL').innerText = generatedURL;
}

function getAbbreviatedTimeZone(tz) {
    const fullToAbbreviated = {
        'America/New_York': 'EST',
        'America/Chicago': 'CST',
        'America/Denver': 'MST',
        'America/Los_Angeles': 'PST',
        'America/Phoenix': 'MST', // No DST
        'America/Indianapolis': 'EST',
        'America/Indiana/Petersburg': 'EST',
        'Europe/London': 'BST',
        'Europe/Berlin': 'CET',
        'Europe/Paris': 'CET',
        'Europe/Madrid': 'CET',
        'Europe/Rome': 'CET',
        'Europe/Amsterdam': 'CET',
        // ... You can add more mappings as needed.
    };

    return fullToAbbreviated[tz] || '';
}



function copyToClipboard() {
    const link = document.getElementById('generatedURL');
    const textArea = document.createElement('textarea');
    textArea.value = link.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
}

