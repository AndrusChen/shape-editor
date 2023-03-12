import Shape from "./Shape";

interface EditorState {
  shapes: Shape[];
  tool: string;
}

export default EditorState;