"use strict"


window.addEventListener("load",init)
var error;
var data;
var pre;
var selectDrink;


function init(){
    pre = document.getElementById("Data");
    selectDrink = document.getElementById("drink-list");
    

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
    selectDrink[selectDrink.length] = option

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
        let id = this.value;
        //let text = this[this.selectedIndex].text; het verkrijgen van de text(html)
        let coctail = GetDrinkById(id); 
        console.log(coctail);       
    })
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

