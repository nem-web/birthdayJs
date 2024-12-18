// DOM Elements
const form = document.getElementById('birthday-form');
const birthdayList = document.getElementById('birthday-list');
const downloadBtn = document.getElementById('download-btn');
const uploadBtn = document.getElementById('upload-btn');

// Array to store birthdays
let birthdays = [];

// Render today's birthdays
const renderBirthdays = () => {
    birthdayList.innerHTML = '<h3>Today\'s Birthdays</h3>';
    const today = new Date().toISOString().slice(5); // Get MM-DD format for today

    let hasBirthdays = false;
    birthdays.forEach(({ name, dob }) => {
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

    birthdays.push({ name, dob });
    form.reset();
    renderBirthdays();
});

// Download birthdays as a JSON file
downloadBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(birthdays, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'birthdays.json';
    a.click();

    URL.revokeObjectURL(url);
});

// Upload birthdays from a JSON file
uploadBtn.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                birthdays = JSON.parse(e.target.result);
                renderBirthdays();
                alert('Birthdays uploaded successfully!');
            } catch (err) {
                alert('Invalid file format.');
            }
        };
        reader.readAsText(file);
    }
});

// Initial rendering of birthdays
renderBirthdays();
