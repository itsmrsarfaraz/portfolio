<?php

use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\ProfileController;
use App\Mail\ContactMessage;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Contact Form (Public CRM Lead Capture)
|--------------------------------------------------------------------------
*/

Route::post('/contact', function (Request $request) {

    $key = 'contact-form-' . $request->ip();

    // Rate limit protection (3 requests per minute)
    if (RateLimiter::tooManyAttempts($key, 3)) {
        return back()->withErrors(['Too many attempts. Try again later.']);
    }

    RateLimiter::hit($key, 60);

    // Honeypot anti-bot field
    if ($request->filled('company')) {
        return back();
    }

    // Simple timing protection (bot detection)
    if ($request->has('form_time') && time() - $request->input('form_time') < 3) {
        return back();
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

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Panel (Role Protected CRM Layer)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/', function () {
        abort_unless(auth()->user()->is_admin, 403);
        return view('admin.dashboard');
    })->name('admin.dashboard');

    Route::get('/leads', [LeadController::class, 'index'])
        ->middleware('can:admin')
        ->name('admin.leads');

    Route::post('/leads/{lead}/status', [LeadController::class, 'updateStatus'])
        ->middleware('can:admin')
        ->name('admin.leads.status');
});

require __DIR__ . '/auth.php';
