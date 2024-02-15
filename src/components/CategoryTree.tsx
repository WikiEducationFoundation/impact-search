import React, { FC, useState } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./CategoryTree.scss";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { CategoryNode } from "../types";

export default function CategoryTree({ treeData }: { treeData: CategoryNode }) {
  const [categoryTree, setCategoryTree] = useState(flattenTree(treeData));
  const [nodesAlreadyLoaded, setNodesAlreadyLoaded] = useState([]);

  const data = categoryTree;

  const updateTreeData = (list, id, children) => {
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

  const onLoadData = ({ element }) => {
    return new Promise((resolve) => {
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

  const wrappedOnLoadData = async (props) => {
    await onLoadData(props);
    if (
      props.element.children.length === 0 &&
      !nodesAlreadyLoaded.find((e) => e.id === props.element.id)
    ) {
      setNodesAlreadyLoaded([...nodesAlreadyLoaded, props.element]);
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
            const branchNode = (isExpanded, element) => {
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
