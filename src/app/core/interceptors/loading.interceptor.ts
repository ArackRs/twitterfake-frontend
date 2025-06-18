import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "../services/loading.service";
import {finalize} from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show(); // Muestra el spinner

  return next(req).pipe(
    finalize(() => loadingService.hide()) // Oculta el spinner cuando la petición finaliza (éxito o error)
  );
};
