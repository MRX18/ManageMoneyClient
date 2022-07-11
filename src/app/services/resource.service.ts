import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { Response } from '../models/responses/response-auth';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private res: Promise<Response<{[key: string] : {[key: string]: string}}>> | undefined;

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {
    this.init();
  }

  private init() {
    this.res = this.http.get<Response<{[key: string] : {[key: string]: string}}>>(this.apiUrl + 'api/service/resourses').toPromise().then();
  }

  // Example key: Source:Key
  public async get(key: string) : Promise<string> {
    let keys = key.split(':');
    let result = keys.join(": ");

    if(keys.length == 2) {
      let resourses = await this.res;

      if(resourses) {
        if(resourses.data) {
          let text = resourses.data[keys[0]][keys[1]];
          if(text) {
            result = text;
          }
        }
      }
    }

    return result;
  }
}
