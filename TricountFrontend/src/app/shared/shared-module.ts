import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiPicker } from './emoji-picker/emoji-picker';
import { CurrencySelector } from './currency-selector/currency-selector';
import { ParticipantSelector } from './participant-selector/participant-selector';

@NgModule({
  declarations: [EmojiPicker, CurrencySelector, ParticipantSelector],
  imports: [CommonModule],
  exports: [EmojiPicker, CurrencySelector, ParticipantSelector]
})
export class SharedModule {}
