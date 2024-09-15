const circle = document.querySelector("circle");
const computedStyle = window.getComputedStyle(circle);

var swiper = new Swiper(".mySwiper", {
  on: {
    slideChange: function () {
      $(".swiper-slide").off("mousemove mouseenter mouseleave");

      $(".swiper-slide").on("mousemove", function (event) {
        var mouseX = event.pageX;
        var mouseY = event.pageY;

        if ($(this).hasClass("swiper-slide-prev")) {
          $(".swiper-button-prev").css({
            opacity: "1",
            left: mouseX - 12 + "px",
            top: mouseY + 20 + "px",
          });
        } else if ($(this).hasClass("swiper-slide-next")) {
          $(".swiper-button-next").css({
            opacity: "1",
            left: mouseX + 12 + "px",
            top: mouseY + 20 + "px",
          });
        }
      });

      $(".swiper-slide").on("mouseenter", function () {
        if ($(this).hasClass("swiper-slide-prev")) {
          $(".swiper-button-prev").css("opacity", "1");
        } else if ($(this).hasClass("swiper-slide-next")) {
          $(".swiper-button-next").css("opacity", "1");
        }
      });

      $(".swiper-slide").on("mouseleave", function () {
        if ($(this).hasClass("swiper-slide-prev")) {
          $(".swiper-button-prev").css("opacity", "0");
        } else if ($(this).hasClass("swiper-slide-next")) {
          $(".swiper-button-next").css("opacity", "0");
        }
      });

      $(".swiper-slide").on("click", function () {
        if ($(this).hasClass("swiper-slide-prev")) {
          swiper.slidePrev();
          $(".swiper-button-prev").addClass("animate");

          setTimeout(() => {
            $(".swiper-button-prev").removeClass("animate");
          }, 800);

          const remainingDuration = parseFloat(
            computedStyle.getPropertyValue("animation-duration")
          );
          // Speed up the current animation to 2x faster
          circle.style.animation = `erase ${
            remainingDuration / 7
          }s linear infinite`;

          // After the speed-up finishes, reset to normal behavior
          setTimeout(() => {
            circle.style.animation = "drawAndErase 5s linear infinite"; // Reset to normal after speeding up
            isSpeedUpActive = false;
          }, (remainingDuration / 7) * 1000); // Use half of the remaining time
        } else if ($(this).hasClass("swiper-slide-next")) {
          swiper.slideNext();
          $(".swiper-button-next").addClass("animate");

          setTimeout(() => {
            $(".swiper-button-next").removeClass("animate");
          }, 800);

          const remainingDuration = parseFloat(
            computedStyle.getPropertyValue("animation-duration")
          );
          // Speed up the current animation to 2x faster
          circle.style.animation = `erase ${
            remainingDuration / 7
          }s linear infinite`;

          // After the speed-up finishes, reset to normal behavior
          setTimeout(() => {
            circle.style.animation = "drawAndErase 5s linear infinite"; // Reset to normal after speeding up
            isSpeedUpActive = false;
          }, (remainingDuration / 7) * 1000); // Use half of the remaining time
        }
      });
    },
  },
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "3",
  coverflowEffect: {
    rotate: 90,
    stretch: -180,
    depth: 0,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 4100,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  speed: 1000,
  loop: true,
});

const circleDiv = document.querySelector(".cursor");
// Variables for the current and target positions
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;
// Function to smoothly follow the mouse
function followMouse() {
  // Set the speed of following (adjust this value for more or less delay)
  const speed = 0.1;
  // Interpolate the current position towards the target position
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;
  // Move the circle to the new current position
  circleDiv.style.transform = `translate(${currentX}px, ${currentY}px)`;
  // Request the next frame to continue the animation
  requestAnimationFrame(followMouse);
}
// Update the target position on mousemove
document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});
// Start the animation loop
followMouse();
