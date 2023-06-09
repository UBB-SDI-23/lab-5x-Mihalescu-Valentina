import { Country } from "./Country";
import {Venue} from "./Venue";

export interface Edition {
    id?: number;
    edition_year : number;
    final_date : Date;
    motto : string;
    venue_id? : number | Venue;
    countries? : Country[];
    
    country_nr: number;
    avg_qf:number;

}