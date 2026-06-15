let quotes = [

"Success starts with self discipline.",

"Small progress is still progress.",

"Dream big and stay consistent.",

"Focus on becoming better every day.",

"Your future is created by what you do today.",

"Confidence grows through practice.",

"Push yourself even when it feels difficult.",

"Stay patient. Great things take time."

];

let quoteText = document.querySelector("#quote");

let newQuoteBtn = document.querySelector("#newQuoteBtn");

newQuoteBtn.addEventListener("click", function(){

let randomNumber = Math.floor(Math.random() * quotes.length);

quoteText.innerText = quotes[randomNumber];

});