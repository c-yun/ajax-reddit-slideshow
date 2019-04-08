
var filtered = [];
var searchTerm = '';
var slideShow;

document.getElementsByTagName('button')[0].addEventListener('click', function(e) {
    // clearInterval(slideShow);
    searchTerm = document.getElementById("searchbox").value;
    search();

    document.getElementById("stop").addEventListener('click', function() {
        clearInterval(slideShow);
    })

    console.log(searchTerm);
})

function search() {
    fetch("http://www.reddit.com/search.json?q=" + searchTerm + "+nsfw:no")
    .then(function(data) {
    return data.json();
    })
    .then(function(json) {
        var images = [];
        var counter = 1;

        json.data.children.forEach(function(child) {
        images.push(child.data.url)
        filtered = images.filter(function(element) {
            return element.includes(".jpg") || element.includes(".png")
        })

        console.log('filtered: ', filtered);

        document.getElementById("searchImage").style.backgroundImage = 'url('+ filtered[0] +')';

        slideShow = setInterval(function() {
            document.getElementById("searchImage").style.backgroundImage = 'url('+ filtered[counter] +')';
            if (counter < filtered.length-1) {
                counter++
            } else {
                counter = 0
            }
            
        }, 3000);
    })

  })
}