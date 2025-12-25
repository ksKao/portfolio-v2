import { animate, inView } from "motion";

inView("section > *", (element) => {
  animate(
    element,
    {  
        opacity: 1,
        x: [-100, 0]
    },
    {
      duration: 0.6,
      ease: "easeInOut",
    },
  );

  return () => animate(element, { opacity: 0, x: -100 });
});
