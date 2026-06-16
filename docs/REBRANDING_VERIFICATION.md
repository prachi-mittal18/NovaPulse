# NovaPulse Rebranding — Verification Checklist

Use this guide to verify the rebranding is complete and correct.

---

## Frontend Verification (Port 3000)

```bash
cd frontend
npm start
# Navigate to http://localhost:3000
```

### Visual Checks

- [ ] **Navbar Logo**: Shows "Nova**Pulse**" with teal gradient (cyan to turquoise)
- [ ] **Page Titles**: Browser tab shows "NovaPulse — Invest Smarter" (or page-specific title)
- [ ] **Footer Brand**: Shows "Nova**Pulse**" and "© 2010 - 2025, NovaPulse Broking Ltd."
- [ ] **Pricing Cards**: Display with teal gradient background
- [ ] **Buttons**: All CTA buttons use teal gradient, not indigo
- [ ] **Accent Colors**: Links and highlights are teal/cyan (#06b6d4), not purple/indigo

### Pages to Check

1. **Home** (`/`)
   - [ ] Navbar: "Nova**Pulse**" logo
   - [ ] Footer: "NovaPulse Broking Ltd."
   - [ ] All text references "NovaPulse" not "ArthaOdha"

2. **Products** (`/product`)
   - [ ] Heading: "NovaPulse Products"
   - [ ] Cards show teal styling
   - [ ] Image labels reference "Pulse", "Pulse Connect API", not "Kite"

3. **Pricing** (`/pricing`)
   - [ ] Heading: "Charges" with teal gradient
   - [ ] All pricing cards styled with teal borders
   - [ ] "NovaPulse" text in descriptions

4. **About** (`/about`)
   - [ ] "NovaPulse" references throughout
   - [ ] Founder section shows "The Team" or generic description

5. **Signup** (`/signup`)
   - [ ] Form title: "Signup now"
   - [ ] Form background uses `np-card` styling (white card with teal accents)

6. **404 Page** (`/nonexistent`)
   - [ ] Shows "404" with teal gradient
   - [ ] Uses `np-notfound` styling

### DevTools Color Check

Open DevTools (F12) and inspect a button or link:

```css
Expected values:
--accent-primary: #06b6d4 (teal)
--accent-primary-light: #22d3ee (cyan)
--accent-secondary: #0891b2 (dark teal)
--accent-gradient: linear-gradient(135deg, #06b6d4, #14b8a6)

NOT:
#6366f1 (old indigo)
#818cf8 (old light purple)
```

---

## Dashboard Verification (Port 3001)

```bash
cd dashboard
npm start
# Navigate to http://localhost:3001
# Login with test credentials
```

### Visual Checks

- [ ] **TopBar Logo**: Shows "Nova**Pulse**" with teal gradient
- [ ] **Sidebar Menu**: Logo shows "Nova**Pulse**"
- [ ] **Avatar**: Shows "NP" (not "AO")
- [ ] **Page Title**: Browser tab shows "NovaPulse Dashboard"
- [ ] **Buttons**: All action buttons (Buy, Sell, etc.) use teal, not purple
- [ ] **Links**: All links are teal/cyan colored
- [ ] **Charts**: Chart accent colors use teal gradient

### Components to Check

1. **TopBar / Menu**
   - [ ] Logo: "Nova**Pulse**"
   - [ ] Avatar badge: "NP"
   - [ ] All text: "NovaPulse"

2. **Dashboard Page** (`/`)
   - [ ] Holdings display with teal styling
   - [ ] Buttons (Place Order, etc.) are teal gradient

3. **Orders Page** (`/orders`)
   - [ ] Order cards styled with teal accents
   - [ ] Status indicators use teal/red colors

4. **Holdings Page** (`/holdings`)
   - [ ] Holdings table headers use teal
   - [ ] Profit/loss percentages color-coded (green/red)

5. **Funds Page** (`/funds`)
   - [ ] Balance displayed with teal styling
   - [ ] Buttons use teal gradient

---

## Backend Verification

### Check AngelOneService Correlation ID

```bash
# In terminal, from backend folder
grep -r "correlationID" src/

# Expected output:
# correlationID: "novapulse1"

# NOT:
# correlationID: "arthaodha1"
```

### Check for Old Brand Names

```bash
# From project root
grep -ri "arthaodha" --include="*.js" --exclude-dir=node_modules .
grep -ri "zerodha" --include="*.js" --exclude-dir=node_modules .

# Expected result: Zero matches (except in spec files which are obsolete)
```

---

## Codebase-Wide Verification

### Search for Old CSS Classes

```bash
# From frontend folder
grep -r "ao-" src/ --include="*.js" --include="*.jsx" --include="*.css"

# Expected result: Zero matches
```

### Search for Old Brand Names in Active Code

```bash
# From project root
grep -ri "ArthaOdha" --include="*.js" --include="*.jsx" --exclude-dir=node_modules . | grep -v ".kiro/specs"

# Expected result: Zero matches (except arthaodhaFundhouse.png filename)
```

---

## Color Palette Verification

### CSS Variables Match

```css
/* Should see these in browser DevTools */

:root {
  --accent-primary: #06b6d4;           ✅ Teal
  --accent-primary-light: #22d3ee;     ✅ Light Cyan
  --accent-secondary: #0891b2;         ✅ Dark Teal
  --accent-gradient: linear-gradient(135deg, #06b6d4, #14b8a6);  ✅ Teal to Green
}

/* NOT these */
#6366f1  ❌ Old Indigo
#818cf8  ❌ Old Light Purple
#4f46e5  ❌ Old Secondary Indigo
```

---

## Logo and Branding Elements

### Current Status

- [x] **Text Branding**: "NovaPulse" everywhere ✅
- [x] **Color Palette**: Teal gradient (#06b6d4 → #14b8a6) ✅
- [x] **Avatar**: "NP" in dashboard ✅
- [ ] **SVG Logo**: TBD (optional - can be created later)
- [x] **Manifest**: Updated ✅
- [x] **Meta Tags**: Updated ✅

### Optional: Create SVG Logo

If you want to create a new SVG logo for NovaPulse:

**Location**: `frontend/public/media/logo.svg`

**Design Suggestions**:
1. Dual-tone "NP" monogram with teal (#06b6d4) and green (#14b8a6)
2. Pulse/wave motif (representing market heartbeat) in teal gradient
3. Simple, modern, minimal 200×200px SVG

---

## Deployment Checklist

Before deploying to production:

### Frontend
- [ ] `npm start` runs without errors
- [ ] All pages display correctly
- [ ] No console errors related to classes or styling
- [ ] Color palette is consistently teal
- [ ] No "ArthaOdha" text visible anywhere
- [ ] All links and buttons use teal styling

### Dashboard
- [ ] `npm start` runs without errors
- [ ] Logo shows "NovaPulse" correctly
- [ ] Avatar shows "NP"
- [ ] No console errors
- [ ] All interactive elements styled with teal

### Backend
- [ ] Server starts without errors
- [ ] Angel One WebSocket connects with correct correlation ID
- [ ] No deprecated references in logs
- [ ] API responses include correct metadata

### Build & Package
- [ ] `npm run build` completes successfully in frontend
- [ ] `npm run build` completes successfully in dashboard
- [ ] No build warnings related to missing classes
- [ ] Production bundle loads correctly
- [ ] CSS is minified and includes teal palette

---

## Rollback Plan (If Needed)

If you need to revert to the old branding:

1. Git revert the rebranding commit
2. Restart all dev servers
3. Clear browser cache (Ctrl+Shift+Delete)

**Git command**:
```bash
git revert HEAD
npm start
```

---

## Sign-Off

- [ ] **Frontend Lead**: Reviewed and approved visual branding ________________
- [ ] **Backend Lead**: Verified API correlation IDs ________________
- [ ] **QA**: Completed all verification checks ________________
- [ ] **Product Owner**: Approved rebrand for production ________________

---

**Completed Date**: _______________

**Next Action**: Deploy to staging for user acceptance testing (UAT)

---
