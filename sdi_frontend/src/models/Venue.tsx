import { HostCity } from "./HostCity";

export interface Venue {
    id?: number;
    venue_name : string;
    venue_adress : string;
    host_city_idd : number;

    host_city_id?: HostCity;
    capacity : number;
    rating : number;
}