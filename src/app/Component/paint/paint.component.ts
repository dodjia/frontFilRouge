import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaintSquare} from '../../Class/PaintObjects/paint-square';
import {ObjectGeo} from '../../Class/ObjectGeo';
import {ObjectsService} from '../../Service/Objects/objects.service';
import Swal from 'sweetalert2';
import {Square} from '../../Class/Square';
import {CompositionService} from '../../Service/Composition/composition.service';
import {Composition} from '../../Class/composition';
import * as $ from 'jquery';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {

  private Objects: ObjectGeo[];
  private Composition: Composition[];

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  constructor(private ObjetGeo: ObjectsService,
              private CompositionGeo: CompositionService) { }

  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.getObjectFromDataBase();
  }

  getObjectFromDataBase(): void{
    this.ObjetGeo.getObjects().subscribe(data => {
      this.Objects = data;
      this.addObjectToCanvas();
      console.log(data);
    });
  }

  animate(x: number, y: number, z: number, color: string): void {
    this.ctx.fillStyle = color;
    const square = new PaintSquare(this.ctx);
    square.draw(x, y, z);
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

  deleteAllObject(): void {
    Swal.fire({
      title: 'Vous êtes sur ?',
      text: 'Supprimer tout les objets ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Tout les objets ont été supprimé.',
          'success'
        );
        this.ObjetGeo.deleteAllObjects();
        this.getObjectFromDataBase();
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
      html:
        '<h2>Position du carré</h2>' +
        '<input id="swal-input1" class="swal2-input" autofocus placeholder="X">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Y">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Longueur d\'un côté">',
      showCancelButton: true,
      confirmButtonText: 'Créer',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const objectGeo = new Square(length);
        // @ts-ignore
        objectGeo.x = document.getElementById('swal-input1').value;
        // @ts-ignore
        objectGeo.y = document.getElementById('swal-input2').value;
        // @ts-ignore
        objectGeo.length = document.getElementById('swal-input3').value;
        console.log(objectGeo);
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


  getComposition(): void {
    this.CompositionGeo.getComposition().subscribe(data => {
      this.Composition = data;
      console.log(data);
    });
  }

  addObjectToCanvas(): void{
    this.Objects.forEach(element => this.animate(element.x, element.y, element.length, 'black'));
  }


}
