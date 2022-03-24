import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';

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

  title: string = "";
  currentCategory: Category | undefined;
  categories: Array<Category> = [{
        Name: "Home",
        Slug: "dashboard",
        Icon: "fa-tachometer-alt"
  }];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event) => {this.currentCategory = this.getCurrentSlug();});

    this.categories = this.categories.concat([
      {
        Name: "Name 1",
        Slug: "name_1",
        Icon: "fa-briefcase"
      },
      {
        Name: "Name 2",
        Slug: "name_2",
        Icon: "fa-briefcase"
      },
      {
        Name: "Name 3",
        Slug: "name_3",
        Icon: "fa-briefcase"
      },
      {
        Name: "Name 4",
        Slug: "name_4",
        Icon: "fa-briefcase"
      }
    ]);
    this.currentCategory = this.getCurrentSlug();
  }

  test(e: any) {
    console.log(e);
  }

  private getCurrentSlug() : Category {
    let slug = this.router.url.replace('/' + this.activeRoute.snapshot.url[0].path + '/', '');
    return this.categories.find(function(el) { return el.Slug == slug }) as Category;
  }
}
