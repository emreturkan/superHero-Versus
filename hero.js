const APIKEY = "2854168398138496";

const firsthero = document.getElementById("firsthero");
const secondhero = document.getElementById("secondhero");
const end = document.getElementById("end");
const firstform = document.getElementById("firstform");
const firstinput = document.getElementById("firstinput");
const secondform = document.getElementById("secondform");
const secondinput = document.getElementById("secondinput");
const btn = document.getElementById("veses");


const getHero = async(name) =>{

    const url = `https://superheroapi.com/api.php/${APIKEY}/search/${name}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0];
}


const getHeroStats = async(name)=>{
    const url = `https://superheroapi.com/api.php/${APIKEY}/search/${name}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].powerstats;
}

const card1 = document.createElement("div");
const card2 = document.createElement("div");
firstform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const search = firstinput.value.trim();
   card1.innerHTML = "";
   
    getHero(search)
    .then(data => {
        
        card1.innerHTML =
         `
         <div class="hero">
           <div class="hero-img">
               <img src="${data.image.url}" alt="">
           </div>
           <div class="hero-body">
               <h2>${data.name}</h2>
               <h4>Power : ${data.powerstats.power}</h4>
           </div>
        </div>
         
         `;
         
         firsthero.appendChild(card1)
         
    });
    
})
secondform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const search2 = secondinput.value.trim();

    card2.innerHTML = "";
    
    getHero(search2)
    .then(data => {
        
        card2.innerHTML =
         `
         <div class="hero">
           <div class="hero-img">
               <img src="${data.image.url}" alt="">
           </div>
           <div class="hero-body">
               <h2>${data.name}</h2>
               <h4>Power : ${data.powerstats.power}</h4>
           </div>
        </div>
         
         `;

         secondhero.appendChild(card2)
    });
})



btn.addEventListener("click",(e)=>{
    e.preventDefault();

    var fi = firstinput.value.trim();
    var si = secondinput.value.trim();

    heroUpdate(fi,si)
    .then((data1,data2)=>{
        vsUpdate(data1,data2);
    })
    firstform.reset();
    secondform.reset();
    

});

const heroUpdate = async(hero1,hero2)=>{
    const first = await getHeroStats(hero1);
    const second = await getHeroStats(hero2);
    const firstUI = await getHero(hero1);
    const secondUI = await getHero(hero2);


    return{
        first:first,
        second:second,
        firstUI:firstUI,
        secondUI:secondUI

    }
}


const card3 = document.createElement("div");
const vsUpdate = async (data)=>{

    const first = data.first;
    const second = data.second;
    const firstUI = data.firstUI;
    const secondUI = data.secondUI;

    let ilk = 0;
let iki = 0;



if(Math.round( first.combat) < Math.round(second.combat) ){
    iki++;
}
else{
    ilk++;
}
if(Math.round( first.power) < Math.round(second.power) ){
    iki++;
}
else{
    ilk++;
}
if(Math.round( first.speed) < Math.round(second.speed) ){
    iki++;
}
else{
    ilk++;
}


if(ilk<iki){
    console.log("İkinci Kazandı");
    card3.classList.add("end-card");
    card3.innerHTML = `
    <div class="win-hero">
    <div class="win-img">
        <img src="${secondUI.image.url}" alt="">
    </div>
    <div class="win-body">
        <h2>${secondUI.name}</h2>
        <h4>Power : ${secondUI.powerstats.power}</h4>
    </div>
 </div>
    `;
    end.appendChild(card3)

}else{
    console.log("Birinci Kazandı");
    card3.classList.add("end-card");
    card3.innerHTML = `
    <div class="win-hero">
        <div class="win-img">
            <img src="${firstUI.image.url}" alt="">
        </div>
        <div class="win-body">
            <h2>${firstUI.name}</h2>
            <h4>Power : ${firstUI.powerstats.power}</h4>
        </div>
     </div>
    `;
    end.appendChild(card3)
}


}