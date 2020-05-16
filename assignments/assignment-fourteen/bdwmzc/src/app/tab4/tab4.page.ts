import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  data: any = [];
  data2: any = [];
  users: any[] = [];
  dobs: any[] = [];
  orgs: any[] = [];
  ready = false;
  view: any[] = [1500, 600];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Age Range';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Users';

  colorScheme = {
    domain: ['#9cdcec', '#9cb4ec', '#ac9cec', '#d49cec', '#ec9cdc',
      '#b6d6df', '#d2edee', '#fdf4f4', '#e0cfee', '#b5abce']
  };

  constructor(private firebase: FirebaseService) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.firebase.getAllUsers().subscribe(res => {
      res.docs.forEach(e => {
        this.users.push(e.data());
        this.dobs.push(new Date(e.data().dob));
        this.orgs.push(e.data().org.toLowerCase());
      });

      this.orgs.forEach(org => {
        if (this.data.filter((dataValue) => dataValue.name === org).length < 1) {
          const counter = this.orgs.filter((foundOrg) => foundOrg === org).length;
          this.data.push({name: org, value: counter});
        }
      });

      const currentDate = new Date();
      let zeroToNine = 0;
      let tenToNineteen = 0;
      let twentyToTwentynine = 0;
      let thirtyToThirtynine = 0;
      let fortyToFortynine = 0;
      let fiftyAndAbove = 0;
      this.dobs.forEach(dob => {
        const age = Math.floor(currentDate.getFullYear() - dob.getFullYear());
        if (0 <= age && age < 10) {
          zeroToNine += 1;
        }
        if (10 <= age && age < 20) {
          tenToNineteen += 1;
        }
        if (20 <= age && age < 30) {
          twentyToTwentynine += 1;
        }
        if (30 <= age && age < 40) {
          thirtyToThirtynine += 1;
        }
        if (40 <= age && age < 50) {
          fortyToFortynine += 1;
        }
        if (50 <= age) {
          fiftyAndAbove += 1;
        }
      });
      this.data2 = [
        {name: 'Younger than ten', value: zeroToNine},
        {name: 'Adolescents', value: tenToNineteen},
        {name: 'Twenties', value: twentyToTwentynine},
        {name: 'Thirties', value: thirtyToThirtynine},
        {name: 'Forties', value: fortyToFortynine},
        {name: 'Fifty and above', value: fiftyAndAbove}
      ];
      const data = this.data;
      Object.assign(this, { data });
      const data2 = this.data2;
      Object.assign(this, { data2 });
      this.ready = true;
    });
  }

  ionViewWillLeave() {
    this.ready = false;
    this.data = [];
    this.data2 = [];
    this.users = [];
    this.orgs = [];
    this.dobs = [];
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
