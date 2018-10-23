// jQuery.getJSON  url [, data ] [, success ] 
state = {};

const pages = [
  {
    title: "Home",
    body: "Home Page"
  },
  {
    title: "Solutions",
    body: "Solutions Page"
  },
  {
    title: "About",
    body: "About Page"
  },
  {
    title: "Cotact",
    body: "Contact Page"
  }
]

/* Makes the AJAX request */
function getPwned(account, successHandler){
  console.log("account: ", account);
  $.getJSON( `https://haveibeenpwned.com/api/v2/breachedaccount/${account}`, successHandler);
}


// function for success, call successHandler, pass successHandler as
// a parameter to getPwned(successHandler), ie.
// send queryTarget over to getPwned so can work with them.

/* Handles the event when the user submits the email address */
function watchSubmit(){
  $( ".js-search-form" ).submit(submitHandler);
}

/* Handles the submit event*/ 
function submitHandler(event) {
  event.preventDefault();  
  const queryTarget = $(event.currentTarget).find('.js-query');
  const queryVal = queryTarget.val();
  // queryVal.val("") ?
  //now I want to take this query, send it in ajax call.
  //so..account is going to equal queryVal....
  console.log("queryVal: ", queryVal);
  getPwned(queryVal, successHandler);
}

/* Outputs data to the console log */
// map call in here....
// inconsistency here...with the parameer, breach or breaches...hmm maybe not.
function successHandler(data) {
  console.log("DATA", data);
  const breaches = data.map((breach, index) => renderBreaches(breach, index));
  $('#js-results').html(breaches);
}

// notice how breaches includes your function renderBreaches, thus the variable is passing it to id #js-results
// this shows how your div breach-results ended up in the correct place.

//need to find out about images for company, logos.

function renderBreaches(breach, index){
 return `<div class ="breach-results">

 <h1>Company: ${breach.Name}</h1>
 <h2>Domain: ${breach.Domain}</h2>
 <h3>Breach Description: ${breach.Description}</h3>
 <div>`;}

// form class or id for submit is target.
$(watchSubmit);

//<img src=${breach.LogoType}>


/* HTML Links */

$('.js-link').on('click', function (event){
  event.preventDefault();
  // let index= event.val();
  // the above did not work, this.value and event.currentTarget.value both worked same.
  // would like to swtich back to val() instead of this.value...looking into.
  // the lines 87 and 88 are the same fyi.
  console.log(this.value);
  // console.log(event.currentTarget.value);
  let index = this.value;
  $('#js-results').html(  

  ` 
    <h1>Test</h1>
    <h2>${pages[index].title}</h2>
    <h3>${pages[index].body}</h3>
    <br>
  `      
  )
});

// getting uncaught typererror, cannot read property of title of undefined
// Now the number values are connected, 0,1,2,3...
// need to have them pull up the content now. ******

//Ah! so how are we conntecting it to our object??

// example code: 
// $('main').html(pages[1].body);
// So, what I need is to replace main with #js-results
// that is done so now, the 1 inside pages (the object) needs to be a variable value
// and this variable value needs to select the content from my object pages...
// like his example pages[1].body
// how am I going to get it to not only select each of the 4 indeces of the object
// but then I need to select the keys inside of it! 
// the quizApp may have some answers / refresh my memory.

// and if statement might do the trick. so might a loop. HERE****

// let index = this.val();
// inside event listener, will get whatever is inside html attribute
// values of 0-3
// will reference const pages array...indexes to ref const pages obj w/ content.

// value can be used in both button and list , the a anchor tag cannot have value