import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit() {
    this.notification.loader();
  }

  ngAfterViewInit(): void {
    this.notification.unloader();
  }
}
