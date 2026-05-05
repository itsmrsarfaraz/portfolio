@props(['name', 'level' => '85%'])

<div class="space-y-2">
    <div class="flex justify-between items-center px-1">
        <span class="text-sm font-medium text-gray-300">{{ $name }}</span>
        <span class="text-xs text-gray-500 uppercase tracking-widest">{{ $level }}</span>
    </div>
    <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style="width: {{ $level }}"></div>
    </div>
</div>