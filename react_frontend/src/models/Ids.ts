
import {Edition} from "./Edition";
import {Country} from "./Country";

export interface Ids {
    id?: number;
    edition? :number | Edition;
    country? : number | Country;
    place : number;
    points : number;
}