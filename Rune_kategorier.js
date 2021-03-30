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





let data = JSON.parse(localStorage.getItem("products"));  if (!data) {   
    const xhr = new XMLHttpRequest();  
     xhr.open("GET", "mockdata.JSON");   xhr.send();   xhr.onreadystatechange = 
     function () {     if (xhr.readyState === 4 && xhr.status === 200) {       
         let data = JSON.parse(xhr.responseText);       
         localStorage.setItem("products", JSON.stringify(data));       
         console.log(data);     }   }; }

       
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
            //+ "<img src=" + allProductsArray[index].image + " width=\"100\"> <br>"
            + allProductsArray[index].price + " kr <br>"
            + `<button id="product${allProductsArray[index].id}" >Buy</button> <br>`
            + "</div>"; 
            
            if (counter==4) {
                output += "</div>"};
            counter += 1;

        }
       
    }
    console.log(output)
    document.getElementById("products").innerHTML = output;
}



