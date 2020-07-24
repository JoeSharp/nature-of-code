import AnalogueSignals from "./AnalogueSignals";
import PageRank from "./PageRank";
import Sorting from "./Sorting";

const sessions: Page[] = [
  {
    href: "/alevel/analogueSignals",
    title: "Analogue to Digital",
    component: AnalogueSignals,
  },
  {
    href: "/alevel/pageRank",
    title: "Page Rank",
    component: PageRank,
  },
  {
    href: "/alevel/sorting",
    title: "Sorting",
    component: Sorting,
  },
];

export default sessions;
