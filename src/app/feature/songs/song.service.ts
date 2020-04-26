import { Injectable } from '@angular/core';
import { SongsPageModule } from './songs.module';
import { Observable, of } from 'rxjs';
import { Song } from './song.model';
import { HttpClient } from '@angular/common/http';
import { songList } from './song-lyrics/song-list';

@Injectable()
export class SongService {

  constructor(protected http: HttpClient) { }

  getSongList(): Observable<Song[]> {
    return of(songList);
  }

}
