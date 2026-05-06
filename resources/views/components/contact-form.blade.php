<x-glass-card class="max-w-3xl mx-auto">
    @if(session('success'))
        <div class="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm">
            {{ session('success') }}
        </div>
    @endif
    <form action="/contact" method="POST" class="space-y-6">
        @csrf
        <!-- Honeypot -->
        <div class="hidden">
            <input type="text" name="company" tabindex="-1" autocomplete="off">
        </div>
        {{-- time stamps - bots submits instantly --}}
        <input type="hidden" name="form_time" value="{{ time() }}">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input type="text" name="name" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" name="email" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white">
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea name="message" rows="4" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"></textarea>
        </div>
        <button type="submit" class="w-full py-4 bg-white text-black font-extrabold rounded-xl hover:bg-blue-50 transition-all active:scale-[0.98]">
            Send Message
        </button>
    </form>
</x-glass-card>