import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public currentPage = 1;
  public totalPageCount;

  reset(){
    this.currentPage = 1;
    this.totalPageCount = undefined;
  }
  constructor() { }
}
