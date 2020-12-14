import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @Input() email: string;
  @Output() notif = new EventEmitter<string>();
  name: string;
  constructor() {}

  ngOnInit(): void {}

  sendNotif() {
    this.notif.emit(this.name);
    console.log('sendNotif', this.name);
  }
}
