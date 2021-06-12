import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public deleteSafeMode = true;

  constructor() { }
}
