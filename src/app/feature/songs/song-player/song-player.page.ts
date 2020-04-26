import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../song.service';

@Component({
  selector: 'plh-song-player',
  templateUrl: './song-player.page.html',
  styleUrls: ['./song-player.page.scss'],
})
export class SongPlayerPage implements OnInit {

  songId: number;
  songTitle: string = "";

  constructor(protected route: ActivatedRoute, private songService: SongService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.songId = parseInt(params["id"]);
      this.songService.getSongList().subscribe((songs) => {
        this.songTitle = songs[this.songId].songTitle;
      });
    });
  }

}
