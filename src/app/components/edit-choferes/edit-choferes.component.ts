import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chofer } from 'src/app/models/chofer';
import { ChoferesService } from 'src/app/services/choferes.service';
//import { Product } from 'src/app/models/product';
//import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-choferes.component.html',
  styleUrls: ['./edit-choferes.component.scss']
})
export class EditChoferesComponent implements OnInit {
  id: number = 0;
  patente!: string;
  password!: string;

  creado!: boolean
  constructor(private readonly choferesService: ChoferesService, private readonly router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.choferesService.getChofer(this.id).subscribe((response: any) => {
      this.patente = response[0].patente;
      this.password = response[0].password;
      //otrod
      this.creado = false
    })
  }
  onEdit() {
    const chofer = new Chofer({
      patente: this.patente,
      password: this.password,
    });
    this.choferesService.editChofer(this.id, chofer).subscribe((response) => {
      return response
    });
    this.creado = true
    setTimeout(() => {
      this.router.navigateByUrl('/newdelta/choferes')
    }, 750);
  }
}
