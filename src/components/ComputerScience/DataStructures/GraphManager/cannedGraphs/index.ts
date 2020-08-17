import simpleStringGraph, {
  vertexPositions as simpleStringGraphVertexPositions,
} from "./simpleStringGraph";
import largerStringGraph, {
  vertexPositions as largerStringGraphVertexPositions,
} from "./largerStringGraph";
import complexStringGraph, {
  vertexPositions as complexStringGraphVertexPositions,
} from "./complexStringGraph";

export const graphs = {
  simpleStringGraph,
  largerStringGraph,
  complexStringGraph,
};
export const vertexPositionsByGraphName = {
  simpleStringGraph: simpleStringGraphVertexPositions,
  largerStringGraph: largerStringGraphVertexPositions,
  complexStringGraph: complexStringGraphVertexPositions,
};

export default { simpleStringGraph, largerStringGraph, complexStringGraph };
