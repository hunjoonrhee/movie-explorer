import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from './services/movie';
import { Movie } from './models/movie.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly service = inject(MovieService);
  readonly control = new FormControl<string>('');
  movies$!: Observable<Movie[]>;
  selectedMovie$!: Observable<Movie | undefined>;

  ngOnInit(): void {
    this.movies$ = combineLatest([
      this.service.getSelectedGenre$(),
      this.control.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), startWith('')),
    ]).pipe(
      tap(([genre, search]) => console.log('combineLatest:', genre, search)),
      switchMap(([genre, search]) =>
        this.service.getMovies().pipe(
          tap((movies) => console.log('getMovies count:', movies.length)),
          map((movies) =>
            movies
              .filter((movie) => genre === 'All' || movie.genre === genre)
              .filter((movie) =>
                movie.title.toLowerCase().includes((search ?? '').trim().toLowerCase()),
              ),
          ),
          tap((filtered) => console.log('filtered count:', filtered.length)),
          catchError((err) => {
            console.error('에러:', err);
            return EMPTY;
          }),
        ),
      ),
    );
    this.selectedMovie$ = this.service.getSelectedId$().pipe(
      filter((id) => id !== null),
      switchMap((id) => this.service.getMovieById(id)),
    );
  }

  showGenres(genre: string) {
    this.service.setGenre(genre);
  }

  showDetail(id: number) {
    this.service.selectMovie(id);
  }
}
