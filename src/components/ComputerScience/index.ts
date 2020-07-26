import AnalogueSignals from "./AnalogueSignals";
import PageRank from "./PageRank";
import Sorting from "./Sorting";
import { Page } from "src/types";

const sessions: Page[] = [
  {
    href: "/computerScience/analogueSignals",
    title: "Analogue to Digital",
    component: AnalogueSignals,
  },
  {
    href: "/computerScience/pageRank",
    title: "Page Rank",
    component: PageRank,
  },
  {
    href: "/computerScience/sorting",
    title: "Sorting",
    component: Sorting,
  },
];

export default sessions;
