// Initialize inputs with current date/time and timezone
const currentDate = new Date();
document.getElementById('input-date').valueAsDate = currentDate;
document.getElementById('input-time').value = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
document.getElementById('input-timezone').value = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Function to update display
function updateDisplay(dateTime, timeZone) {
    const optionsDate = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timeZone
    };

    let formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(dateTime);
    document.getElementById('display-date').textContent = formattedDate;

    const optionsTimeZone = {
        timeZoneName: 'short',
        timeZone: timeZone
    };

    let formattedTimeZone = new Intl.DateTimeFormat('en-US', optionsTimeZone).format(dateTime);
    document.getElementById('display-timezone').textContent = formattedTimeZone;
}

// Detect dark mode preference
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const toggleThemeCheckbox = document.getElementById('toggleTheme');

if (darkModeMediaQuery.matches) {
    document.body.classList.add('dark-mode');
    toggleThemeCheckbox.checked = true;
}


toggleThemeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});


// Timezone Autocomplete (simplified for demonstration)
const timezones = ["PDT", "EDT", "CDT", "MDT", "BST", "IST", "CEST", "AEST"];
const timezoneInput = document.getElementById('input-timezone');
let activeTimeout;
timezoneInput.addEventListener('keyup', function() {
    clearTimeout(activeTimeout);
    active
