import { observer } from "mobx-react-lite";
import { useLocalObservable } from "mobx-react-lite";
import React from "react";
import  Shape  from "../models/Shape";
import { ShapeType } from "../models/ShapeType";
import { EditorStoreContext, EditorStore } from "../stores/EditorStore";

interface Props {
  onShapeChange: (shapeType: Shape["type"]) => void;
  onUndo: () => void;
  onRedo: () => void;
}

const Toolbar: React.FC<Props> = ({ onShapeChange, onUndo, onRedo }) => {
  const editorStore = useLocalObservable(() => new EditorStore());

  const setActiveShapeType = (shapeType: Shape["type"]) => {
    editorStore.setActiveShapeType(shapeType);
    onShapeChange(shapeType);
  };

  return (
    <div className="toolbar">
      <button onClick={() => setActiveShapeType("circle" as ShapeType)}>Circle</button>
      <button onClick={() => setActiveShapeType("rectangle" as ShapeType)}>Rectangle</button>
      <button onClick={() => onUndo()}>Undo</button>
      <button onClick={() => onRedo()}>Redo</button>
    </div>
  );
};

export default observer(Toolbar);