import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public opened = false;
  public todoItem: FormGroup;
  public todo: any;
  public showEditWindow = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.todoItem = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isComplited: [false],
      data: [''],
      _id: ['']
    });

    this.todo = this.getTodoList();
  }

  get f() {
    return this.todoItem.controls;
  }

  public complitedTodoItem(id) {
    const todoList = this.getTodoList();
    console.log(id, todoList);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < todoList.length; i++ ) {
        if (todoList[i]._id === id) {
          todoList[i].isComplited = !todoList[i].isComplited;
        }
      }
    console.log(this.todoItem.value, todoList );
    localStorage.setItem('todoList', JSON.stringify(todoList));
    this.todo = this.getTodoList();
  }


  public addTodoItem() {
    // check if  todoItem.value is valid
    if (this.todoItem.valid) {
      const todoList = this.getTodoList();
      this.todoItem.value.data = new Date();
      this.todoItem.value._id = Date.now();

      todoList.push(this.todoItem.value);
      console.log(this.todoItem.value, todoList);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      this.todo = this.getTodoList();
      this.todoItem.value.title = '';
      this.todoItem.value.description = '';
      this.todoItem.value.data = '';
      this.opened = false;
    } else {
      console.log(this.todoItem.valid, this.todoItem.value);
      return;
    }

  }

// get objects array from localstorage or empty array
  public getTodoList() {
    return JSON.parse(localStorage.getItem('todoList')) || [];
  }

  public deleteTodoItem(id) {
    const todoList = this.getTodoList();
    console.log(id, todoList);
    for (let i = 0; i < todoList.length; i++ ) {
        if (todoList[i]._id === id) {
          todoList.splice(i, 1);
        }
      }
    console.log(this.todoItem.value, todoList );
    localStorage.setItem('todoList', JSON.stringify(todoList));
    this.todo = this.getTodoList();
  }

  public setTitleEdit(item) {
    item.canEditCode = true;
  }

  public addTextToTextarea(text) {
    // item.canEditCode = true;
    const f = document.getElementById('editDescription') as HTMLTextAreaElement;
    f.value = text;
    console.log(f.value, text);
  }

  public editTodoItem(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.todo.length; i++ ) {
      if (this.todo[i]._id === id) {
        this.todo[i].data = new Date();
        this.todo[i]._id = id;
        this.todo[i].title = this.todoItem.value.title;
        this.todo[i].description = this.todoItem.value.description;
        console.log(id, this.todoItem.value, this.todo[i]);

      }
    }
    localStorage.setItem('todoList', JSON.stringify(this.todo));

    this.todo = this.getTodoList();
  }

}
