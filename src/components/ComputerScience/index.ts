import AnalogueSignals from "./AnalogueSignals";
import PageRank from "./Algorithms/PageRank";
import Sorting from "./Algorithms/Sorting";
import Search from "./Algorithms/Search";
import WeightedGraph from "./DataStructures/Graph";
import { Page } from "src/types";

const sessions: Page[] = [
  {
    href: "/computerScience/analogueSignals",
    title: "Analogue to Digital",
    component: AnalogueSignals,
  },
  {
    href: "/computerScience/algorithms/pageRank",
    title: "Page Rank",
    component: PageRank,
  },
  {
    href: "/computerScience/algorithms/sorting",
    title: "Sorting",
    component: Sorting,
  },
  {
    href: "/computerScience/algorithms/searching",
    title: "Search",
    component: Search,
  },
  {
    href: "/computerScience/dataStructures/weightedGraph",
    title: "Weighted Graph",
    component: WeightedGraph,
  },
];

export default sessions;
