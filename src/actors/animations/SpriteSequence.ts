export interface ActionFrame<T> {
  duration: number;
  callbackFn?: (object: T, index: number) => void;
}

export class SpriteSequence<T> {
  stop = false;
  type: string;
  frames: ActionFrame<T>[];
  currentFrame = 0;
  currentFrameProgress = 0;
  onFinish: () => void;
  cleanUpFn?: () => void; // Function to clean up what was left behind by the SpriteSequence when another SpriteSequence is assigned.
  actorObject: T | null;
  constructor(
    type: string,
    frames: ActionFrame<T>[] = [],
    onFinish: () => void,
    cleanUpFn?: () => void,
  ) {
    this.type = type;
    this.frames = frames;
    this.onFinish = () => {
      this.stop = true;
      onFinish();
    };
    this.cleanUpFn = cleanUpFn;
    this.actorObject = null;
  }

  get frame() {
    return this.frames[this.currentFrame];
  }

  update(delta: number) {
    if (this.stop) {
      return;
    }

    const currentFrameDuration = this.frames[this.currentFrame].duration;

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
