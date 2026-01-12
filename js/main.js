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
              <span>${event.attendees ?? 0} going</span>

              <br>
              <img src="./img/icons/free-icon.svg" class="icon-going"/>
              <span>${event.cost ?? "Free"}</span>
            </div>

          </div>

          
      </div>
    `;

    container.innerHTML += html;
  });
}

function populateSelects(){
    const filtersContainer = document.getElementById("filters-placeholder");

    if (filtersContainer == undefined)
      return;
    filters.forEach((filter) => {
    // Create a wrapper div for each filter
    const wrapper = document.createElement("div");
    wrapper.className = "filter-wrapper";

    // Create the select element
    const select = document.createElement("select");
    select.id = filter.type;
    select.name = filter.type;
    select.classList = "filter-select"

    // Populate options
    filter.options.forEach((option) => {
        const opt = document.createElement("option");

        // If option is a Date object, format it as a readable string
        if (option instanceof Date) {
        opt.value = option.toISOString();
        opt.textContent = option.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
        } else {
        opt.value = option;
        opt.textContent = option;
        }

        select.appendChild(opt);
    });

    wrapper.appendChild(select);
    filtersContainer.appendChild(wrapper);
    });

    
  ["type", "category", "distance"].forEach(id => {
    document.getElementById(id).addEventListener("change", applyFilters);
  });
}


// -------------------------
// FILTERING LOGIC
// -------------------------

function getFilterValues() {
  return {
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    distance: document.getElementById("distance").value,
  };
}

function filterAndSortEvents(events) {
  const filters = getFilterValues();
  let result = [...events];

  // FILTER: type
  if (filters.type !== "Any type") {
    result = result.filter(e => e.type === filters.type);
  }

  // FILTER: category
  if (filters.category !== "Any category") {
    result = result.filter(e => e.category === filters.category);
  }

  // FILTER: distance
  if (filters.distance !== "Any distance") {
    result = result.filter(
      e => e.distance <= Number(filters.distance)
    );
  }

  // SORT
  switch (filters.sort) {
    case "date":
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "attendees":
      result.sort((a, b) => b.attendees - a.attendees);
      break;
    case "distance":
      result.sort((a, b) => a.distance - b.distance);
      break;
  }

  return result;
}

// -------------------------
// APPLY FILTERS
// -------------------------

function applyFilters() {
  const filteredEvents = filterAndSortEvents(eventsStore);
  renderEvents(filteredEvents);
}

// -------------------------
// LISTEN TO SELECT CHANGES
// -------------------------


document.addEventListener("DOMContentLoaded", () => {
  populateSelects();
  ensureEightEvents();
  renderEvents(eventsStore);

});
