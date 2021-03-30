// jag kan göra en array med kategorier. En for-loop skapar upp nya event-
// listeners och lägger 
document.getElementById("fruit").addEventListener("click", showProducts1);
//document.getElementById("mejeri").addEventListener("click", showProducts2);




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

function showProducts1(){
    let output = "";
    let counter = 1;

    for (let index = 0; index < allProductsArray.length; index++) {
        if (counter == 5){
            counter = 1;
            console.log(counter)
        }
        
        if (allProductsArray[index].category == `fruit`){
                
            if (counter==1) {
                console.log("hallå")
                output += `<div class="row">`};
            output +=
            `<div class="col-md-4">`
            + "<hr> <h6>" + allProductsArray[index].title + "</h6><br>"
            + allProductsArray[index].price + " kr <br>"
            + `<button id="product${allProductsArray[index].id}" >Buy</button> <br>`
            + "</div>"; 
            if (index==4) {
                console.log("hallå igen");
                output += "</div>"};

        }
        counter += 1;
    }
    console.log(output)
    document.getElementById("products").innerHTML = output;
}

function showProducts2(){

}

/* 
<div class="container">
<div class="row"> 
    <div id=0 class="col-md-4"><br><button id="button1">Add to basket</button></div>
    <div id=1 class="col-md-4"><br><button id="button2">Add to basket</button></div>
    <div id=2 class="col-md-4"><br><button id="button3">Add to basket</button></div>
</div>
<div class="row"> 
    <div id=3 class="col-md-4"><br><button id="button4">Add to basket</button></div>
    <div id=4 class="col-md-4"><br><button id="button5">Add to basket</button></div>
    <div id=5 class="col-md-4"><br><button id="button6">Add to basket</button></div>
</div>
<div class="row"> 
    <div id=6 class="col-md-4"><br><button id="button7">Add to basket</button></div>
    <div id=7 class="col-md-4"><br><button id="button8">Add to basket</button></div>
    <div id=8 class="col-md-4"><br><button id="button9">Add to basket</button></div>
</div>
<div class="row"> 
    <div id=9 class="col-md-4"><br><button id="button10">Add to basket</button></div>
    <div id=10 class="col-md-4"><br><button id="button11">Add to basket</button></div>
    <div id=11 class="col-md-4"><br><button id="button12">Add to basket</button></div>
</div>
</div>
 */