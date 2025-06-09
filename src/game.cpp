#include <cstdlib> 
#include <ctime>  

// Sertakan header Emscripten jika sedang mengompilasi untuk web
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

// Gunakan makro EMSCRIPTEN_KEEPALIVE agar fungsi ini tidak dihapus
// oleh compiler dan bisa dipanggil dari JavaScript.
#ifdef __EMSCRIPTEN__
#define EXPORT EMSCRIPTEN_KEEPALIVE
#else
#define EXPORT
#endif

// Variabel untuk menyimpan status permainan
int secretNumber;
int maxGuesses;
int remainingGuesses;

// Fungsi ini akan dipanggil di awal untuk memulai permainan baru
extern "C" {

EXPORT void startGame(int max_guesses) {
    // Inisialisasi generator angka acak
    srand(time(NULL));
    secretNumber = rand() % 100 + 1; // Angka acak dari 1 hinnga 100
    maxGuesses = max_guesses;
    remainingGuesses = maxGuesses;
}

// Fungsi untuk memeriksa tebakan dari pengguna
// Mengembalikan:
// 0 = Tebakan Benar
// -1 = Terlalu Rendah
// 1 = Terlalu Tinggi
// 99 = Game Over
EXPORT int checkGuess(int guess) {
    if (remainingGuesses <= 0) {
        return 99; // Kode untuk game over
    }

    remainingGuesses--;

    if (guess == secretNumber) {
        return 0; // Benar
    } else if (guess < secretNumber) {
        return -1; // Terlalu rendah
    } else {
        return 1; // Terlalu tinggi
    }
}

// Fungsi untuk mendapatkan sisa tebakan
EXPORT int getRemainingGuesses() {
    return remainingGuesses;
}

// Fungsi untuk mendapatkan angka rahasia (untuk ditampilkan saat kalah)
EXPORT int getSecretNumber() {
    return secretNumber;
}

} 