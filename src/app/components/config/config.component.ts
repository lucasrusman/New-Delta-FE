import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  precioKm: number = 0;

  creado!: boolean

  constructor(private readonly configService: ConfigService, private readonly router: Router) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe((response: any) => {
      this.precioKm = response[0].precioKm
    })
  }



  onEdit() {

    this.configService.editPrice(this.precioKm).subscribe((response) => {
      console.log(response);
    });
    this.creado = true
    setTimeout(() => {
      this.router.navigateByUrl('/newdelta/reservas')
    }, 500);
  }

}
