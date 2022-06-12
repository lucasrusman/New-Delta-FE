import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChoferData } from 'src/app/models/ChoferData';
import { MyErrorStateMatcher } from '../reservas/reservas.component';
import { ChoferesService } from '../../services/choferes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/DialogData';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'patente', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<ChoferData>;

  matcher = new MyErrorStateMatcher();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  patente: string = '';

  choferes:ChoferData[] = [];
  delete !: boolean
  creado !: boolean

  constructor(private readonly choferesService: ChoferesService, private readonly router: Router, private readonly route: ActivatedRoute,  private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.getChoferes();
    this.creado = false
  }
  getChoferes() {
    this.choferesService.getChoferes().subscribe((response) => {
      console.log(response);
      this.choferes = response as ChoferData[]
      console.log(this.choferes)
      this.dataSource.data = this.choferes
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToEditPage(id: number) {
    this.router.navigateByUrl(`/newdelta/edit/choferes/${id}`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EliminarDialogoChoferes, {
      width: '250px',
      data: { delete: this.delete },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.choferesService.deleteChofer(id).subscribe((response) => {
          setTimeout(() => {
            location.reload()
          }, 100);
        })
      }
    })
  }

}



export class EliminarDialogoChoferes {
  id: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ChoferesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private choferesService: ChoferesService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.choferesService.deleteChofer(this.id).subscribe((response) => {
      this.onNoClick()
    })
    setTimeout(() => {
      location.reload()
    }, 500);

  }

}
