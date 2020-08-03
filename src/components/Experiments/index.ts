import Asteroids from "./Asteroids";
import Dobble from "./Dobble";
import LogicPadlock from "./LogicPadlock";
import MidiFun from "./MidiFun";
import { Page } from "src/types";
import P5SketchLibrary from "../p5/P5SketchLibrary";

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
    component: P5SketchLibrary,
    href: "/experiments/sketches",
    title: "P5 Sketches",
  },
] as Page[];
