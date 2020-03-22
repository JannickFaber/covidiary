import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    private apiURL = 'http://localhost:8080';

    constructor(private router: Router, private httpClient: HttpClient) { }

    /**
     * Save the current weeks score on server.
     *
     * @param objectId This users object for identification on server. Can be null on first save.
     * @param locationScore This weeks location score.
     * @param contactScore This weeks contact score.
     *
     * @return A promise containing the objectId of this user.
     */
    public saveWeeklyScore(objectId: string, locationScore: number, contactScore: number): Promise<HttpResponse<any>> {
        const weekResult = {
            locationScore: locationScore,
            contactScore: contactScore
        };
        if (objectId && objectId !== '') {
            return this.httpClient.post<any>(`${this.apiURL}/score/${objectId}`, weekResult, { observe: 'response' })
                .toPromise();
        } else {
            return this.httpClient.post<any>(`${this.apiURL}/score`, weekResult, { observe: 'response' })
                .toPromise();
        }
    }

    /**
     * Get the global score over all weeks.
     */
    public getGlobalScore(): Promise<HttpResponse<any>> {
        return this.httpClient.get<any>(`${this.apiURL}/score/get/global`, { observe: 'response' }).toPromise();
    }

    /**
     * Get the score for a specific week.
     *
     * @param firstDayOfWeek First day of the week to get the data for. Must be a monday.
     */
    public getWeeklyScore(firstDayOfWeek: string): Promise<HttpResponse<any>> {
        return this.httpClient.get<any>(`${this.apiURL}/score/get/${firstDayOfWeek}`, { observe: 'response' }).toPromise();
    }
}
