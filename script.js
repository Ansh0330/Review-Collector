const userName = document.querySelector("#username");
const reviewTitle = document.querySelector("#review-title");
const reviewDesc = document.querySelector("#user-review");
const reviewList = document.querySelector("#review-list")
const submitBtn = document.querySelector("#submit-btn")
const stars = document.querySelectorAll(".star"); // returns a nodelist

let selectedRating = 0;  // Variable to store selected star rating

// Handle star selection
stars.forEach(star => {
    star.addEventListener("click", function() {
        selectedRating = parseInt(this.id);
        updateStars();
    });
});

// Update star appearance based on selection
function updateStars() {
    stars.forEach(star => {
        if (parseInt(star.id) <= selectedRating) {
            star.classList.add("active-star");
        } else {
            star.classList.remove("active-star");
        }
    });
}

//formatting the date timestamp
function formatTimestamp() {
    const now = new Date();

    // Get individual date components
    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    const dateParts = new Intl.DateTimeFormat("en-IN", options).formatToParts(now);

    // Manually construct the date string without commas
    let formattedDate = `${dateParts[0].value} ${dateParts[2].value} ${dateParts[4].value} ${dateParts[6].value}`;

    // Format time separately
    const formattedTime = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }).format(now);

    return `${formattedDate} | ${formattedTime}`;
}

submitBtn.addEventListener('click', () =>{
    addReview();
})

function addReview(){
    if (userName.value.trim() === "" || reviewTitle.value.trim() === "" || reviewDesc.value.trim() === "" || selectedRating === 0) {
        alert("Please fill out all fields and select a rating.");
        return;
    }

    //li created
    const li = document.createElement("li");
    li.classList.add("review-item");

    // review title added to the li 
    const title = document.createElement("h3");
    title.innerText = reviewTitle.value ;
    title.classList.add("review-title");
    li.appendChild(title);

    // Star rating display
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating-display");
    for (let i = 1; i <= 5; i++) {
        const starSpan = document.createElement("span");
        starSpan.innerHTML = "&#9733;";
        starSpan.classList.add("review-star");
        if (i <= selectedRating) {
            starSpan.classList.add("active-star");
        }
        ratingDiv.appendChild(starSpan);
    }
    li.appendChild(ratingDiv);

    //review description added to li
    const review = document.createElement('p');
    review.innerHTML = reviewDesc.value ;
    review.classList.add("review-description");
    li.appendChild(review);

    // a div created to hold Username and time of the review
    const nameSection = document.createElement('div');
    nameSection.classList.add("name-section")

    let name = document.createElement('p');
    name.innerText = `- ${userName.value}`;
    name.classList.add("review-username");
    nameSection.appendChild(name);

    let dateString = document.createElement('p');
    dateString.innerText = formatTimestamp();
    dateString.classList.add("review-date");
    nameSection.appendChild(dateString);

    li.appendChild(nameSection);

    // Apply animation
    li.style.opacity = "0";
    li.style.transform = "translateY(-20px)";
    reviewList.prepend(li);

    // Smooth fade-in transition
    setTimeout(() => {
        li.style.opacity = "1";
        li.style.transform = "translateY(0)";
    }, 100);


    userName.value = "";
    reviewTitle.value = "";
    reviewDesc.value = "";
    selectedRating = 0;
    updateStars();
}