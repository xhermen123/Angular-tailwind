import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { DropdownMenuComponent } from 'src/app/shared-components/dropdown-menu/dropdown-menu.component';

interface Client {
  id: number;
  name: string;
}

@Component({
  selector: 'main-client-picker',
  templateUrl: './client-picker.component.html',
  styleUrls: ['./client-picker.component.less'],
})
export class ClientPickerComponent {
  @Input()
  set selectedClient(clientId: number) {
    this._selectedClient = this.clients.find(
      (client) => client.id === clientId
    );
  }
  @Output() clientChanged = new EventEmitter<number>();

  get selectedClientId() {
    return this._selectedClient?.id;
  }

  get selectedClientName() {
    return this._selectedClient?.name;
  }

  private _selectedClient: Client = {
    id: 60,
    name: 'Twitter',
  };

  @ViewChild(DropdownMenuComponent)
  private dropdownMenuComponent: DropdownMenuComponent;

  // TODO: This needs to be externally sourced
  clients: Client[] = [
    { id: 0, name: 'Community Sift' },
    { id: 132, name: 'Habbo' },
    { id: 60, name: 'Twitter' },
  ];

  onClientChanged(clientId: number) {
    this.dropdownMenuComponent.active = false;
    this.clientChanged.emit(clientId);
  }
}
