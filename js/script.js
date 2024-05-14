$(document).ready(function(){
    const text = $('.banner_text');
    const seeMoreBtn = $('#seeMoreButton');
    const seeLessBtn = $('#seeLessButton');
    let currentIndex = 0;
    const items = $('.carousel-item');
    const itemCount = items.length;
    let interval;
    let fullText, shortenedText;

    function truncateText() {
        if (text.text().length > 255) {
            fullText = text.text();
            shortenedText = fullText.substring(0, 255);
            text.text(shortenedText);
            seeMoreBtn.show();
        } else {
            fullText = text.text();
        }
    }
    
    truncateText();

    seeMoreBtn.click(function(){
        text.text(fullText);
        seeMoreBtn.hide();
        seeLessBtn.show();
    });

    seeLessBtn.click(function(){
        text.text(shortenedText);
        seeLessBtn.hide();
        seeMoreBtn.show();
    });
    
    // Banner carousel
    function showItem(index) {
        const newLeft = -index * 100 + '%';
        $('.carousel-inner').css('transform', 'translateX(' + newLeft + ')');
        items.removeClass('active');
        items.eq(index).addClass('active');
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % itemCount;
        showItem(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        showItem(currentIndex);
    }

    $('.next').click(function() {
        clearInterval(interval); 
        nextItem();
        startAutoPlay();
    });

    $('.prev').click(function() {
        clearInterval(interval);  
        prevItem();
        startAutoPlay();
    });

    $('.carousel-inner').hover(
        function() {
            clearInterval(interval);
        },
        function() {
            startAutoPlay();
        }
    );
    
    function startAutoPlay() {
        interval = setInterval(nextItem, 3000);
    }

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // Left arrow key
                clearInterval(interval); 
                prevItem();
                startAutoPlay();
                break;
                
            case 39: // Right arrow key
                clearInterval(interval); 
                nextItem();
                startAutoPlay();
                break;

            default: return; // Exit this handler for other keys
        }
        e.preventDefault(); // Prevent the default action (scrolling / moving caret)
    });
    
    showItem(currentIndex);
    startAutoPlay();    
});
