import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styles: ``
})
export class AddNewHeroPageComponent implements OnInit {

  // *Formulario para agregar un nuevo héroe (Formulario Reactivo)*
  public heroForm = new FormGroup( {
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics||Publisher.MarvelComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id) ),
      ).subscribe( hero => {
        if ( !hero ){
          this.router.navigateByUrl('/');
        }


        this.heroForm.reset( hero );
        return;
      })
  }

  onSubmit(): void {
    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackbar(`${ hero.superhero } actualizado 😎`);
          console.log('Actualizado', hero);
        })
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero  => {
        //TODO: Mostrar mensaje de confirmación
        this.router.navigate([ '/heroes/edit', hero.id ]);
        this.showSnackbar(`${ hero.superhero } creado 😎`);
        console.log('Guardado', hero);
      })
  }

  showSnackbar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }
}
