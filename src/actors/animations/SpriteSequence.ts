import { Frame } from "../../utils/Common";

export interface ActionFrame<T> extends Frame {
  callbackFn?: (object: T, index: number) => void;
}

export class SpriteSequence<T> {
  stop = false;
  type: string;
  frames: ActionFrame<T>[];
  currentFrame = 0;
  currentFrameProgress = 0;
  onFinish: () => void;
  actorObject: T | null;
  constructor(type: string, frames: ActionFrame<T>[] = [], onFinish: () => void) {
    this.type = type;
    this.frames = frames;
    this.onFinish = () => {
      this.stop = true;
      onFinish();
    }

    this.actorObject = null
  }

  get frame() {
    return this.frames[this.currentFrame];
  }

  update(delta: number) {
    if (this.stop) {
      return;
    }

    const currentFrameDuration =
      this.frames[this.currentFrame].duration;

    // Waiting current frame to finish
    if (this.currentFrameProgress < currentFrameDuration) {
      this.currentFrameProgress += delta;
      return;
    }

    if (this.currentFrame + 1 < this.frames.length) {
      this.currentFrame += 1;
      this.currentFrameProgress = 0;

      const nextFrame = this.frames[this.currentFrame];
      if (nextFrame.callbackFn && this.actorObject) {
        nextFrame.callbackFn(this.actorObject, this.currentFrame);
      }
      return;
    }
    this.onFinish();
  }
}