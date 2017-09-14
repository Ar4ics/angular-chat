import { FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  @Output() createMessage = new EventEmitter(false);
  content = new FormControl('', [Validators.required]);

  submit() {
    if (this.content.valid) {
      this.createMessage.emit(this.content.value);
      this.content.reset();
    }
  }
}
