import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { IGameTown, BuildingData, Building } from '../../../interfaces';
import { GameService } from '../../../game.service';

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingInfoComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() buildingId: Building;

  public get buildingName(): string {
    return BuildingData[this.buildingId].name;
  }

  public get buildingDescription(): string {
    return BuildingData[this.buildingId].description;
  }

  constructor(public game: GameService) { }

  ngOnInit() {}

  public isBuildingAvailable() {
    const building = this.buildingId;

    if (this.town.buildings[building]) { return true; }
    if (!BuildingData[building].requires) { return true; }

    return Object.keys(BuildingData[building].requires)
      .every(x => this.town.buildings[x]
               && this.town.buildings[x].level >= BuildingData[building].requires[x]);
  }

  public goToBuilding() {
    const building = this.buildingId;

    if (!this.town.buildings[building]) { return; }
    this.game.changeInfo(building);
  }

  public build() {
    const building = this.buildingId;

    this.game.upgradeBuilding(this.town, building);
  }

}