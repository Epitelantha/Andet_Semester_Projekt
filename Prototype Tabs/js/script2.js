// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

var win = $(window);

var bckground = $('.headpicture');

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

bckground.height(function(){
        
        windowHeight = win.innerHeight();
        bckground.css('height', windowHeight - 70);
        
    });
    
    bckground.height();