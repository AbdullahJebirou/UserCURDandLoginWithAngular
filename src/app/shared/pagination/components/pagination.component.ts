import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { paginate } from '../models/paginate';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
 
    @Output() changePage = new EventEmitter<number>();

    @Input() initialPage = 1; //the virtual value
    @Input() totalPages= 10; //the virtual value

    pager:any;


    
    ngOnInit() {  
      /*The constructor will generate the pagination
      (change the value of the pages array) 
      according to the totalPages of pages and 
      will start the pagination as per initialPage*/
      
      this.pager= new paginate(this.totalPages ,this.initialPage);     
    }

    setPage(page: number) {
        this.changePage.emit(page);
        this.pager.currentPage=page;
    }
}


