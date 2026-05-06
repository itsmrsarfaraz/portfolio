<x-layout>
    <div class="max-w-6xl mx-auto px-6 py-20">
        <h1 class="text-3xl font-bold mb-10">Leads</h1>

        <div class="flex flex-col-3 gap-4">
            @foreach($leads as $lead)
                <div class="w-full">
                    <x-glass-card>
                        <div class="flex justify-between">
                            <div>
                                <h2 class="font-bold">{{ $lead->name }}</h2>
                                <p class="text-sm text-gray-400">{{ $lead->email }}</p>
                            </div>
                            <form method="POST" action="/admin/leads/{{ $lead->id }}/status">
                                @csrf
                                <select name="status" onchange="this.form.submit()" class="bg-gray-800 text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="new" {{ $lead->status == 'new' ? 'selected' : '' }}>New</option>
                                    <option value="contacted" {{ $lead->status == 'contacted' ? 'selected' : '' }}>Contacted</option>
                                    <option value="closed" {{ $lead->status == 'closed' ? 'selected' : '' }}>Closed</option>
                                </select>
                            </form>
                        </div>

                        <p class="mt-4 text-gray-300">{{ $lead->message }}</p>
                    </x-glass-card>
                </div>
            @endforeach
        </div>
    </div>
</x-layout>