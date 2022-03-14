import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

interface Category {
  Name: string;
  Slug: string;
  Icon: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  categories: Array<Category> = [];
  currentCategory: string = "";

  constructor(
    private route: ActivatedRoute, 
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.currentCategory = param["category"];
    });

    this.categories = [
      {
        Name: "Name 1",
        Slug: "Name_1",
        Icon: "fa-briefcase"
      },
      {
        Name: "Name 2",
        Slug: "Name_2",
        Icon: "fa-briefcase"
      },
      {
        Name: "Name 3",
        Slug: "Name_3",
        Icon: "fa-briefcase"
      },
      {
        Name: "Name 4",
        Slug: "Name_4",
        Icon: "fa-briefcase"
      }
    ];
  }

  activeClick(event: any) {
    document.querySelectorAll(".main-sidebar .nav-item").forEach(el => {
      this.renderer.removeClass(el.firstChild, "active");
    });

    this.renderer.addClass(event.currentTarget.firstChild, "active");
  }

}
