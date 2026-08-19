function wiggleWords(){


let input=document.getElementById("lettersInput").value
.toLowerCase()
.replace(/[^a-z]/g,"");


let results=document.getElementById("results");


if(input.length<2){

results.innerHTML="<p class='placeholder'>Enter at least 2 letters.</p>";

return;

}



let words=[];


for(let i=0;i<30;i++){

let word=input.split("")
.sort(()=>Math.random()-0.5)
.join("");


if(!words.includes(word)){

words.push(word);

}

}



results.innerHTML="";


words.forEach(word=>{

let item=document.createElement("span");

item.className="word";

item.textContent=word;

results.appendChild(item);


});


}




function clearWords(){

document.getElementById("lettersInput").value="";

document.getElementById("results").innerHTML=
"<p class='placeholder'>Your scrambled words will appear here.</p>";

}





document.getElementById("lettersInput")
.addEventListener("keypress",function(event){

if(event.key==="Enter"){

wiggleWords();

}

});