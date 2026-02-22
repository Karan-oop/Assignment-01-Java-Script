// Event storage
let events = JSON.parse(localStorage.getItem('events')) || [];

// DOM Elements
const eventForm = document.getElementById('eventForm');
const eventContainer = document.getElementById('eventContainer');
const clearAllBtn = document.getElementById('clearAllBtn');
const addSampleBtn = document.getElementById('addSampleBtn');
const demoContent = document.getElementById('demoContent');

// Initialize
renderEvents();

// Form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newEvent = {
        id: Date.now(),
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        category: document.getElementById('eventCategory').value,
        description: document.getElementById('eventDescription').value
    };

    events.push(newEvent);
    saveEvents();
    renderEvents();
    eventForm.reset();
    
    // Show success feedback
    const submitBtn = eventForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>✓ Event Added!</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 2000);
});

// Clear all events
clearAllBtn.addEventListener('click', () => {
    if (events.length === 0) {
        alert('No events to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to delete all events?')) {
        events = [];
        saveEvents();
        renderEvents();
    }
});

// Add sample events
addSampleBtn.addEventListener('click', () => {
    // Check if sample events already exist
    const sampleEventTitles = ['Tech Conference 2026', 'Design Workshop', 'Developer Meetup'];
    const existingSampleEvents = events.filter(event => 
        sampleEventTitles.includes(event.title)
    );
    
    // If sample events already exist, show message and return
    if (existingSampleEvents.length > 0) {
        alert('Sample events have already been added!');
        return;
    }
    
    const sampleEvents = [
        {
            id: Date.now() + 1,
            title: 'Tech Conference 2026',
            date: '2026-03-15',
            category: 'Conference',
            description: 'Annual technology conference featuring the latest innovations in AI and software development.'
        },
        {
            id: Date.now() + 2,
            title: 'Design Workshop',
            date: '2026-04-20',
            category: 'Workshop',
            description: 'Hands-on workshop covering modern UI/UX design principles and tools.'
        },
        {
            id: Date.now() + 3,
            title: 'Developer Meetup',
            date: '2026-05-10',
            category: 'Meetup',
            description: 'Monthly meetup for local developers to network and share knowledge.'
        }
    ];

    events = [...events, ...sampleEvents];
    saveEvents();
    renderEvents();
    
    // Show success message
    alert('Upcoming events added successfully!');
});

// Render events
function renderEvents() {
    if (events.length === 0) {
        eventContainer.innerHTML = '<div class="empty-state">No events yet. Add your first event!</div>';
        return;
    }

    eventContainer.innerHTML = events.map(event => `
        <div class="event-item">
            <div class="event-header">
                <div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-date">📅 ${formatDate(event.date)}</div>
                </div>
                <span class="event-category">${event.category}</span>
            </div>
            <div class="event-description">${event.description}</div>
            <div class="event-actions">
                <button onclick="deleteEvent(${event.id})" class="btn btn-danger btn-small">
                    <span>Delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Delete event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(event => event.id !== id);
        saveEvents();
        renderEvents();
    }
}

// Save to localStorage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// DOM Manipulation Demo
document.addEventListener('keydown', (e) => {
    demoContent.textContent = `You Pressed: ${e.key}`;
    demoContent.classList.add('active');
    
    setTimeout(() => {
        demoContent.classList.remove('active');
    }, 300);
});

// Set minimum date to today
document.getElementById('eventDate').min = new Date().toISOString().split('T')[0];



