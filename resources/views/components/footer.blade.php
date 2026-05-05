<footer id="contact" class="max-w-6xl mx-auto px-6 py-24 text-center">
    <x-glass-card class="py-16">
        <h2 class="text-4xl font-bold mb-4">Let's work together</h2>
        <p class="text-gray-400 mb-8 max-w-md mx-auto">
            Currently accepting new projects and consulting engagements.
        </p>
        <a href="mailto:your-email@example.com" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-extrabold hover:bg-blue-50 transition-colors">
            <x-lucide-mail class="w-5 h-5" />
            Send an Email
        </a>
        
        <div class="flex justify-center gap-6 mt-12 text-gray-500">
            <a href="#" class="hover:text-white transition-colors"><x-lucide-github class="w-6 h-6" /></a>
            <a href="#" class="hover:text-white transition-colors"><x-lucide-twitter class="w-6 h-6" /></a>
            <a href="#" class="hover:text-white transition-colors"><x-lucide-linkedin class="w-6 h-6" /></a>
        </div>
    </x-glass-card>
    
    <p class="mt-12 text-xs text-gray-600 tracking-widest uppercase">
        &copy; {{ date('Y') }} Mr. Sarfaraz. Built with Laravel & Passion.
    </p>
</footer>