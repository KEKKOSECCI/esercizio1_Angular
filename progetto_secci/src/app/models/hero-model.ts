export interface Hero {
  _id?: string; // 👈 Usiamo direttamente la chiave del server
  nome: string;
  potere: string;
  completata: boolean;
}
