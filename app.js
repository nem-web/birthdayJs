// DOM Elements
const form = document.getElementById('birthday-form');
const birthdayList = document.getElementById('birthday-list');

// Array to store birthdays
let birthdays = [];

// Function to render today's birthdays
const renderBirthdays = () => {
    // Clear previous list
    birthdayList.innerHTML = '<h3>Today\'s Birthdays</h3>';

    // Get today's date in MM-DD format
    const today = new Date();
    const todayMMDD = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    console.log("Today's Date (MM-DD):", todayMMDD); // Debugging

    // Check if there are any birthdays today
    let hasBirthdays = false;

    birthdays.forEach(({ name, dob }) => {
        // Extract MM-DD from dob
        const dobMMDD = dob.slice(5); // Get MM-DD from YYYY-MM-DD

        console.log(`Checking ${name}'s birthday (${dobMMDD}) against today (${todayMMDD})`); // Debugging

        // Compare MM-DD
        if (dobMMDD === todayMMDD) {
            hasBirthdays = true;
            const div = document.createElement('div');
            div.className = 'birthday-item';
            div.textContent = `${name} - 🎉 Happy Birthday! 🎂`;
            birthdayList.appendChild(div);
        }
    });

    // If no birthdays, show a message
    if (!hasBirthdays) {
        const noBirthdayMessage = document.createElement('div');
        noBirthdayMessage.textContent = "No birthdays today.";
        noBirthdayMessage.className = 'no-birthdays';
        birthdayList.appendChild(noBirthdayMessage);
    }
};

// Add a new birthday
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;

    console.log('Form Submitted'); // Debugging
    console.log('Name:', name, 'DOB:', dob); // Debugging

    if (name && dob) {
        birthdays.push({ name, dob });
        console.log('Updated Birthdays List:', birthdays); // Debugging
        form.reset();
        renderBirthdays();
    } else {
        alert('Please fill in all fields!');
    }
});

// Initial rendering of birthdays
renderBirthdays();
