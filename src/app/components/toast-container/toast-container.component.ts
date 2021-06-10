import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'bnl-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastService) {
  }

  ngOnInit(): void {
  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
