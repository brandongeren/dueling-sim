import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DuelService } from './duel.service';
import { IDuelRoom } from '../../../ygo/game';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.scss']
})
export class DuelComponent implements OnInit {

  id: String;
  duelRoom: IDuelRoom;

  constructor(private duelService: DuelService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.duelService.getDuelRoomById(this.id).subscribe((res: IDuelRoom) => {
        this.duelRoom = res;
      });
    });
  }

}
