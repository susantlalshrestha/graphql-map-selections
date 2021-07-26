import {
  FieldNode,
  FragmentSpreadNode,
  GraphQLResolveInfo,
  InlineFragmentNode,
  SelectionNode,
} from "graphql";

type NodeType = SelectionNode;

type MapNodeStrategy = {
  [K in NodeType["kind"]]: (node: NodeType) => object;
};

type MapSelectionsReturnType = Record<string, boolean | any>;

const mapFieldNode = (node: FieldNode) => {
  const { kind, name, selectionSet } = node;
  if (kind !== "Field" || name.value.startsWith("__")) return {};
  if (!selectionSet) return { [name.value]: true };
  return { [name.value]: mapSelectionNodes(selectionSet.selections) };
};

const mapFragmentSpreadNode = (node: FragmentSpreadNode) => {
  console.log(`${node.kind} parser method not available`);
  return {};
};

const mapInlineFragmentNode = (node: InlineFragmentNode) => {
  const { kind, typeCondition, selectionSet } = node;
  const { name } = typeCondition;
  if (kind !== "InlineFragment") return {};
  if (!selectionSet) return { [name.value]: true };
  return { [name.value]: mapSelectionNodes(selectionSet.selections) };
};

const mapNodeStrategies: MapNodeStrategy = {
  Field: mapFieldNode,
  FragmentSpread: mapFragmentSpreadNode,
  InlineFragment: mapInlineFragmentNode,
};

const mapSelectionNodes = (selections: ReadonlyArray<SelectionNode>) => {
  let select = {};
  selections.forEach((s) => {
    const node = mapNodeStrategies[s.kind](s);
    if (node) select = { ...select, ...node };
  });
  return select;
};

const mapSelections = (info: GraphQLResolveInfo): MapSelectionsReturnType => {
  const { fieldName, fieldNodes } = info;
  const { selectionSet } = fieldNodes.find((n) => n.name.value === fieldName);
  return selectionSet ? mapSelectionNodes(selectionSet.selections) : {};
};

export default mapSelections;
