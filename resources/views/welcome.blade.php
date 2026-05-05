@php $title = "Mr. Sarfaraz"; @endphp

<x-layout>
    <div class="flex items-center justify-center min-h-screen">
        <!-- The Glass Card -->
        <div class="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h1 class="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {{ $title }}
            </h1>
            <p class="mt-4 text-gray-400">Laravel v13 + Glassmorphism</p>
        </div>
    </div>
</x-layout>