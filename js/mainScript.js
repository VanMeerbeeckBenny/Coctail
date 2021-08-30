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
    })
}




