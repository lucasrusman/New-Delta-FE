import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto } from 'src/app/models/auto';
import { DialogData } from 'src/app/models/DialogData';
import { BookingService } from 'src/app/services/booking.service';

export interface ReservaData {
  id : number;
  email :string;
  fecha :string;
  desde :string;
  hasta :string;
  distancia :string;
  precio: string;
  estado: string;
  auto: string;

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-reservas',
  styleUrls: ['reservas.component.scss'],
  templateUrl: 'reservas.component.html',
})
export class ReservasComponent implements AfterViewInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  displayedColumns: string[] = ['id', 'email', 'fecha', 'desde', 'hasta', 'distancia', 'precio', 'estado','confirmar', 'cancelar', 'completar', 'auto'];
  dataSource: MatTableDataSource<ReservaData>;

  matcher = new MyErrorStateMatcher();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  email: string = '';
  date: string = '';
  from: string = '';
  to: string = '';
  distance: string = '';
  price: string = '';
  estado: string = '';
  auto: string = '';
  reservas:ReservaData[] = [];

  delete !: boolean
  creado !: boolean

  modelo:string = '';
  patente:string = '';
  constructor(private readonly reservaService: BookingService, private dialog: MatDialog, private readonly router: Router, private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
    this.getBookings();
    this.creado = false
  }
  getBookings() {
    this.reservaService.getBookings().subscribe((response) => {
      console.log(response);
      this.reservas = response as ReservaData[]
      console.log(this.reservas)
      //const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
      this.dataSource.data = this.reservas
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  allBookings() {
    this.reservaService.getBookings().subscribe((response) => {
      console.log(response)
    })
  }

  asignar(idReserva: number){
    const dialogRef = this.dialog.open(AsignarDialogo, {
      width: '250px',
      data: {modelo: this.modelo, patente: this.patente},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const auto = new Auto({
          auto: this.modelo
        })
        this.reservaService.asignarAuto(idReserva, auto).subscribe((response)=>{
        })
      }

    });
  }

  cancelar(idReserva: number){
    this.reservaService.cancelar(idReserva).subscribe((response:any) => {
      if(response.status == "ok"){
        this.getBookings();
      }
    });
  }

  completar(idReserva: number){
    this.reservaService.completar(idReserva).subscribe((response:any) => {
      if(response.status == "ok"){
        this.getBookings();
      }
    });
  }
}

@Component({
  selector: 'eliminar-dialog',
  templateUrl: 'asignar-auto.component.html',
  //styleUrls: ['eliminar-dialog.scss'],
})
export class AsignarDialogo implements OnInit {

  id: number = 0;
  modelo:string = '';

  constructor(public dialogRef: MatDialogRef<ReservasComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private reservasService: BookingService, private readonly router: Router, private route: ActivatedRoute, private readonly reservaService: BookingService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    const auto = new Auto({
      auto: this.modelo
    })
    this.reservaService.asignarAuto(1, auto).subscribe((response)=>{
      this.onNoClick()
    })
    setTimeout(() => {
      location.reload()
    }, 500);

  }
}
