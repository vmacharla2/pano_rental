import { NgModule } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import{MatCardModule} from '@angular/material/card';
import{MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import{MatProgressSpinnerModule} from'@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule } from '@angular/material/datepicker';
import{  MatNativeDateModule } from  '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';





const MaterialComponents = [
                            MatButtonModule,
                            MatSidenavModule,
                            MatCheckboxModule,
                            MatDatepickerModule ,
                            MatPaginatorModule,
                            MatListModule,
                            MatStepperModule,
                            MatSliderModule,
                            MatTableModule ,
                            MatSnackBarModule,
                            MatProgressSpinnerModule,
                            MatButtonToggleModule,
                            MatIconModule,
                            MatDialogModule,
                            MatBadgeModule,
                            MatGridListModule,
                            MatCardModule,
                            MatInputModule,
                            MatToolbarModule,
                            MatAutocompleteModule,
                            MatSelectModule,
                            NgMatSearchBarModule,
                            MatSortModule,
                            MatRadioModule,
                            MatNativeDateModule 
                          
                          ]

@NgModule({

  imports: [MaterialComponents],
  exports :[MaterialComponents],
  providers: [  
    MatDatepickerModule,
    MatNativeDateModule  
  ],
})
export class MaterialModule { }
