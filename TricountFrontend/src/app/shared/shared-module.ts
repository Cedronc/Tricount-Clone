import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmojiPicker } from './emoji-picker/emoji-picker';
import { CurrencySelector } from './currency-selector/currency-selector';
import { ParticipantSelector } from './participant-selector/participant-selector';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, EmojiPicker, CurrencySelector, ParticipantSelector],
  exports: [EmojiPicker, CurrencySelector, ParticipantSelector, FormsModule]
})
export class SharedModule {}
