import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from './services/movie';
import { Movie } from './models/movie.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly service = inject(MovieService);
  readonly control = new FormControl<string>('');
  movies?: Movie[];

  ngOnInit(): void {
    this.service.getMovies().subscribe((movies) => (this.movies = movies));
  }

  showGenres(genre: string) {
    this.service.setGenre(genre);
  }
}
