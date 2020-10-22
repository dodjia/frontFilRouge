import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Composition} from '../../Class/composition';
import {ObjectGeo} from '../../Class/ObjectGeo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompositionService {
  private domain: string;

  constructor(private httpClient: HttpClient) {
    this.domain = 'http://localhost:8080/';
  }

  public getComposition(): Observable<Composition[]>{
    return this.httpClient.get<Composition[]>(this.domain + 'Composition');
  }

  public postComposition(postData: Composition): void {
    this.httpClient.post(this.domain + 'Composition', postData).subscribe(data => {
      console.log(data);
    });
  }

  public deleteComposition(id): void{
    this.httpClient.delete(this.domain + 'Composition/Delete/' + id).subscribe(data => {
    });
  }
}
