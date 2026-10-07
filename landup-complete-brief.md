# Landup — complete brief

Date written: 2026-10-04. This file is the handoff. A new chat should follow this file. It merges what Mohammad Rasoul Falahi described across the earlier planning chat and this Project chat, the reference app content from his screenshots, the Vengeance UI skill, the transition demo, and the usage rules.

## 1. Who and how to work

- Product owner: Mohammad Rasoul Falahi. He is not a programmer. He reviews by looking at the running page and the files. Explain in plain language. Give exact click steps when he asks where something is in Cursor.
- He leads. Do the step he names. Do not add the next feature. Do not start a full app from this brief until he says to build that step.
- When he says wait, or "don't do anything until I finish my prompts," stop all building.
- Do not launch Cloud Agents unless he explicitly says go. Background cloud workers spent included Cloud Agent allowance while he still thought the project had not started. That must not happen again without a clear go.
- After a page is done, show it: screenshot or short recording in chat, plus the changed files. He wants to see the page work, not only read a description.
- Code must stay clean and readable: clear file names, simple structure, no clever tricks, so he can point at a mistake.
- Security from the start: no secrets in the website or the Android package, validate input, safe defaults. Real phone-code checking belongs on a server later.
- One codebase for the website and a later Android wrap (mobile-first web, then Capacitor or similar). Do not start in Android Studio.
- App name and repository name: **Landup** (U, not O). Never rename the product to Tikra.

## 2. What the product is

Landup is a construction directory and marketplace, in the spirit of a phone super-app (he compared the feel to Digikala and Snapp) and the old Persian app he filmed.

Tagline: گنجینه ساخت ("the building treasury").

It must later be wrappable as an Android app. Rebuild with new graphics. Keep the content, names, and section structure from the reference until he replaces a name. Do not clone the old gray 2022 interface. Do not invent a different product. Do not replace this structure with a generic contractor dashboard.

The reference is a phone app filmed on 12 Dec 2022, in Persian, city سنندج. Ignore the phone status bar, the video player, the progress bar, Share / Edit / Add to / Trash, and the "Back up now" bubble. Those are not part of the app.

The old app's wordmark was تیکرا. The new wordmark is **Landup**. Tikra appears only inside one biography sentence, quoted in the person-page section below.

He will change names and subjects little by little. Until he dictates a replacement, ship the Persian directory names below.

## 3. Visual system

The old app is flat gray cards on white. Replace that look.

- Construction colors and drawing-like graphics. He pointed at orange as an example of a construction color (buttons and accents), not a locked brand guide. The demo used a yellow slab mark, warm sunset illustration backgrounds, and a yellow primary button. Keep that family unless he corrects it: yellow / copper / sand / ink, construction drawings, not generic blue SaaS.
- Mark: a yellow slab stacked on a gray slab.
- Motion on every page. The language page and the phone page are the first motion problem: one picture turns into the next picture as the page changes.
- Hovering or selecting a language changes the full-bleed background to a picture of that language's culture and cities (example he gave: Kurdish culture and cities when Kurdish is selected).
- Going to the phone-number page changes the background to a construction / building picture, smoothly, like a short video or stop-motion, related to the startup.
- Missing photos in the old app used a cart or a gray person outline. Replace those with new drawings. Do not copy the old placeholder icons. Do not use real people's photographs from the reference. Do not copy real company logos. Do not hotlink old photos.
- Mobile-first, and usable on a desktop width. Persian first.
- Chrome (buttons, nav, errors, empty states) follows the chosen language. Directory names (trades, people, shops) stay in Persian.
- Lists are numbered, right to left, with a chevron. A فیلتر control sits on directory screens. Cards show the name, role or trade, specialty, پایه (grade), and سابقه … سال (years).
- Where a branch had no entries in the reference, show an empty state. Do not invent extra trades to fill gaps. Deeper lists that were cut off in the photos are partial; ship the rows below and leave room to add the missing ones later.

### Transition styles already demoed (he has not picked yet)

A throwaway demo on a draft branch shows three ways to move from the language page to the phone page. Pick one, or mix, before the real first page is built.

1. Crossfade + slow zoom (Ken Burns): the background fades to each language's picture and slowly zooms; Continue fades to the construction scene; the panel slides in.
2. Card morph: the small picture on the language card grows and becomes the next page's background, then the construction drawing appears inside it.
3. Stop-motion flip: a carousel of frames flips through language pictures, then steps through construction frames like a flipbook on the way to the phone page.

Demo files:

- Video: `/cursor/stores/bc-b0d6a586-50b9-4036-8a1b-c5b46b0826f7/media/transition-demo.mp4`
- Variant 1: `/cursor/stores/bc-b0d6a586-50b9-4036-8a1b-c5b46b0826f7/media/transition-variant-1.png`
- Variant 2: `/cursor/stores/bc-b0d6a586-50b9-4036-8a1b-c5b46b0826f7/media/transition-variant-2.png`
- Variant 3: `/cursor/stores/bc-b0d6a586-50b9-4036-8a1b-c5b46b0826f7/media/transition-variant-3.png`
- Draft PR (not final, do not merge as the product): https://github.com/mhmdrasoulfalahi247-ops/landup/pull/1

The demo illustrations are placeholders. Real culture photos or custom artwork come after the style is chosen.

He also asked for one offline HTML file he can open in a browser to see the language page and then the phone page, with no server. That file was not created in the Project chat. Build it only when he says go, preferably as a Local agent on his laptop. Steps are in section 11.

## 4. Vengeance UI skill

He chose Vengeance UI for button motion, cursor graphics, text flips, and picture-to-picture page changes. Site: https://www.vengenceui.com (the domain spells it "vengence"). Source: https://github.com/Ashutoshx7/VengeanceUI

Before animating, create `.cursor/skills/vengeance-ui/SKILL.md` in the repo with the skill text in this section, and follow it. Install `flip-text` first. Install other pieces only when a screen needs that motion. Do not install the whole registry. If a component does not move, copy only the CSS rules that component needs from the upstream `src/app/globals.css`. Do not restyle Landup into the Vengeance landing-page theme.

The install command he sent:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/flip-text.json -y
```

General install:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/NAME.json -y
```

Registry index: https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/registry.json

Skill file contents:

```markdown
---
name: vengeance-ui
description: Use Vengeance UI motion for buttons, cursor graphics, text flips, and picture-to-picture page changes. Use when animating the construction app, especially the language and phone pages, or when the user mentions Vengeance UI or Vengence UI.
---

# Vengeance UI

Animated React components. Site: https://www.vengenceui.com (the domain spells it "vengence"). Source: https://github.com/Ashutoshx7/VengeanceUI

The user picked this library for graphic motion. Install `flip-text` first. Install other pieces only when a screen needs that motion. Do not install the whole registry.

## Install one component

npx shadcn@latest add https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/NAME.json -y

Registry index: https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/registry.json

Replace NAME with the component name. Read the installed file before using it. If it does not move, the animation CSS is often in the upstream src/app/globals.css. Copy only the rules that component needs.

## What to reach for

Page changes, one picture turning into the next (language page, then phone page):

- interactive-book
- perspective-carousel
- diagonal-carousel
- image-reveal-list
- image-scatter
- folder-preview
- elastic-stack
- reveal-loader

Cursor and pointer graphics:

- cursor-card
- image-trail
- pixelated-image-trail
- interactive-particles
- spotlight-navbar
- ascii-glitch-ripple

Buttons:

- animated-button
- interactive-hover-button
- pop-button
- radial-glow-button
- corner-button
- candy-button
- social-flip-button

Text:

- flip-text (install this first; it is the chosen text motion)
- flip-fade-text
- morph-text
- stagger-text
- liquid-text
- gooey-text-reveal
- kinetic-text-loader

Background motion:

- fluid-morph-bg
- liquid-gradient
- animated-rays
- light-lines
- wave-grid-background
- border-beam
- glow-border-card

## Fit

Keep the construction palette. Do not restyle Landup into the Vengeance landing-page theme. Prefer a few motions that match the page change over filling every control with an effect.
```

For the language-to-phone picture change, look first at `interactive-book`, `perspective-carousel`, `image-reveal-list`, and `image-scatter`. For cursor and button motion, look at `cursor-card`, `image-trail`, `animated-button`, and `interactive-hover-button`.

## 5. Entrance

1. First screen: choose a language. Order: Persian (فارسی), Kurdish Sorani (کوردی), Arabic (العربية), English, Spanish (Español), Turkish (Türkçe). Persian, Kurdish, and Arabic are right to left.
2. Then the Landup splash:
   - Mark: a yellow slab stacked on a gray slab.
   - Wordmark: Landup
   - Tagline: گنجینه ساخت
   - ورود (log in)
   - مهمان (continue as guest)
   - ثبت نام نکرده اید؟ ثبت نام
3. ورود and ثبت نام use a mobile number, then a six-digit code, then the main app. مهمان enters the main app without an account.
4. For this build, SMS is not connected. Show the practice code on the page so the flow can be finished. Say clearly that it is a preview. Do not invent a live SMS gateway and do not put an SMS secret in the app.
5. Real SMS later belongs on a server: short-lived codes, few tries, rate limits, HTTPS. Do not buy or wire that now. He asked and was told he does not need to buy SMS or a server yet.
6. Phone input: country code plus national number. Accept Persian and Arabic numerals. Validate the number. Mask it after send (keep prefix and last four digits). Wrong code, expired code, and too many tries must be visible. Empty, invalid phone, wrong code, and empty search states must be visible.
7. Countries to support in the picker, with the language's default country: Persian → Iran, Kurdish → Iraq, Arabic → Iraq, English → United States, Spanish → Spain, Turkish → Turkey. Also offer Iraq, Turkey, Saudi Arabia, UAE, Syria, Jordan, Lebanon, Kuwait, Qatar, Egypt, Spain, Mexico, United States, United Kingdom, and Iran.

## 6. Main shell

City in the header: سنندج. A search field. If nothing matches, show جستجو وجود ندارد.

Three primary modes, one selected at a time:

- مهندس (engineer)
- استادکار (craftsman)
- فروشگاه مصالح (materials shop)

Three more sections, as their own places:

- بیمه (insurance)
- ماشین آلات (machinery)
- تجهیزات (equipment)

He also described the main page like this, in his own words, before the screenshots: a left sidebar in the spirit of Cursor's sidebar, to enter as a contractor (پیمانکار) or as an engineer (مهندس), with more items below; a horizontal row of main choices (contractor section and the shop are main); the shop has heavy machinery, light machinery, cement, concrete companies you can reserve, bricks, and other materials (suppliers edit listings later); the bottom of the first main page is a place to reserve insurance, like a band on a Digikala/Snapp-style home. The screenshot structure in the lists below is the content to ship. The sidebar role switch (contractor vs engineer) and the insurance band at the bottom of home are part of his spoken brief and should be present, mapped onto مهندس / the home modes rather than replacing the screenshot sections.

Bottom bar:

- Landup — home (the reference label was تیکرا; the new label is Landup)
- آگهی — ads
- پروفایل — profile

Sample shop entries are not a live catalog. Say in plain language that suppliers keep these listings current.

## 7. مهندس

Top list:

1. سازه
2. معماری
3. تاسیسات مکانیک
4. تاسیسات برق
5. نقشه برداری
6. شهرسازی

سازه then opens:

1. آزمایشگاه
2. ارزیابی و بهسازی
3. انبوه ساز
4. دفتر طراحی
5. طراحی گود، سازه نگهبان
6. کارشناس رسمی راه و ساختمان
7. کارشناس ماده ۲۷ سازه
8. مجری ذیصلاح ساختمان

دفتر طراحی people, reading order:

- دفتر تدبیر — کارشناس سازه — طراح و ناظر — پایه یک
- دفتر اهرام — کارشناس تاسیسات مکانیک — طراح و ناظر — پایه یک
- دفتر ابتکار — کارشناس تاسیسات مکانیک — طراح و ناظر — پایه یک
- ناصر حیدری — کارشناس سازه — طراح — پایه یک
- فرشید عزت‌پور — دکتری سازه — طراح و ناظر — پایه یک
- اسمعیل بهمنی — کارشناس معماری — طراح و ناظر — پایه یک

مجری ذیصلاح ساختمان people:

- شرکت کارآفرینان ساباط — کارشناس سازه — پایه یک
- هرم سازان آریا — کارشناس سازه — پایه یک
- شرکت کاروخ سازه غرب — کارشناس سازه — پایه یک
- رابین ساز سنه — کارشناسی ارشد سازه — ناظر — پایه یک
- حجت وکیلی — کارشناسی ارشد سازه — اجرا — پایه یک
- ژاکو ویسی — کارشناس سازه — اجرا — پایه یک
- شرکت زاگرس راه آبیدر — کارشناس سازه — ناظر و اجرا — پایه یک
- شرکت سورین ساز — کارشناس سازه — پایه یک
- شرکت شاخص بنیان کار — کارشناس سازه — پایه یک
- شرکت کارو ساخت — کارشناس سازه — پایه یک

معماری → سازنده شخصی, with a heading کاربران برگزیده:

- اسمعیل بهمنی — کارشناس معماری — طراح و ناظر — ارشد
- محمدرضا صمیمی — کارشناس معماری — طراح و ناظر — ارشد

Above that strip, an ad band: ایران زمین / آینده‌ای روشن.

## 8. Person page

Example: رابین ساز سنه.

- Round portrait (new drawing, not the reference photo)
- تماس
- Role: مهندس
- City: سنندج, and this person also shows اینستاگرام
- Tabs: درباره · تخصص · آگهی · رزومه
- About, keep this sentence exactly, including the old product name inside it: مجری ذیصلاح پایه یک، مدیر عامل شرکت رابین ساز سنه، صاحب امتیاز نرم‌افزار تیکرا

Do not invent phone numbers or Instagram handles. تماس explains that the number is not published in this preview.

رزومه list, then a resume page:

- Title, site photo area, توضیحات, محل, تاریخ
- گزارش مشکل (the report stays on this device in the preview)

Resumes on record:

- رزومه کاری — اجرای استخر خانه باغ امید گوبلی — سنندج، کیلانه — ۱۳۹۹/۰۴/۲۰
- رزومه ۳ — انجام ساختمان آقای محمدی کرمانشاه، شهرک فرهنگیان — کرمانشاه — ۱۳۹۷/۹/۰۱

The resume picture is a construction photo area (pool rebar, formwork). Redraw it.

## 9. استادکار

معماری → آجر نما کار:

- استاد بشیر — ۱۵ سال
- استاد یداله — ۱۰ سال
- امید احمدی — ۱۵ سال
- استاد طالب — ۱۰ سال

Other معماری trades seen (no people on those screens):

- اجرای آلاچیق
- اجرای آیینه کاری
- اجرای باربیکیو
- اجرای پتینه و ورق طلا
- اجرای تایل و پلکسی
- اجرای چمن مصنوعی
- اجرای درب اتوماتیک
- اجرای درب داخلی
- اجرای درب سکوریت
- اجرای دیوار پوش

تاسیسات مکانیک trades seen:

- اجرای جارو مرکزی
- اجرای چیلر
- اجرای سونا و جکوزی
- اجرای شوت زباله
- اجرای عایق حرارتی، صوتی
- اجرای کانال کولر و هوا
- اجرای لوله پلی اتیلن
- اجرای لوله کشی گاز
- اجرای موتورخانه مرکزی
- داکت تاسیسات
- لوله کشی آب و فاضلاب

## 10. فروشگاه مصالح

Numbered index:

1. سازه
2. معماری
3. تاسیسات مکانیک
4. تاسیسات برق
5. نقشه برداری
6. محوطه و…
7. تزئینی
8. ایمنی

سازه → بتن آماده و مصالح جانبی then:

1. اسپیسر، قطعات ویژه قالب بندی
2. اف آر پی
3. الیاف پلی پروپیلن (بتن الیافی)
4. الیاف فلزی بتن (بتن الیافی)
5. باکس بتنی
6. بتن آماده
7. پایه بتنی
8. جدول بتنی
9. دیوار پیش ساخته
10. فیسینگ بتنی پیش ساخته

بتن آماده suppliers. Each card: name, کارخانه, years, line «بتن آماده و مصالح جانبی».

- درجا بتن — ۱۷ سال
- بنیاد بتن — ۳۰ سال
- هیشو بتن — ۱۵ سال
- ظفر بتن — ۲۰ سال
- سازه بتن — ۱۰ سال
- بنیاد بتن — ۳۰ سال (second card)

سازه → تیرچه بتنی و یونولیت:

- خانه بتن — کارخانه — ۱۰ سال
- تیرچه انور — فروشگاه — ۸ سال
- تیرچه صنعتی تک نما — فروشگاه — ۷ سال
- کانی بردینه — کارخانه — ۱۰ سال
- تیرچه و بلوک گوبلی — کارگاه — ۱۰ سال
- تیرچه صنعتی تیر ایران — کارخانه — ۶ سال

تزئینی → پرده → سلطنتی:

- گالری پرده هارمونی — فروشگاه — ۱۵ سال
- پرده سرای تک — فروشگاه — ۱۰ سال
- قصر پرده — فروشگاه — ۸ سال
- شهر پرده — فروشگاه — ۱۰ سال
- پرده سرای باران، بهاران
- قصر پرده زرنشت

تزئینی → فرش, product pages:

1. فرش وینتج آکریلیک ۱۲۰۰ شانه تراکم ۳۶۰۰
2. فرش وینتج ۱۰۰درصد آکریلیک ۱۲۰۰ شانه تراکم ۳۶۰۰
3. وینتیج ۱۲۰۰ شانه تراکم ۳۶۰۰ نخ اکریلیک

From his spoken shop brief, also present as shop categories even where the screenshots were thin: heavy machinery (ماشین‌آلات سنگین), light machinery (ماشین‌آلات سبک), cement (سیمان), concrete you can reserve, bricks (آجر), and other materials. Concrete companies take a reservation for the pour. Suppliers will edit listings later.

## 11. ماشین آلات، تجهیزات، بیمه، آگهی، پروفایل

ماشین آلات → خاک برداری → بیل مکانیکی:

- میلاد رستمی — ۱۵ سال
- صباح سعیدی — ۱۰ سال
- امید فقیه سلیمانی — ۱۰ سال
- مینی بیل زنجیری — ۸ سال
- کاوه نیلی — ۷ سال
- بهزاد زندی — ۲۰ سال

تجهیزات rows seen:

- سیلوی سیمان
- کانکس و کانتینر
- ماشین آلات CNC
- ماشین آلات بلوک زنی
- ماشین آلات راهسازی
- ماشین آلات سنگ شکن
- ماشین آلات ماسه شویی
- مواد اولیه افزودنی بتن
- مواد اولیه سیم و کابل

بیمه: a grid of insurers. Use the names. Draw new marks. Do not copy the real company logos.

- بیمه سینا
- بیمه سرمد
- بیمه کوثر
- بیمه کارآفرین
- بیمه معلم
- بیمه ما
- بیمه نوین
- بیمه میهن

The home page also has a bottom band: reserve insurance (cover people, the works, and machines). Plans can be reserved as a request; a broker would confirm price later. Do not take payment in this build.

آگهی cards, redrawn:

- رئال وین — پروفیل در و پنجره UPVC
- روتنبرگ — رادیاتور
- ایران زمین — آینده‌ای روشن

پروفایل:

- Guest: ask them to log in.
- Signed in: show the masked mobile number, language, and sign out.

Reservations (machines, pours, insurance) stay on the device until a supplier confirms them. No payment.

## 12. Build notes

- Ship a running app, not a slide deck, once he says to build a step.
- Suggested stack when building for real: Next.js (App Router, TypeScript, Tailwind), shadcn/ui, motion. Mobile-first. PWA-friendly so it can be wrapped for Android later.
- Practice sign-in only. No payment, no live SMS, no copied trademarks, no copied portrait photos.
- Empty, invalid phone, wrong code, and empty search states must be visible.
- Chrome follows the chosen language. Directory names stay in Persian.

## 13. Local coding (his laptop)

Cloud Agents were reported used up for the October 2026 cycle. This Project chat cannot start a new cloud worker until the allowance resets or he turns on on-demand on purpose. He does not want extra charges. On-demand stays off.

To code on the laptop anyway:

1. Open the Cursor desktop app.
2. File → Open Folder → the Landup repository.
3. Start a new Agent chat in the editor (not New Project / Cloud).
4. At the bottom of the message box, open the dropdown that says Cloud and choose Local.
5. Set the model to Composer 2.5 or Grok 4.7, Medium effort. Do not pick Claude, Opus, GPT, or Gemini while Other models is at 100%.
6. Paste the step he wants, for example: build one offline `index.html` of the language page and the phone page, no server, and tell him how to open it in the browser.

Local writes files on his computer. It does not use the Cloud Agent allowance. It still uses the Cursor models pool (Composer / Grok).

First offline test he asked for, when he says go:

```text
Build one offline HTML file I can open in a browser: the Landup language page (Persian, Kurdish, Arabic, English, Spanish, Turkish), then a phone-number page. Construction look, mobile size. No server. Save as index.html and tell me how to open it.
```

## 14. Usage rules he set

- Plan: Cursor Pro, $20/month. Leave on-demand off.
- Two pools: Cursor models (Composer 2.5, Grok 4.7 and similar) and Other models (Claude, GPT, Gemini, Opus). On 2026-10-04 his dashboard showed Other models about 100% and Cursor models about 3%. Included Cloud Agent usage for the cycle was also reported used, by email.
- Reset date Cursor showed on an Opus error: 2026-10-26. Confirm on https://cursor.com/dashboard → Spending.
- A new chat does not refill Other models or Cloud Agents. It only clears that chat's memory.
- "Out of context" in a chat is that conversation's memory, not the monthly pool.
- Effort (Low / Medium / High / Max) is how long the same model thinks. Medium for normal work. High spends the allowance faster.
- Everyday order: Composer 2.5 Medium, then Grok 4.7 Medium. Fast variants spend faster. Save Claude-class models for after the reset, or for a rare check if he later chooses a spend limit on purpose.
- If every included pool is empty and on-demand is off, new agent requests pause until the reset. The repo and this brief stay.
- He believes a few short questions should not have emptied Other models and Cloud Agents. A support email was drafted to hi@cursor.com. Help: https://cursor.com/help . He should attach a Spending screenshot and his Cursor login email.

Support email subject:

Pro plan — Other models and Cloud Agent limits used after a few short questions, no app built

Body to send from the Gmail on the Cursor account:

```text
Hello Cursor billing support,

I am on the Pro plan ($20/month). I believe my included usage was used up incorrectly, and I need a human to review the account.

What I actually did this billing cycle
- I only sent a few short questions in chat (planning a project, asking how usage works).
- I did not finish building an application. There was no completed coding project from my side.
- I did not turn on on-demand usage. I do not want extra charges.

What the product shows
- Dashboard: Other models ~100% used, Cursor models ~3% used.
- I received an email: I have hit the included Cloud Agent usage limit for this cycle and should enable on-demand to keep agents running.
- An agent run also failed with a message that I had hit the usage limit for Opus, resetting around October 26, 2026.

Why this does not match
A few short planning questions should not empty Other models and included Cloud Agent usage for the whole month. Please check whether background Cloud Agent runs or model routing were charged to my account beyond what I intended, and correct the allowance if the charges are wrong.

Please
1. Explain the line items that consumed Other models and Cloud Agent usage (model name, date, and what kind of run).
2. If this was a mistake or unexpected background usage, restore the included allowance for this cycle.
3. Confirm my reset date and that on-demand stays off so I am not billed extra.

Account email: [paste the email you log into Cursor with]
Plan: Pro $20
I am attaching a screenshot of the Spending / usage page.

Thank you,
Mohammad Rasoul Falahi
```

Context for support, honest: this Project did start Cloud Agent runs (a stopped first build, a transition-style demo, and a recording worker) before he asked to stop launching them. Those runs can consume Cloud Agent allowance and Other models even when his own messages were short questions. He still wants the line items explained.

## 15. What is already done vs still open

Done:

- Repository Landup exists on GitHub with a README, under mhmdrasoulfalahi247-ops/landup.
- This complete brief, plus the earlier shorter brief at `/cursor/stores/bc-b0d6a586-50b9-4036-8a1b-c5b46b0826f7/docs/landup-brief.md`.
- Transition demo video, three screenshots, and draft PR #1.
- Vengeance UI skill text (in this file; also written into the demo branch).
- Support email text (section 14).

Not done (waiting for him):

- Choice of transition style 1, 2, or 3.
- Real culture and construction artwork.
- The offline `index.html` preview.
- The real app screens beyond the demo.
- Any new Cloud Agent.

Next step when he says go: one screen only, shown visually, then stop for his review.
