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

  systems: System[] = [
      {
        id: 'control-pagos',
        title: 'Sistema de Control de Pagos', 
        description: 'Sistema de Control de Pagos y Cobros.', 
        url: 'https://escuela.deaodontouchile.cl/',
        img: 'assets/fouch2.jpg',
      },
      {
        id: 'pdi',
        title: 'Sistema de Plan de Desarrollo Institucional',
        description: 'Sistema de Gestión y Control de Metas del Plan de Desarrollo Institucional.',
        url: 'https://pdi.deaodontouchile.cl/',
        manualUrl: 'assets/manuales/manual-pdi.pdf',
        img: 'assets/fouch2.jpg',
      },
      {
        id: 'ppto',
        title: 'Sistema de Control de Presupuesto',
        description: 'Sistema de Gestión y Control de Presupuesto.',
        url: 'https://ppto.deaodontouchile.cl/home',
        manualUrl: 'assets/manuales/manual-ppto.pdf',
        img: 'assets/fouch2.jpg',
      },
      {
        id: 'sac',
        title: 'Sistema de Seguimiento de compras',
        description: 'Sistema de Seguimiento de compras y abastecimiento.',
        url: 'https://sac.deaodontouchile.cl/login',
        img: 'assets/fouch2.jpg',
      },
      {
        id: 'sgi',
        title: 'Sistema de Gestión e Investigación Escuela Pregrado',
        description: 'Sistema de Gestión y Seguimiento de Proyectos y Trabajos de Investigación para la Escuela de Pregrado.',
        url: 'http://sgipregrado.odontouchileacademico.cl/',
        manualUrl: 'assets/manuales/manual-sgi.pdf',
        img: 'assets/fouch2.jpg',
      },
      {
        id: 'revalidaciones',
        title: 'Sistema de Revalidación de Títulos',
        description: 'Sistema de Revalidación de Títulos emitidos en el extranjero.',
        url: 'http://revalidaciones.odontouchileacademico.cl/',
        manualUrl: 'assets/manuales/manual-revalidaciones.pdf',
        img: 'assets/fouch2.jpg',
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