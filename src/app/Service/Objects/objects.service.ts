import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ObjectGeo} from '../../Class/ObjectGeo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

private domain: string;

  constructor(private httpClient: HttpClient) {
    this.domain = 'http://localhost:8080/';
  }

  public getObjects(): Observable<ObjectGeo[]>{
    return this.httpClient.get<ObjectGeo[]>(this.domain + 'Objets');
  }

  public postObjects(postData: ObjectGeo, typeOfObject): void {
    this.httpClient.post(this.domain + 'Objets/' + typeOfObject, postData).subscribe(data => {
      console.log(data);
    });

  }

  public deleteObjects(id): void{
     this.httpClient.delete(this.domain + 'Objets/Delete/' + id).subscribe(data => {
     });
  }

}
