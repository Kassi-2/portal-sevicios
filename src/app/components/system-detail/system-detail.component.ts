import { Component, OnInit } from '@angular/core';
import { System } from '../../models/system.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './system-detail.component.html',
  styleUrl: './system-detail.component.css'
})
export class SystemDetailComponent implements OnInit {

  system: System | undefined;

  private allSystems: System[] = [
    { id: 'pagos', title: 'Sistema de Control de Pagos', description: 'Sistema de Control de Pagos y Cobros.', url: 'https://escuela.deaodontouchile.cl/', manualUrl: '...' },
    { id: 'pdi', title: 'Sistema de Plan de Desarrollo Institucional', description: 'Sistema de Gestión y Control de Metas del Plan de Desarrollo Institucional.', url: 'https://pdi.deaodontouchile.cl/', manualUrl: '...' },
    { id: 'ppto', title: 'Sistema de Control de Presupuesto', description: 'Sistema de Gestión y Control de Presupuesto.', url: 'https://ppto.deaodontouchile.cl/home', manualUrl: '...' },
    { id: 'sac', title: 'Sistema de Seguimiento de compras', description: 'Sistema de Seguimiento de compras y abastecimiento.', url: 'https://sac.deaodontouchile.cl/login/', manualUrl: '...' },
    { id: 'sgi', title: 'Sistema de Gestión e Investigación para la Escuela de Pregrado', description: 'Sistema de Gestión y Seguimiento de Proyectos y Trabajos de Investigación para la Escuela de Pregrado.', url: 'http://sgipregrado.odontouchileacademico.cl/', manualUrl: '...' },
    { id: 'revalidaciones', title: 'Sistema de Revalidación de Títulos', description: 'Sistema de Revalidación de Títulos emitidos en el extranjero.', url: 'http://revalidaciones.odontouchileacademico.cl/', manualUrl: '...' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idUrl = params.get('id');
      this.system = this.allSystems.find(s => s.id === idUrl);
    });
  }
}
