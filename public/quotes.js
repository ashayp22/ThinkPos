var NAME =[];
var LOC = [];
var CATEGORY = [];
var QUOTE = [];
var filteredType = "all";

function addQuote() {
    NAME.push(document.getElementById("n").value);
    LOC.push(document.getElementById("l").value);
    CATEGORY.push(document.getElementById("c").value);
    QUOTE.push(document.getElementById("m").value);
    console.log(document.getElementById("n").value);
    console.log(document.getElementById("l").value);
    console.log(document.getElementById("c").value);
    console.log(document.getElementById("m").value);
    createQuote();
    clearFields();
    filterSelection(filteredType);
}

function createQuote() {
    var portfoliorapdiv = document.createElement("div")
    console.log(CATEGORY[CATEGORY.length - 1]);
    portfoliorapdiv.className = "quote-container" + " col-lg-4 col-md-6 portfolio-item filter-" + CATEGORY[CATEGORY.length - 1];
    //portfoliorapdiv.id = "filter-" + CATEGORY[CATEGORY.length - 1];

    var newQuote = document.createElement("div")

    var quote = document.createElement("p");
    var quoteText = QUOTE[QUOTE.length - 1];
    quote.appendChild(document.createTextNode(quoteText));
    quote.appendChild(document.createElement("br"));
    var authorText = "-" + NAME[NAME.length - 1] + ", " + LOC[LOC.length - 1];
    quote.appendChild(document.createTextNode(authorText));
    quote.className = "note yellow";

    newQuote.appendChild(quote);

    //newQuote.className = "col-lg-4 col-md-6 portfolio-item filter-" + CATEGORY[CATEGORY.length - 1];
    newQuote.style = document.querySelector(".oval-thought");
    newQuote.style.wordWrap = 'break-word';

    portfoliorapdiv.appendChild(newQuote);

    document.getElementById("folder").appendChild(portfoliorapdiv);

}

/*function createQuote(name, loc, category, quote) {
    var portfoliorapdiv = document.createElement("div");
    console.log(category);
    portfoliorapdiv.className = "quote-container" + " col-lg-4 col-md-6 portfolio-item filter-" + category;
    //portfoliorapdiv.id = "filter-" + CATEGORY[CATEGORY.length - 1];

    var newQuote = document.createElement("div")

    var quote = document.createElement("p");
    var quoteText = quote;
    quote.appendChild(document.createTextNode(quoteText));
    quote.appendChild(document.createElement("br"));
    var authorText = "-" + name + ", " + loc;
    quote.appendChild(document.createTextNode(authorText));
    quote.className = "note yellow";

    newQuote.appendChild(quote);

    //newQuote.className = "col-lg-4 col-md-6 portfolio-item filter-" + CATEGORY[CATEGORY.length - 1];
    newQuote.style = document.querySelector(".oval-thought");

    portfoliorapdiv.appendChild(newQuote);

    document.getElementById("folder").appendChild(portfoliorapdiv);
}*/

function clearFields(){
    document.getElementById("n").value = "";
    document.getElementById("l").value = "";
    document.getElementById("c").value = "select";
    document.getElementById("m").value = "";
}

function filterSelection(c) {
    filteredType = c
    var x, i;
    x = document.getElementsByClassName("quote-container");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}
