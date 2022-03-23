import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

interface Category {
  Name: string;
  Slug: string;
  Icon: string;
  Active: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title: string = "";
  currentCategory: Category | undefined;
  categories: Array<Category> = [{
        Name: "Home",
        Slug: "",
        Icon: "fa-tachometer-alt",
        Active: false
  }];

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    this.categories = this.categories.concat([
      {
        Name: "Name 1",
        Slug: "Name_1",
        Icon: "fa-briefcase",
        Active: false
      },
      {
        Name: "Name 2",
        Slug: "Name_2",
        Icon: "fa-briefcase",
        Active: false
      },
      {
        Name: "Name 3",
        Slug: "Name_3",
        Icon: "fa-briefcase",
        Active: false
      },
      {
        Name: "Name 4",
        Slug: "Name_4",
        Icon: "fa-briefcase",
        Active: false
      }
    ]);
    this.currentCategory = this.getCurrentSlug();
    this.currentCategory.Active = true;
  }

  // set the color for sitebar menu item
  activeClick(event: any) {    
    let activeCategory = this.categories.find(function(el) { return el.Active == true }) as Category;
    activeCategory.Active = false;

    this.currentCategory = this.getCurrentSlug();
    this.currentCategory.Active = true;
  }

  private getCurrentSlug() : Category {
    let slug = this.router.url.substring(1);
    return this.categories.find(function(el) { return el.Slug == slug }) as Category;
  }
}
