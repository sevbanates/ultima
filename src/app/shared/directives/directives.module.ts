import { NgModule } from '@angular/core';
import { NumbersDirective } from './numbers-only/numbers-only.directive';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { RemoveWhiteSpaceDirective } from './remove-white-space.directive';

@NgModule({
    declarations: [
        NumbersDirective,
        DragAndDropDirective,
        RemoveWhiteSpaceDirective
    ],
    exports: [
        NumbersDirective,
        DragAndDropDirective,
        RemoveWhiteSpaceDirective
    ],
})
export class DirectivesModule {}