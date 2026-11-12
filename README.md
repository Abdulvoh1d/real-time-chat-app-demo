# Huddle House — Real-Time Chat App

Huddle House — xonalar, namunaviy suhbatlar va brauzerda saqlanadigan xabarlarni ko‘rsatadigan, serverga ulanmaydigan chat interfeysi demosidir.

## Havolalar

- [Jonli demo](https://real-time-chat-demo-17zl.netlify.app)
- [GitHub repository](https://github.com/Abdulvoh1d/real-time-chat-app-demo)

## Loyiha nimani ko‘rsatadi

Loyiha chat ilovasiga o‘xshash ish maydoni interfeysini namoyish etadi: xona tanlash, suhbatlarni ko‘rish va mahalliy qayd qo‘shish. Barcha muloqot bitta brauzerda namoyish qilinadi; boshqa foydalanuvchilar bilan bog‘lanmaydi.

## Funksiyalar

- `#general`, `#design`, `#product` va `#weekend-plans` xonalari orasida o‘tish; har birida alohida suhbat tarixi bor.
- Ismlar va oldindan kiritilgan xabarlar — uydirma namuna ma’lumotlari.
- Faol xonaga matnli xabar qo‘shish. `Enter` xabarni saqlaydi, `Shift+Enter` yangi qator kiritadi; bo‘sh xabar yuborilmaydi, matn 2 000 belgi bilan cheklangan.
- Xabarlar va vaqt belgilari ko‘rsatiladi; yozish maydoni matnga mos kengayadi va belgi sanagichi ishlaydi.
- Xabarlar brauzerning `localStorage` xotirasida saqlanadi va shu brauzerda qayta ochilganda tiklanadi. **Reset sample data** tugmasi tasdiqlangach, namunaviy suhbatlarni tiklaydi.
- Kichik ekranlarda yon navigatsiyani menyu, yopish tugmasi, fon qatlami yoki `Escape` tugmasi orqali boshqarish mumkin.

## Texnologiyalar

- HTML5
- CSS3
- Vanilla JavaScript
- Tasdiqlangan brauzer imkoniyatlari: `localStorage`, `matchMedia`, `Intl.DateTimeFormat` va `confirm()`.

Framework, backend, ma’lumotlar bazasi, tashqi API, to‘lov tizimi yoki WebSocket ishlatilmaydi. Paket o‘rnatish va loyihani yig‘ish talab qilinmaydi.

## Talablar va mahalliy ishga tushirish

`git`, `python3` va zamonaviy brauzer kerak. Repozitoriyani klonlab, uning papkasiga kiring va statik fayllarni oddiy HTTP server orqali ishga tushiring:

```bash
git clone https://github.com/Abdulvoh1d/real-time-chat-app-demo.git
cd real-time-chat-app-demo
python3 -m http.server 8765
```

So‘ng [http://localhost:8765](http://localhost:8765) manzilini brauzerda oching. `npm install` yoki build bosqichi kerak emas.

## Fayl tuzilishi

```text
real-time-chat-app-demo/
├── index.html   # Sahifa tuzilishi, navigatsiya va xabar yozish qismi
├── styles.css   # Ko‘rinish va ekran o‘lchamlariga moslashuv
├── app.js       # Xona tanlash, xabarlar va localStorage logikasi
└── README.md    # Loyiha haqidagi ma’lumot
```

## Ma’lumotlar, maxfiylik va demo chegaralari

Bu **haqiqiy real-time chat emas, faqat mahalliy simulyatsiya**. Ko‘rsatilgan suhbatlar uydirma namunalar; siz qo‘shgan xabarlar faqat shu qurilmadagi brauzerning `localStorage` xotirasida saqlanadi. Xabarlar boshqa foydalanuvchilarga jo‘natilmaydi, sinxronlanmaydi va ularga ko‘rinmaydi. Backend, foydalanuvchi hisobi yoki real vaqtli uzatish mavjud emas. Brauzer xotirasi cheklangan yoki o‘chirilgan bo‘lsa, xabarlar sahifa yopilgach saqlanib qolmasligi mumkin. **Reset sample data** tasdiqlangach, ushbu brauzerdagi demo xabarlarini dastlabki uydirma namunalar bilan almashtiradi.

## Litsenziya

Repozitoriyada `LICENSE` fayli yo‘q. Repozitoriyaning ommaviy ekanligi o‘z-o‘zidan ochiq litsenziya bermaydi; undan foydalanish, o‘zgartirish yoki tarqatish huquqini beruvchi litsenziya ko‘rsatilmagan.
