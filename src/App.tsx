import React, { useState } from "react";
import EditorArea from "./components/EditorArea";
import Toolbar from "./components/Toolbar";
import { ShapeType } from "./models/ShapeType";
import  UndoManager  from "./stores/UndoManager";

const undoManager = new UndoManager

const App: React.FC = () => {
  const [activeShapeType, setActiveShapeType] = useState<ShapeType>("rectangle" as ShapeType);

  const handleShapeChange = (shapeType: ShapeType) => {
    setActiveShapeType(shapeType);
  };

  const handleUndo = () => {
    undoManager.undo();
  };

  const handleRedo = () => {
    undoManager.redo();
  };

  return (
    <div>
      <Toolbar onShapeChange={handleShapeChange} onUndo={handleUndo} onRedo={handleRedo} />
      <EditorArea activeShapeType={activeShapeType} />
    </div>
  );
};

export default App;
