import { HostCity } from "./HostCity";

export interface Venue {
    id?: number;
    venue_name : string;
    venue_adress : string;
    // host_city_id_id : number;

    host_city_id?: HostCity | number;
    capacity : number;
    rating : number;

    nb_editions:number;
}