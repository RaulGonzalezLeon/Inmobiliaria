// src/app/email.service.ts
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  sendEmail(formData: any) {
    return emailjs.send(
      'service_m7igreb',
      'template_d9kwykv',
      formData,
      'uEs5JjaavfWbkJ-gm'
    );
  }
}
