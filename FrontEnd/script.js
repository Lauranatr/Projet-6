const gallery = document.querySelector('.gallery')

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

// // Recuperer les catégories 

// fetch("http://localhost:5678/api/categories")
//     .then(response => response.json())
//     .then(resultatResponse => console.table(resultatResponse))



