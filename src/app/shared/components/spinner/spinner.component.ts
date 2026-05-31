import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SpinnerService } from '@shared/services/spinner.service'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-spinner',
  host: {class: ''},
  imports: [
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './spinner.component.html',
  styles: `
    .loader {
      transform: rotateZ(45deg);
      perspective: 1000px;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      color: var(--color-surface-500);
    }
    .loader:before,
    .loader:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      border-radius: 50%;
      transform: rotateX(70deg);
      animation: 1s spin linear infinite;
    }
    .loader:after {
      color: var(--color-primary-500);
      transform: rotateY(70deg);
      animation-delay: .4s;
    }

    @keyframes rotate {
      0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
      }
    }

    @keyframes rotateccw {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(-360deg);
      }
    }

    @keyframes spin {
      0%,
      100% {
        box-shadow: .2em 0px 0 0px currentcolor;
      }
      12% {
        box-shadow: .2em .2em 0 0 currentcolor;
      }
      25% {
        box-shadow: 0 .2em 0 0px currentcolor;
      }
      37% {
        box-shadow: -.2em .2em 0 0 currentcolor;
      }
      50% {
        box-shadow: -.2em 0 0 0 currentcolor;
      }
      62% {
        box-shadow: -.2em -.2em 0 0 currentcolor;
      }
      75% {
        box-shadow: 0px -.2em 0 0 currentcolor;
      }
      87% {
        box-shadow: .2em -.2em 0 0 currentcolor;
      }
    }
  `
})
export class SpinnerComponent implements OnInit {
  spinner$: Observable<boolean>;
  constructor(private _spinnerService: SpinnerService) {}
  ngOnInit(): void {
    this.spinner$ = this._spinnerService.loading$;
  }
}
