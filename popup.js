let token = '' // Add your token here. To find the token, open 10bis and look for "UserTransactionsReport" in network tab and then search for 'user-token' in the headers.

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    document.getElementById('sum').innerHTML = "Calculating...";
    document.getElementById('sum').style.color = 'black';

    let apiUrl = 'https://www.10bis.co.il/NextApi/UserTransactionsReport'

    postData(apiUrl, token, null)
      .then(data => {
        let orders = data.Data.orderList
        let total = 0
        orders.forEach(order=>{
          let tm = order.orderTimeStr.replace(':','')
          console.log(tm)
          if(tm<1900)
            total = total + order.total
        })
        console.log(total)
        document.getElementById('sum').innerHTML = "Total: " + total.toFixed(1) + '  ' + ('\u20AA');
        if(total<0){
          document.getElementById('sum').style.color = 'red';
        }else{
          document.getElementById('sum').style.color = '#00BB00';
        }    
      })
  })
});

async function postData (url = '', token = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'user-token': token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

var getHTML = function (url, callback ) {

    // Feature detection
    if ( !window.XMLHttpRequest ) return;

    // Create new request
    var xhr = new XMLHttpRequest();

    // Setup callback
    xhr.onload = function() {
        if ( callback && typeof( callback ) === 'function' ) {
            callback( this.responseXML );
        }
    }

    // Get the HTML
    xhr.open( 'GET', url );
    xhr.responseType = 'document';
    xhr.send();
};

function isWeekday(year, month, day) {
var day = new Date(year, month, day).getDay();
return day !=5 && day !=6;
}

 function daysInMonth(iMonth, iYear)
    {
    return 32 - new Date(iYear, iMonth, 32).getDate();
    }

function getWeekdaysInMonth(month, year) {
var days = daysInMonth(month, year);
var weekdays = 0;
for(var i=0; i< days; i++) {
    if (isWeekday(year, month, i+1)) weekdays++;
}
return weekdays;
};
