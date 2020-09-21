import { HttpErrorResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
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

  constructor(private api: ApiService,private http: HttpClient) {
    this.getMovies();
    this.selectedMovie = {id: -1, title: '', desc: '', year: 0, email: ''};
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

  //VALIDATE EMAIL
  validateEmail() {
    
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
    this.selectedMovie.email = "";
  }

  ///HANDLING FILE UPLOAD

  selectedFile = null;

  fileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    let url = 'http://localhost:8000'
    const fd = new FormData;
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post(url, fd).subscribe(res => {
      console.log(res)
    })

  }

  
}
