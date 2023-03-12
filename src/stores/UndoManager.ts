import { action, observable } from "mobx";

interface UndoItem {
  data: string;
  timestamp: number;
}

export default class UndoManager {
  @observable private undoStack: UndoItem[] = [];
  @observable private redoStack: UndoItem[] = [];

  @action
  public undo() {
    if (this.undoStack.length > 0) {
      const item = this.undoStack.pop();
      if (item) {
        this.redoStack.push(item);
      }
    }
  }

  @action
  public redo() {
    if (this.redoStack.length > 0) {
      const item = this.redoStack.pop();
      if (item) {
        this.undoStack.push(item);
      }
    }
  }

  @action
  public addItem(data: string) {
    const timestamp = Date.now();
    const item = { data, timestamp };
    this.undoStack.push(item);
    this.redoStack = [];
  }

  @action
  public clear() {
    this.undoStack = [];
    this.redoStack = [];
  }

  public get canUndo() {
    return this.undoStack.length > 0;
  }

  public get canRedo() {
    return this.redoStack.length > 0;
  }
}
