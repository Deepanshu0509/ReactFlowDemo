import { ChangeEvent, FC, useCallback } from "react";
import { ImageNode } from "../../../flow-zone/nodes/typings";
import { css } from "@emotion/react";
import useStore, { selector } from "../../../flow-zone/store";
import { shallow } from "zustand/shallow";

const ImageNodeDataEditor: FC<ImageNode> = ({ type, id }) => {
  const { getNode, changeNodeData } = useStore(selector, shallow);

  // Get the node data from the store, We can also use the data from props
  // but this seems more consistent
  const state = getNode(id);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(state, e.target.value);
      if (!state) return;

      changeNodeData({
        ...state,
        type,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
    },
    [state, type, changeNodeData]
  );

  const onTextAreaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      console.log(state, e.target.value);
      if (!state) return;

      changeNodeData({
        ...state,
        type,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
    },
    [changeNodeData, state, type]
  );

  return (
    <div
      css={css`
        padding: 16px 28px;
        border-bottom: 1px solid lightblue;
        font-weight: 500;
      `}
    >
      <div css={css``}>
        <label
          htmlFor="text"
          css={css`
            font-weight: 400;
          `}
        >
          URL
        </label>
        <input
          name="url"
          value={state.data.url}
          onChange={onInputChange}
          css={css`
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid lightblue;
            font-weight: 400;
            margin-top: 8px;
            width: 100%;
          `}
        />
      </div>
      <div
        css={css`
          margin-top: 16px;
        `}
      >
        <label
          htmlFor="text"
          css={css`
            font-weight: 400;
          `}
        >
          Caption
        </label>
        <textarea
          name="caption"
          value={state.data.caption}
          onChange={onTextAreaChange}
          css={css`
            margin-top: 8px;
            padding: 8px 12px;
            border: 1px solid lightblue;
            border-radius: 4px;
            font-weight: 400;
            width: 100%;
            height: 100px;
          `}
        />
      </div>
    </div>
  );
};

export default ImageNodeDataEditor;
