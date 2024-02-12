import React, { FC } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./CategoryTree.scss";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { MediaWikiResponse } from "../types";

export default function CategoryTree({
  mediaWikiResponse,
}: {
  mediaWikiResponse: MediaWikiResponse;
}) {
  function convertToTree() {
    const rootCategory: CategoryNode = {
      name: "root",
      children: [],
    };

    const categories = mediaWikiResponse.query.pages;
    for (const key in categories) {
      if (Object.prototype.hasOwnProperty.call(categories, key)) {
        const page = categories[key];
        const categoryName: string = `${
          page.title.slice(9) /* slice out "category:" prefix */
        } (${page.categoryinfo.subcats} C, ${page.categoryinfo.pages} P)`;
        if (rootCategory.children) {
          rootCategory.children.push({ name: categoryName });
        }
      }
    }

    return rootCategory;
  }

  const data = flattenTree(convertToTree());

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
            return (
              <div
                {...getNodeProps({ onClick: handleExpand })}
                style={{ marginLeft: 40 * (level - 1) }}
              >
                {isBranch && <ArrowIcon isOpen={isExpanded} />}
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
      return <FaCheckSquare onClick={onClick} />;
    case "none":
      return <FaSquare onClick={onClick} />;
    case "some":
      return <FaMinusSquare onClick={onClick} />;
    default:
      return null;
  }
};

type CategoryNode = {
  name: string;
  children?: CategoryNode[];
};
type CheckBoxIconProps = {
  variant: "all" | "none" | "some";
  onClick: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
};
type ArrowIconProps = {
  isOpen: boolean;
  className?: string;
};
