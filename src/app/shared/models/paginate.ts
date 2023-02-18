export class paginate {
  public pages: number[];
  public currentPage: number;

  constructor(public totalPages: number, public initialPage: number) {
    this.currentPage = initialPage;
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((ele, index) => index + initialPage);
  }
}

/*The constructor will generate the pagination
  (change the value of the pages array) 
  according to the totalPages of pages and 
  will start the pagination as per initialPage*/
