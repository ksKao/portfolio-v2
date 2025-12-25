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
