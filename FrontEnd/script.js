const gallery = document.querySelector('.gallery');
const buttons = document.querySelector('.btns');
const token = window.sessionStorage.getItem("token");
const titleProject = document.querySelector('.title-project')
const imgEdit = document.querySelector('.img-edit')
const modal = document.getElementById("myModal");
const btnModal = document.querySelector(".edit-project")
const closeModal = document.getElementsByClassName("close")[0];
const navEdit = document.getElementById("admin");

if (token) {
    const test = document.querySelector("body");
    buttons.style.display = "none";
    titleProject.style.display = "flex";
    imgEdit.style.display = "flex";
    navEdit.style.display = "flex";
    btnModal.style.display = "flex";
}



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

    btnModal.onclick = function() {
        modal.style.display = "block";
      }
      
      // When the user clicks on <span> (x), close the modal
      closeModal.onclick = function() {
        modal.style.display = "none";
      }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }


// local storage
// Bearer token
// fetch bearer token

    
