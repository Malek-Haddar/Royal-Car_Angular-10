import { tutorial } from './../../model/Vehicule';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent implements OnInit {
  imageSrc: string;

  tutorial = {
    class: '',
    air: '',
    body: '',
    transmission: '',
    image: null,
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {}

  saveTutorial(): void {
    const data = {
      class: this.tutorial.class,
      air: this.tutorial.air,
      body: this.tutorial.body,
      transmission: this.tutorial.transmission,
      image: this.tutorial.image,
    };

    this.tutorialService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      class: '',
      air: '',
      body: '',
      transmission: '',
      image: null,
    };
  }
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;

      reader.readAsDataURL(image);

      reader.onload = () => {
        this.imageSrc = this.tutorial.image = reader.result as string;
      };
    }
  }
}
