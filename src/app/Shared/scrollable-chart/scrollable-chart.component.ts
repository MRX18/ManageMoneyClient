import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-scrollable-chart',
  templateUrl: './scrollable-chart.component.html',
  styleUrls: ['./scrollable-chart.component.css']
})
export class ScrollableChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) private chart: BaseChartDirective | undefined;
  private scroll: boolean = false;
  @Input() public moveStep: number = 20;
  @Input() public minDiffScaleX: number = 14; // 14
  @Input() public maxDiffScaleX: number = 20; // 35
  private currentDiffScaleX: number = this.minDiffScaleX;
  private cursorPositionX: number = 0;

  chartData = [
    { 
      label: 'Series A',
      data: [61, 59, 80, 81, 56, 55, 40,
            65, 59, 80, 81, 56, 55, 40,
            65, 59, 80, 81, 56, 55, 40,
            65, 59, 80, 81, 56, 55, 40,
            65, 59, 80, 81, 56, 55, 40,
            65, 59, 80, 81, 56, 55, 40,
            65, 59, 80, 81, 56, 55, 40,
            65, 59, 80, 81, 56, 55, 41], 
      fill: true
    }
  ];
  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'January', 'February', 'March', 'April', 'May', 'June', 'July'];
                
  chartOptions = {
    responsive: true,
    elements: {
      line: {
          tension: 0.3
      }
    },
    animation: {
        duration: 1000
    },
    scales: {
      x: {
        min: this.chartLabels.length - this.minDiffScaleX,
        max: this.chartLabels.length
      },
      y: {
        beginAtZero: true
      }
    }
  };
  chartLegend = true;
  chartPlugins = [];

  constructor(
    public renderer: Renderer2,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit(): void {
  }

  private offChartAnimation() {
    this.chartOptions.animation.duration = 0;
  }

  mouseDown(e: MouseEvent) {
    this.scroll = true;
    this.offChartAnimation();
    this.cursorPositionX = e.offsetX;
    this.renderer.setStyle(this.document.body, "user-select", "none");
  }

  mouseUp(e: MouseEvent) {
    this.scroll = false;
    this.renderer.removeStyle(this.document.body, "user-select");
  }

  mouseOut(e: MouseEvent) {
    this.scroll = false;
    this.renderer.removeStyle(this.document.body, "user-select");
  }

  mouseMove(e: MouseEvent) {
    if(this.scroll) {
      if(e.offsetX > this.cursorPositionX + this.moveStep) {
        if(this.chartOptions.scales.x.max > this.currentDiffScaleX) {
          this.chartOptions.scales.x.min -= 1; 
          this.chartOptions.scales.x.max -= 1;
        }

        this.cursorPositionX = e.offsetX;
      } else if(e.offsetX < this.cursorPositionX - this.moveStep) {
        if(this.chartOptions.scales.x.max < this.chartLabels.length) {
          this.chartOptions.scales.x.min += 1; 
          this.chartOptions.scales.x.max += 1;
        }

        this.cursorPositionX = e.offsetX;
      }
      this.chart?.render();
    }
  }

  mouseWheel(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    
    this.offChartAnimation();
    debugger;
    if((e as any).wheelDeltaY > 0) {
      if(this.chartOptions.scales.x.min < this.chartOptions.scales.x.max - this.minDiffScaleX) {
        this.chartOptions.scales.x.min += 1;
      }
    } else {
      if(Math.round((this.chartOptions.scales.x.max + this.chartOptions.scales.x.min) / 2) > Math.round(this.chartLabels.length / 2)) { // this.chartOptions.scales.x.min > this.maxDiffScaleX
        if(this.chartOptions.scales.x.min > this.chartOptions.scales.x.max - this.maxDiffScaleX) {
          this.chartOptions.scales.x.min -= 1;
        }
      } else {
        if(this.chartOptions.scales.x.max < this.chartOptions.scales.x.min + this.maxDiffScaleX) {
          this.chartOptions.scales.x.max += 1;
        }
      }
    }
    
    this.currentDiffScaleX = this.chartOptions.scales.x.max - this.chartOptions.scales.x.min;
    this.chart?.render();
  }
}