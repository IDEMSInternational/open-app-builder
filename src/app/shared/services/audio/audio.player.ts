export interface AudioPlayer {
  play(): void;
  pause(): void;
  stop(): void;
  getCurrentPosition(): Promise<number>;
  setPlaybackRate(speed: number);
}

export class HTML5AudioPlayer implements AudioPlayer {
  htmlAudioElement: HTMLAudioElement;

  constructor(src: string) {
    this.htmlAudioElement = new Audio(src);
  }

  play(): void {
    this.htmlAudioElement.play();
  }

  pause(): void {
    this.htmlAudioElement.pause();
  }

  stop(): void {
    this.htmlAudioElement.pause();
    this.htmlAudioElement.currentTime = 0;
  }

  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.htmlAudioElement.currentTime);
    });
  }

  setPlaybackRate(speed: number) {
    this.htmlAudioElement.playbackRate = speed;
  }
}
