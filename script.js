window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const gmtTime = params.get('time');
    if(gmtTime) {
        const localTime = new Date(`1970-01-01T${gmtTime}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('displayTime').innerText = localTime;
    }
};

function generateURL() {
    const time = document.getElementById('inputTime').value;
    const tz = document.getElementById('inputTZ').value;

    const timezoneOffset = {
        "UTC": 0,
        "EST": -5,
        "CST": -6,
        "MST": -7,
        "PST": -8,
        "CET": 1,
        "BST": 1  // Note: BST is indeed GMT+1, but DST handling isn't done here.
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
