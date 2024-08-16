import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

  constructor(public http: HttpClient, public storage: StorageService) { }

  findByEmail(email: string){
    return this.http.get(
      `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  findById(id: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  insert(obj: ClienteDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/clientes`,
        obj,
      {
        observe: 'response',
        responseType: 'json'
      }
    )
  }
}
