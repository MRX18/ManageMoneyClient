import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  slug: string = "";

  chartData = [
    { 
      label: 'Series A',
      data: [65, 59, 80, 81, 56, 55, 40], 
      fill: true,
    },
    { 
      label: 'Series B',
      data: [50, 54, 10, 43, 55, 56, 32], 
      fill: true,
    }
  ];
  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  chartOptions = {
    responsive: true
  };
  chartLegend = true;
  chartPlugins = [];

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params["category"];
      this.notification.loader();
      // TODO: load content
      this.notification.unloader();
    });
  }

  ngAfterContentInit() {
    this.notification.loader();
  }

  ngAfterViewInit(): void {
    this.notification.unloader();
  }

}
