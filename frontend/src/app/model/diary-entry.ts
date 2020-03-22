import * as moment from "moment";

export interface DiaryEntry {
    date: string;
    persons: string[];
    locations: string[];
}