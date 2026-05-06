<!DOCTYPE html>
<html lang="en" 
        x-data="{ darkMode: localStorage.getItem('darkMode') === 'true' }"
        x-init="$watch('darkMode', value => localStorage.setItem('darkMode', value))"
        :class="{ 'dark': darkMode }"
        x-cloak>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Mr. Sarfaraz Portfolio' }}</title>
    <!-- Inter Font for that minimalist look -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-white text-slate-900 transition-colors duration-500">
    <!-- Theme Toggle Button -->
    <div class="fixed bottom-10 right-10 z-50">
        <button @click="darkMode = !darkMode" 
                type="button"
                class="p-4 rounded-2xl bg-slate-100 border border-slate-200 backdrop-blur-xl shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer">
            
            <!-- Sun icon (Visible in Dark Mode) -->
            <div x-show="darkMode" x-cloak>
                <x-lucide-sun class="w-6 h-6 text-yellow-400" />
            </div>

            <!-- Moon icon (Visible in Light Mode) -->
            <div x-show="!darkMode" x-cloak>
                <x-lucide-moon class="w-6 h-6 text-slate-700" />
            </div>
        </button>
    </div>

    <!-- Navigation -->
    <x-navbar />
    
    <!-- Animated Background Gradients -->
    <div class="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
    </div>

    <main class="min-h-screen">
        {{ $slot }}
    </main>
</body>
</html>