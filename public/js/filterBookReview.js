function filterBookReviewByOrder() {
    const filterValue = document.getElementById("filter").value;
    switch (filterValue) {
        case "ascOrder":
            window.location.href = "/asc";
            break;
        case "descOrder":
            window.location.href = "/desc";
            break;
        default:
            window.location.href = "/";
            break;
    }
}