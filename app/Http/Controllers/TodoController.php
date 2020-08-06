<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::sorted()->get();
        return $todos;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|regex:/^[\w\d\s]+$/u|max:80',
            'completed' => 'required|boolean',
        ]);

        if (Todo::count() >= 10) {
            return abort(507, null);
        }

        $todo = Todo::create($data);

        return response($todo, 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'title' => 'string|regex:/^[\w\d\s]+$/u|max:80',
            'completed' => 'boolean',
            'moveTo' => 'integer',
        ]);

        if (!$request->input('moveTo')) {
            $todo->update($data);
            return response($todo, 200);
        }

        if (Todo::count() >= 10) {
            return abort(507, null);
        }

        $previousTodoId = $request->input('moveTo');
        $previousTodo = Todo::find($previousTodoId);

        $oldOrder = $todo->order;
        $newOrder = $previousTodo->order;

        if ($oldOrder > $newOrder) {
            $todo->moveBefore($previousTodo);
        } else {
            $todo->moveAfter($previousTodo);
        }

        return response($todo, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response('Todo item has been deleted', 200);
    }
}
