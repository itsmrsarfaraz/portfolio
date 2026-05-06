<x-layout>
    {{ title('Leads') }}
    <div class="max-w-6xl mx-auto px-6 py-20">
        <h1 class="text-3xl font-bold mb-10">Leads</h1>

        <div class="space-y-4">
            @foreach($leads as $lead)
                <x-glass-card>
                    <div class="flex justify-between">
                        <div>
                            <h2 class="font-bold">{{ $lead->name }}</h2>
                            <p class="text-sm text-gray-400">{{ $lead->email }}</p>
                        </div>
                        <span class="text-xs uppercase">{{ $lead->status }}</span>
                    </div>

                    <p class="mt-4 text-gray-300">{{ $lead->message }}</p>
                </x-glass-card>
            @endforeach
        </div>
    </div>
</x-layout>