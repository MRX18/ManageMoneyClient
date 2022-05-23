import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, Renderer2, RendererFactory2, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public renderer!: Renderer2;
  public static container: any;

  constructor(
    public rendererManager: RendererFactory2,
    @Inject(DOCUMENT) private document: any
  ) { 
    this.renderer = rendererManager.createRenderer(null, null);
  }

  private createElement(icon: any, title: string, text?: string) {
    this.deleteElement();

    NotificationService.container = this.renderer.createElement("div");
    this.renderer.addClass(NotificationService.container, "swal2-container");
    this.renderer.addClass(NotificationService.container, "swal2-top-end");
    this.renderer.addClass(NotificationService.container, "swal2-backdrop-show");
    this.renderer.setStyle(NotificationService.container, "overflow-y", "auto");

    let content = this.renderer.createElement("div");
    this.renderer.addClass(content, "swal2-popup");
    this.renderer.addClass(content, "swal2-toast");
    this.renderer.addClass(content, "swal2-icon-info");
    this.renderer.addClass(content, "swal2-show");
    this.renderer.setStyle(content, "width", "100%");
    this.renderer.setStyle(content, "display", "block");

    let header = this.renderer.createElement("div");
    this.renderer.addClass(header, "swal2-header");
    this.renderer.setStyle(header, "display", "flex");
    this.renderer.setStyle(header, "align-items", "center");

    /*--icon--*/
    this.renderer.appendChild(header, icon);
    /*--------*/
    
    let titleElement = this.renderer.createElement("h2");
    this.renderer.addClass(titleElement, "swal2-title");
    this.renderer.setStyle(titleElement, "display", "flex");
    this.renderer.appendChild(titleElement, this.renderer.createText(title));

    /*--body--*/
    this.renderer.addClass(this.document.body, "swal2-toast-shown");
    this.renderer.addClass(this.document.body, "swal2-shown");
    /*--------*/
  
    this.renderer.appendChild(header, titleElement);
    this.renderer.appendChild(content, header);
    this.renderer.appendChild(NotificationService.container, content);
    this.renderer.appendChild(this.document.body, NotificationService.container);

    setTimeout(() => {
      this.deleteElement();
    }, 4000);
  }

  private deleteElement() {
    if(NotificationService.container) {
      this.renderer.removeClass(NotificationService.container, "swal2-backdrop-show");
      this.renderer.addClass(NotificationService.container, "swal2-backdrop-hide");

      this.renderer.removeClass(this.document.body, "swal2-toast-shown");
      this.renderer.removeClass(this.document.body, "swal2-shown");

      this.renderer.removeChild(this.document.body, NotificationService.container);
      NotificationService.container = null;
    }
  }

  success(title: string, text?: string) {
    /*--icon--*/
    let iconContainer = this.renderer.createElement("div");
    this.renderer.addClass(iconContainer, "swal2-icon");
    this.renderer.addClass(iconContainer, "swal2-success");
    this.renderer.addClass(iconContainer, "swal2-icon-show");
    this.renderer.setStyle(iconContainer, "display", "flex");

    let lineLeft = this.renderer.createElement("div");
    this.renderer.addClass(lineLeft, "swal2-success-circular-line-left");
    this.renderer.setStyle(lineLeft, "background-color", "rgb(255, 255, 255)");

    let lineTip = this.renderer.createElement("span");
    this.renderer.addClass(lineTip, "swal2-success-line-tip");

    let lineLong = this.renderer.createElement("span");
    this.renderer.addClass(lineLong, "swal2-success-line-long");

    let ring = this.renderer.createElement("div");
    this.renderer.addClass(ring, "swal2-success-ring");

    let fix = this.renderer.createElement("div");
    this.renderer.addClass(fix, "swal2-success-fix");
    this.renderer.setStyle(fix, "background-color", "rgb(255, 255, 255)");

    let lineRigth = this.renderer.createElement("div");
    this.renderer.addClass(lineRigth, "swal2-success-circular-line-right");
    this.renderer.setStyle(lineRigth, "background-color", "rgb(255, 255, 255)");

    this.renderer.appendChild(iconContainer, lineLeft);
    this.renderer.appendChild(iconContainer, lineTip);
    this.renderer.appendChild(iconContainer, lineLong);
    this.renderer.appendChild(iconContainer, ring);
    this.renderer.appendChild(iconContainer, fix);
    this.renderer.appendChild(iconContainer, lineRigth);
    /*--------*/
    
    this.createElement(iconContainer, title, text);
  }

  information(title: string, text?: string) {
    /*--icon--*/
    let iconContainer = this.renderer.createElement("div");
    this.renderer.addClass(iconContainer, "swal2-icon");
    this.renderer.addClass(iconContainer, "swal2-info");
    this.renderer.addClass(iconContainer, "swal2-icon-show");
    this.renderer.setStyle(iconContainer, "display", "flex");

    let icon = this.renderer.createElement("div");
    this.renderer.addClass(icon, "swal2-icon-content");

    this.renderer.appendChild(icon, this.renderer.createText("i"));
    this.renderer.appendChild(iconContainer, icon);
    /*--------*/

    this.createElement(iconContainer, title, text);
  }

  warning(title: string, text?: string) {
    /*--icon--*/
    let iconContainer = this.renderer.createElement("div");
    this.renderer.addClass(iconContainer, "swal2-icon");
    this.renderer.addClass(iconContainer, "swal2-warning");
    this.renderer.addClass(iconContainer, "swal2-icon-show");
    this.renderer.setStyle(iconContainer, "display", "flex");

    let icon = this.renderer.createElement("div");
    this.renderer.addClass(icon, "swal2-icon-content");

    this.renderer.appendChild(icon, this.renderer.createText("!"));
    this.renderer.appendChild(iconContainer, icon);
    /*--------*/

    this.createElement(iconContainer, title, text);
  }

  error(title: string, text?: string) {
    /*--icon--*/
    let iconContainer = this.renderer.createElement("div");
    this.renderer.addClass(iconContainer, "swal2-icon");
    this.renderer.addClass(iconContainer, "swal2-error");
    this.renderer.addClass(iconContainer, "swal2-icon-show");
    this.renderer.setStyle(iconContainer, "display", "flex");

    let mark = this.renderer.createElement("span");
    this.renderer.addClass(mark, "swal2-x-mark");

    let lineLeft = this.renderer.createElement("span");
    this.renderer.addClass(lineLeft, "swal2-x-mark-line-left");

    let lineRight = this.renderer.createElement("span");
    this.renderer.addClass(lineRight, "swal2-x-mark-line-right");

    this.renderer.appendChild(mark, lineLeft);
    this.renderer.appendChild(mark, lineRight);
    this.renderer.appendChild(iconContainer, mark);
    /*--------*/

    this.createElement(iconContainer, title, text);
  }

  question(title: string, text?: string) {
    /*--icon--*/
    let iconContainer = this.renderer.createElement("div");
    this.renderer.addClass(iconContainer, "swal2-icon");
    this.renderer.addClass(iconContainer, "swal2-question");
    this.renderer.addClass(iconContainer, "swal2-icon-show");
    this.renderer.setStyle(iconContainer, "display", "flex");

    let icon = this.renderer.createElement("div");
    this.renderer.addClass(icon, "swal2-icon-content");

    this.renderer.appendChild(icon, this.renderer.createText("?"));
    this.renderer.appendChild(iconContainer, icon);
    /*--------*/

    this.createElement(iconContainer, title, text);
  }
}
