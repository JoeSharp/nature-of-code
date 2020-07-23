import Asteroids from "./Asteroids";
import Dobble from "./Dobble";
import LogicPadlock from "./LogicPadlock";
import MidiFun from "./MidiFun";
import SolveEquation from "./SolveEquation";

export default [
  {
    component: Asteroids,
    href: "/experiments/asteroids",
    title: "Asteroids",
  },
  {
    component: Dobble,
    href: "/experiments/dobble",
    title: "Dobble",
  },
  {
    component: LogicPadlock,
    href: "/experiments/logicPadlock",
    title: "Logic Padlock",
  },
  {
    component: MidiFun,
    href: "/experiments/midiFun",
    title: "MIDI",
  },
  {
    component: SolveEquation,
    href: "/experiments/equationSolver",
    title: "Solve Equations",
  },
] as Page[];
