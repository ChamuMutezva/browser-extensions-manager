"use strict";
document.addEventListener("DOMContentLoaded", async function () {
    const themeSwitcher = document.getElementById("theme-switcher");
    const body = document.body;
    const radioGroup = document.querySelector(".radio-group");
    const radios = document.querySelectorAll('input[name="status"]');

    // Set initial theme based on localStorage or system preference
    function setInitialTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        console.log("Saved theme:", savedTheme);
        console.log("Prefers dark:", prefersDark);
        if (savedTheme) {
            body.classList.toggle("dark-theme", savedTheme === "dark");
        } else if (prefersDark) {
            body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        }
    }

    // Toggle theme on button click
    themeSwitcher.addEventListener("click", function () {
        const isDark = body.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        // Update ARIA label for accessibility
        themeSwitcher.setAttribute(
            "aria-label",
            `Switch to ${isDark ? "light" : "dark"} theme`
        );
    });

    // Initialize theme
    setInitialTheme();

    // Watch for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                // Only if user hasn't set preference
                body.classList.toggle("dark-theme", e.matches);
            }
        });

    try {
        const response = await fetch("/data.json");
        const extensions = await response.json();
        console.log("Extensions loaded:", extensions);
        renderExtensions(extensions);
    } catch (error) {
        console.error("Error loading extensions:", error);
        // Fallback to hardcoded or error state
    }
    let allExtensions = [];

    async function loadExtensions() {
        try {
            const response = await fetch("data.json");
            allExtensions = await response.json();
            renderExtensions(allExtensions);
        } catch (error) {
            console.error("Error loading extensions:", error);
        }
    }

    function renderExtensions(extensions) {
        const container = document.querySelector(".cards-container");
        container.innerHTML = ""; // Clear existing

        extensions.forEach((ext) => {
            const card = document.createElement("article");
            card.className = `card ${ext.isActive ? "active" : "inactive"}`;
            card.dataset.status = ext.isActive ? "active" : "inactive";
            card.innerHTML = `           
            <div class="card-content">
                <div class="card-details">
                    <img class="card-logo" src="${ext.logo}" alt="${
                ext.name
            } logo">
                     <div class="card-info">
                        <h3 class="card-title">${ext.name}</h3>
                        <p class="card-description">${ext.description}</p>
                     </div>
                </div>
                <div class="card-actions">
                    <button class="remove-btn" data-id="${ext.name}">
                         Remove
                    </button>
                     <label class="switch">
                          <input type="checkbox" class="toggle-switch" data-id="${
                              ext.name
                          }" ${ext.isActive ? "checked" : ""}>
                        <span class="slider"></span>
                     </label>
                </div>
            </div>
            `;
            container.appendChild(card);

            // Add event listener for the remove button
            card.querySelector(".remove-btn").addEventListener("click", () => {
                container.removeChild(card);
                allExtensions = allExtensions.filter(
                    (e) => e.name !== ext.name
                );
            });

            // Add event listener for the card toggle switch
            card.querySelector(".toggle-switch").addEventListener(
                "change",
                (e) => {
                    // Update the extension's active status
                    ext.isActive = e.target.checked;

                    // Update card classes and data attributes
                    card.className = `card ${
                        ext.isActive ? "active" : "inactive"
                    }`;
                    card.dataset.status = ext.isActive ? "active" : "inactive";

                    // Get current filter status
                    const currentFilter = document.querySelector(
                        'input[name="status"]:checked'
                    ).value;

                    // If the new status doesn't match current filter, hide the card
                    if (
                        (currentFilter === "active" && !ext.isActive) ||
                        (currentFilter === "inactive" && ext.isActive)
                    ) {
                       // card.style.display = "none";
                        card.classList.add("card-hidden");
                    }

                    // Update the data store
                   // updateExtensionStatus(ext.name, ext.isActive);
                }
            );

            // Add keyboard navigation for the toggle switch
            card.querySelector(".toggle-switch").addEventListener(
                "keydown",
                (e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        const toggle = e.target;
                        toggle.checked = !toggle.checked;
                        ext.isActive = toggle.checked;
                        card.className = `card ${
                            ext.isActive ? "active" : "inactive"
                        }`;
                        card.dataset.status = ext.isActive
                            ? "active"
                            : "inactive";
                        e.preventDefault();
                    }
                }
            );
        });
    }

    // Filter functionality
    function filterExtensions(status) {
        if (status === "all") return renderExtensions(allExtensions);
        const filtered = allExtensions.filter((ext) =>
            status === "active" ? ext.isActive : !ext.isActive
        );
        renderExtensions(filtered);
    }

    // Keyboard navigation
    radioGroup.addEventListener("keydown", function (e) {
        const current = document.activeElement;
        let index = Array.from(radios).indexOf(current);

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            index = (index + 1) % radios.length;
            radios[index].focus();
            e.preventDefault();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            index = (index - 1 + radios.length) % radios.length;
            radios[index].focus();
            e.preventDefault();
        }
    });

    // Update aria-checked when selection changes
    radios.forEach((radio) => {
        radio.addEventListener("change", function () {
            radios.forEach((r) => {
                r.setAttribute("aria-checked", r.checked.toString());
            });
            // Add your filter logic here
            filterExtensions(this.value);
        });
    });

    // Initialize
    loadExtensions();
});
