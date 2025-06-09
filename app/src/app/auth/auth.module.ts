import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
