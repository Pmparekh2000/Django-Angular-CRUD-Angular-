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
  baseurl = 'http://localhost:8000';

  constructor(private api: ApiService) {
    this.getMovies();
    this.selectedMovie = {id: -1, title: '', desc: '', year: 0, email: '', file: Image};
  }

  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
        // this.movies.file.
        console.log(data);
        
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
    this.selectedMovie.email = "";
  }

  createMovie = () => {
    console.log(this.selectedMovie);
    
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
    this.selectedMovie.email = "";
  }

  onChange (event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.selectedMovie.file = file;
    }
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
    this.selectedMovie.email ="";
  }

  readUrl(event: any) {
    if(event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.selectedMovie.url = (<FileReader>event.target).result;
      }
      console.log(this.selectedMovie.url);
      
    }
  }
}
