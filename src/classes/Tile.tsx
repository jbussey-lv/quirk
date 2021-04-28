export enum Shape {
  Cross = "✚",
  Square = "▪",
  Circle = "●",
  Burst = "✸",
  Clover = "✤",
  Diamond = "✦"
}

export enum Color {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
  Blue = "#006eff",
  Purple = "#9149ad",
  Orange = "orange"
}

export default class Tile {

  id: number;
  shape: Shape;
  color: Color;

  constructor(id: number, shape: Shape, color: Color) {
    this.id = id;
    this.shape = shape;
    this.color = color;
  }
}