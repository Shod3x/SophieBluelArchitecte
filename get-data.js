const apiUri = "http://localhost:5678/api/works";
const container = document.getElementById("gallery");

function fetchAndDisplayData() {
    container.innerHTML = ''; 
    fetch(apiUri).then((res) => {
        res.json().then((works) => {
            container.innerHTML = ''; 
            for (let work of works) {
            let figure = document.createElement("figure");
            figure.id = work.categoryId;
            figure.classList.add("work-category-id");
    
            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;
            img.id = work.id;
    
            let figcaption = document.createElement("figcaption");
            figcaption.innerText = work.title;
    
            figure.appendChild(img);
            figure.appendChild(figcaption);
    
            container.appendChild(figure);
            }
        });
    });
}

window.fetchAndDisplayData = fetchAndDisplayData;

fetchAndDisplayData();




