import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DuelService } from './duel.service';
import { IGameState } from '../../../ygo/game';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.scss']
})
export class DuelComponent implements OnInit {

  id: String;
  gameState: IGameState;

  constructor(private duelService: DuelService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.duelService.getDuelById(this.id).subscribe((res: IGameState) => {
        this.gameState = res;
      });
    });
  }

}
