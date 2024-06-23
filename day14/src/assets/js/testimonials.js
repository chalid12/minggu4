const testimonialPromise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.npoint.io/5173335893adcbe12049", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject(`Error loading data: ${xhr.status}`);
    }
  };

  xhr.onerror = function () {
    reject("Network error");
  };

  xhr.send();
});

async function loadTestimonials() {
  try {
    const response = await testimonialPromise;
    generateTestimonials(response);
    applyFilter("all");
  } catch (error) {
    console.error(error);
  }
}

function generateTestimonials(data) {
  const container = document.getElementById("testimonials-container");
  container.innerHTML = "";
  data.forEach((item) => {
    const testimonialDiv = document.createElement("div");
    testimonialDiv.className = "testimonial col-md-4 mb-3";
    testimonialDiv.setAttribute("data-rating", item.rating);
    testimonialDiv.innerHTML = `
    <div class="card">
    <div class="card-body">
      <img src="${item.image}" alt="testimonial" class="img-fluid mb-2">
      <h4 class="card-title">${item.content}</h4>
      <p class="card-text">- ${item.author}</p>
      <p class="card-text">${item.rating} <i class="bi bi-star"></i></p>
    </div>
  </div>
    `;
    container.appendChild(testimonialDiv);
  });
}
function filterTestimonials(callback) {
  const testimonials = document.querySelectorAll(".testimonial");
  testimonials.forEach((testimonial) => {
    if (callback(testimonial)) {
      testimonial.style.display = "block";
    } else {
      testimonial.style.display = "none";
    }
  });
}
function showAll(testimonial) {
  return true;
}
function showPositive(testimonial) {
  return testimonial.getAttribute("data-rating") >= 4;
}

function showNegative(testimonial) {
  return testimonial.getAttribute("data-rating") <= 2;
}

function showStarRating(rating) {
  return function (testimonial) {
    return testimonial.getAttribute("data-rating") == rating;
  };
}

function applyFilter(type) {
  switch (type) {
    case "all":
      filterTestimonials(showAll);
      break;
    case "positive":
      filterTestimonials(showPositive);
      break;
    case "negative":
      filterTestimonials(showNegative);
      break;
    case "star-1":
      filterTestimonials(showStarRating(1));
      break;
    case "star-2":
      filterTestimonials(showStarRating(2));
      break;
    case "star-3":
      filterTestimonials(showStarRating(3));
      break;
    case "star-4":
      filterTestimonials(showStarRating(4));
      break;
    case "star-5":
      filterTestimonials(showStarRating(5));
      break;
    default:
      filterTestimonials(showAll);
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTestimonials();
});
