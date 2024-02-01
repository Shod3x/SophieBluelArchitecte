document.addEventListener('DOMContentLoaded', function () {

  let backArrow = document.getElementById("goBackBtn");
  modal = document.getElementById('myModal');
  openModalBtn = document.getElementById('openModalBtn');
  closeModalBtn = document.getElementById('closeModalBtn');
  const changeContentBtn = document.getElementById('changeContentBtn');
  const addPicture = document.getElementById('fileInput');
  const addTitle = document.getElementById('titleInput');
  const addCategorie = document.getElementById('selectInput');
  modalLabel = document.getElementById('modalLabel');
  let previewrm = document.querySelectorAll('.rm');
  let previewImage = document.getElementById('previewImage');
  modalContainer = document.getElementById('modal-add-contentId');
  let apiUrl = "http://localhost:5678/api/works";
  let container = document.getElementById("galleryModal");

  function updateGallery() {
    container.innerHTML = ''; 
    imageSet = new Set();
    
    fetch(apiUrl).then((res) => {
      res.json().then((works) => {
        for (let work of works) {
          let figure = document.createElement("figure");
          figure.classList.add('image-container');

          let img = document.createElement("img");
          img.src = work.imageUrl;
          img.alt = work.title;
          img.classList.add("projects");

          if (!imageSet.has(work.imageUrl)) {
            imageSet.add(work.imageUrl);

          let suppBtn = document.createElement("button");
          suppBtn.classList.add("trash");
          const iconDeleteModal = document.createElement("i");
          iconDeleteModal.classList.add("fa-solid", "fa-trash-can");
          suppBtn.appendChild(iconDeleteModal);

          suppBtn.addEventListener("click", () => {
            fetch(apiUrl + "/" + work.id, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`
              },
            })
            .then(() => {
              fetchAndDisplayData();
              updateGallery();
              imageSet.delete(work.imageUrl);
            });
          });

          figure.appendChild(img);
          figure.appendChild(suppBtn);

          container.classList.add("container-slot");
          container.appendChild(figure);
          }
        }
      });
    });
  
  }

  openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
    modalLabel.textContent = "Galerie photo";
    changeContentBtn.textContent = "Ajouter une photo";
    changeContentBtn.style.backgroundColor = "#1D6154";
    modalContainer.style.display = "none";
    container.style.display = "block";
    backArrow.style.display = "none";
    updateGallery();
  });

  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      addTitle.value = "";
      addCategorie.value = "";
      addPicture.value = [];
    }
  });

  changeContentBtn.addEventListener('click', function () {
    backArrow.style.display = "block";
    modalLabel.textContent = "Ajout photo";
    changeContentBtn.textContent = "Valider";
    changeContentBtn.style.backgroundColor = "#aaa";
    modalContainer.style.display = "block";
    container.style.display = "none";
    if (changeContentBtn.classList.contains('send')) {
      changeContentBtn.style.backgroundColor = "#1D6154";
      envoyerDonneesAPI();
      addTitle.value = "";
      addPicture.value = [];
      addCategorie.value = "";
      changeContentBtn.classList.remove('send');
      changeContentBtn.style.backgroundColor = "#1D6154";
    }
  });

  backArrow.addEventListener('click', function () {
    backArrow.style.display = "none";
    modal.style.display = 'block';
    modalLabel.textContent = "Galerie photo";
    changeContentBtn.textContent = "Ajouter une photo";
    changeContentBtn.style.backgroundColor = "#1D6154";
    changeContentBtn.classList.remove('send');
    addTitle.value = "";
    addPicture.value = [];
    addCategorie.value = "";
    modalContainer.style.display = "none";
    container.style.display = "block";
  })

  addPicture.addEventListener('change', function () {
    previewimg();
  });


  function previewimg() {

    const fichier = addPicture.files[0];

    if (fichier) {
      const reader = new FileReader();

      reader.onload = function (e) {

        previewImage.src = e.target.result;
        previewImage.style.display = 'block';

        previewrm.forEach(element => {
          element.style.display = 'none';
        });
      };
      reader.readAsDataURL(fichier);
    } else {
      previewImage.src = '';
      previewImage.style.display = 'none';
    }
  }


  function verifierChamps() {

    const title = addTitle.value.trim() !== "";
    const categorie = addCategorie.value !== "";
    const picture = addPicture.files && addPicture.files.length > 0;

    if (title && categorie && picture) {
      changeContentBtn.classList.add('send');
      changeContentBtn.style.backgroundColor = "#1D6154";
    } else {
      changeContentBtn.classList.remove('send');
      changeContentBtn.style.backgroundColor = "#aaa";
    }
  }

  addTitle.addEventListener("input", verifierChamps);
  addCategorie.addEventListener("change", verifierChamps);
  addPicture.addEventListener("input", verifierChamps);

  function envoyerDonneesAPI() {

    const titreValeur = addTitle.value.trim();
    let catSelect = document.querySelector("#selectInput");
    let selectOpt = catSelect.selectedOptions[0];
    let category = selectOpt.getAttribute("data-id"); 
    category = parseInt(category);

    const token = localStorage.getItem('token');

    const image = addPicture.files[0];

    const formData = new FormData();
    formData.append("image", image); 
    formData.append("title", titreValeur);
    formData.append("category", category);    
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête vers l\'API');
        }
        return response.json();
    })
    .then(data => {
        console.log('Réponse de l\'API :', data);
        updateGallery();
        fetchAndDisplayData();
    })
    .catch(error => {
        console.error('Erreur lors de la requête vers l\'API :', error);
    });
 }


});

