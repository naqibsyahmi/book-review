$(document).ready(function() {    
    getCurrentRating();
    getReviews();
    bindStarEvents();
    bindReviewEvent();
    bindDeleteEvent();
});

function handleAjaxError(xhr, textStatus) {
    console.error("Request failed:", textStatus, xhr.responseText);

    if (xhr.status === 404) {
        alert("Resource not found!");;
    } else if (xhr.status === 500) {
        alert("Internal Server Error");
    } else {
        alert("An unexpected error occurred. Please try again");
    }
}

function bindStarEvents() {
    let urlParts = window.location.pathname.split("/");
    let bookId = urlParts[urlParts.length - 1];
    
    $(".star").hover(
        function(e) {
            let hoverPosition = e.pageX - $(this).offset().left;
            let hoverValue = $(this).data("value");

            if (hoverPosition < $(this).width() / 2) {
                hoverValue -= 0.5;
            }

            updateStars(hoverValue);
        },
        function() {
            updateStars(parseFloat($("#ratingValue").text()));
        }
    );

    $(".star").click(function(e) {
        let clickPosition = e.pageX - $(this).offset().left;
        let clickedValue = $(this).data("value");

        // Determine if its a half or full star click
        if (clickPosition < $(this).width() / 2) {
            clickedValue -= 0.5;
        }

        // AJAX call using "clickedValue" as the string
        $.ajax({
            type: "POST",
            url: "/addRating/" + bookId,
            data: { rating: clickedValue },
            success: function(response) {
                alert("Rating updated to the database");
                $("#ratingValue").text(response.averageRating.toFixed(1));
                updateStars(response.averageRating);
            },
            error: handleAjaxError
        });
    });
}

function bindReviewEvent() {
    let urlParts = window.location.pathname.split("/");
    let bookId = urlParts[urlParts.length - 1];

    $(".comment-input").on("keypress", function(e) {
        
        if (e.which === 13) {
            let reviewText = $(this).val();
            if (reviewText) {          
                $.post(`/reviews/${bookId}`, { review: reviewText }, function() {
                    alert("Review added successfully!");
                    $(".comment-input").val("");
                    appendReviewToTheList(reviewText);
                }).fail(handleAjaxError);
            };
        }
    });
}

function bindDeleteEvent() {
    $(".delete-btn").click(function(e) {
        e.preventDefault();

        let confirmation = confirm("Are you sure you want to delete this review?");
        if (confirmation) {
            let urlParts = window.location.pathname.split("/");
            let bookId = urlParts[urlParts.length - 1];

            $.ajax({
                type: "DELETE",
                url: "/deleted/" + bookId,
                success: function() {
                    alert("Book Review deleted");
                    window.location.href = "/";
                },
                error: handleAjaxError
            });
        }
    });
}

function appendReviewToTheList(reviewText) {
    let newReview = $('<div class="review-item"></div>').text(reviewText);
    $(".reviews-list").append(newReview);
}

function getCurrentRating() {
    let urlParts = window.location.pathname.split("/");
    let bookId = urlParts[urlParts.length - 1];

    $.ajax({
        type: "GET",
        url: "/averageRating/" + bookId,
        success: function(response) {
            $("#ratingValue").text(response.averageRating.toFixed(1));
            updateStars(response.averageRating);
        },
        error: handleAjaxError
    });
}

function getReviews() {
    let urlParts = window.location.pathname.split("/");
    let bookId = urlParts[urlParts.length - 1];

    $.ajax({
        type: "GET",
        url: "/reviews/" + bookId,
        success: function(reviews) {
            reviews.forEach(reviewText => {
                appendReviewToTheList(reviewText.review);
            });
        },
        error: handleAjaxError
    });
}

function updateStars(rating) {
    let fullStars = Math.floor(rating);
    let hasHalfStar = (rating % 1) >= 0.5;

    $(".star").each(function(index) {
        if (index < fullStars) {
            $(this).attr("src", "/images/full-star.png");
        } else if (index === fullStars && hasHalfStar) {
            $(this).attr("src", "/images/half-star.png");
        } else {
            $(this).attr("src", "/images/zero-star.png");
        }
    });
}