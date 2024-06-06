import { css } from "@emotion/react";
import Button from "../../shared/components/button";
import { useCallback, useEffect, useState } from "react";
import useStore from "../flow-zone/store";

const Header = () => {
  const [saving, setSaving] = useState(false);
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const [saved, setSaved] = useState(false);

  const onSave = useCallback(() => {
    setSaving(true);

    // check edges if there are more than one node with no target throw error
    const nodesWithNoTarget = nodes.filter((node) => {

      // get all the edges for a node
      const nodeEdges = edges.filter((edge) => edge.source === node.id);

      // if no edges with source then it has no target
      return nodeEdges.length === 0;
    });

    // if there are more than one node with no target throw error
    if (nodesWithNoTarget.length > 1) {
      alert("There are more than one node with no target");
      setSaving(false);
      return;
    }

    // save the data to local storage for now
    // To save to API just put a fetch request here
    window.localStorage.setItem("nodes", JSON.stringify(nodes));
    window.localStorage.setItem("edges", JSON.stringify(edges));
    setSaving(false);
    setSaved(true);
  }, [nodes, edges]);

  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        setSaved(false);
      }, 1000);
    }
  }, [saved]);

  return (
    <div
      css={css`
        padding: 16px 28px;
        background: aliceblue;
        display: flex;
        align-items: center;
        font-weight: 500;
        justify-content: space-between;
        border-bottom: 2px solid lightblue;
      `}
    >
      <p>React Flow Demonstration</p>
      <Button loading={saving} onClick={onSave}>
        {saved ? "Saved" : "Save"}
      </Button>
    </div>
  );
};

export default Header;
