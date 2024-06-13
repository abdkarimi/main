import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-detablir',
  templateUrl: './detablir.component.html',
  styleUrls: ['./detablir.component.scss']
})
export class DetablirComponent {
  displayedColumns: string[] = ['article', 'quantite', 'Remarques', 'remove'];
  dataSource = new MatTableDataSource<any>([
    { article: 'Article 1', quantite: 5, startDate: new Date(), remove: '' },
    { article: 'Article 2', quantite: 10, startDate: new Date(), remove: '' },
    // Add more rows as needed
  ]);
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];


selectedStates = this.states;

onKey(value: string) {
this.selectedStates = this.search(value);
}

search(value: string) {
  let filter = value.toLowerCase();
  return this.states.filter(option => option.toLowerCase().startsWith(filter));
}
ajouterLigne() {
  // Push a new row to the data source
  this.dataSource.data.push({ article: '', quantite: null, startDate: null, remove: '' });
  // Refresh the table
  this.dataSource._updateChangeSubscription();
}

supprimerLigne(row: any) {
  // Find the index of the row to be deleted
  const index = this.dataSource.data.indexOf(row);
  // Remove the row from the data source
  if (index >= 0) {
    this.dataSource.data.splice(index, 1);
    // Refresh the table
    this.dataSource._updateChangeSubscription();
  }
}
}
