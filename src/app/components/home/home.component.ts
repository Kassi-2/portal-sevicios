import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { System } from '../../models/system.interface';
import { SystemCardComponent } from '../system-card/system-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SystemCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isNavbarHidden = false;

  @ViewChild('carousel') carousel!: ElementRef;

  canScrollLeft = false;
  canScrollRight = true;
  isMenuOpen = false;
  private lastScrollTop = 0;

  backgroundImages: string[] = [
    'assets/fouch2.jpg',
    'assets/fouch1.jpg',
    'assets/fouch3.jpg'   
  ];
  
  currentBgIndex = 0;
  private bgInterval: any;

  //Lista de sistemas con detalles de cada uno (id, título, descripción, link(url), manual e imagen).
  systems: System[] = [
      {
        id: 'control-pagos',
        title: 'Sistema de Control de Pagos', 
        description: 'Plataforma diseñada para centralizar la gestión de recursos económicos en la Facultad de Odontología. Permite el registro y control digital de pagos, cobros y gastos, agilizando los flujos administrativos y reduciendo errores manuales para garantizar la transparencia y exactitud de la información contable institucional.', 
        url: 'https://escuela.deaodontouchile.cl/',
        img: 'assets/pagos.jpg',
      },
      {
        id: 'pdi',
        title: 'Sistema de Plan de Desarrollo Institucional',
        description: 'Plataforma diseñada para la gestión y seguimiento automatizado del Plan de Desarrollo Institucional de la Facultad. Permite visualizar el cumplimiento de metas a través de un cuadro de mando integral interactivo, facilitando a las áreas administrativas la definición de objetivos estratégicos, la asignación de planes de acción y el reporte de indicadores en tiempo real para garantizar una ejecución transparente y eficiente de los proyectos institucionales.',
        url: 'https://pdi.deaodontouchile.cl/',
        manualUrl: 'assets/manuales/manual-pdi.pdf',
        img: 'assets/pdi.JPG',
      },
      {
        id: 'ppto',
        title: 'Sistema de Control de Presupuesto',
        description: 'Herramienta desarrollada para la administración y control del presupuesto de la Facultad de Odontología. Permite gestionar partidas presupuestarias, registrar movimientos financieros y monitorear la ejecución de gastos en tiempo real. Su implementación moderniza los procesos contables, asegurando mayor transparencia, orden y agilidad en la toma de decisiones económicas de la institución.',
        url: 'https://ppto.deaodontouchile.cl/home',
        manualUrl: 'assets/manuales/manual-ppto.pdf',
        img: 'assets/ppto.jpg',
      },
      {
        id: 'sac',
        title: 'Sistema de Seguimiento de compras',
        description: 'Plataforma creada para digitalizar y centralizar la gestión de solicitudes de bienes y servicios en la Facultad, eliminando la dependencia de planillas Excel y correos dispersos. El sistema permite a los funcionarios ingresar requerimientos y realizar un seguimiento en tiempo real de su estado a través de un flujo de aprobación definido por etapas, asegurando la transparencia, el orden administrativo y la trazabilidad de cada compra desde su solicitud hasta la recepción del producto.',
        url: 'https://sac.deaodontouchile.cl/login',
        img: 'assets/sac.jpg',
      },
      {
        id: 'sgi',
        title: 'Sistema de Gestión e Investigación Escuela Pregrado',
        description: 'Plataforma dedicada a la administración y seguimiento de los proyectos y trabajos de investigación de la Escuela de Pregrado. Centraliza el flujo de trabajo entre estudiantes y docentes, permitiendo el registro de propuestas, la entrega de avances y la gestión de revisiones en un solo entorno digital. Su implementación facilita el monitoreo del progreso académico, asegurando el cumplimiento ordenado del proceso que conllevan las investigaciones realizadas.',
        url: 'http://sgipregrado.odontouchileacademico.cl/',
        manualUrl: 'assets/manuales/manual-sgi.pdf',
        img: 'assets/sgi.JPG',
      },
      {
        id: 'revalidaciones',
        title: 'Sistema de Revalidación de Títulos',
        description: 'Plataforma diseñada para centralizar y optimizar el proceso de revalidación de títulos profesionales extranjeros en la Facultad de Odontología. Permite la digitalización de expedientes, gestión de pagos y asignación de docentes evaluadores, facilitando la trazabilidad completa del postulante desde la recepción de antecedentes hasta la resolución final mediante alertas de plazos y reportes estadísticos.',
        url: 'http://revalidaciones.odontouchileacademico.cl/',
        manualUrl: 'assets/manuales/manual-revalidaciones.pdf',
        img: 'assets/revalidaciones.JPG',
      },

      {
        id: 'comunicaciones',
        title: 'Sistema de Gestión de Solicitudes DIRCOM',
        description: 'Plataforma desarrollada para centralizar y gestionar las solicitudes de servicios de comunicación de la Dirección de Comunicaciones (DIRCOM) de la Facultad, reemplazando el correo electrónico tradicional por un canal eficiente. El sistema centraliza la recepción de requerimientos, gestiona el inventario de recursos y coordina el calendario de eventos, ofreciendo un dashboard de control que permite visualizar la carga de trabajo y asegurar el cumplimiento de los protocolos institucionales.',
        url: 'http://solicitudes.odontouchileacademico.cl/',
        manuales: [
    { nombre: 'Manual Usuario', url: 'assets/manuales/manual-usuario-comunicaciones.pdf' },
    { nombre: 'Manual Administrador', url: 'assets/manuales/manual-admin-comunicaciones.pdf' }
  ],

        img: 'assets/comunicaciones.jpg',
      }
    ];
    
    toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

  scrollCarousel(direction: 'left' | 'right') {
    if (!this.carousel) return;
    const container = this.carousel.nativeElement;
    const scrollAmount = container.clientWidth; 

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    
    setTimeout(() => this.checkScroll(), 500);
  }

  checkScroll() {
    if (!this.carousel) return;
    const el = this.carousel.nativeElement;
    this.canScrollLeft = el.scrollLeft > 0;
    const maxScroll = el.scrollWidth - el.clientWidth;
    this.canScrollRight = el.scrollLeft < maxScroll - 5;
  }

  scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isMenuOpen = false;
  }
}

@HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > this.lastScrollTop && currentScroll > 80) {
      this.isNavbarHidden = true;
      this.isMenuOpen = false
    } else {
      this.isNavbarHidden = false;
    }
    
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  ngOnInit() {
    this.startBackgroundSlider();
  }

  ngOnDestroy() {
    if (this.bgInterval) {
      clearInterval(this.bgInterval);
    }
  }

  startBackgroundSlider() {
    this.bgInterval = setInterval(() => {
      this.nextBackground();
    }, 5000);
  }

  nextBackground() {
    this.currentBgIndex = (this.currentBgIndex + 1) % this.backgroundImages.length;
  }

  selectBackground(index: number) {
    this.currentBgIndex = index;
    clearInterval(this.bgInterval);
    this.startBackgroundSlider();
  }
}