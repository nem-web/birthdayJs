// DOM Elements
const form = document.getElementById('birthday-form');
const birthdayList = document.getElementById('birthday-list');

// Array to store birthdays
let birthdays = [];

// Function to request notification permission
const requestNotificationPermission = () => {
    if (Notification.permission === "default") {
        Notification.requestPermission()
            .then((permission) => {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                } else {
                    console.log("Notification permission denied.");
                }
            })
            .catch((err) => console.error("Notification request error:", err));
    }
};

// Function to send a notification
const sendNotification = (name) => {
    if (Notification.permission === "granted") {
        new Notification(`🎉 Happy Birthday, ${name}! 🎂`, {
            body: `${name}'s birthday is today! 🎊`,
            icon: "https://i.imgur.com/dQJ2oGQ.png", // Optional: Add your custom icon URL
        });
    }
};

// Function to render today's birthdays and notify
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

            // Display in the birthday list
            const div = document.createElement('div');
            div.className = 'birthday-item';
            div.textContent = `${name} - 🎉 Happy Birthday! 🎂`;
            birthdayList.appendChild(div);

            // Send notification
            sendNotification(name);
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

// Request notification permission on page load
requestNotificationPermission();

// Check birthdays and render on page load
renderBirthdays();

// Check birthdays every 24 hours (interval in milliseconds)
setInterval(renderBirthdays, 60 * 1000);
