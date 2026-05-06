<?php

use App\Mail\ContactMessage;
use App\Models\Lead;
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

    $lead = Lead::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'message' => $validated['message'],
        'ip' => $request->ip(),
    ]);

    Mail::to('itsmrsarfaraz@gmail.com')
        ->send(new ContactMessage($lead));

    return back()->with('success', 'Message sent successfully!');
});

Route::middleware('auth.basic')->group(function () {
    Route::get('/admin/leads', function () {
        $leads = \App\Models\Lead::latest()->get();
        return view('admin.leads', compact('leads'));
    });
    Route::post('/admin/leads/{lead}/status', function (Request $request, \App\Models\Lead $lead) {
        $lead->update([
            'status' => $request->input('status')
        ]);

        return back();
    });
});
