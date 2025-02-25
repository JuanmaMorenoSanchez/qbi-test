import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.scss']
})
export class DoughnutChartComponent {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: Record<string, number> = {};

  private colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'];

  ngAfterViewInit() {
    const canvas = this.chartCanvas.nativeElement;
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    this.renderChart();
  }

  ngOnChanges() {
    this.renderChart();
  }

  private renderChart() {
    if (!this.chartCanvas || !this.chartCanvas.nativeElement) return;
    const canvas = this.chartCanvas.nativeElement;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const values = Object.values(this.data);
    const labels = Object.keys(this.data);
    const total = values.reduce((acc, val) => acc + val, 0);
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2.5; 
  
    let startAngle = 0;
  
    values.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
  
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = this.colors[index % this.colors.length];
      ctx.fill();
      startAngle += sliceAngle;
    });
  
    const legendX = canvas.width - 120;
    let legendY = 20;
  
    labels.forEach((label, index) => {
      ctx.fillStyle = this.colors[index % this.colors.length];
      ctx.fillRect(legendX, legendY, 15, 15);
      ctx.fillStyle = '#000';
      ctx.fillText(label, legendX + 20, legendY + 12);
      legendY += 20;
    });
  }
  
}
