import { ShapeType } from "./ShapeType";

export interface ShapeJSON {
  x: number;
  y: number;
  type: ShapeType;
}

export default class Shape {
  x: number;
  y: number;
  type: ShapeType;

  constructor(x: number, y: number, type: ShapeType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  isCollided(mouseX: number, mouseY: number): boolean {
    if (this.type === "rectangle") {
      return mouseX >= this.x && mouseX <= this.x + 100 && mouseY >= this.y && mouseY <= this.y + 100;
    } else if (this.type === "circle") {
      const distance = Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2));
      return distance <= 50;
    } else {
      return false;
    }
  }
  move(newX: number, newY: number) {
    this.x = newX;
    this.y = newY;
  }

  toJSON(): ShapeJSON {
    return {
      x: this.x,
      y: this.y,
      type: this.type,
    };
  }
}
