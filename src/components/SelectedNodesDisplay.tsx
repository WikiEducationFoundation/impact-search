import "./SelectedNodesDisplay.scss";
import { INode, NodeId } from "react-accessible-treeview";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";

export default function SelectedNodesDisplay({
  selectedNodes,
}: {
  selectedNodes: Map<NodeId, INode<IFlatMetadata>>;
}) {
  return (
    <div className="selected-nodes">
      <h3>Selected Articles</h3>
      {selectedNodes.size} categories
      <ul>
        {[...selectedNodes.values()].map((node) =>
          node.metadata
            ? Object.entries(node.metadata).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))
            : null
        )}
      </ul>
    </div>
  );
}
