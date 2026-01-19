import { Component, Input } from '@angular/core';
import { System } from '../../models/system.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-card.component.html',
  styleUrl: './system-card.component.css'
})
export class SystemCardComponent {
  
  @Input() system!: System;

}
