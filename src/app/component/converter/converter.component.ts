import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { history } from 'src/app/interface/data';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {
  eurUsdRate: number = 1.1;
  usd: number = 1;
  eru: number = 1.1;
  allHistory: history[] = new Array(5);
  curr: string = 'USD';
  show: boolean = false;
  index: number = 0;
  overRide: number = 0;
  fxOverRide: boolean = false;
  diffrence: number = 0.2;
  ngOnInit() {
    setInterval(() => {
      const randomNum = Math.random() * 0.1 - 0.05;
      this.eurUsdRate = 1.1 + randomNum;
    }, 3000);
  }
  Usd_to_eur(data: any) {
    console.log(data);
    this.usd = data.usd;
    this.diffrence=Math.abs(this.eurUsdRate-this.overRide)/this.eurUsdRate;
    if (this.fxOverRide && this.diffrence<=0.02) {
      this.eru = this.usd / this.overRide;
    } else {
      this.eru = this.usd / this.eurUsdRate;
    }
    this.show = true;
    if (this.index > 5) {
      delete this.allHistory[5];
    }
    this.allHistory.unshift({
      USD: this.usd,
      EUR: this.eru,
      eruTOusd: this.eurUsdRate,
      fxRate: this.overRide,
      overRidden:this.fxOverRide
    });
    this.index++;
  }
  Eur_to_usd(data: any) {
    this.eru = data.eru;
    this.diffrence=Math.abs(this.eurUsdRate-this.overRide)/this.eurUsdRate;
    if (this.fxOverRide && this.diffrence<=0.02) {
      this.usd = this.eru * this.overRide;
    } else {
      this.usd = this.eru * this.eurUsdRate;
    }
    this.show = true;
    if (this.index > 5) {
      delete this.allHistory[5];
    }
    this.allHistory.unshift({
      USD: this.usd,
      EUR: this.eru,
      eruTOusd: this.eurUsdRate,
      fxRate: this.overRide,
      overRidden:this.fxOverRide
    });
    this.index++;
    console.log('hellp');
  }
  change() {
    if (this.fxOverRide) {
      this.overRide = 0;
    }
    this.fxOverRide = !this.fxOverRide;
  }
  reset() {
    this.show = false;
  }
}
