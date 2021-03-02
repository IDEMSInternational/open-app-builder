import { Component, Input, OnInit } from "@angular/core";
import { ITemplateComponent } from "../tmpl.component";
import { FlowTypes } from "../../../../model";
import { getStringParamFromTemplateRow } from "../../../../utils";
import { Howl } from "howler";

@Component({
  selector: "plh-audio",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"]
})
export class AudioComponent implements ITemplateComponent, OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  src: string | null;
  titleAudio: string | null;
  help: string | null;
  activeTrack = null;
  isMute: boolean = false;
  player: Howl = null;
  isPlayed: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.src = getStringParamFromTemplateRow(this.row, "src", null);
    this.titleAudio = getStringParamFromTemplateRow(this.row, "title", "Title");
    this.help = getStringParamFromTemplateRow(this.row, "help", null);
  }

  start() {
    if (this.player) this.player.stop();
    this.player = new Howl({
      src: [this.src],
      onplay: (e) => {
        console.log('start');
        this.isPlayed = true;
      },
      onend: () => {
        console.log('end');
        this.isPlayed = false;
      },
      onpause: () => {
        console.log('pause');
        this.isPlayed = false;
      }
    });
    this.player.play();
  }

  togglePlayer(pause) {

  }

  rewindNext() {

  }

  rewindPrev() {

  }

  seek() {

  }

  toggleMute() {
    this.isMute = !this.isMute;
    this.player.mute(this.isMute);
    console.log(`mute: ${this.isMute}`)
  }

  updateProgress() {

  }

}
