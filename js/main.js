function generateRandomEvent() {
  const randomTitles = [
    "Community Meetup",
    "AI Networking Session",
    "Coffee & Chat",
    "Tech Innovators Talk",
    "Creative Writing Circle",
    "Startup Pitch Night",
    "Mindfulness Workshop",
    "Outdoor Social Gathering"
  ];

  const randomCategories = [
    "Technology",
    "Business",
    "Social Activities",
    "Health and Wellbeing",
    "Hobbies and Passions"
  ];

  const randomImages = [
    "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    "https://images.unsplash.com/photo-1696258686454-60082b2c33e2",
    "https://images.unsplash.com/photo-1674027444485-cec3da58eef4",
    "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152",
    "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0"
  ];

  return {
    title: randomTitles[Math.floor(Math.random() * randomTitles.length)],
    description: "Auto‑generated event",
    date: new Date(2024, 2, Math.floor(Math.random() * 20) + 10, 12),
    image: randomImages[Math.floor(Math.random() * randomImages.length)],
    type: Math.random() > 0.5 ? "online" : "offline",
    attendees: Math.floor(Math.random() * 150),
    category: randomCategories[Math.floor(Math.random() * randomCategories.length)],
    distance: Math.floor(Math.random() * 100) + 1,
    location: Math.floor(Math.random() * 50) + " km",
    cost: "Free"
  };
}

function ensureEightEvents() {
  while (eventsStore.length < 8) {
    eventsStore.push(generateRandomEvent());
  }
}

function formatDate(date) {
  const options = { 
    month: 'short', 
    day: 'numeric', 
    weekday: 'short', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return date.toLocaleDateString('en-US', options);
}

function renderEvents(events) {
  const container = document.getElementById("events-list");
  container.innerHTML = "";

  events.forEach(event => {
    const html = `
      <div class="event-card">
        <img src="${event.image}" alt="${event.title}" class="event-image">

        <div class="event-info">
          <h3 class="event-title">${event.title}</h3>

          <div class="event-meta">

            <div class="event-type">${event.category} (${event.distance} km)</div>

            <div class="event-meta-item">
              <img src="./img/icons/calendar-icon.svg" class="icon-calendar"/>
              <span>${formatDate(event.date)}</span>
            </div>

            <div class="event-meta-item">
              <img src="./img/icons/going-icon.svg" class="icon-going"/>
              <span>${event.attendees} going</span>

              <br>
              <img src="./img/icons/free-icon.svg" class="icon-going"/>
              <span>${event.cost}</span>
            </div>

          </div>

          
      </div>
    `;

    container.innerHTML += html;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ensureEightEvents();
  renderEvents(eventsStore);
});
