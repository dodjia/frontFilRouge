import {Component, OnInit} from '@angular/core';
import {ObjectGeo} from '../../Class/ObjectGeo';
import {ObjectsService} from '../../Service/Objects/objects.service';
import Swal from 'sweetalert2';
import {Square} from '../../Class/Square';
import {CompositionService} from '../../Service/Composition/composition.service';
import {Composition} from '../../Class/composition';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private Objects: ObjectGeo[];
  private Composition: Composition[];

  constructor(private ObjetGeo: ObjectsService,
              private CompositionGeo: CompositionService) {
  }

  ngOnInit(): void {
    this.ObjetGeo.getObjects().subscribe(data => {
      this.Objects = data;
      console.log(data);
    });
  }

  deleteObject(): void {
    Swal.fire({
      title: 'Entrer l\'id de l\'objet que vous souhaitez supprimer',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Créer',
      showLoaderOnConfirm: true,

    }).then((result) => {
      if (result.value) {
        this.ObjetGeo.deleteObjects(result.value);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Suppression annulée',
          '',
          'error'
        );
      }
    });
  }

  deleteComposition(): void {
    Swal.fire({
      title: 'Entrer l\'id de la composition que vous souhaitez supprimer',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Créer',
      showLoaderOnConfirm: true,

    }).then((result) => {
      if (result.value) {
        this.CompositionGeo.deleteComposition(result.value);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Suppression annulée',
          '',
          'error'
        );
      }
    });
  }

  createSquare(): void {
    Swal.fire({
      title: 'Entrer la largeur d\'un côté',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Créer',
      showLoaderOnConfirm: true,
      preConfirm: (length) => {
        const objectGeo = new Square(length);
        this.ObjetGeo.postObjects(objectGeo, 'square');
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  createComposition(): void {
    Swal.fire({
      title: 'Entré le nom de votre composition',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Créer',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        const composition = new Composition(name);
        this.CompositionGeo.postComposition(composition);
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  getObject(): void {
    this.ObjetGeo.getObjects().subscribe(data => {
      this.Objects = data;
      console.log(data);
    });
  }

  getComposition(): void {
    this.CompositionGeo.getComposition().subscribe(data => {
      this.Composition = data;
      console.log(data);
    });
  }
}
