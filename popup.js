document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    document.getElementById('sum').innerHTML = "Calculating...";
    document.getElementById('sum').style.color = 'black';

  	var theUrl = "https://www.10bis.co.il/Account/UserReport"
    getHTML(theUrl, function(res){
        console.log(res);
        // var reports = res.getElementsByClassName("userReportDataTbl");
        var reportRow = res.getElementsByClassName("reportDataTr")
        var totalprice = 0;
        for(i=0; i<reportRow.length; i++){
            let time = reportRow[i].getElementsByClassName("reportDataTd")[2].textContent.trim().replace(":","");
            if(time<1800){
              let price = parseFloat(reportRow[i].getElementsByClassName("currency reverse_direction")[0].textContent.trim().replace(/[^0-9.-]/,''));
              console.log(time + " " + price);
              if(price){
                  totalprice = totalprice + ((price - 50)>0 ? price-50 : 0);
              }
            }
        }

        document.getElementById('sum').innerHTML = "Total: " + totalprice.toFixed(1) + '  ' + ('\u20AA');
        if(totalprice>0){
            document.getElementById('sum').style.color = 'red';
        }else{
            document.getElementById('sum').style.color = '#00BB00';
        }    
        // console.log("Total noon price: " + totalprice);

    });


  }, false);
});

var getHTML = function ( url, callback ) {

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

