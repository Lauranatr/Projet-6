const gallery = document.querySelector('.gallery');
const buttons = document.querySelector('.btns');

// async function fetchWorks() {
//     const response = await fetch("http://localhost:5678/api/works");
//     const works = await response.json();
//     console.log(works[0].title)
//     return works;
// }  

// async function fetchCategories() {
//    const response = await fetch("http://localhost:5678/api/categories");
//    const allCategories = await response.json();
//    return allCategories;
// }


// Récuperer les projets de l'architecte 
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        const works = data;
        console.table(data)

        for (let index = 0; index < works.length; index++) {
            
            const newFigure = document.createElement("figure");
    
            const newImg = document.createElement("img");
            newImg.alt = works[index].title;
            newImg.src = works[index].imageUrl;
    
            const newFigCaption = document.createElement("figcaption");
            newFigCaption.innerHTML = works[index].title
            
            newFigure.appendChild(newImg);
            newFigure.appendChild(newFigCaption);
            gallery.appendChild(newFigure);
        }
})


// Récuperer les catégories 
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(allCategories => {

        // Création du bouton Tous
        const buttonAll = document.createElement('button')
        buttonAll.innerHTML = `Tous`
        buttons.appendChild(buttonAll)

        for (let index = 0; index < allCategories.length; index++) {

            // Créations des boutons catégories
            const button = document.createElement('button');

            button.addEventListener('click', function (event) {
                // Supprimer ce qu'il y'a à l'intérieur de la galerie InnerHTML= '(vide)'

                // Au clic filtrer les categoryId dans les works avec la méthode filter();
                /* EXEMPLE :
                const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
                const result = words.filter(word => word.length > 6);

                console.log(result);
                Expected output: Array ["exuberant", "destruction", "present"]
                */

                // Affichage selon le filtre
            });

            button.innerText = allCategories[index].name
            button.setAttribute(`id`, allCategories[index].id)
            buttons.appendChild(button)

        }
    })


// local storage
// Bearer token
// fetch bearer token

    
