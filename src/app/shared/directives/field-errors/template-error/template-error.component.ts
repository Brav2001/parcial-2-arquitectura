import {ChangeDetectorRef, Component, Input} from '@angular/core';

@Component({
  selector: 'app-template-error',
  standalone: true,
  imports: [],
  templateUrl: './template-error.component.html',
  styleUrl: './template-error.component.scss'
})
export class TemplateErrorComponent {

  errorMessage?: string;
  hidden: boolean = true;

  @Input()
  set text(value: any) {
    if (value !== this.errorMessage) {
      this.errorMessage = value;
      this.hidden = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.errorMessage = '';
  }
}
