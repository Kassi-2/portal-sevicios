export interface System {
  id: string;
  title: string;
  description: string;
  url: string;
  manualUrl?: string; 
  manuales?: { 
    nombre: string; 
    url: string; 
  }[];
  img?: string;
}