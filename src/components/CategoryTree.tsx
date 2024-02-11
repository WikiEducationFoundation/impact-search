import React from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./CategoryTree.scss";

const folder = {
  name: "",
  children: [
    {
      name: "src",
      children: [{ name: "index.js" }, { name: "styles.css" }],
    },
    {
      name: "node_modules",
      children: [
        {
          name: "react-accessible-treeview",
          children: [{ name: "bundle.js" }],
        },
        { name: "react", children: [{ name: "bundle.js" }] },
      ],
    },
    {
      name: ".npmignore",
    },
    {
      name: "package.json",
    },
    {
      name: "webpack.config.js",
    },
  ],
};

const data = flattenTree(folder);

const CategoryTree = () => (
  <TreeView
    data={data}
    className="basic"
    aria-label="basic test tree"
    nodeRenderer={({ element, getNodeProps, level, handleSelect }) => (
      <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
        {element.name}
      </div>
    )}
  />
);

export default CategoryTree;
