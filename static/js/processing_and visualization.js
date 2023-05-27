window.onload = function(){
  can_request_data = true; // wait until the page has fully loaded so that people counts can be processed
}

const request_manufactured_count_frequency_ms = 1000; // sets the frequency of the collecting and analyzing inventory counts
var can_request_data = false;
const request_manufactured_count_url = './get_manufactured_counts';
var good = 0; //variables to store No of bounding boxes received from the request
var defective = 0;

var good_count = document.getElementById("good_count"); // spans counts of items
var defective_count = document.getElementById("defective_count");

var good_border = document.getElementById("good"); // used to set colors of the gauges
var defective_border = document.getElementById("defective");

function fetch_inventory_count(){ // gets count of drinks from python
  fetch(request_manufactured_count_url)
    .then((response) => response.json())
    .then((data) => 
      {
        console.log(data);
        good = data['good'];
        defective = data['defective'];

        console.log("-------------------------------------------------------------");
        console.log("good : " + good);
        console.log("defective : " + defective);
        console.log("-------------------------------------------------------------");  

        show_inventory_counts();

      }
    ); 
}

function show_inventory_counts(){ // show counts on html page
  good_count.innerHTML = good
  good_count.style.display = "block";

  defective_count.innerHTML = defective
  defective_count.style.display = "block";

  // check if no bounding boxes are found 
  if (isNaN(good) && isNaN(defective)){
    // display borderes with black color
    set_default_border_colors();
  }
  else{ //set border colors based on count
    set_border_colors();
  }
}


function set_border_colors(){ // sets the border colors wrt the number of counts

  // show good in green when it's count are more than defective
  if (good > defective){
    good_border.style.borderColor = "green";
    defective_border.style.borderColor = "orange"; 
  }
  // show good in red when it's count are less than defective
  else if (good < defective){
    good_border.style.borderColor = "red"; // show red/warning when good drinks are less
    defective_border.style.borderColor = "orange"; 
  }
  // show good in red when it's count are equal to defective
  else {
    good_border.style.borderColor = "red";
    defective_border.style.borderColor = "orange";
  }

  // -----------------------------------------------------------------
 
  // reset counts
  good = 0;
  defective = 0;
}

function set_default_border_colors(){
  console.log("setting circle borders to default color")
  good_border.style.borderColor = "#14151A";
  defective_border.style.borderColor = "#14151A";
}

function foo() {
  if (can_request_data){
    fetch_inventory_count();
  }
  setTimeout(foo, request_manufactured_count_frequency_ms); // obtain people counts every second
}
foo();