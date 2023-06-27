import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dzhj9r7lf/image/upload'
const UPLOAD_PRESET: string = 'RENT-CAR-ASSISTS';
const FOLDER: string = 'RCA';
@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  constructor(private http: HttpClient) {}
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', FOLDER);
    return this.http.post(CLOUDINARY_URL, formData);
  }
}
