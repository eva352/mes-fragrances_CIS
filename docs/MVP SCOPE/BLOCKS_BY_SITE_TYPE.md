# CIS — Blocs disponibles par type de site (Max UI Product Type)

Ce document est **généré automatiquement** depuis :
- `shared/blocks/` (catalogue de blocs disponibles dans CIS)
- `backend/app/max_ui/data/products.csv` (liste des *Product Types* + *Landing Page Pattern*)

Limites actuelles :
- CIS n'a pas encore de blocs dédiés pour `gallery`, `before-after`, `contact/booking`, `cta`, `footer` (ils apparaîtront donc comme *manquants*).
- Les sections recommandées sont une **heuristique** dérivée du champ Max UI `Landing Page Pattern` (à affiner avec une future “CIS Blocks Catalog”).

## Catalogue CIS (actuel)

- Catégories présentes : `about`, `compare`, `features`, `hero`, `modal`, `pricing`, `process`, `tabs`, `timeline`
- Total blocs : 25

### about (7)
`about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### compare (2)
`compare/compare-1`, `compare/compare-2`

### features (5)
`features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### hero (5)
`hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### modal (1)
`modal/offer-modal-1`

### pricing (2)
`pricing/pricing-1`, `pricing/pricing-9`

### process (1)
`process/process-3`

### tabs (1)
`tabs/tabs-1`

### timeline (1)
`timeline/timeline-11`

---

## Matrice par type de site

### SaaS (General)
- Pattern Max UI : **Hero + Features + CTA**
- Notes Max UI : Balance modern feel with clarity. Focus on CTAs.
- Sections suggérées : `hero`, `features`, `cta`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
- Sections manquantes (CIS) : `cta`

### Micro SaaS
- Pattern Max UI : **Minimal & Direct + Demo**
- Notes Max UI : Keep simple, show product quickly. Speed is key.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### E-commerce
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Engagement & conversions. High visual hierarchy.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### E-commerce Luxury
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Elegance & sophistication. Premium materials.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Service Landing Page
- Pattern Max UI : **Hero-Centric Design**
- Notes Max UI : Social proof essential. Show expertise.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### B2B Service
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Credibility essential. Clear ROI messaging.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Financial Dashboard
- Pattern Max UI : **N/A - Dashboard focused**
- Notes Max UI : High contrast, real-time updates, accuracy paramount.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Analytics Dashboard
- Pattern Max UI : **N/A - Analytics focused**
- Notes Max UI : Clarity > aesthetics. Color-coded data priority.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Healthcare App
- Pattern Max UI : **Social Proof-Focused**
- Notes Max UI : Accessibility mandatory. Calming aesthetic.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Educational App
- Pattern Max UI : **Storytelling-Driven**
- Notes Max UI : Engagement & ease of use. Age-appropriate design.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Creative Agency
- Pattern Max UI : **Storytelling-Driven**
- Notes Max UI : Differentiation key. Wow-factor necessary.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Portfolio/Personal
- Pattern Max UI : **Storytelling-Driven**
- Notes Max UI : Showcase work. Personality shine through.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Gaming
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Immersion priority. Performance critical.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Government/Public Service
- Pattern Max UI : **Minimal & Direct**
- Notes Max UI : WCAG AAA mandatory. Trust paramount.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Fintech/Crypto
- Pattern Max UI : **Conversion-Optimized**
- Notes Max UI : Security perception. Real-time data critical.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Social Media App
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Engagement & retention. Addictive design ethics.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Productivity Tool
- Pattern Max UI : **Interactive Product Demo**
- Notes Max UI : Ease of use. Speed & efficiency focus.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Design System/Component Library
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Consistency. Developer-first approach.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### AI/Chatbot Platform
- Pattern Max UI : **Interactive Product Demo**
- Notes Max UI : Conversational UI. Streaming text. Context awareness. Minimal chrome.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### NFT/Web3 Platform
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Wallet integration. Transaction feedback. Gas fees display. Dark mode essential.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Creator Economy Platform
- Pattern Max UI : **Social Proof-Focused**
- Notes Max UI : Creator profiles. Monetization display. Engagement metrics. Social proof.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Sustainability/ESG Platform
- Pattern Max UI : **Trust & Authority**
- Notes Max UI : Carbon footprint visuals. Progress indicators. Certification badges. Eco-friendly imagery.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Remote Work/Collaboration Tool
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Real-time collaboration. Status indicators. Video integration. Notification management.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Mental Health App
- Pattern Max UI : **Social Proof-Focused**
- Notes Max UI : Calming aesthetics. Privacy-first. Crisis resources. Progress tracking. Accessibility mandatory.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Pet Tech App
- Pattern Max UI : **Storytelling-Driven**
- Notes Max UI : Pet profiles. Health tracking. Playful UI. Photo galleries. Vet integration.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Smart Home/IoT Dashboard
- Pattern Max UI : **Interactive Product Demo**
- Notes Max UI : Device status. Real-time controls. Energy monitoring. Automation rules. Quick actions.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### EV/Charging Ecosystem
- Pattern Max UI : **Hero-Centric Design**
- Notes Max UI : Charging station maps. Range estimation. Cost calculation. Environmental impact.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Subscription Box Service
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Unboxing experience. Personalization quiz. Subscription management. Product reveals.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Podcast Platform
- Pattern Max UI : **Storytelling-Driven**
- Notes Max UI : Audio player UX. Episode discovery. Creator tools. Analytics for podcasters.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Dating App
- Pattern Max UI : **Social Proof-Focused**
- Notes Max UI : Profile cards. Swipe interactions. Match animations. Safety features. Video chat.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Micro-Credentials/Badges Platform
- Pattern Max UI : **Trust & Authority**
- Notes Max UI : Credential verification. Badge display. Progress tracking. Issuer trust. LinkedIn integration.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Knowledge Base/Documentation
- Pattern Max UI : **FAQ/Documentation**
- Notes Max UI : Search-first. Clear navigation. Code highlighting. Version switching. Feedback system.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Hyperlocal Services
- Pattern Max UI : **Conversion-Optimized**
- Notes Max UI : Map integration. Service categories. Provider profiles. Booking system. Reviews.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Beauty/Spa/Wellness Service
- Pattern Max UI : **Hero-Centric Design + Social Proof**
- Notes Max UI : Calming aesthetic. Booking system. Service menu. Before/after gallery. Testimonials. Relaxing imagery.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Luxury/Premium Brand
- Pattern Max UI : **Storytelling-Driven + Feature-Rich**
- Notes Max UI : Elegance paramount. Premium imagery. Storytelling. High-quality visuals. Exclusive feel.
- Sections suggérées : `hero`, `features`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Restaurant/Food Service
- Pattern Max UI : **Hero-Centric Design + Conversion**
- Notes Max UI : Menu display. Online ordering. Reservation system. Food photography. Location/hours prominent.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Fitness/Gym App
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Progress tracking. Workout plans. Community features. Achievements. Motivational design.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Real Estate/Property
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Property listings. Virtual tours. Map integration. Agent profiles. Mortgage calculator. High-quality imagery.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Travel/Tourism Agency
- Pattern Max UI : **Storytelling-Driven + Hero-Centric**
- Notes Max UI : Destination showcase. Booking system. Itinerary builder. Reviews. Inspiration galleries. Mobile-first.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Hotel/Hospitality
- Pattern Max UI : **Hero-Centric Design + Social Proof**
- Notes Max UI : Room booking. Amenities showcase. Location maps. Guest reviews. Seasonal pricing. Luxury imagery.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Wedding/Event Planning
- Pattern Max UI : **Storytelling-Driven + Social Proof**
- Notes Max UI : Portfolio gallery. Vendor directory. Planning tools. Timeline. Budget tracker. Romantic aesthetic.
- Sections suggérées : `hero`, `process`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Legal Services
- Pattern Max UI : **Trust & Authority + Minimal**
- Notes Max UI : Credibility paramount. Practice areas. Attorney profiles. Case results. Contact forms. Professional imagery.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Insurance Platform
- Pattern Max UI : **Conversion-Optimized + Trust**
- Notes Max UI : Quote calculator. Policy comparison. Claims process. Trust signals. Clear pricing. Security badges.
- Sections suggérées : `hero`, `pricing`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Banking/Traditional Finance
- Pattern Max UI : **Trust & Authority + Feature-Rich**
- Notes Max UI : Security-first. Account overview. Transaction history. Mobile banking. Accessibility critical. Trust paramount.
- Sections suggérées : `hero`, `features`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Online Course/E-learning
- Pattern Max UI : **Feature-Rich Showcase + Social Proof**
- Notes Max UI : Course catalog. Progress tracking. Video player. Quizzes. Certificates. Community forums. Gamification.
- Sections suggérées : `hero`, `features`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Non-profit/Charity
- Pattern Max UI : **Storytelling-Driven + Trust**
- Notes Max UI : Impact stories. Donation flow. Transparency reports. Volunteer signup. Event calendar. Emotional connection.
- Sections suggérées : `hero`, `process`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Music Streaming
- Pattern Max UI : **Feature-Rich Showcase**
- Notes Max UI : Audio player. Playlist management. Artist pages. Personalization. Social features. Waveform visualizations.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Video Streaming/OTT
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Video player. Content discovery. Watchlist. Continue watching. Personalized recommendations. Thumbnail-heavy.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Job Board/Recruitment
- Pattern Max UI : **Conversion-Optimized + Feature-Rich**
- Notes Max UI : Job listings. Search/filter. Company profiles. Application tracking. Resume upload. Salary insights.
- Sections suggérées : `hero`, `features`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Marketplace (P2P)
- Pattern Max UI : **Feature-Rich Showcase + Social Proof**
- Notes Max UI : Seller/buyer profiles. Listings. Reviews/ratings. Secure payment. Messaging. Search/filter. Trust badges.
- Sections suggérées : `hero`, `features`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Logistics/Delivery
- Pattern Max UI : **Feature-Rich Showcase + Conversion**
- Notes Max UI : Real-time tracking. Delivery scheduling. Route optimization. Driver management. Status updates. Map integration.
- Sections suggérées : `hero`, `features`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Agriculture/Farm Tech
- Pattern Max UI : **Feature-Rich Showcase + Trust**
- Notes Max UI : Crop monitoring. Weather data. IoT sensors. Yield tracking. Market prices. Sustainable imagery.
- Sections suggérées : `hero`, `features`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Construction/Architecture
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Project portfolio. 3D renders. Timeline. Material specs. Team collaboration. Blueprint aesthetic.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Automotive/Car Dealership
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Vehicle showcase. 360° views. Comparison tools. Financing calculator. Test drive booking. High-quality imagery.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Photography Studio
- Pattern Max UI : **Storytelling-Driven + Hero-Centric**
- Notes Max UI : Portfolio gallery. Before/after. Service packages. Booking system. Client galleries. Full-bleed imagery.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Coworking Space
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Space tour. Membership plans. Booking system. Amenities. Community events. Virtual tour.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Cleaning Service
- Pattern Max UI : **Conversion-Optimized + Trust**
- Notes Max UI : Service packages. Booking system. Price calculator. Before/after gallery. Reviews. Trust badges.
- Sections suggérées : `hero`, `pricing`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Home Services (Plumber/Electrician)
- Pattern Max UI : **Conversion-Optimized + Trust**
- Notes Max UI : Service list. Emergency contact. Booking. Price transparency. Certifications. Local trust signals.
- Sections suggérées : `hero`, `pricing`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Childcare/Daycare
- Pattern Max UI : **Social Proof-Focused + Trust**
- Notes Max UI : Programs. Staff profiles. Safety certifications. Parent portal. Activity updates. Cheerful imagery.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Senior Care/Elderly
- Pattern Max UI : **Trust & Authority + Social Proof**
- Notes Max UI : Care services. Staff qualifications. Facility tour. Family portal. Large touch targets. High contrast. Accessibility-first.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Medical Clinic
- Pattern Max UI : **Trust & Authority + Conversion**
- Notes Max UI : Services. Doctor profiles. Online booking. Patient portal. Insurance info. HIPAA compliant. Trust signals.
- Sections suggérées : `hero`, `pricing`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Pharmacy/Drug Store
- Pattern Max UI : **Conversion-Optimized + Trust**
- Notes Max UI : Product catalog. Prescription upload. Refill reminders. Health info. Store locator. Safety certifications.
- Sections suggérées : `hero`, `pricing`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Dental Practice
- Pattern Max UI : **Social Proof-Focused + Conversion**
- Notes Max UI : Services. Dentist profiles. Before/after. Online booking. Insurance. Patient testimonials. Friendly imagery.
- Sections suggérées : `hero`, `pricing`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Veterinary Clinic
- Pattern Max UI : **Social Proof-Focused + Trust**
- Notes Max UI : Pet services. Vet profiles. Online booking. Pet portal. Emergency info. Friendly animal imagery.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Florist/Plant Shop
- Pattern Max UI : **Hero-Centric Design + Conversion**
- Notes Max UI : Product catalog. Occasion categories. Delivery scheduling. Care guides. Seasonal collections. Beautiful imagery.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Bakery/Cafe
- Pattern Max UI : **Hero-Centric Design + Conversion**
- Notes Max UI : Menu display. Online ordering. Location/hours. Catering. Seasonal specials. Appetizing photography.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Coffee Shop
- Pattern Max UI : **Hero-Centric Design + Conversion**
- Notes Max UI : Menu. Online ordering. Loyalty program. Location. Story/origin. Cozy aesthetic.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Brewery/Winery
- Pattern Max UI : **Storytelling-Driven + Hero-Centric**
- Notes Max UI : Product showcase. Story/heritage. Tasting notes. Events. Club membership. Artisanal imagery.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Airline
- Pattern Max UI : **Conversion-Optimized + Feature-Rich**
- Notes Max UI : Flight search. Booking. Check-in. Boarding pass. Loyalty program. Route maps. Mobile-first.
- Sections suggérées : `hero`, `features`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### News/Media Platform
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Article layout. Breaking news. Categories. Search. Subscription. Mobile reading. Fast loading.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Magazine/Blog
- Pattern Max UI : **Storytelling-Driven + Hero-Centric**
- Notes Max UI : Article showcase. Category navigation. Author profiles. Newsletter signup. Related content. Typography-focused.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Freelancer Platform
- Pattern Max UI : **Feature-Rich Showcase + Conversion**
- Notes Max UI : Profile creation. Portfolio. Skill matching. Messaging. Payment. Reviews. Project management.
- Sections suggérées : `hero`, `features`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Consulting Firm
- Pattern Max UI : **Trust & Authority + Feature-Rich**
- Notes Max UI : Service areas. Case studies. Team profiles. Thought leadership. Contact. Professional credibility.
- Sections suggérées : `hero`, `features`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Marketing Agency
- Pattern Max UI : **Storytelling-Driven + Feature-Rich**
- Notes Max UI : Portfolio. Case studies. Services. Team. Creative showcase. Results-focused. Bold aesthetic.
- Sections suggérées : `hero`, `features`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Event Management
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Event showcase. Registration. Agenda. Speakers. Sponsors. Ticket sales. Countdown timer.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Conference/Webinar Platform
- Pattern Max UI : **Feature-Rich Showcase + Conversion**
- Notes Max UI : Registration. Agenda. Speaker profiles. Live stream. Networking. Recording access. Virtual event features.
- Sections suggérées : `hero`, `features`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Membership/Community
- Pattern Max UI : **Social Proof-Focused + Conversion**
- Notes Max UI : Member benefits. Pricing tiers. Community showcase. Events. Member directory. Exclusive content.
- Sections suggérées : `hero`, `pricing`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Newsletter Platform
- Pattern Max UI : **Minimal & Direct + Conversion**
- Notes Max UI : Subscribe form. Archive. About. Social proof. Sample content. Simple conversion.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Digital Products/Downloads
- Pattern Max UI : **Feature-Rich Showcase + Conversion**
- Notes Max UI : Product showcase. Preview. Pricing. Instant delivery. License management. Customer reviews.
- Sections suggérées : `hero`, `features`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Church/Religious Organization
- Pattern Max UI : **Hero-Centric Design + Social Proof**
- Notes Max UI : Service times. Events. Sermons. Community. Giving. Location. Welcoming imagery.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Sports Team/Club
- Pattern Max UI : **Hero-Centric Design + Feature-Rich**
- Notes Max UI : Schedule. Roster. News. Tickets. Merchandise. Fan engagement. Action imagery.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`

### Museum/Gallery
- Pattern Max UI : **Storytelling-Driven + Feature-Rich**
- Notes Max UI : Exhibitions. Collections. Tickets. Events. Virtual tours. Educational content. Art-focused design.
- Sections suggérées : `hero`, `features`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Theater/Cinema
- Pattern Max UI : **Hero-Centric Design + Conversion**
- Notes Max UI : Showtimes. Seat selection. Trailers. Coming soon. Membership. Dramatic imagery.
- Sections suggérées : `hero`, `pricing`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `pricing` : `pricing/pricing-1`, `pricing/pricing-9`

### Language Learning App
- Pattern Max UI : **Feature-Rich Showcase + Social Proof**
- Notes Max UI : Lesson structure. Progress tracking. Gamification. Speaking practice. Community. Achievement badges.
- Sections suggérées : `hero`, `features`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Coding Bootcamp
- Pattern Max UI : **Feature-Rich Showcase + Social Proof**
- Notes Max UI : Curriculum. Projects. Career outcomes. Alumni. Pricing. Application. Terminal aesthetic.
- Sections suggérées : `hero`, `features`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Cybersecurity Platform
- Pattern Max UI : **Trust & Authority + Real-Time**
- Notes Max UI : Data density. Threat visualization. Dark mode default.
- Sections suggérées : `hero`, `about`, `timeline`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`
  - `timeline` : `timeline/timeline-11`

### Developer Tool / IDE
- Pattern Max UI : **Minimal & Direct + Documentation**
- Notes Max UI : Keyboard shortcuts. Syntax highlighting. Fast performance.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Biotech / Life Sciences
- Pattern Max UI : **Storytelling-Driven + Research**
- Notes Max UI : Data accuracy. Cleanliness. Complex data viz.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Space Tech / Aerospace
- Pattern Max UI : **Immersive Experience + Hero**
- Notes Max UI : High-tech feel. Precision. Telemetry data.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Architecture / Interior
- Pattern Max UI : **Portfolio Grid + Visuals**
- Notes Max UI : High-res images. Typography. Space.
- Sections suggérées : `hero`, `gallery`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
- Sections manquantes (CIS) : `gallery`

### Quantum Computing Interface
- Pattern Max UI : **Immersive/Interactive Experience**
- Notes Max UI : Visualize complexity. Qubit states. Probability clouds. High-tech trust.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Biohacking / Longevity App
- Pattern Max UI : **Data-Dense + Storytelling**
- Notes Max UI : Personal data privacy. Scientific credibility. Biological visualizations.
- Sections suggérées : `hero`, `process`, `about`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `process` : `process/process-3`
  - `about` : `about/about-1`, `about/about-2`, `about/about-3`, `about/about-4`, `about/about-5`, `about/about-6`, `about/about-7`

### Autonomous Drone Fleet Manager
- Pattern Max UI : **Real-Time Monitor**
- Notes Max UI : Real-time telemetry. 3D spatial awareness. Latency indicators. Safety alerts.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Generative Art Platform
- Pattern Max UI : **Bento Grid Showcase**
- Notes Max UI : Content is king. Fast loading. Creator attribution. Minting flow.
- Sections suggérées : `hero`, `features`, `gallery`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
- Sections manquantes (CIS) : `gallery`

### Spatial Computing OS / App
- Pattern Max UI : **Immersive/Interactive Experience**
- Notes Max UI : Gaze/Pinch interaction. Depth hierarchy. Environment awareness.
- Sections suggérées : `hero`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`

### Sustainable Energy / Climate Tech
- Pattern Max UI : **Interactive Demo + Data**
- Notes Max UI : Data transparency. Impact visualization. Low-carbon web design.
- Sections suggérées : `hero`, `features`
  - `hero` : `hero/hero-1`, `hero/hero-2`, `hero/hero-249`, `hero/hero-30`, `hero/hero-40`
  - `features` : `features/feature-104`, `features/feature-234`, `features/feature-36`, `features/feature-39`, `features/feature-51`
