import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from 'react';
import  Shape  from "../models/Shape";

export class EditorStore {
  shapes: Shape[] = [];
  activeShapeType: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  addShape(shape: Shape) {
    runInAction(() => {
      this.shapes.push(shape);
    });
  }

  removeShape(shape: Shape) {
    runInAction(() => {
      const index = this.shapes.indexOf(shape);
      if (index > -1) {
        this.shapes.splice(index, 1);
      }
    });
  }

  getShapes(): Shape[] {
    return this.shapes;
  }

  setShapes(shapes: Shape[]) {
    runInAction(() => {
      this.shapes = shapes;
    });
  }

  getActiveShapeType(shapeType: Shape["type"]) {
    return this.activeShapeType = shapeType;
  }

  setActiveShapeType(shapeType: string) {
    runInAction(() => {
      this.activeShapeType = shapeType;
    });
  }
}

export const EditorStoreContext = createContext<EditorStore>(new EditorStore());
