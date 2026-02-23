// Backend Database - Contact Storage
let contacts = JSON.parse(localStorage.getItem('lavanyaContacts')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    updateStats();
    displayContacts();

    // Form handler
    document.getElementById('contactForm').addEventListener('submit', handleSubmit);

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

function handleSubmit(e) {
    e.preventDefault();

    const contact = {
        id: Date.now(),
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    // Add to database (newest first)
    contacts.unshift(contact);
    localStorage.setItem('lavanyaContacts', JSON.stringify(contacts));

    // Reset form
    e.target.reset();

    // Update UI
    updateStats();
    displayContacts();
    showStatus('✅ Contact saved to database!', 'success');
}

function displayContacts() {
    const container = document.getElementById('contactsDisplay');
    const liveCount = document.getElementById('liveCount');

    liveCount.textContent = contacts.length;

    if (contacts.length === 0) {
        container.innerHTML = '<div class="contact-card"><p style="text-align:center;color:#94a3b8;">No contacts yet. Be the first!</p></div>';
        return;
    }

    container.innerHTML = contacts.slice(0, 10).map(contact => `
        <div class="contact-card">
            <div class="contact-info-section">
                <h5>${contact.name}</h5>
                <p><strong>Age:</strong> ${contact.age} | <strong>Email:</strong> ${contact.email}</p>
                <p style="color:#64748b;font-size:0.9rem;">${contact.date} ${contact.time}</p>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    document.getElementById('totalContacts').textContent = contacts.length;
    document.getElementById('liveCount').textContent = contacts.length;

    // Today count
    const today = new Date().toLocaleDateString('en-IN');
    const todayCount = contacts.filter(c => c.date === today).length;
    document.getElementById('todayContacts').textContent = todayCount;
}

function showStatus(message, type) {
    const status = document.getElementById('formStatus');
    status.textContent = message;
    status.className = `status ${type}`;

    setTimeout(() => {
        status.className = 'status';
        status.textContent = '';
    }, 4000);
}
