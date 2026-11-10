<?php

namespace Database\Seeders;

use App\Models\Agent;
use Illuminate\Database\Seeder;

class AgentSeeder extends Seeder
{
    public function run(): void
    {
        $agents = [
            [
                'slug' => 'sales-assistant', 'category' => 'sales', 'icon' => 'trending-up', 'color' => 'emerald',
                'name' => ['id' => 'Asisten Penjualan', 'en' => 'Sales Assistant'],
                'tagline' => ['id' => 'Proposal, penawaran & follow-up klien', 'en' => 'Proposals, quotes & client follow-ups'],
                'description' => [
                    'id' => 'Menyusun proposal, email penawaran, dan skrip follow-up yang meyakinkan. Cocok untuk tim sales kecil yang butuh bergerak cepat.',
                    'en' => 'Drafts persuasive proposals, quotation emails and follow-up scripts. Built for small sales teams that need to move fast.',
                ],
                'skills' => [
                    'id' => ['Draft proposal & penawaran', 'Email follow-up', 'Ringkasan prospek', 'Penanganan keberatan klien'],
                    'en' => ['Proposal & quote drafts', 'Follow-up emails', 'Lead summaries', 'Objection handling'],
                ],
                'starters' => [
                    'id' => ['Buatkan email penawaran jasa pembuatan website untuk toko furnitur', 'Bagaimana menjawab klien yang bilang "harganya mahal"?'],
                    'en' => ['Write a quotation email for a website build for a furniture store', 'How do I respond to a client who says "it\'s too expensive"?'],
                ],
                'system_prompt' => 'You are a Sales Assistant. Help draft proposals, quotation emails, follow-ups and handle objections. Be concrete, persuasive but honest, and give ready-to-send drafts.',
                'level_min' => 1, 'level_max' => 3, 'price' => 2.50, 'featured' => true,
            ],
            [
                'slug' => 'accounting-assistant', 'category' => 'finance', 'icon' => 'calculator', 'color' => 'amber',
                'name' => ['id' => 'Asisten Akuntansi', 'en' => 'Accounting Assistant'],
                'tagline' => ['id' => 'Cek invoice, pengeluaran & rekap bulanan', 'en' => 'Invoice checks, expenses & monthly summaries'],
                'description' => [
                    'id' => 'Membantu memeriksa invoice, mengkategorikan pengeluaran, dan menyusun rekap keuangan sederhana. Bukan pengganti akuntan berlisensi.',
                    'en' => 'Helps review invoices, categorise expenses and prepare simple financial summaries. Not a replacement for a licensed accountant.',
                ],
                'skills' => [
                    'id' => ['Review invoice', 'Kategori pengeluaran', 'Rekap bulanan', 'Checklist pajak dasar'],
                    'en' => ['Invoice review', 'Expense categorisation', 'Monthly summaries', 'Basic tax checklist'],
                ],
                'starters' => [
                    'id' => ['Kategorikan pengeluaran: listrik 1,2jt, iklan IG 800rb, makan klien 350rb', 'Apa saja yang perlu dicek pada invoice vendor?'],
                    'en' => ['Categorise: electricity $80, IG ads $50, client lunch $25', 'What should I check on a vendor invoice?'],
                ],
                'system_prompt' => 'You are an Accounting Assistant for small businesses. Review invoices, categorise expenses and summarise figures. Show calculations step by step and remind users to verify with a licensed accountant for tax/legal decisions.',
                'level_min' => 1, 'level_max' => 4, 'price' => 2.50, 'featured' => true,
            ],
            [
                'slug' => 'social-media-assistant', 'category' => 'marketing', 'icon' => 'megaphone', 'color' => 'pink',
                'name' => ['id' => 'Asisten Media Sosial', 'en' => 'Social Media Assistant'],
                'tagline' => ['id' => 'Kalender konten, caption & ide kampanye', 'en' => 'Content calendars, captions & campaign ideas'],
                'description' => [
                    'id' => 'Merencanakan konten mingguan, menulis caption sesuai tone brand, dan menyarankan hashtag serta ide konten.',
                    'en' => 'Plans weekly content, writes captions in your brand voice and suggests hashtags and content ideas.',
                ],
                'skills' => [
                    'id' => ['Kalender konten', 'Caption & hashtag', 'Ide Reels/TikTok', 'Balasan komentar'],
                    'en' => ['Content calendar', 'Captions & hashtags', 'Reels/TikTok ideas', 'Comment replies'],
                ],
                'starters' => [
                    'id' => ['Buat kalender konten 7 hari untuk kafe kopi lokal', 'Tulis 3 caption Instagram untuk promo akhir pekan'],
                    'en' => ['Create a 7-day content calendar for a local coffee shop', 'Write 3 Instagram captions for a weekend promo'],
                ],
                'system_prompt' => 'You are a Social Media Assistant. Plan content, write captions and hashtags, and propose short-video ideas. Match the requested brand tone and keep outputs ready to post.',
                'level_min' => 1, 'level_max' => 3, 'price' => 2.50, 'featured' => true,
            ],
            [
                'slug' => 'translation-assistant', 'category' => 'language', 'icon' => 'languages', 'color' => 'sky',
                'name' => ['id' => 'Asisten Penerjemah', 'en' => 'Translation Assistant'],
                'tagline' => ['id' => 'Indonesia, Inggris & Jepang dengan konteks bisnis', 'en' => 'Indonesian, English & Japanese with business context'],
                'description' => [
                    'id' => 'Menerjemahkan dan menyunting dokumen bisnis dengan nada yang tepat, serta menjelaskan pilihan kata bila diminta.',
                    'en' => 'Translates and edits business documents in the right tone, and explains word choices on request.',
                ],
                'skills' => [
                    'id' => ['ID ⇄ EN ⇄ JA', 'Penyuntingan tone formal', 'Glosarium istilah', 'Koreksi tata bahasa'],
                    'en' => ['ID ⇄ EN ⇄ JA', 'Formal tone editing', 'Term glossary', 'Grammar correction'],
                ],
                'starters' => [
                    'id' => ['Terjemahkan ke Inggris formal: "Mohon maaf atas keterlambatan pengiriman."', 'Perbaiki email Inggris saya agar lebih profesional'],
                    'en' => ['Translate to formal Indonesian: "We apologise for the delayed shipment."', 'Polish my English email to sound more professional'],
                ],
                'system_prompt' => 'You are a professional Translation Assistant for Indonesian, English and Japanese. Translate faithfully, keep business tone, and briefly note alternatives or nuances when useful.',
                'level_min' => 2, 'level_max' => 5, 'price' => null,
            ],
            [
                'slug' => 'office-assistant', 'category' => 'operations', 'icon' => 'file-text', 'color' => 'violet',
                'name' => ['id' => 'Asisten Kantor', 'en' => 'Office Assistant'],
                'tagline' => ['id' => 'Dokumen, notulen & rapikan data', 'en' => 'Documents, meeting notes & data cleanup'],
                'description' => [
                    'id' => 'Membuat surat, notulen rapat, SOP ringkas, dan merapikan data mentah menjadi tabel yang siap pakai.',
                    'en' => 'Creates letters, meeting minutes, concise SOPs and turns messy data into clean tables.',
                ],
                'skills' => [
                    'id' => ['Surat & dokumen resmi', 'Notulen rapat', 'SOP ringkas', 'Rapikan data'],
                    'en' => ['Letters & formal documents', 'Meeting minutes', 'Concise SOPs', 'Data cleanup'],
                ],
                'starters' => [
                    'id' => ['Buat notulen dari catatan rapat berikut: ...', 'Buatkan surat izin cuti formal'],
                    'en' => ['Turn these meeting notes into minutes: ...', 'Draft a formal leave request letter'],
                ],
                'system_prompt' => 'You are an Office Assistant. Produce clear documents, meeting minutes, SOPs and clean tables. Prefer structured output with headings and bullet points.',
                'level_min' => 1, 'level_max' => 3, 'price' => 2.50,
            ],
            [
                'slug' => 'customer-support-ai', 'category' => 'support', 'icon' => 'headset', 'color' => 'rose',
                'name' => ['id' => 'AI Layanan Pelanggan', 'en' => 'Customer Support AI'],
                'tagline' => ['id' => 'Draft balasan keluhan & pertanyaan pelanggan', 'en' => 'Draft replies to customer inquiries & complaints'],
                'description' => [
                    'id' => 'Menyusun balasan yang empatik dan konsisten untuk pertanyaan, komplain, dan permintaan refund.',
                    'en' => 'Writes empathetic, consistent replies to questions, complaints and refund requests.',
                ],
                'skills' => [
                    'id' => ['Balasan empatik', 'Template FAQ', 'Eskalasi komplain', 'Ringkasan tiket'],
                    'en' => ['Empathetic replies', 'FAQ templates', 'Complaint escalation', 'Ticket summaries'],
                ],
                'starters' => [
                    'id' => ['Balas pelanggan yang paketnya telat 5 hari dan marah', 'Buat 5 template FAQ untuk toko online'],
                    'en' => ['Reply to a customer whose parcel is 5 days late and angry', 'Create 5 FAQ templates for an online store'],
                ],
                'system_prompt' => 'You are a Customer Support AI. Write calm, empathetic, concise replies that resolve the issue and set clear next steps. Never promise refunds or policies that the user did not state.',
                'level_min' => 2, 'level_max' => 5, 'price' => null,
            ],
            [
                'slug' => 'hotel-concierge', 'category' => 'hospitality', 'icon' => 'concierge-bell', 'color' => 'orange',
                'name' => ['id' => 'Concierge Hotel & Restoran', 'en' => 'Hotel & Restaurant Concierge'],
                'tagline' => ['id' => 'Balas tamu, reservasi & rekomendasi menu', 'en' => 'Guest replies, bookings & menu recommendations'],
                'description' => [
                    'id' => 'Menjawab pertanyaan tamu 24/7, menyusun konfirmasi reservasi, dan merekomendasikan menu atau fasilitas dengan ramah.',
                    'en' => 'Answers guest questions 24/7, drafts booking confirmations and recommends menus or facilities warmly.',
                ],
                'skills' => [
                    'id' => ['Konfirmasi reservasi', 'Rekomendasi menu', 'Info fasilitas', 'Balas ulasan tamu'],
                    'en' => ['Booking confirmations', 'Menu recommendations', 'Facility info', 'Guest review replies'],
                ],
                'starters' => [
                    'id' => ['Buat balasan ramah untuk tamu yang minta late check-out', 'Balas ulasan bintang 2 tentang pelayanan restoran lambat'],
                    'en' => ['Write a friendly reply to a guest requesting late check-out', 'Reply to a 2-star review about slow restaurant service'],
                ],
                'system_prompt' => 'You are a hospitality concierge for hotels and restaurants. Be warm, polished and concise. Ask for missing booking details instead of inventing them.',
                'level_min' => 1, 'level_max' => 4, 'price' => 3.50,
            ],
            [
                'slug' => 'legal-drafter', 'category' => 'legal', 'icon' => 'scale', 'color' => 'slate',
                'name' => ['id' => 'Asisten Dokumen Hukum', 'en' => 'Legal Document Assistant'],
                'tagline' => ['id' => 'Ringkas kontrak & draft perjanjian dasar', 'en' => 'Contract summaries & basic agreement drafts'],
                'description' => [
                    'id' => 'Meringkas kontrak, menandai klausul berisiko, dan membuat draft perjanjian sederhana. Bukan nasihat hukum.',
                    'en' => 'Summarises contracts, flags risky clauses and drafts simple agreements. Not legal advice.',
                ],
                'skills' => [
                    'id' => ['Ringkasan kontrak', 'Tandai klausul berisiko', 'Draft NDA/perjanjian', 'Glosarium hukum'],
                    'en' => ['Contract summaries', 'Risky clause flags', 'NDA/agreement drafts', 'Legal glossary'],
                ],
                'starters' => [
                    'id' => ['Apa saja klausul yang harus diwaspadai di kontrak freelance?', 'Buatkan draft NDA sederhana dua pihak'],
                    'en' => ['Which clauses should I watch for in a freelance contract?', 'Draft a simple two-party NDA'],
                ],
                'system_prompt' => 'You are a Legal Document Assistant. Summarise contracts, flag risky clauses and draft simple agreements. Always state that this is not legal advice and recommend a qualified lawyer for binding decisions.',
                'level_min' => 2, 'level_max' => 5, 'price' => null,
            ],
        ];

        foreach ($agents as $i => $a) {
            Agent::updateOrCreate(['slug' => $a['slug']], $a + ['sort' => $i]);
        }
    }
}
