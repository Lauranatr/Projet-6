const gallery = document.querySelector('.gallery');
const buttons = document.querySelector('.btns');
const token = window.sessionStorage.getItem("token");
const titleProject = document.querySelector('.title-project')
const imgEdit = document.querySelector('.img-edit')
const modal = document.getElementById("myModal");
const btnModal = document.querySelector(".edit-project")
const closeModal = document.querySelector(".close");
const closeModalAdd = document.querySelector(".close-add")
const navEdit = document.getElementById("admin");
const openModal = document.querySelector(".open-modal")
const contentModal = document.querySelector(".modal-content")
const styleModal = document.querySelector(".modal")
const addImg = document.querySelector(".add-img")
const delBtn = document.querySelector(".delete-works")
const galleryModal = document.querySelector(".modal-gallery")
const elementLogin = document.querySelector(".logout")
const modalAddImg = document.querySelector(".modal-add-img")


function initWorks() {

fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => generateWorks(data))
}

function generateWorks(data){

    if (gallery.innerHTML != ""){
        gallery.innerHTML = ""
    }

    for (let index = 0; index < data.length; index++) {
        
        const newFigure = document.createElement("figure");
        newFigure.classList.add("category-" + data[index].categoryId)
        
        const newImg = document.createElement("img");
        newImg.alt = data[index].title;
        newImg.src = data[index].imageUrl;
        
        const newFigCaption = document.createElement("figcaption");
        newFigCaption.innerHTML = data[index].title
        
        newFigure.appendChild(newImg);
        newFigure.appendChild(newFigCaption);
        gallery.appendChild(newFigure); 
    }
}

function getCategories() {

    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(allCategories => {
        const buttonAll = document.createElement('button')
        buttonAll.innerHTML = `Tous`
        
    buttonAll.addEventListener("click", async function (event) {
        const figures = gallery.querySelectorAll(".invisible");
        figures.forEach(figure => figure.classList.remove("invisible"));
    })
    
    buttons.appendChild(buttonAll)
    
    let figures = gallery.querySelectorAll("figure")
    for (let index = 0; index < allCategories.length; index++) {
        
        const button = document.createElement('button');
        button.innerText = allCategories[index].name
        button.setAttribute(`id`, allCategories[index].id)
        
        button.addEventListener('click', function (event) {
            figures.forEach(figure => {
                if (figure.classList.contains("category-" + this.id)) {
                    figure.classList.remove("invisible"); 
                }
                else {
                    figure.classList.add("invisible");
                }
            })
        })
        buttons.appendChild(button)
    }
})
}

if (token) {
    buttons.style.display = "none";
    titleProject.style.display = "flex";
    imgEdit.style.display = "flex";
    navEdit.style.display = "flex";
    btnModal.style.display = "flex";
}

if (localStorage.getItem('token')) {
    elementLogin.textContent = 'logout';
} else {
    elementLogin.textContent = 'login';
};

elementLogin.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        elementLogin.textContent = 'Login';
    }
});

openModal.addEventListener('click', function(event) {
    event.preventDefault();
    contentModal.style.display = "flex"
    styleModal.style.display = "flex"

    if (galleryModal.innerHTML != "") {
        galleryModal.innerHTML = ""
    }

    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {

            data.forEach((work) => {

            const figureModal = document.createElement("figure");
            const imgModal = document.createElement("img");
            const editButton = document.createElement("p");
            const trashButton = document.createElement("button");
            const icon = document.createElement("i");

            imgModal.setAttribute('src', work.imageUrl)
            imgModal.setAttribute("alt", work.title)
            console.log(work.imageUrl)

            editButton.innerText = "éditer";
            editButton.classList.add = ("edit-button")

            trashButton.classList.add("button-delete");
            icon.classList.add("fa-solid");
            icon.classList.add("fa-trash-can");
            icon.setAttribute("id", work.id);
            
            trashButton.addEventListener('click', async () => {
                await deleteWorks(work.id);
                figureModal.remove();
                initWorks();
            });

            figureModal.appendChild(trashButton)
            figureModal.appendChild(imgModal)
            figureModal.appendChild(editButton)
            galleryModal.appendChild(figureModal)
            trashButton.appendChild(icon);
            })
        });
})

closeModal.addEventListener('click', function(){
    modal.style.display = "none"
    modalAddImg.style.display = "none"
})

closeModalAdd.addEventListener('click', function(){
    modalAddImg.style.display = "none"
})

window.onclick = function(event) {
    if (event.target == modal ) {
      modal.style.display = "none";
      modalAddImg.style.display = "none";
    }
}

function deleteWorks(id) {

    fetch (`http://localhost:5678/api/works/` + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    
    .then(response => {
        
        if (response.ok) {
            errorDelete.innerText = "Supprimé !";
            errorDelete.style.color = "green";
            console.log('Supprimer avec succès');
        }
        else {
            errorDelete.innerText = "Une erreur s'est produite";
            errorDelete.style.color = "red";
            console.log('Une erreur s\'est produite lors de la suppression');
        }
    })
}
     
addImg.addEventListener("click", (e) => {
    modalAddImg.style.display = "block";
    modal.style.display = "none";
})

const arrowLeft = document.querySelector(".arrowleft");
console.log(arrowLeft)
arrowLeft.addEventListener("click", (e) => {
    modalAddImg.style.display = "none";
    modal.style.display = "flex";
})

const addModalImg = document.querySelector(".btn-add-img")
const addFileInputImg = document.getElementById("img-file-input")
const titleLabel = document.querySelector("#title")
const categorieLabel = document.querySelector("#categorie")
const sendImg = document.querySelector(".send")
const sendGreen = document.querySelector(".green")
const errorDelete = document.querySelector(".delete-message")
const errorAdd = document.querySelector(".error")

addModalImg.addEventListener("click", (e) => {
    addFileInputImg.click()
})

categorieLabel.addEventListener("change", (e) => {
    if (titleLabel.value && categorieLabel.value && addFileInputImg.files[0]) {
        sendImg.classList.add("green")
    }
})

sendImg.addEventListener("click", (e) => {
    e.preventDefault
    const formData = new FormData();
    formData.append('title', titleLabel.value);
    formData.append('category', categorieLabel.value);
    formData.append('image', addFileInputImg.files[0]); 

    if (titleLabel.value && categorieLabel.value && addFileInputImg.files[0]) {
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Ajout de travail réussi :', data);
                modalAddImg.style.display = "none";
                initWorks();
            })
    } else {
        console.error('Tous les champs doivent être remplis')
        errorAdd.innerText = "Tous les champs doivent être remplis";
        errorAdd.style.color = "red";
    }
});

const fileInput = document.getElementById("img-file-input");
const previewImg = document.getElementById("preview");

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            previewImg.innerHTML = `<img src="${this.result}" alt="preview image">`;
        });

        reader.readAsDataURL(file);

        const uploadIcon = document.querySelector(".fa-image");
        uploadIcon.style.display = "none";
        addModalImg.style.display = "none";
    }
});

initWorks()
getCategories()