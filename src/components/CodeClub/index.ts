import TopDownCar from "./TopDownCar";
import MovingWithKeyboard from "./MovingWithKeyboard";
import UsingClasses from "./UsingClasses";
import SafeCracker from "./SafeCracker";

const sessions: Page[] = [
  {
    href: "/codeClub/movingWithKeyboard",
    title: "Session 1 - Moving With Keyboard",
    component: MovingWithKeyboard,
  },
  {
    href: "/codeClub/topDownCar",
    title: "Session 2 - Top Down Car",
    component: TopDownCar,
  },
  {
    href: "/codeClub/usingClasses",
    title: "Session 3 - Using Classes",
    component: UsingClasses,
  },
  {
    href: "/codeClub/safeCracker",
    title: "Session 99 - Safe Cracker",
    component: SafeCracker,
  },
];

export default sessions;
