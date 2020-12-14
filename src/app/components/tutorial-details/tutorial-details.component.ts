import { tutorial } from './../../model/Vehicule';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial = null;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id): void {
    this.tutorialService.get(id).subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePublished(status): void {
    const data = {
      class: this.currentTutorial.calss,
      air: this.currentTutorial.air,
      body: this.currentTutorial.body,
      transmission: this.currentTutorial.transmission,
      image: this.currentTutorial.image,

      published: status,
    };

    this.tutorialService.update(this.currentTutorial.id, data).subscribe(
      (response) => {
        this.currentTutorial.published = status;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTutorial(): void {
    this.tutorialService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = 'It was updated successfully!';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/tutorials']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
