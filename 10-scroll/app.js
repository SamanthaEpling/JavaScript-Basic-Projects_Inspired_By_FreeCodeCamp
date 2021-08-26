// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
    //linksContainer.classList.toggle("show-links");//doesn't work dynamically
    const containerHeight = linksContainer.getBoundingClientRect().height;
    //console.log(containerHeight);
    // Returns DOMRect {x:24, y:66, width:411, height:0, top:66,...} 
    // due to links-container containing list of links
    // then look specifically for height property
    const linksHeight = links.getBoundingClientRect().height;
    //console.log(linksHeight); // 200 due to number of links
    
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});

// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector(".top-link");
window.addEventListener('scroll', function(){
    //console.log(window.pageYOffset); // read only function that provides # of pixels the document has been scrolled vertically.
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }

    if(scrollHeight > 450){
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }
});

// ********** smooth scroll to correct offset sections ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(function(link){
        link.addEventListener("click", function(e){
            // prevent default:
            e.preventDefault();
            // navigate to specific spot
            const id = e.currentTarget.getAttribute('href').slice(1); // see notes at top, skips hashtag
            //console.log(id);
            const element = document.getElementById(id);
            // calculate the heights
            const navHeight = navbar.getBoundingClientRect().height;
            const containerHeight= links.getBoundingClientRect().height;
            const fixedNav = navbar.classList.contains('fixed-nav');
            
            let position = element.offsetTop - navHeight;
            //console.log(position);
            //if the navbar is not fixed, adjust the position or pixel amount you scroll to
            if(!fixedNav){
                position = position - navHeight;
            }
            // for smaller screens
            if(navHeight > 82){
                position = position + containerHeight;
            }
            window.scrollTo({
                left:0,
                top: position,
            });
            linksContainer.style.height = 0;
    });
});