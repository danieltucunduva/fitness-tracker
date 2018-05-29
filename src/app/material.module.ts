import { NgModule } from '@angular/core';

import {
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule,
    MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule,
    MatSortModule, MatPaginatorModule
} from '@angular/material';
// copy paste contents from the import list above
const modules: any[] = [
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule,
    MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule,
    MatSortModule, MatPaginatorModule
];

import { MatMomentDateModule } from '@angular/material-moment-adapter';
modules.push(MatMomentDateModule);


/**
 * Separation of Material module imports
 */
@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {
}
