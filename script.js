function planTrip() {
    let d = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
    let t = document.getElementById("travelers").value;

    localStorage.setItem("destination", d);
    localStorage.setItem("date", date);
    localStorage.setItem("travelers", t);

    window.location.href = "trip.html";
}

function addToTrip(city) {
    localStorage.setItem("destination", city);
    alert(city + " added to your trip!");
    location.href = "trip.html";
}

function saveTrip() {
    localStorage.setItem(
        "destination",
        document.getElementById("tripDestination").value
    );

    localStorage.setItem(
        "startDate",
        document.getElementById("startDate").value
    );

    localStorage.setItem(
        "endDate",
        document.getElementById("endDate").value
    );

    localStorage.setItem(
        "travelers",
        document.getElementById("travelerCount").value
    );

    showTrip();
    alert("Trip saved!");
}

function showTrip() {
    let d = localStorage.getItem("destination");
    let s = localStorage.getItem("startDate");
    let e = localStorage.getItem("endDate");
    let t = localStorage.getItem("travelers");

    if (document.getElementById("savedDestination")) {
        document.getElementById("savedDestination").textContent =
            "Destination: " + (d || "Not added");

        document.getElementById("savedDates").textContent =
            "Travel Dates: " + (s || "Not added") +
            " to " + (e || "Not added");

        document.getElementById("savedTravelers").textContent =
            "Travelers: " + (t || "Not added");
    }

    if (document.getElementById("tripDestination") && d) {
        document.getElementById("tripDestination").value = d;
    }
}

function addPlace() {
    let input = document.getElementById("placeInput");
    let places = JSON.parse(localStorage.getItem("places")) || [];

    if (input.value) {
        places.push(input.value);
        localStorage.setItem("places", JSON.stringify(places));
        input.value = "";
        showPlaces();
    }
}

function showPlaces() {
    let list = document.getElementById("placeList");
    if (!list) return;

    let places = JSON.parse(localStorage.getItem("places")) || [];

    list.innerHTML = places.map((p, i) =>
        `<li>${p} <button onclick="removePlace(${i})">Remove</button></li>`
    ).join("");
}

function removePlace(i) {
    let places = JSON.parse(localStorage.getItem("places")) || [];
    places.splice(i, 1);
    localStorage.setItem("places", JSON.stringify(places));
    showPlaces();
}

function addChecklistItem() {
    let input = document.getElementById("checklistInput");
    let list = JSON.parse(localStorage.getItem("checklist")) || [];

    if (input.value) {
        list.push(input.value);
        localStorage.setItem("checklist", JSON.stringify(list));
        input.value = "";
        showChecklist();
    }
}

function showChecklist() {
    let ul = document.getElementById("checklist");
    if (!ul) return;

    let list = JSON.parse(localStorage.getItem("checklist")) || [];

    ul.innerHTML = list.map((item, i) =>
        `<li>${item} <button onclick="deleteItem(${i})">Delete</button></li>`
    ).join("");
}

function deleteItem(i) {
    let list = JSON.parse(localStorage.getItem("checklist")) || [];
    list.splice(i, 1);
    localStorage.setItem("checklist", JSON.stringify(list));
    showChecklist();
}

document.addEventListener("DOMContentLoaded", () => {
    // wire up nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('primary-navigation');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('open');
        });

        // close when focus moves away for better a11y
        navLinks.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('open');
                navToggle.focus();
            }
        });

        // close when any nav link is activated (useful on mobile)
        navLinks.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('open');
            });
        });

        // ensure nav is closed when resizing to larger screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('open');
            }
        });
    }

    showTrip();
    showPlaces();
    showChecklist();
});