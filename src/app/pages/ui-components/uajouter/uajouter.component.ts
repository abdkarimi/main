import { Component } from '@angular/core';

@Component({
  selector: 'app-uajouter',
  templateUrl: './uajouter.component.html',
  styleUrls: ['./uajouter.component.scss']
})
export class UajouterComponent {
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
}
