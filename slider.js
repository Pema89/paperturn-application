!(function(d) {
    var itemClassName = "carousel__photo",
        items = d.getElementsByClassName(itemClassName),
        slide = 1,
        moving = true,
        urlSrc = [],
        totalItems = 0;

    function loadDoc() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var temp = JSON.parse(this.responseText);
                for (var i = 0; i < temp.length; i++) {
                    temp[i] = 'images/' + temp[i];
                }
                urlSrc = temp;
                totalItems = urlSrc.length;
                initCarousel();
            }
        };
        xhttp.open("GET", "json.php", true);
        xhttp.send();
    }

    loadDoc();

    function setInitialClasses() {

        items[0].classList.add("active");
        items[1].classList.add("active");
        items[2].classList.add("active");
        items[0].src = urlSrc[0];
        items[1].src = urlSrc[1];
        items[2].src = urlSrc[2];
    }


    function setEventListeners() {
        var next = d.getElementsByClassName('carousel__button--next')[0],
            prev = d.getElementsByClassName('carousel__button--prev')[0];

        next.addEventListener('click', moveNext);
        prev.addEventListener('click', movePrev);
    }

    function disableInteraction() {
        moving = true;

        setTimeout(function() {
            moving = false
        }, 100);
    }

    function moveCarouselTo(slide) {

        // Check if carousel is moving, if not, allow interaction
        if (!moving) {
            // temporarily disable interactivity
            disableInteraction();

            //If center slide is totalItems-1, then the right slide should be set to 0 to avoid out of bounds
            if (slide === totalItems - 1) {
                console.log(slide);
                items[0].src = urlSrc[slide - 1];
                items[1].src = urlSrc[slide];
                items[2].src = urlSrc[0]; //old center slide
            } else if (slide === 0) { //If center slide is 0, then the left slide should be set to totalItems-1 to avoid out of bounds
                items[0].src = urlSrc[totalItems - 1];
                items[1].src = urlSrc[slide];
                items[2].src = urlSrc[slide + 1]; //old center slide
            } else {
                items[0].src = urlSrc[slide - 1];
                items[1].src = urlSrc[slide];
                items[2].src = urlSrc[slide + 1]; //old center slide
            }
        }

    }

    // Next navigation handler
    function moveNext() {

        // Check if moving
        if (!moving) {

            // If it's the last slide, reset to 0, else +1
            if (slide === (totalItems - 1)) {
                slide = 0;
            } else {
                slide++;
            }

            // Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    // Previous navigation handler
    function movePrev() {

        // Check if moving
        if (!moving) {

            // If it's the first slide, set as the last slide, else -1
            if (slide === 0) {
                slide = (totalItems - 1);
            } else {
                slide--;
            }

            // Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    // Initialise carousel
    function initCarousel() {
        setInitialClasses();
        setEventListeners();

        // Set moving to false now that the carousel is ready
        moving = false;
    }

}(document));