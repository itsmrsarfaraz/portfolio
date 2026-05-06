<x-mail::message>

# New Contact Message

**Name:** {{ $data['name'] }}

**Email:** {{ $data['email'] }}

---

## Message:
{{ $data['message'] }}

<x-mail::button :url="'mailto:' . $data['email']">
Reply to Sender
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}

</x-mail::message>