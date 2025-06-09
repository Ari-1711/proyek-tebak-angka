🎮 Game Tebak Angka (C++ & WebAssembly)
Aplikasi web game interaktif yang logikanya dibangun dari awal menggunakan C++ dan dikompilasi ke WebAssembly (Wasm). Proyek ini mendemonstrasikan bagaimana bahasa berkinerja tinggi seperti C++ dapat dijalankan di browser untuk menciptakan pengalaman pengguna yang responsif.

🚀 Fitur Utama
🧠 Logika Game di C++ Semua aturan inti permainan—pembuatan angka rahasia, perbandingan tebakan, dan pengelolaan sisa kesempatan—sepenuhnya ditulis dalam C++.

⚙️ Eksekusi via WebAssembly Kode C++ dikompilasi menjadi modul WebAssembly (Wasm) menggunakan Emscripten, memungkinkan logika game dieksekusi dengan kecepatan mendekati native di dalam browser.

🕹️ Antarmuka Interaktif UI yang dinamis dan modern dibangun menggunakan HTML, CSS, dan JavaScript untuk menerima input dari pengguna dan menampilkan hasil dari game secara real-time.

↔️ Komunikasi Lintas Bahasa JavaScript bertindak sebagai "jembatan" yang memanggil fungsi-fungsi C++ dan menerjemahkan hasilnya menjadi umpan balik visual untuk pemain.

📱 Desain Responsif Tampilan dioptimalkan untuk semua ukuran layar menggunakan CSS3, memastikan pengalaman bermain yang nyaman di desktop, tablet, maupun mobile.

🛠️ Teknologi yang Digunakan
C++: Untuk logika inti permainan.
WebAssembly (Wasm): Sebagai target kompilasi untuk browser.
Emscripten: Sebagai compiler toolchain dari C++ ke Wasm.
JavaScript (ES6+): Sebagai "glue code" yang menghubungkan UI dengan modul Wasm.
HTML5: Untuk struktur halaman web.
CSS3: Untuk styling, tata letak, dan desain yang responsif.
Git & GitHub: Untuk kontrol versi dan hosting melalui GitHub Pages.

⚙️ Kompilasi dan Setup Lokal
Pastikan Emscripten SDK sudah terinstal dan aktif di terminal Anda.
git clone https://github.com/Ari-1711/proyek-tebak-angka.git
cd proyek-tebak-angka
emcc src/game.cpp -o game.js -s EXPORTED_FUNCTIONS="['_startGame', '_checkGuess', '_getRemainingGuesses', '_getSecretNumber']" -s EXPORTED_RUNTIME_METHODS="['cwrap']"
python -m http.server (perlu pyton)

👨‍💻 Pengembang
**Nama: Ari Hermawan**
**Email: arihermawan006@email.com**
