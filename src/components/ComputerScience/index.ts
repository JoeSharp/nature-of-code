import AnalogueSignals from "./AnalogueSignals";
import PageRank from "./PageRank";
import Sorting from "./Sorting";
import Search from "./Search";
import GraphBuilder from "./GraphBuilder";
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
  {
    href: "/computerScience/searching",
    title: "Search",
    component: Search,
  },
  {
    href: "/computerScience/graphBuilder",
    title: "Graph Builder",
    component: GraphBuilder,
  },
];

export default sessions;
