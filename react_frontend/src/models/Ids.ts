
import {Edition} from "./Edition";
import {Country} from "./Country";

export interface Ids {
    id?: number;
    edition? :Edition | number;
    country? : Country | number;
    place : number;
    points : number;
}