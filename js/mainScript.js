"use strict"


window.addEventListener("load",init)
var error;
var data;
var pre;
var selectDrink;
var mainParent;


function init(){
    pre = document.getElementById("Data");
    selectDrink = document.getElementById("drink-list");
    mainParent = document.getElementById("wrapper");
    

    FetchData();
    ShowCoctailOnClick();
}


function FetchData(){

    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a").then(
        resp => {
            if(resp.status != 200){
                error = "Could not fetch data";
            }else{
                return resp.json();
            }
        }
    ).then(output =>{
        data = output.drinks;
        FillSelect();
    })
}

function FillSelect(){
    let option;
    option = new Option();
    selectDrink[selectDrink.length] = option;
    option = new Option("all");
    selectDrink[selectDrink.length] = option;
    

    data.forEach(drink => {  
        let name = drink.strDrink; 
        let id = drink.idDrink;    
        option = new Option(name,id);  //name = text ,id = value      
        selectDrink[selectDrink.length] = option               
        selectDrink.appendChild(option);
    });    
}

function ShowCoctailOnClick(){
    selectDrink.addEventListener("change",function(){
        ClearWrapper();
        let id = this.value;
        if(id == "all"){
            data.forEach(coctail =>{
                CreateCard(coctail);  
            })
        }else if(typeof this.value != "undefined" && this.value != ""){
            let coctail = GetDrinkById(id); 
            CreateCard(coctail);   
        }
        //let text = this[this.selectedIndex].text; het verkrijgen van de text(html)
        
    })
}

function ClearWrapper(){
    while(mainParent.firstChild){
        mainParent.removeChild(mainParent.firstChild)
    }
}

function GetDrinkById(id){
    let drink;
    data.forEach(coctail =>{
        if (coctail.idDrink == id){
            drink =  coctail;
        }
    })
    return drink
}


function CreateCard(coctail){
    let ingredients;
    let article;
    let figure;
    let img;
    let section;
    let h3Header;
    let parGlass;
    let parInst;
    let spanGlass;
    let spanIns;
    let spanIng;
    let ul;
    let background;

    ingredients = CreateIngredientArray(coctail);
    article = document.createElement("article");
    figure = document.createElement("figure");
    img = document.createElement("img");   
    background = document.createElement("div"); 
    ul = document.createElement("ul");

    background.id = "background";

    img.src = coctail["strDrinkThumb"];
    img.title = coctail["strDrink"];

    section = document.createElement("section");
    h3Header = document.createElement("h3");
    h3Header.innerHTML = coctail["strDrink"];

    parGlass = document.createElement("p");
    spanGlass = document.createElement("span");
    spanGlass.innerHTML = "Glass : ";
    parGlass.appendChild(spanGlass);
    parGlass.innerHTML += coctail["strGlass"];    

    parInst = document.createElement("p");
    spanIns = document.createElement("span");
    spanIns.innerHTML = "Instructions : ";
    parInst.appendChild(spanIns);
    parInst.innerHTML += coctail["strInstructions"];    
    

       
    spanIng = document.createElement("span");
    spanIng.innerHTML = "Ingredients : ";
    ingredients.forEach(ingredient =>{
        let li = document.createElement("li");
        let string = `${ingredient[0]} (${ingredient[1]})`;
        li.innerHTML = string;
        ul.appendChild(li);
    })

    section.appendChild(background);
    section.appendChild(h3Header);
    section.appendChild(parGlass);
    section.appendChild(parInst);    
    section.appendChild(spanIng);
    section.appendChild(ul);

    
    figure.appendChild(img);
    article.appendChild(figure);
    article.appendChild(section);
    mainParent.appendChild(article);
}

function CreateIngredientArray(coctail){
    let ingArray = [];
    let count = 0;
    for(let key in coctail){
                   
        if(key.match(/strIngredient/i) && coctail[key] != null){
            ingArray.push([coctail[key]])
            
        }else if(key.match(/strMeasure/i) && coctail[key] != null){            
            ingArray[count].push(coctail[key]) 
            count++;
    }    
}

return ingArray
}

