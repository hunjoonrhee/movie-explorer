import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Movie } from '../models/movie.model';

const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'The Dark Knight',
    genre: 'Action',
    rating: 9.0,
    description: 'Batman faces the Joker.',
  },
  {
    id: 2,
    title: 'Inception',
    genre: 'Action',
    rating: 8.8,
    description: 'A thief who enters dreams.',
  },
  {
    id: 3,
    title: 'The Hangover',
    genre: 'Comedy',
    rating: 7.7,
    description: 'A bachelor party gone wrong.',
  },
  {
    id: 4,
    title: 'Superbad',
    genre: 'Comedy',
    rating: 7.6,
    description: 'Two best friends in high school.',
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    rating: 9.3,
    description: 'Hope in a prison.',
  },
  {
    id: 6,
    title: 'Forrest Gump',
    genre: 'Drama',
    rating: 8.8,
    description: 'Life is like a box of chocolates.',
  },
  {
    id: 7,
    title: 'Get Out',
    genre: 'Horror',
    rating: 7.7,
    description: 'A dangerous family visit.',
  },
  {
    id: 8,
    title: 'Hereditary',
    genre: 'Horror',
    rating: 7.3,
    description: 'A family uncovers dark secrets.',
  },
];

@Injectable({ providedIn: 'root' })
export class MovieService {
  private selectedGenre$ = new BehaviorSubject<string>('All');

  getMovies(): Observable<Movie[]> {
    return of(MOCK_MOVIES).pipe(delay(300));
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    return of(MOCK_MOVIES.find((m) => m.id === id)).pipe(delay(500));
  }

  getGenres(): string[] {
    return ['All', 'Action', 'Comedy', 'Drama', 'Horror'];
  }

  setGenre(genre: string): void {
    this.selectedGenre$.next(genre);
  }

  getSelectedGenre$(): Observable<string> {
    return this.selectedGenre$.asObservable();
  }
}
