const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (!(track instanceof HTMLElement)) return;

  const scrollBySlide = (direction) => {
    const slide = track.querySelector(".carousel-slide");
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    const slideWidth = slide instanceof HTMLElement ? slide.getBoundingClientRect().width : track.clientWidth * 0.8;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({
      left: (slideWidth + gap) * direction,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (prev instanceof HTMLButtonElement) {
    prev.addEventListener("click", () => scrollBySlide(-1));
  }

  if (next instanceof HTMLButtonElement) {
    next.addEventListener("click", () => scrollBySlide(1));
  }
});
