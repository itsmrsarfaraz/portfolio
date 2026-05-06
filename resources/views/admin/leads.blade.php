<x-layout>
    <div class="max-w-6xl mx-auto px-6 py-20">
        <h1 class="text-3xl font-bold mb-10">Leads</h1>

        <div class="flex flex-col-3 gap-4">
            @foreach($leads as $lead)
            <div class="glass-card p-4 mb-4">
                <div class="flex justify-between">
                    <div>
                        <h3 class="font-bold">{{ $lead->name }}</h3>
                        <p class="text-sm text-gray-400">{{ $lead->email }}</p>
                    </div>

                    <form method="POST" action="/admin/leads/{{ $lead->id }}/status">
                        @csrf
                        <select name="status" onchange="this.form.submit()"
                            class="bg-black/20 text-white border rounded px-2 py-1">
                            <option {{ $lead->status == 'new' ? 'selected' : '' }}>new</option>
                            <option {{ $lead->status == 'contacted' ? 'selected' : '' }}>contacted</option>
                            <option {{ $lead->status == 'qualified' ? 'selected' : '' }}>qualified</option>
                            <option {{ $lead->status == 'lost' ? 'selected' : '' }}>lost</option>
                        </select>
                    </form>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</x-layout>