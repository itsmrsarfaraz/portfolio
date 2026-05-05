<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/contact', function (Request $request) {
    $data = $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'message' => 'required',
    ]);

    // This sends the email to your primary address
    Mail::to('itsmrsarfaraz@gmail.com')->send(new ContactMessage($data));

    return back()->with('success', 'Message sent successfully!');
});
