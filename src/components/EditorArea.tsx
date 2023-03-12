import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useEditorStore } from "../hooks/useEditorStore";
import Shape from "../models/Shape";
import { ShapeType } from "../models/ShapeType";

interface EditorAreaProps {
    activeShapeType: ShapeType;
  }

const EditorArea: React.FC<EditorAreaProps> = observer(() => {
  const editorStore = useEditorStore();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [draggedShape, setDraggedShape] = useState<Shape | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const shape = editorStore.getShapes().find((shape) => shape.isCollided(mouseX, mouseY));
      if (shape) {
        setDraggedShape(shape);
      } else {
        const newShape = new Shape(mouseX, mouseY, "rectangle" as ShapeType);
        editorStore.addShape(newShape);
        setDraggedShape(newShape);
      }
    }
  };

  const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (isMouseDown && canvas && draggedShape) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      draggedShape.move(mouseX, mouseY);
    }
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
    setDraggedShape(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    ></canvas>
  );
});

export default EditorArea;
