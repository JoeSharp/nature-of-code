import TopDownCar from "./TopDownCar";
import MovingWithKeyboard from "./MovingWithKeyboard";
import UsingClasses from "./UsingClasses";
import SafeCracker from "./SafeCracker";
import { Page } from "src/types";

const sessions: Page[] = [
  {
    href: "/codeClub/movingWithKeyboard",
    title: "Session 1 - Moving With Keyboard",
    description:
      "Learn how to intercept keyboard events and use them to move an object around the screen",
    component: MovingWithKeyboard,
  },
  {
    href: "/codeClub/topDownCar",
    title: "Session 2 - Top Down Car",
    component: TopDownCar,
    description:
      "Learn how to use keyboard events to build a top down driving control scheme",
  },
  {
    href: "/codeClub/usingClasses",
    title: "Session 3 - Using Classes",
    component: UsingClasses,
    description:
      "Learn how to use Object Oriented Programming to encapsulate game objects.",
  },
  {
    href: "/codeClub/safeCracker",
    title: "Session 99 - Safe Cracker",
    component: SafeCracker,
    description: "Learn how to write a program to brute force a digital safe",
  },
];

export default sessions;
