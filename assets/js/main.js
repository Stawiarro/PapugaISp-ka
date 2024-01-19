document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("bannerCarousel");
  const interval = 4500;
  let carouselInterval = setInterval(nextSlide, interval);

  let carouselIndicators = document.querySelector("#banner-carousel-indicators");
  let carouselItems = document.querySelectorAll("#bannerCarousel .carousel-item");

  function createIndicators() {
      carouselIndicators.innerHTML = "";
      carouselItems.forEach((item, index) => {
          carouselIndicators.innerHTML += `<li data-bs-target='#bannerCarousel' data-bs-slide-to='${index}' class='${index === 0 ? "active" : ""}'></li>`;
      });
  }

  function updateIndicators() {
      const indicators = carouselIndicators.querySelectorAll("li");
      indicators.forEach((indicator, index) => {
          indicator.classList.toggle("active", carouselItems[index].classList.contains("active"));
      });
  }

  function changeSlide(fromSlide, toSlide) {
      fromSlide.classList.remove("active");
      toSlide.classList.add("active");
      doFadeUpAnimation(toSlide);
      updateIndicators();
  }

  function nextSlide() {
      const activeItem = carousel.querySelector(".carousel-item.active");
      const nextItem = activeItem.nextElementSibling || carouselItems[0];
      changeSlide(activeItem, nextItem);
  }

  function prevSlide() {
      const activeItem = carousel.querySelector(".carousel-item.active");
      const prevItem = activeItem.previousElementSibling || carouselItems[carouselItems.length - 1];
      changeSlide(activeItem, prevItem);
  }

  function doFadeUpAnimation(element) {
      const texts = element.querySelectorAll(".carousel-content");
      texts.forEach(text => {
          text.style.opacity = 0;
          text.style.transform = "translateY(30px)";
          setTimeout(() => {
              text.style.transition = "opacity 1s ease-out, transform 1s ease-out";
              text.style.opacity = 1;
              text.style.transform = "translateY(0)";
          }, 100);
      });
  }

  function resetInterval() {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(nextSlide, interval);
  }

  function goToSlide(slideIndex) {
      const currentSlide = carousel.querySelector(".carousel-item.active");
      const goToSlide = carouselItems[slideIndex];
      changeSlide(currentSlide, goToSlide);
      resetInterval();
  }

  function pauseCarousel() {
      clearInterval(carouselInterval);
  }

  function resumeCarousel() {
      resetInterval();
  }

  createIndicators();

  carouselIndicators.querySelectorAll("li").forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
          goToSlide(index);
      });
  });

  document.querySelector(".carousel-control-prev").addEventListener("click", () => {
      prevSlide();
      resetInterval();
  });

  document.querySelector(".carousel-control-next").addEventListener("click", () => {
      nextSlide();
      resetInterval();
  });

  // Zmieniamy selektory, aby były bardziej specyficzne dla tekstów w karuzeli
  carousel.querySelectorAll(".carousel-item h2, .carousel-item p").forEach(element => {
      element.addEventListener("mouseenter", pauseCarousel);
      element.addEventListener("mouseleave", resumeCarousel);
  });

  doFadeUpAnimation(carousel.querySelector(".carousel-item.active"));
});
