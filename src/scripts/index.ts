import { animate, hover, inView } from "motion";

inView("section > *", (element) => {
  animate(
    element,
    {
      opacity: 1,
      x: [-100, 0],
    },
    {
      duration: 0.6,
      ease: "easeInOut",
    },
  );

  return () => animate(element, { opacity: 0, x: -100 });
});

hover(".pill-link", (element) => {
  animate(
    element,
    { backgroundColor: "var(--color-primary)", color: "#ffffff" },
    { duration: 0.2, ease: "easeInOut" },
  );

  return () =>
    animate(element, {
      backgroundColor: "rgba(255, 255, 255, 0)",
      color: "var(--color-primary)",
    });
});

// Function to get the percentage of an element that's visible in the viewport
function getVisibilityPercentage(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const top = Math.max(0, rect.top); // The distance of the top of the element from the top of the viewport
  const bottom = Math.min(viewportHeight, rect.bottom); // The distance of the bottom of the element from the top of the viewport

  // If the element is fully out of the viewport
  if (bottom <= top) return 0;

  // Calculate the visible height and return the percentage
  const visibleHeight = bottom - top;
  return (visibleHeight / rect.height) * 100;
}

const sections = document.querySelectorAll<HTMLElement>("section");
const navLinks = document.querySelectorAll<HTMLLinkElement>("nav a");

let activeSection = "";

// Function to handle scroll and determine the most visible section
function handleScroll() {
  let maxVisibility = 0;
  let mostVisibleSection: HTMLElement | null = null;

  for (const section of sections) {
    const visibility = getVisibilityPercentage(section);

    // Check if this section occupies more of the viewport than the previous ones
    if (visibility > maxVisibility) {
      maxVisibility = visibility;
      mostVisibleSection = section;
    }
  }

  // Log the most visible section and its percentage of the viewport
  if (mostVisibleSection) {
    const id = mostVisibleSection.id;

    if (!id) return;

    // only update the style when active section changes so that we don't loop too many times
    if (activeSection !== id) {
      activeSection = id;

      for (const navLink of navLinks) {
        if (navLink.href.endsWith(id)) {
navLink.style.fontWeight = "bold";
          navLink.style.color = "var(--color-primary)"
        } else {

navLink.style.fontWeight = "normal";
          navLink.style.color = "white"
        }
      }
    }
  }
}
// Attach the scroll handler to the window
window.addEventListener("scroll", handleScroll);

// Optionally, run once on page load to get the initial most visible section
window.addEventListener("load", handleScroll);
