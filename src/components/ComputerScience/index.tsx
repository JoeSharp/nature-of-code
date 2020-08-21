import React from "react";
import { Page } from "src/types";

import { page as binaryTreeTraversalPage } from "./Algorithms/BinaryTreeTraversal";
import { page as graphTraversalPage } from "./Algorithms/GraphTraversal";
import { page as pageRankPage } from "./Algorithms/PageRank";
import { page as routingGridPage } from "./Algorithms/Routing/GridRouting";
import { page as routingGraphPage } from "./Algorithms/Routing/GraphRouting";
import { page as searchPage } from "./Algorithms/Search";
import { page as sortingPage } from "./Algorithms/Sorting";
import { page as binaryTreePage } from "./DataStructures/BinaryTreeComponent";
import { page as graphPage } from "./DataStructures/GraphManager";
import { page as stackPage } from "./DataStructures/StackComponent";
import { queuePage, priorityQueuePage } from "./DataStructures/QueueComponent";
import { page as soundPage } from "./DataRepresentation/Sound";
import { page as bitmapImagesPage } from "./DataRepresentation/Images";
import { page as asciiTextPage } from "./DataRepresentation/AsciiText";
import CardCollection from "../Bootstrap/CardCollection";

const algorithmPages = [
  binaryTreeTraversalPage,
  graphTraversalPage,
  pageRankPage,
  routingGraphPage,
  routingGridPage,
  searchPage,
  sortingPage,
];

const dataStructurePages = [
  binaryTreePage,
  graphPage,
  stackPage,
  queuePage,
  priorityQueuePage,
];

const dataRepresentationPages = [soundPage, bitmapImagesPage, asciiTextPage];

const ComputerScience: React.FunctionComponent = () => (
  <div>
    <h2>Algorithms</h2>
    <CardCollection cards={algorithmPages} />

    <h2>Data Structures</h2>
    <CardCollection cards={dataStructurePages} />

    <h2>Data Representation</h2>
    <CardCollection cards={dataRepresentationPages} />
  </div>
);

export const page: Page = {
  href: "/computerScience",
  title: "Computer Science",
  description:
    "Explore KS4 and KS5 Computer Science Algorithms and Data Structures",
  component: ComputerScience,
};

export const pages: Page[] = [
  page,
  ...algorithmPages,
  ...dataStructurePages,
  ...dataRepresentationPages,
];

export default ComputerScience;
