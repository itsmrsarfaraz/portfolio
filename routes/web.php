<?php

use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'message' => 'required|string',
    ]);

    Mail::to('itsmrsarfaraz@gmail.com')
        ->send(new ContactMessage($validated));

    return back()->with('success', 'Message sent successfully!');
});
