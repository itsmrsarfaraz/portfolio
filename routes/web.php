<?php

use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/contact', function (Request $request) {
    $key = 'contact-form-' . $request->ip();

    if (RateLimiter::tooManyAttempts($key, 3)) {
        return back()->withErrors(['Too many attempts. Try again later.']);
    }

    RateLimiter::hit($key, 60); // 3 attempts per minute

    // Honeypot check
    if ($request->filled('company')) {
        return back(); // silently drop bot
    }

    // time stamp check - bots submit instantly human don't
    if (time() - $request->input('form_time') < 3) {
        return back(); // too fast = bot
    }

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'message' => 'required|string',
    ]);

    Mail::to('itsmrsarfaraz@gmail.com')
        ->send(new ContactMessage($validated));

    return back()->with('success', 'Message sent successfully!');
});
