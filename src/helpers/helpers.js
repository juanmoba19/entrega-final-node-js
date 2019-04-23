const hbs = require('hbs');

hbs.registerHelper('verCursoInteresado', (listaCursos) => {
    let texto = '<div class="accordion" id="accordionExample">';
    let index = 0;
    let collapse = true;
    let classShow = '';
    listaCursos = listaCursos.filter(curso => curso.estado != 'Cerrado');
    listaCursos.forEach(curso => {
        collapse = index != 0 ? false : true;
        classShow = index != 0 ? '' : 'show';
        texto = texto +
            '<div class="card"> \
            <div class="card-header" id="heading' + index + '"> \
            <h2 class="mb-0"> \
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + index + '" aria-expanded="' + collapse + '" aria-controls="collapse' + index + '">' +
            'Nombre del curso ' + curso.nombre + '</br>' +
            'Valor ' + curso.valor +
            '</button> \
            </h2> \
            </div> \
            <div id="collapse' + index + '" class="collapse ' + classShow + '" aria-labelledby="heading' + index + '" data-parent="#accordionExample"> \
            <div class="card-body"> \
                <ul class="list-group"> \
                    <li class="list-group-item"> Nombre: ' + curso.nombre + '</li>' +
            '<li class="list-group-item"> Descripcion: ' + curso.descripcion + '</li>' +
            '<li class="list-group-item"> Modalidad: ' + curso.modalidad + '</li>' +
            '<li class="list-group-item"> Intensidad: ' + curso.intensidad + '</li>' +
            '</ul> \
            </div> \
            </div> \
        </div>';
        index++;
    });
    texto = texto + '</div>'
    return texto;
});

hbs.registerHelper('verInscritosCursos', (listaCursos, listaCursosEstudiante) => {
    let texto = '<div class="accordion" id="accordionExample">';
    let index = 0;
    let collapse = true;
    let classShow = '';
    listaCursos = listaCursos.filter(curso => curso.estado != 'Cerrado');
    listaCursos.forEach(curso => {
        collapse = index != 0 ? false : true;
        classShow = index != 0 ? '' : 'show';
        texto = texto +
            '<div class="card"> \
            <div class="card-header" id="heading' + index + '"> \
            <h2 class="mb-0"> \
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + index + '" aria-expanded="' + collapse + '" aria-controls="collapse' + index + '">' +
            'Nombre del curso: ' + curso.nombre + '</br> \
            </button> \
            <form action="/cambiar-estado" method="POST" style="display: -webkit-inline-box;"> \
                <button  name="idCurso" type="submit" class="btn btn-outline-secondary" value="' + curso.id + '">Cambiar Estado Curso</button> \
            </form> \
            </h2> \
            </div> \
            <div id="collapse' + index + '" class="collapse ' + classShow + '" aria-labelledby="heading' + index + '" data-parent="#accordionExample"> \
            <div class="card-body"> \
            <table class="table table-striped"> \
            <thead> \
            <tr> \
            <th scope="col"> Documento </th> \
            <th scope="col"> Nombre </th> \
            <th scope="col"> Correo </th> \
            <th scope="col"> Telefono </th> \
            <th scope="col"> Eliminar </th> \
            </tr> \
            </thead> \
            <tbody>';
        let estudCurso = listaCursosEstudiante.filter(est => est.curso == curso.id);
        estudCurso.forEach(estCur => {
            texto = texto +
                '<tr>' +
                '<th scope="row">' + estCur.id + '</th>' +
                '<td>' + estCur.nombre + '</td>' +
                '<td>' + estCur.email + '</td>' +
                '<td>' + estCur.telefono + '</td>' +
                '<td><form action="/eliminar-inscritos" method="POST" style="display: -webkit-inline-box;"> \
                        <button  name="idCursoEst" type="submit" class="btn btn-outline-danger" value="' + curso.id + ',' + estCur.id +'">Eliminar</button> \
                    </form> \
                </td></tr>';
        });
        texto = texto + '</tbody></table> \
            </div> \
            </div> \
        </div>';
        index++;
    });
    texto = texto + '</div>'
    return texto;
});

hbs.registerHelper('listarCursos', (listaCursos) => {

    let texto = '<table class="table table-striped"> \
                <thead> \
                <tr> \
                <th scope="col"> Id </th> \
                <th scope="col"> Nombre </th> \
                <th scope="col"> Descripción </th> \
                <th scope="col"> Valor </th> \
                <th scope="col"> Modalidad </th> \
                <th scope="col"> Intensidad </th> \
                <th scope="col"> Estado </th> \
                </tr> \
                </thead> \
                <tbody>';
    listaCursos.forEach(curso => {
        texto = texto +
            '<tr>' +
            '<th scope="row">' + curso.id + '</th>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.descripcion + '</td>' +
            '<td>' + curso.valor + '</td>' +
            '<td>' + curso.modalidad + '</td>' +
            '<td>' + curso.intensidad + '</td>' +
            '<td>' + curso.estado + '</td></tr>';
    });
    texto = texto + '</tbody></table>'
    return texto;
});

hbs.registerHelper('mostrarFormInscribir', (listaCursos) => {
    let texto = '';
    if(Array.isArray(listaCursos)) {
        texto = '<form action="/guardar-inscripcion" method="POST"> \
                        <div class="form-row"> \
                            <div class="form-group col-md-6"> \
                                <label for="inputId">Documento de identidad</label> \
                                <input name="id" type="number" class="form-control" id="inputId" placeholder="Documento de identidad" required> \
                            </div> \
                            <div class="form-group col-md-6"> \
                                <label for="inputEmail">Correo electronico</label> \
                                <input name="email" type="email" class="form-control" id="inputEmail" placeholder="Email" required> \
                            </div> \
                        </div> \
                        <div class="form-row"> \
                            <div class="form-group col-md-6"> \
                                <label for="inputNombre">Nombre</label> \
                                <input name="nombre" type="text" class="form-control" id="inputNombre" placeholder="Nombre" required> \
                            </div> \
                            <div class="form-group col-md-6"> \
                                <label for="inputTel">Telefono</label> \
                                <input name="telefono" type="number" class="form-control" id="inputTel" placeholder="Valor del Curso" required> \
                            </div> \
                        </div> \
                        <div class="form-row"> \
                            <div class="form-group col-md-12"> \
                                <label for="inputCurso">Cursos disponibles</label> \
                                <select name="curso" id="inputCurso" class="form-control"> \
                                    <option selected>- Seleccionar -</option>';
        listaCursos.forEach(curso => {
            texto = texto +
                '<option value="' + curso.id + '">' + curso.nombre + '</option>';
        });
        texto = texto + '</select> \
                                </div> \
                            </div> \
                            <button type="submit" class="btn btn-primary">Guardar</button> \
                        </form>';
    } else {
        texto = '<div class="alert alert-success" role="alert"> \
                    El aspirante ' + listaCursos.nombre + ' se ha inscrito correctamente al curso con id ' + listaCursos.curso + '\
                </div>'; 
    }
    
    return texto;  
});
