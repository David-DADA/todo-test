import { Todo, TodoList } from "../classes";
import { todoList } from "../index.js";

//Referencias en el HTML
const divTodoList        = document.querySelector('.todo-list');
const txtInput           = document.querySelector('.new-todo');
const btnBorrar          = document.querySelector('.clear-completed');
const ulFiltros          = document.querySelector('.filters');
const anchorFiltros      = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo; 

    divTodoList.prepend( div.firstElementChild );
        
    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if (event.keyCode === 13){

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = "";
    
    }
    
})


divTodoList.addEventListener('click', ( event ) => {
    console.log(event.target.parentElement.parentElement.getAttribute('class'))

    const nombreElemento    = event.target.localName //input, label o button
    const todoElemento      = event.target.parentElement.parentElement;
    const todoId            = todoElemento.getAttribute('data-id');
    

    if( nombreElemento.includes( 'input' ) ){ //Click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
       
    }else if( nombreElemento.includes( 'button' ) ){ //Click en la X
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
})

btnBorrar.addEventListener('click', ( event ) => {

    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length-1; i >= 0; i-- ){

        const elemento = divTodoList.children[i];

        (elemento.classList.contains('completed') ? elemento.remove() : '' )

    }

})


ulFiltros.addEventListener('click', ( event) => {

    const filtro = event.target.text;
    //( !filtro ? return : '');

    if( !filtro ){ return; }
    anchorFiltros.forEach(element => { element.classList.remove( 'selected' ) });
    event.target.classList.add( 'selected' );

    for( const elemento of divTodoList.children ){

        elemento.classList.remove( 'hidden' );
        const completado = elemento.classList.contains( 'completed' );

        switch( filtro ){

            case 'Pendientes':

                if( completado ){ elemento.classList.add( 'hidden' )};

            break;


            case 'Completados':

                if( !completado ){ elemento.classList.add( 'hidden') };

            break;
        }
    }
    
    
})