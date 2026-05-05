<!DOCTYPE html>
<html lang="en">
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
<body class="bg-[#030712] text-white antialiased overflow-x-hidden">

    <!-- Theme Toggle Button -->
    <div class="fixed bottom-6 right-6 z-50">
        <button @click="darkMode = !darkMode" class="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-xl">
            <x-lucide-sun x-show="darkMode" class="w-6 h-6 text-yellow-400" />
            <x-lucide-moon x-show="!darkMode" class="w-6 h-6 text-slate-700" />
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