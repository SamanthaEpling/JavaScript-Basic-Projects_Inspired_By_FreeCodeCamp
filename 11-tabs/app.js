// 3 to select:
// class about: parent container
// all btns
// all articles: content

const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function(e){
    //console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    
    if(id){ // if id exists...
        // remove active from other buttons
        btns.forEach(function(btn){
            btn.classList.remove("active");
        });    
        e.target.classList.add("active");
        // hide other articles from the active, matching id to button
        articles.forEach(function (article) {
            article.classList.remove("active");
        });
        
        const element = document.getElementById(id);
        // console.log(id);
        // console.log(element);
        element.classList.add("active");
    }
});

