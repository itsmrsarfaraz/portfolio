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

    <section id="projects" class="max-w-6xl mx-auto px-6 py-24">
        <h2 class="text-3xl font-bold mb-12 text-center md:text-left">Selected Works</h2>
        
        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- Project 1: Large Featured Card -->
            <div class="md:col-span-2">
                <x-glass-card>
                    <div class="flex items-center gap-4 mb-4">
                        <div class="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                            <x-lucide-layers class="w-6 h-6" />
                        </div>
                        <h3 class="text-2xl font-bold">Multi-tenant Hostel System</h3>
                    </div>
                    <div class="h-64 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/5 overflow-hidden">
                        <!-- Replace with your project image later -->
                        <span class="text-white/20 font-bold text-4xl">SaaS Platform</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Multi-tenant Hostel System</h3>
                    <p class="text-gray-400 mb-4">Built with Laravel 13, featuring real-time booking and automated payments.</p>
                    <div class="flex gap-2">
                        <span class="px-3 py-1 rounded-full bg-white/5 text-xs border border-white/10 text-gray-300">Laravel</span>
                        <span class="px-3 py-1 rounded-full bg-white/5 text-xs border border-white/10 text-gray-300">MySQL</span>
                    </div>
                </x-glass-card>
            </div>

            <!-- Project 2: Small Sidebar Card -->
            <div class="md:col-span-1">
                <x-glass-card>
                    <div class="p-3 rounded-xl bg-lime-500/20 text-lime-400 w-fit mb-4">
                        <x-lucide-globe class="w-6 h-6" />
                    </div>
                    <h3 class="text-xl font-bold mb-2">CMS Solutions</h3>
                    <div class="h-40 mb-6 rounded-2xl bg-gradient-to-br from-lime-500/20 to-cyan-500/20 flex items-center justify-center border border-white/5">
                        <span class="text-white/20 font-bold text-2xl">E-commerce</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2">CMS Solutions</h3>
                    <p class="text-gray-400 text-sm">Scalable WordPress & Elementor architectures.</p>
                </x-glass-card>
            </div>

            <!-- Project 3: Small Card -->
            <x-glass-card>
                <div class="p-3 rounded-xl bg-purple-500/20 text-purple-400 w-fit mb-4">
                    <x-lucide-megaphone class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold mb-2">Meta Ads</h3>
                <p class="text-gray-400 text-sm">Managing digital marketing and high-converting ad cycles.</p>
            </x-glass-card>

            <!-- Project 4: Medium Card -->
            <div class="md:col-span-2">
                <x-glass-card>
                    <div class="p-3 rounded-xl bg-red-500/20 text-red-400 w-fit mb-4">
                        <x-lucide-code-xml class="w-6 h-6" />
                    </div>
                    <h3 class="text-xl font-bold mb-2">API Development</h3>
                    <p class="text-gray-400 text-sm">Designing robust RESTful APIs with advanced Laravel security and multi-layered authentication.</p>
                </x-glass-card>
            </div>
            
        </div>
    </section>

    <section id="about" class="max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            <!-- Left: Bio -->
            <div class="space-y-6">
                <h2 class="text-3xl font-bold">About Me</h2>
                <p class="text-gray-400 leading-relaxed">
                    I am a Senior Software Engineer based in Islamabad, focused on building scalable, multi-tenant SaaS platforms. My approach combines technical rigor with a minimalist design philosophy.
                </p>
                <p class="text-gray-400 leading-relaxed">
                    With a deep background in the Laravel ecosystem and modern frontend tools, I bridge the gap between complex backend architecture and intuitive user interfaces.
                </p>
                
                <div class="flex gap-4 pt-4">
                    <x-glass-card class="flex items-center gap-3 py-3 px-5">
                        <x-lucide-award class="w-5 h-5 text-blue-400" />
                        <span class="text-sm font-semibold">5+ Years Exp.</span>
                    </x-glass-card>
                    <x-glass-card class="flex items-center gap-3 py-3 px-5">
                        <x-lucide-check-circle class="w-5 h-5 text-green-400" />
                        <span class="text-sm font-semibold">50+ Projects</span>
                    </x-glass-card>
                </div>
            </div>

            <!-- Right: Skills Grid -->
            <x-glass-card>
                <h3 class="text-xl font-bold mb-8">Technical Stack</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <x-skill-item name="Laravel & PHP" level="95%" />
                    <x-skill-item name="Tailwind CSS" level="90%" />
                    <x-skill-item name="Python (AI/ML)" level="75%" />
                    <x-skill-item name="MySQL / Postgres" level="88%" />
                    <x-skill-item name="WordPress/CMS" level="92%" />
                    <x-skill-item name="REST APIs" level="95%" />
                </div>
            </x-glass-card>

        </div>
    </section>

    <x-footer />
</x-layout>