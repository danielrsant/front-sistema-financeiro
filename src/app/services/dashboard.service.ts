import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_BASE_URL: string = environment.API;

  constructor(private http: HttpClient) { }

  getTotalByCategory(id: number): Observable<any> {
    let url = `${this.API_BASE_URL}/movimentacoes/categoria/${id}/total`;

    return this.http.get(url).pipe(map((result: any) => result));
  }

}
