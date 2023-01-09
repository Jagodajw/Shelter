import { environment } from 'src/environments/environment';

export abstract class ApiService {
  protected rootUrl: string = environment.rootUrl;

  constructor() {}
}
