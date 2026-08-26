# iPhone release checklist

Automated Playwright coverage is a fast WebKit/Chromium compatibility signal.
Before a production release, verify the preview deployment in native Safari and
native Chrome on representative real iPhones or a real-device cloud.

## Required device classes

- 375 × 667: iPhone SE height constraint
- 375 × 812: mini/compact notched phone
- 390/393 × 844/852: current standard and Pro phone
- 414 × 896: legacy Max phone
- 420 × 912: iPhone Air
- 428/430 × 926/932: Plus and recent Pro Max phone
- 430 × 932: approved production reference
- 440 × 956: latest Pro Max compatibility check
- Landscape: SE, standard, Plus, and Pro Max geometry

## Safari and Chrome checks

- Load every public route with the browser toolbar expanded and collapsed.
- Rotate while inside each Home, Capabilities, and About sticky sequence.
- Confirm no horizontal scrolling, blank pin spacers, clipped captions, or
  content hidden behind the Dynamic Island, home indicator, or landscape notch.
- Confirm the navbar logo appears at each section entry, keeps sufficient
  contrast, then hides according to the section contract.
- Open and close the menu at the top, middle, and bottom of long pages.
- Open portfolio images, move previous/next, rotate, close, and use Back.
- Verify videos autoplay muted, pause off-screen, and show usable imagery when
  Low Power Mode blocks autoplay.
- Open the project form, focus every field, rotate with the keyboard open,
  attach a photo/file, trigger validation, and submit only to an authorized test
  recipient.
- Open chat above the footer and with the keyboard visible; confirm it does not
  cover form submit controls or footer links.
- Test pinch zoom to 200%, larger text, VoiceOver focus order, and reduced
  motion.
- Repeat one pass on a slow network and confirm responsive mobile assets load
  without broken images or desktop-video downloads.

## Release commands

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```
