let activeFilter = document.getElementsByClassName("button-active");
let categoryUrl = "http://localhost:5678/api/categories";
let filterContainer = document.getElementById("filter-button");

function addButtonListener(button) {
    button.addEventListener("click", () => {
        clearActive();
        button.classList.add("button-active");

        let buttonID = button.id;

        container.querySelectorAll(".work-category-id").forEach((htmlContainer) => {
            if (htmlContainer.id !== buttonID) {
                htmlContainer.style.display = "none";
            } else {
                htmlContainer.style.display = "block";
            }
            if (buttonID === "all") {
                htmlContainer.style.display = "block";
            } 
        });
    });
}

function clearActive() {
    let filters = document.querySelectorAll(".button-filter");
    filters.forEach((filter) => {
        filter.classList.remove("button-active");
    });
}

let existingButtons = document.querySelectorAll(".button-filter");
existingButtons.forEach(addButtonListener);

fetch(categoryUrl)
    .then((res) => res.json())
    .then((categories) => {
        for (let category of categories) {
            let button = document.createElement("button");
            button.classList.add("button-filter");
            button.textContent = category.name;
            button.id = category.id;

            filterContainer.appendChild(button);

            addButtonListener(button);
        }
    });