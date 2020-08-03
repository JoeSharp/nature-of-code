import AnalogueSignals from "./AnalogueSignals";
import PageRank from "./Algorithms/PageRank";
import Sorting from "./Algorithms/Sorting";
import Search from "./Algorithms/Search";
import { Page } from "src/types";
import GraphComponent from "./DataStructures/GraphComponent";
import StackComponent from "./DataStructures/StackComponent";

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
    href: "/computerScience/dataStructures/graph",
    title: "Graph",
    component: GraphComponent,
  },
  {
    href: "/computerScience/dataStructures/stack",
    title: "Stack",
    component: StackComponent,
  },
];

export default sessions;
