import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto } from 'src/app/models/auto';
import { DialogData } from 'src/app/models/DialogData';
import { BookingService } from 'src/app/services/booking.service';
import { ReservasComponent } from '../reservas/reservas.component';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {

  id: number = 0;
  auto:string = '';

  constructor(
    public dialogRef: MatDialogRef<AsignarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private reservasService: BookingService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(id:number) {
    const auto = new Auto({
      auto: this.auto
    })
    //TODO
    //falta arreglar que pueda recibir el parametro que viene desde row.id component reservas
    this.reservasService.asignarAuto(id, auto).subscribe((response)=>{
      this.onNoClick()
    })
    setTimeout(() => {
      location.reload()
    }, 500);

  }
}
