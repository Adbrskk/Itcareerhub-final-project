const container = document.getElementById("events-list");

function formatDate(date) {
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}


function renderEvents(events) {
  const eventsContainer = document.getElementById("events-list");
  eventsContainer.innerHTML = ""; 

  events.forEach(event => {
    const eventHTML = `
      <div class="event-card">
        <img src="${event.image}" alt="${event.title}" class="event-image">
        <div class="event-info">
          <h3 class="event-title">${event.title}</h3>
          <p class="event-date">${formatDate(event.date)}</p>
          <p class="event-type">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
          <p class="event-attendees">${event.attendees ? event.attendees + " going" : ""}</p>
        </div>
      </div>
    `;
    eventsContainer.innerHTML += eventHTML;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderEvents(eventsStore);
});