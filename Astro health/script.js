if (sessionStorage.getItem("astroLoggedIn") !== "true") {
    window.location.href = "login.html";
}
function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password.length >= 6) {
        sessionStorage.setItem("astroLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("login-message").textContent =
            "Please enter valid login details.";
    }
}

// Protect dashboard from direct access
if (window.location.pathname.endsWith("dashboard.html")) {
    if (sessionStorage.getItem("astroLoggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

function logout() {
    sessionStorage.removeItem("astroLoggedIn");
    window.location.href = "login.html";
}

// Generate simulated astronaut health readings
function updateHealth() {

    const heart = Math.floor(Math.random() * 21) + 65;
    const oxygen = Math.floor(Math.random() * 4) + 96;
    const temperature = (36 + Math.random()).toFixed(1);

    document.getElementById("heart").textContent =
        heart + " BPM";

    document.getElementById("oxygen").textContent =
        oxygen + "%";

    document.getElementById("temperature").textContent =
        temperature + " °C";

    document.getElementById("alert").textContent =
        "Demo readings updated successfully. These are simulated values, not medical measurements.";
}
// Heart rate graph data
let heartRateChart;
let heartRateHistory = [];
let timeLabels = [];

function createHeartRateChart() {

    const canvas = document.getElementById("heartRateChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    // Initial demo readings
    heartRateHistory = [72, 75, 73, 78, 74];
    timeLabels = ["1", "2", "3", "4", "5"];

    heartRateChart = new Chart(canvas, {
        type: "line",

        data: {
            labels: timeLabels,

            datasets: [{
                label: "Heart Rate (BPM)",
                data: heartRateHistory,

                borderColor: "#00cfff",
                backgroundColor: "rgba(0, 207, 255, 0.15)",

                borderWidth: 3,
                fill: true,
                tension: 0.4,

                pointBackgroundColor: "#ffffff",
                pointRadius: 5
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: "#ffffff"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.1)"
                    }
                },

                y: {
                    min: 50,
                    max: 110,

                    ticks: {
                        color: "#ffffff"
                    },

                    grid: {
                        color: "rgba(255,255,255,0.1)"
                    }
                }
            }
        }
    });
}

// Generate simulated health readings
function updateHealth() {

    const heart = Math.floor(Math.random() * 21) + 65;
    const oxygen = Math.floor(Math.random() * 4) + 96;
    const temperature = (36 + Math.random()).toFixed(1);

    document.getElementById("heart").textContent =
        heart + " BPM";

    document.getElementById("oxygen").textContent =
        oxygen + "%";

    document.getElementById("temperature").textContent =
        temperature + " °C";

    document.getElementById("alert").textContent =
        "Simulated readings updated successfully.";

    // Add new heart rate reading to graph
    if (heartRateChart) {

        heartRateHistory.push(heart);
        timeLabels.push(String(timeLabels.length + 1));

        // Keep only the latest 10 readings
        if (heartRateHistory.length > 10) {
            heartRateHistory.shift();
            timeLabels.shift();
        }

        heartRateChart.update();
    }
}

// Create graph when dashboard loads
document.addEventListener("DOMContentLoaded", function() {
    createHeartRateChart();
});
function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email !== "" && password.length >= 6) {
        sessionStorage.setItem("astroLoggedIn", "true");

        window.location.href = "dashboard.html";
    } else {
        alert("Please enter a valid email and password (at least 6 characters).");
    }
const username = document.getElementById("username").value;

sessionStorage.setItem("astroName", username);

window.location.href = "./dashboard.html";
}
// Display the logged-in user's name
const savedName = sessionStorage.getItem("astroName");
const profileName = document.getElementById("profileName");

if (profileName && savedName) {
    profileName.textContent = savedName;
}
window.location.href = "dashboard.html";
// NASA Astronomy Picture of the Day
async function loadNASAData() {

    const title = document.getElementById("nasaTitle");
    const image = document.getElementById("nasaImage");
    const explanation = document.getElementById("nasaExplanation");
    const date = document.getElementById("nasaDate");
    const link = document.getElementById("nasaLink");

    if (!title || !image || !explanation || !date || !link) {
        return;
    }

    try {
        const response = await fetch(
            "https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY"
        );

        if (!response.ok) {
            throw new Error("NASA server response: " + response.status);
        }

        const data = await response.json();

        title.textContent = data.title || "NASA Space Picture";
        date.textContent = "Date: " + (data.date || "Not available");
        explanation.textContent =
            data.explanation || "No explanation available.";

        link.href = data.permalink || data.url ||
            "https://science.nasa.gov/";

        if (data.media_type === "image" && data.hdurl) {
            image.src = data.hdurl;
            image.alt = data.alt || data.title || "NASA space image";
            image.style.display = "block";
        } else {
            image.style.display = "none";
            explanation.textContent +=
                " Today's NASA entry is not a standard image.";
        }

    } catch (error) {
        title.textContent = "NASA information unavailable";
        explanation.textContent =
            "Please check your internet connection and try again.";

        console.error("NASA API error:", error);
    }
}

// Load NASA information when dashboard opens
document.addEventListener("DOMContentLoaded", function() {
    loadNASAData();
});
