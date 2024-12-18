// DOM Elements
const form = document.getElementById('birthday-form');
const birthdayList = document.getElementById('birthday-list');

// Load saved birthdays from localStorage or initialize an empty array
let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

// Render today's birthdays
const renderBirthdays = () => {
    birthdayList.innerHTML = '<h3>Today\'s Birthdays</h3>';
    const today = new Date().toISOString().slice(5); // Get MM-DD format for today

    console.log("Today's Date (MM-DD):", today); // Debugging

    let hasBirthdays = false;
    birthdays.forEach(({ name, dob }) => {
        console.log(`Checking ${name}'s birthday (${dob})`); // Debugging
        if (dob.slice(5) === today) { // Compare only MM-DD
            hasBirthdays = true;
            const div = document.createElement('div');
            div.className = 'birthday-item';
            div.textContent = `${name} - 🎉 Happy Birthday! 🎂`;
            birthdayList.appendChild(div);
        }
    });

    if (!hasBirthdays) {
        const noBirthdayMessage = document.createElement('div');
        noBirthdayMessage.textContent = "No birthdays today.";
        noBirthdayMessage.style.color = "#FF5722";
        birthdayList.appendChild(noBirthdayMessage);
    }
};

// Add a new birthday
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;

    console.log('Form Submitted'); // Debugging
    console.log('Name:', name, 'DOB:', dob); // Debugging

    // Add the new birthday to the array and save it to localStorage
    birthdays.push({ name, dob });
    localStorage.setItem('birthdays', JSON.stringify(birthdays));

    // Reset form and re-render birthdays
    form.reset();
    renderBirthdays();
});

// Initial rendering of birthdays
renderBirthdays();
