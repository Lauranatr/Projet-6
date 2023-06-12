const gallery = document.querySelector('.gallery');
const buttons = document.querySelector('.btns');
const token = window.sessionStorage.getItem("token");
const titleProject = document.querySelector('.title-project')
const imgEdit = document.querySelector('.img-edit')
const modal = document.getElementById("myModal");
const btnModal = document.querySelector(".edit-project")
const closeModal = document.querySelectorAll(".close");
const navEdit = document.getElementById("admin");
const openModal = document.querySelector(".open-modal")
const contentModal = document.querySelector(".modal-content")
const styleModal = document.querySelector(".modal")
const addImg = document.querySelector(".add-img")
const delBtn = document.querySelector(".delete-works")
const galleryModal = document.querySelector(".modal-gallery")
const elementLogin = document.querySelector(".logout")
const modal2 = document.querySelector(".modal2")
const addModalImg = document.querySelector(".btn-add-img")
const addFileInputImg = document.getElementById("img-file-input")


// Récuperer les projets de l'architecte 
fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => generateWorks(data))


function generateWorks(data){
    
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


// Récuperer les catégories 

function getCategories() {

    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(allCategories => {
        
        // Création du bouton Tous
        const buttonAll = document.createElement('button')
        buttonAll.innerHTML = `Tous`
        
    buttonAll.addEventListener("click", async function (event) {
        const figures = gallery.querySelectorAll(".invisible");
        figures.forEach(figure => figure.classList.remove("invisible"));
    })
    
    buttons.appendChild(buttonAll)
    
    let figures = gallery.querySelectorAll("figure")
    for (let index = 0; index < allCategories.length; index++) {
        
        // Créations des boutons catégories
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
    elementLogin.textContent = 'login';
} else {
    elementLogin.textContent = 'logout';
};

elementLogin.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        elementLogin.textContent = 'Login';
    }
});

// Afficher la modale 

openModal.addEventListener('click', function(event) {
    event.preventDefault();
    contentModal.style.display = "flex"
    styleModal.style.display = "flex"
})

closeModal.addEventListener('click', function(){
    modal.style.display = "none"
    modal2.style.display = "none"
})

// Ajouts des travaux dans la modale

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
                figure.remove();
            });

            figureModal.appendChild(trashButton)
            figureModal.appendChild(imgModal)
            figureModal.appendChild(editButton)
            galleryModal.appendChild(figureModal)
            trashButton.appendChild(icon);
            })
        });
   
    

function deleteWorks(id) {

    fetch (`http://localhost:5678/api/works/` + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    .then(response => response.json())
    .then(response => {
        
        if (response.ok) {
            console.log('Supprimer avec succès');
        }
        else {
            console.log('Une erreur s\'est produite lors de la suppression');
        }
    })
}
    
    
    addImg.addEventListener("click", (e) => {
        modal2.style.display = "block";
        modal.style.display = "none";
    })

    const arrowLeft = document.querySelector(".arrowleft");
    console.log(arrowLeft)
    arrowLeft.addEventListener("click", (e) => {
        modal2.style.display = "none";
        modal.style.display = "flex";
    })

const sendImg = document.querySelector(".send");
const addForm = document.querySelector(".label");

addModalImg.addEventListener("click", (e) => {
    addFileInputImg.click()
    
})

sendImg.addEventListener("click", (e) => {
    e.preventDefault

})

  
// local storage
// Bearer token
// fetch bearer token

    
