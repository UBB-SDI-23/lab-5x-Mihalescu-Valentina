import { Country } from "./Country";


export interface Artist {
    id?: number;
    artist_name: string;
    artist_age: number;
    description: string;
    country? : number | Country;





}