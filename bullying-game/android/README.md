# Android app (APK)

The APK (`../NoBullying.apk`) is a small WebView app that opens the game from its own files,
so the 3D part works offline (three.js is bundled inside the APK).

- Package: `com.hdhy.nobullying`, Android 7.0 or newer, landscape, full screen.
- Built with apktool from this folder, with `assets/index.html` (the game, with three.js loaded
  from `three.min.js`) and `assets/three.min.js` added at build time.
- Signed with APK Signature Scheme v2.
