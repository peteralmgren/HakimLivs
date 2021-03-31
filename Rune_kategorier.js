// jag kan göra en array med kategorier. En for-loop skapar upp nya event-
// listeners och lägger 
document.getElementById("fruit").addEventListener("click", showCategory1);
document.getElementById("mejeri").addEventListener("click", showCategory2);
/* document.getElementById("").addEventListener("click", showCategory3);
document.getElementById("").addEventListener("click", showCategory4);
document.getElementById("").addEventListener("click", showCategory5);
document.getElementById("").addEventListener("click", showCategory6);
document.getElementById("").addEventListener("click", showCategory7);
document.getElementById("").addEventListener("click", showCategory8);
document.getElementById("").addEventListener("click", showCategory9);
document.getElementById("").addEventListener("click", showCategory10);
document.getElementById("").addEventListener("click", showCategory11);
document.getElementById("").addEventListener("click", showCategory12);
document.getElementById("").addEventListener("click", showCategory13);
document.getElementById("").addEventListener("click", showCategory14);
document.getElementById("").addEventListener("click", showCategory15);
document.getElementById("").addEventListener("click", showCategory16); */


//localStorage.clear();

let data = JSON.parse(localStorage.getItem("products"));  
if (!data) {   
    const xhr = new XMLHttpRequest();  
     xhr.open("GET", "/data/produkter.JSON");   xhr.send();   xhr.onreadystatechange = 
     function () {     if (xhr.readyState === 4 && xhr.status === 200) {       
         let data = JSON.parse(xhr.responseText);       
         localStorage.setItem("products", JSON.stringify(data));       
         console.log(data);     
        }   
    }; 
}

         allProductsArray = JSON.parse(localStorage.getItem("products"));
         console.log(allProductsArray);


// leta igenom databasen efter varor med rätt kategori.
// nu måla upp varor med den valda kategorin. 
//"om produkten har kategori x, måla då upp den"

function showCategory1(){
   showAllProductsInCategory("fruit")
}
   
function showCategory2(){
    showAllProductsInCategory("mejeri")
}

/* function showCategory3(){
    showAllProductsInCategory("")
}

function showCategory4(){
    showAllProductsInCategory("")
}

function showCategory5(){
    showAllProductsInCategory("")
}

function showCategory6(){
    showAllProductsInCategory("")
}

function showCategory7(){
    showAllProductsInCategory("")
}

function showCategory8(){
    showAllProductsInCategory("")
}

function showCategory9(){
    showAllProductsInCategory("")
}

function showCategory10(){
    showAllProductsInCategory("")
}

function showCategory11(){
    showAllProductsInCategory("")
}

function showCategory12(){
    showAllProductsInCategory("")
}

function showCategory13(){
    showAllProductsInCategory("")
}

function showCategory14(){
    showAllProductsInCategory("")
}

function showCategory15(){
    showAllProductsInCategory("")
}

function showCategory16(){
    showAllProductsInCategory("")
} */





function showAllProductsInCategory(category){
   
    let output = "";
    let counter = 1;

    for (let index = 0; index < allProductsArray.length; index++) {
        if (counter == 5){
            counter = 1;
            console.log(counter)
        }
           

        if (allProductsArray[index].category == category){
            if (counter==1) {
            output += `<div class="row">`};
        
            output +=
            `<div class="col-md-3">`
            + "<hr> <h6>" + allProductsArray[index].title + "</h6><br>"
            + "<img src=" + allProductsArray[index].image + " width=\"100\"> <br>"
            + allProductsArray[index].price + " kr <br>"
            + `<button id="product${allProductsArray[index].id}" >Köp</button> <br>`
            + "</div>"; 
            
            if (counter==4) {
                output += "</div>"};
            counter += 1;

        }
       
    }
    console.log(output)
    document.getElementById("products").innerHTML = output;
}  


// ska den slumpa ut bilder?
// Visa 7 rader
// slumpa. random nummer 1-15. om tex nummer 3 dras, visa då produkt med id 3 på plats 1. 
// en array med slumpade nummer 1-15
// en annan array med de nummer som redan har dragits. 
// sedan måla ut en produkt om den inte finns i arrayen med dragna nummer. 
// särskilda metoder för att söka igenom array.
// alternativ: slumpa 15 tal och lägg i en array. Ta sedan index 0 till första platsen,
// och index 1 till andra platsen osv. Detta är bättre. 


//localStorage.clear();

showProducts();

function showProducts (){
   
    let randomProductsArray = [];
    randomProductsArray = randomizer();

    let output = "";
    let counter = 1;

    output += `<div class="card w-100">`
    for (let index = 0; index < 15; index++) {
        if (counter == 5){
            counter = 1;
            console.log(counter)
        }
        
        let index2 = 0;
        index2 = randomProductsArray[index]
        console.log(index2);


        
        if (counter==1) {
        output += `<div class="row">`};
    
        output +=
        `<div class="col-md-3">`
        
        + `<img class="card-img-top" src=` + allProductsArray[index2].image + " width=\"100\"> <br>"
        + `<div class="card-body">`
        + `<h6 class="card-title">` + allProductsArray[index2].title + `</h6><br>`
        + `<p class="card-text">` + allProductsArray[index2].price + " kr </p> <br>"
        + `<button class="card-button" 
        id="product${allProductsArray[index2].id}" >Köp</button> <br>`
        + "</div>"
        + "</div>"; 
        
        if (counter==4) {
            output += "</div>"};
        
        counter += 1;

    }
    output += `</div>`
    console.log(output)
    document.getElementById("products").innerHTML = output;
}



function randomizer (){
    let randomProducts = [];

    //random number 1-15 into an array
        while(randomProducts.length<15){
        let r = Math.floor(Math.random()*15);
        if(randomProducts.indexOf(r) === -1) randomProducts.push(r);
       }

    return randomProducts;
}