import {Artist} from "./Artist";

export interface Song {
    id?: number;
    song_name : string;
    artist_id? : Artist | number;
    release_date : string;
    album_name : string;
}