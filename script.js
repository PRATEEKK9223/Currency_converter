
import {countryList,currencyToCountryName} from "./codes.js"
const Base_url="https://api.currencyfreaks.com/latest?apikey=967f7ee51de04ddaac60741c40414695&symbols=INR,EUR";



let dropdowns=document.querySelectorAll("select");

for(let Code in countryList){
    
    let newOption=document.createElement("option");
    newOption.value=Code;
    newOption.innerText=`${currencyToCountryName[Code]} (${Code}) `;
    dropdowns.forEach((val)=>{
        val.append(newOption.cloneNode(true));
    })
}

const dropdown1=dropdowns[0];
const dropdown2=dropdowns[1];

const imgs=document.querySelectorAll(".dropDown img");

    var ele1;
    var currCode1;
    dropdown1.addEventListener("change",(obj)=>{
    ele1=obj.target;
    currCode1=ele1.value;
    // console.log(currCode1);
    let link=`https://flagsapi.com/${countryList[currCode1]}/shiny/64.png`;
    imgs[0].src=link;
    getRate();
});

    var ele2;
    var currCode2;
    dropdown2.addEventListener("change",(obj)=>{
    ele2=obj.target;
    currCode2=ele2.value;
    let link=`https://flagsapi.com/${countryList[currCode2]}/shiny/64.png`;
    imgs[1].src=link;
    getRate();
});


window.addEventListener("load",()=>{

    let input=document.querySelector(".amount input");
    input.value="000";
    mgs.innerText=`0 INR = 0 USD`;
   for(let option of dropdown1.options){
        // let value=option.value;
        // console.log(value);
       if(option.value==="INR"){
        option.selected=true;
        currCode1=option.value;
       }
   }

   for(let option of dropdown2.options){
       if(option.value==="USD"){
        // console.log(option.value)
        option.selected=true;
        currCode2=option.value;
       }
   }
//    console.log(getRate());
   getRate();

})

async function getRate(){
    // console.log(currCode1);
    // console.log(currCode2);

    let url=`https://api.currencyfreaks.com/latest?apikey=967f7ee51de04ddaac60741c40414695&symbols=${currCode1},${currCode2}`;
    let response=await fetch(url);
    let data=await response.json();
    return data;
}



let btn=document.querySelector(".btn");

let mgs=document.querySelector(".msg");

btn.addEventListener("click",async (event)=>{
    event.preventDefault();
    let amount=document.querySelector("input").value;
    if(isNaN(amount)){
       alert("Only Numeric values are allowed");
       return;
    }
    let data=await getRate();
    let From=data.rates[currCode1];
    let To=data.rates[currCode2];
    let rate=To/From;
    const Result=amount*rate;
    mgs.innerText=`${amount} ${currCode1} = ${Result} ${currCode2}`;
})

