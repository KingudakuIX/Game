import { Actor, Color, Text } from "excalibur";

export class Label extends Actor {
  // text: string;
  constructor(label: string) {
    super();

    // this.text = text;
    const text = new Text({
      text: label,
      color: Color.White,
      height: 32,
      width: 54,
      //   font: new ex.Font({
      //     family: 'impact',
      //     size: 24,
      //     unit: ex.FontUnit.Px
      // }) 
    });

    this.graphics.use(text);
  }
}