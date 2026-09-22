import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'edit-employee/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'employees/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'employees',
    renderMode: RenderMode.Client
  },
  {
    path: 'add-employee',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
