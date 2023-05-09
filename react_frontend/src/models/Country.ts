import {Edition} from "./Edition";

export interface Country {
    id?: number;
    country_name: string;
    year_of_entrance : number;
    country_capital :string;
    quality_factor : number;
    editions? : Edition[];

    edition_nr:number;

}