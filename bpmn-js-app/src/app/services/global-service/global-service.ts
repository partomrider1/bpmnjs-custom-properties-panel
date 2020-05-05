import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, pairwise } from 'rxjs/operators';

var headers = new HttpHeaders().set('Content-Type', []);
headers.append("Content-Type", "application/json");
headers.append('Access-Control-Allow-Origin', '*');
headers.append("enctype", "multipart/form-data");
headers.append("authToken", "0AnA9a8lRMn3xIDtXFymVzBb");


@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public BASE_API_URL = 'https://my-json-server.typicode.com/partomrider1/sample-lambdas/lambdas';

    constructor(private httpClient: HttpClient) { }

    public getServiceCall() {
        const headersInGet = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', "enctype": "multipart/form-data"});

        return this.httpClient.get(this.BASE_API_URL, { headers: headersInGet });
    }
}
