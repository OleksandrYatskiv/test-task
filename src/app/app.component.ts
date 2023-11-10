import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <div>
      <h1>Password Strength Checker</h1>
      <label>Password:</label>
      <input type="password" (input)="checkPasswordStrength($event)" />
      <div [style.color]="passwordStrengthColor()">
        <div [style.background-color]="sectionColor(1)"></div>
        <div [style.background-color]="sectionColor(2)"></div>
        <div [style.background-color]="sectionColor(3)"></div>
      </div>
    </div>
  `,
})
export class AppComponent {
  password: string = '';

  checkPasswordStrength(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.password = password;
  }

  passwordStrengthColor(): string {
    if (!this.password) {
      return 'gray';
    } else if (this.password.length < 8) {
      return 'red';
    } else if (this.isPasswordStrong()) {
      return 'green';
    } else if (this.isPasswordMedium()) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  sectionColor(sectionNumber: number): string {
    const password = this.password;
    if (!password) {
      return 'gray';
    } else if (password.length < 8) {
      return 'red';
    }

    if (this.isPasswordStrong() && sectionNumber <= 3) {
      return 'green';
    } else if (this.isPasswordMedium() && sectionNumber <= 2) {
      return 'yellow';
    } else if (sectionNumber === 1) {
      return 'red';
    }

    return 'gray';
  }

  private isPasswordStrong(): boolean {
    return /[a-zA-Z]/.test(this.password) && /\d/.test(this.password) && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.password);
  }

  private isPasswordMedium(): boolean {
    return (
      /[a-zA-Z]/.test(this.password) && (/\d/.test(this.password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.password)) ||
      /\d/.test(this.password) && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.password)
    );
  }
}

