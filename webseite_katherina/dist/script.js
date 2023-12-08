var $slider = $(".slideshow .slider"),
  maxItems = $(".item", $slider).length,
  dragging = false,
  tracking,
  rightTracking;

$sliderRight = $(".slideshow")
  .clone()
  .addClass("slideshow-right")
  .appendTo($(".split-slideshow"));

rightItems = $(".item", $sliderRight).toArray();
reverseItems = rightItems.reverse();
$(".slider", $sliderRight).html("");
for (i = 0; i < maxItems; i++) {
  $(reverseItems[i]).appendTo($(".slider", $sliderRight));
}

$slider.addClass("slideshow-left");
$(".slideshow-left")
  .slick({
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    infinite: false,
    dots: true,
    speed: 1000,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
  })
  .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    if (
      currentSlide > nextSlide &&
      nextSlide == 0 &&
      currentSlide == maxItems - 1
    ) {
      $(".slideshow-right .slider").slick("slickGoTo", -1);
      $(".slideshow-text").slick("slickGoTo", maxItems);
    } else if (
      currentSlide < nextSlide &&
      currentSlide == 0 &&
      nextSlide == maxItems - 1
    ) {
      $(".slideshow-right .slider").slick("slickGoTo", maxItems);
      $(".slideshow-text").slick("slickGoTo", -1);
    } else {
      $(".slideshow-right .slider").slick(
        "slickGoTo",
        maxItems - 1 - nextSlide
      );
      $(".slideshow-text").slick("slickGoTo", nextSlide);
    }
  })
  .on("mousewheel", function (event) {
    event.preventDefault();
    if (event.deltaX > 0 || event.deltaY < 0) {
      $(this).slick("slickNext");
    } else if (event.deltaX < 0 || event.deltaY > 0) {
      $(this).slick("slickPrev");
    }
  })
  .on("mousedown touchstart", function () {
    dragging = true;
    tracking = $(".slick-track", $slider).css("transform");
    tracking = parseInt(tracking.split(",")[5]);
    rightTracking = $(".slideshow-right .slick-track").css("transform");
    rightTracking = parseInt(rightTracking.split(",")[5]);
  })
  .on("mousemove touchmove", function () {
    if (dragging) {
      newTracking = $(".slideshow-left .slick-track").css("transform");
      newTracking = parseInt(newTracking.split(",")[5]);
      diffTracking = newTracking - tracking;
      $(".slideshow-right .slick-track").css({
        transform:
          "matrix(1, 0, 0, 1, 0, " + (rightTracking - diffTracking) + ")",
      });
    }
  })
  .on("mouseleave touchend mouseup", function () {
    dragging = false;
  });

$(".slideshow-right .slider").slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: false,
  speed: 950,
  cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
  initialSlide: maxItems - 1,
});
$(".slideshow-text").slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: false,
  speed: 900,
  cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".et-hero-tab");
  const slides = document.querySelectorAll(".et-slide");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Verstecke alle Slides
      slides.forEach((slide) => {
        slide.style.display = "none";
      });

      // Zeige den ausgewählten Slide an
      const selectedSlide = document.getElementById(targetTab);
      if (selectedSlide) {
        selectedSlide.style.display = "block";
      }

      // Aktiviere den ausgewählten Tab-Stil
      tabs.forEach((t) => {
        t.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});

// Diese Funktion leitet den Benutzer zur "index.html" Seite um
function goBack() {
  // Verwenden von window.location, um zur "index.html" Seite zu navigieren
  // window.location.href = "index.html";

  // Die Historie minus 1
  window.history.back();
}
document.addEventListener("DOMContentLoaded", function () {
  // ... (dein vorhandener Code)

  // Funktion, um das aktuelle Datum zu generieren
  function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('de-DE', options);
  }

  // HTML-Element für das Datum
  const dateElement = document.querySelector('.date'); // Ändere '.date' entsprechend deinem HTML-Element

  // Aktualisiere das Datum beim Laden der Seite
  if (dateElement) {
    dateElement.textContent = getCurrentDate();
  }
});
