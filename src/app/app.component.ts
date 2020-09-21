import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  movies = [{title: 'test'}];
  selectedMovie;

  constructor(private api: ApiService) {
    this.getMovies();
    this.selectedMovie = {id: -1, title: '', desc: '', year: 0, image: ''};
  }

  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  movieClicked = (movie) => {
    // console.log(movie.id);
    // console.log(movie.title);
    this.api.getOneMovies(movie.id).subscribe(
      data => {
        this.selectedMovie = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMovie = () => {
    this.api.updateMovie(this.selectedMovie).subscribe(
      data => {
        this.selectedMovie = data;
        this.getMovies();
        // this.movies = data;
        // console.log(this.selectedMovie);
      },
      error => {
        console.log(error);
      }
    );

    this.selectedMovie.title = "";
    this.selectedMovie.desc = "";
    this.selectedMovie.year = "";
  }

  createMovie = () => {
    this.api.createMovie(this.selectedMovie).subscribe(
      data => {
        this.movies.push(data);
        // this.movies = data;
        // console.log(this.selectedMovie);
      },
      error => {
        console.log(error);
      }
    );

    this.selectedMovie.title = "";
    this.selectedMovie.desc = "";
    this.selectedMovie.year = "";
  }

  deleteMovie = () => {
    this.api.deleteMovie(this.selectedMovie.id).subscribe(
      data => {
        this.getMovies();
        // this.movies.push(data);
        // this.movies = data;
        // console.log(this.selectedMovie);
      },
      error => {
        console.log(error);
      }
    );

    // this.title = "";
    this.selectedMovie.title = "";
    this.selectedMovie.desc = "";
    this.selectedMovie.year = "";
  }
}
