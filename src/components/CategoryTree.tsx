import React, { FC, useState } from "react";
import TreeView, {
  INode,
  ITreeViewOnLoadDataProps,
  NodeId,
  flattenTree,
} from "react-accessible-treeview";
import "./CategoryTree.scss";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { CategoryNode } from "../types";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";

export default function CategoryTree({ treeData }: { treeData: CategoryNode }) {
  const [categoryTree, setCategoryTree] = useState<INode<IFlatMetadata>[]>(
    flattenTree(treeData)
  );
  const [nodesAlreadyLoaded, setNodesAlreadyLoaded] = useState<
    INode<IFlatMetadata>[]
  >([]);

  const data = categoryTree;

  const updateTreeData = (
    list: INode<IFlatMetadata>[],
    id: NodeId,
    children: INode<IFlatMetadata>[]
  ) => {
    const data = list.map((node) => {
      if (node.id === id) {
        node.children = children.map((el) => {
          return el.id;
        });
      }
      return node;
    });
    return data.concat(children);
  };

  const onLoadData = (loadProps: ITreeViewOnLoadDataProps) => {
    const element = loadProps.element;
    return new Promise<void>((resolve) => {
      if (element.children.length > 0) {
        resolve();
        return;
      }
      setTimeout(() => {
        setCategoryTree((value) =>
          updateTreeData(value, element.id, [
            {
              name: `Child Node`,
              children: [],
              id: value.length,
              parent: element.id,
              isBranch: true,
            },
            {
              name: "Another child Node",
              children: [],
              id: value.length + 1,
              parent: element.id,
            },
          ])
        );
        resolve();
      }, 1000);
    });
  };

  const wrappedOnLoadData = async (loadProps: ITreeViewOnLoadDataProps) => {
    console.log(loadProps);
    await onLoadData(loadProps);
    if (
      loadProps.element.children.length === 0 &&
      !nodesAlreadyLoaded.find(
        (e: INode<IFlatMetadata>) => e.id === loadProps.element.id
      )
    ) {
      setNodesAlreadyLoaded([...nodesAlreadyLoaded, loadProps.element]);
    }
  };

  return (
    <div>
      <div className="checkbox">
        <TreeView
          data={data}
          aria-label="Checkbox tree"
          multiSelect
          propagateSelect
          propagateSelectUpwards
          togglableSelect
          onLoadData={wrappedOnLoadData}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            isSelected,
            isHalfSelected,
            getNodeProps,
            level,
            handleSelect,
            handleExpand,
          }) => {
            const branchNode = (
              isExpanded: boolean,
              element: INode<IFlatMetadata>
            ) => {
              return isExpanded && element.children.length === 0 ? (
                <AiOutlineLoading className="loading-icon" />
              ) : (
                <ArrowIcon isOpen={isExpanded} />
              );
            };
            return (
              <div
                {...getNodeProps({ onClick: handleExpand })}
                style={{ marginLeft: 40 * (level - 1) }}
              >
                {isBranch && branchNode(isExpanded, element)}
                <CheckBoxIcon
                  onClick={(e) => {
                    handleSelect(e);
                    e.stopPropagation();
                  }}
                  variant={
                    isHalfSelected ? "some" : isSelected ? "all" : "none"
                  }
                />
                <span className="name">{element.name}</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

const ArrowIcon: FC<ArrowIconProps> = ({ isOpen, className = "" }) => {
  const classes = `arrow ${
    isOpen ? "arrow--open" : "arrow--closed"
  } ${className}`;
  return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon: FC<CheckBoxIconProps> = ({ variant, onClick }) => {
  switch (variant) {
    case "all":
      return <FaCheckSquare onClick={onClick} className="checkbox-icon" />;
    case "none":
      return <FaSquare onClick={onClick} className="checkbox-icon" />;
    case "some":
      return <FaMinusSquare onClick={onClick} className="checkbox-icon" />;
    default:
      return null;
  }
};

type CheckBoxIconProps = {
  variant: "all" | "none" | "some";
  onClick: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
};

type ArrowIconProps = {
  isOpen: boolean;
  className?: string;
};
