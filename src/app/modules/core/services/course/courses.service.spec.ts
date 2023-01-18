import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course } from 'src/app/modules/shared/models/course/course.interface';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });
  
  /// Tests a realizar ///
  
  it('Prueba de HttpClient.get', () => {
    
    const testData: Course = {id: 1, name: 'Test Data', description: 'Test Description'};
    const testData2: Course = {id: 2, name: 'Test Data', description: 'Test Description'};
    
    // Realizando la solicitud Get
    httpClient.get<Course>('/data')
      .subscribe(data =>
        // Cuando se resuelve el observable
        // El resultado debe coincidir con los datos de prueba
        expect(data).toEqual(testData)
      );
  
    // El siguiente `expectOne()` coincidirá con la URL de la solicitud.
    const req = httpTestingController.expectOne('/data');
  
    // Comprueba que la solicitud es un GET
    expect(req.request.method).toEqual('GET');
  
    // Responde con datos simulados, lo que hace que el Observable se resuelva.
    // La devolución de llamada de Subscribe afirma que se devolvieron los datos correctos.
    req.flush(testData);
  
    // Finalmente, aseverar que no hay solicitudes pendientes.
    httpTestingController.verify();
  });
});