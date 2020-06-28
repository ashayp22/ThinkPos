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

function loadQuotes() {

  $.ajax({
          url: '/quotes',
          type: 'GET',
          data: {},
          success: function (data) {

            allQuotes = data.data;
            document.getElementById("folder").innerHTML = "";

              for(var i = allQuotes.length - 1; i >= 0; i--) {
                createQuote(allQuotes[i].name, allQuotes[i].location, allQuotes[i].category, allQuotes[i].message);
                console.log("quote created");
              }
              $('#portfolio-flters li:nth-child(1)').click();
          },
          error: function(err) {
              console.log(err);
          }
      });
}

function addQuote() {
  let name = document.getElementById("n").value;
  let category = document.getElementById("c").value;
  let location = document.getElementById("l").value;
  let message = document.getElementById("m").value;

  $.ajax({
          url: '/quotes',
          type: 'POST',
          data: {"name": name, "location": location, "category": category, "message": message},
          success: function (data) {

            console.log(data);
              console.log(data.error)
              if(!data.error) {
                  clearFields();
                  document.getElementById("sent-message").innerHTML = data.message;
              } else {
                console.log("error")
                document.getElementById("error-message").innerHTML = data.message;
              }
          },
          error: function(err) {
              console.log(err);
          }
      });
}

loadQuotes();

function createQuote(name, loc, category, message) {
    var portfoliorapdiv = document.createElement("div")
    console.log(category);
    portfoliorapdiv.className = "quote-container" + " col-lg-4 col-md-6 portfolio-item filter-" + category;

    var newQuote = document.createElement("div")

    var quote = document.createElement("p");
    var quoteText = message;
    quote.appendChild(document.createTextNode(quoteText));
    quote.appendChild(document.createElement("br"));
    var authorText = "- " + name + ", " + loc;
    quote.appendChild(document.createTextNode(authorText));
    quote.className = "note yellow";

    newQuote.appendChild(quote);

    newQuote.style = document.querySelector(".oval-thought");
    newQuote.style.wordWrap = 'break-word';

    portfoliorapdiv.appendChild(newQuote);

    document.getElementById("folder").appendChild(portfoliorapdiv);

}


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
