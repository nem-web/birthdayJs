const form = document.getElementById('birthday-form');
const birthdayList = document.getElementById('birthday-list');

let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

const renderBirthdays = () => {
    birthdayList.innerHTML = '<h3>Upcoming Birthdays</h3>';
    const today = new Date().toISOString().slice(5);
    birthdays.forEach(({ name, dob }) => {
        if (dob.slice(5) === today) {
            const div = document.createElement('div');
            div.textContent = `${name} - Today!`;
            birthdayList.appendChild(div);
        }
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    birthdays.push({ name, dob });
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
    form.reset();
    renderBirthdays();
});

renderBirthdays();
