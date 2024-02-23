// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

 

  
  referralList: any[] = [];
  servicesList: any[] = [];
  filteredReferralList: any[] = [];
  filteredServicesList: any[] = [];

  searchTerm: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
    
  }

  loadData() {
    this.http.get<any[]>('https://mocki.io/v1/2f02dddb-1f15-4e1c-8a20-fb176031e7f0').subscribe(
      (data) => {
        if (data && data.length > 0) {
          // Remove [0] index to get all entries
          this.referralList = data.map((item) => item.referralList).flat();
          this.servicesList = data.map((item) => item.servicesList).flat();
          this.filteredReferralList = [...this.referralList];
          this.filteredServicesList = [...this.servicesList];
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  filterData() {
    if (this.searchTerm.trim() === '') {
      this.filteredReferralList = [...this.referralList];
      this.filteredServicesList = [...this.servicesList];
    } else {
      this.filteredReferralList = this.referralList.filter(
        (item) =>
          item.referralName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.company.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

      this.filteredServicesList = this.servicesList.filter((item) =>
        item.serviceName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  search() {
    this.filterData();
    console.log(`Searching for ${this.searchTerm}`);
    
  }
}
