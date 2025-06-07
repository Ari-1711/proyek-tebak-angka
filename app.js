// Tunggu hingga modul WebAssembly (game.js) selesai dimuat
Module.onRuntimeInitialized = () => {
    console.log("Runtime C++ (Wasm) berhasil dimuat.");

    // Ambil elemen-elemen dari HTML
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const resetButton = document.getElementById('resetButton');
    const feedback = document.getElementById('feedback');
    const guessesLeftSpan = document.getElementById('guessesLeft');

    // Hubungkan fungsi C++ ke JavaScript
    const startGame = Module.cwrap('startGame', null, ['number']);
    const checkGuess = Module.cwrap('checkGuess', 'number', ['number']);
    const getRemainingGuesses = Module.cwrap('getRemainingGuesses', 'number', []);
    const getSecretNumber = Module.cwrap('getSecretNumber', 'number', []);
    
    // Fungsi untuk memulai atau mereset permainan
    function newGame() {
        const maxGuesses = 10;
        startGame(maxGuesses);
        guessesLeftSpan.textContent = getRemainingGuesses();
        feedback.textContent = "";
        feedback.className = "";
        guessInput.value = "";
        guessInput.disabled = false;
        guessButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }

    // Fungsi yang dijalankan saat tombol "Tebak" ditekan
    function handleGuess() {
        const userGuess = parseInt(guessInput.value);
        if (isNaN(userGuess)) {
            feedback.textContent = "Mohon masukkan angka yang valid.";
            return;
        }

        const resultCode = checkGuess(userGuess);
        guessesLeftSpan.textContent = getRemainingGuesses();
        
        if (resultCode === 0) { // Tebakan benar
            feedback.textContent = `Selamat! Anda benar! Angkanya adalah ${userGuess}.`;
            feedback.className = 'correct';
            endGame();
        } else if (resultCode === -1) { // Terlalu rendah
            feedback.textContent = "Terlalu RENDAH!";
            feedback.className = 'wrong';
        } else if (resultCode === 1) { // Terlalu tinggi
            feedback.textContent = "Terlalu TINGGI!";
            feedback.className = 'wrong';
        }
        
        if (getRemainingGuesses() === 0 && resultCode !== 0) {
            const secret = getSecretNumber();
            feedback.textContent = `Game Over! Angka rahasianya adalah ${secret}.`;
            feedback.className = 'wrong';
            endGame();
        }
        
        guessInput.focus();
        guessInput.select();
    }

    // Fungsi untuk mengakhiri permainan
    function endGame() {
        guessInput.disabled = true;
        guessButton.style.display = 'none';
        resetButton.style.display = 'inline-block';
    }

    // Tambahkan event listener ke tombol
    guessButton.addEventListener('click', handleGuess);
    resetButton.addEventListener('click', newGame);
    
    // Mulai permainan saat halaman dimuat
    newGame();
};