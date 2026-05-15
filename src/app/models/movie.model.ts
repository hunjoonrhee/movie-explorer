export interface Movie {
  id: number;
  title: string;
  genre: 'Action' | 'Comedy' | 'Drama' | 'Horror';
  rating: number;
  description: string;
}
