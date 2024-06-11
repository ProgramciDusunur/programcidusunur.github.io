/**********************************\
 ==================================

       Artifical Intelligence

 ==================================
\**********************************/

var boardSize = 12;
let bitboard   = BigInt("0b111111111111");
let bitboardX  = BigInt("0b111111111111");
let bitboardO  = BigInt("0b111111111111");

const letterToNumber = {
  	0: 'a',
  	1: 'b',
  	2: 'c',
  	3: 'd',
  	4: 'e',
  	5: 'f',
  	6: 'g',
  	7: 'h',
  	8: 'i',
  	9: 'j',
  	10: 'k',
  	11: 'l',
};

seeBitboard(bitboard);
//bitboard = setBit(bitboard, 0);
seeBitboard(bitboard);
console.log("BigInt'in bit sayısı:", bitboard.bitLength());
moveGenerator(bitboard);

function seeBitboard(bitboard) {
  let rowOutput = ""; // Satırı birleştirmek için boş bir dize oluştur
  for (let row = 0; row < boardSize; row++) {
  	if (row >= 9) {
  		rowOutput += (row + 1)  + "  ";
  	} else {
  		rowOutput += (row + 1)  + "   ";
  	}
    
    for (let column = 0; column < boardSize; column++) {
      let index = row * boardSize + column;
      let isSquareEmpty = getBit(bitboard, index);
      rowOutput += " " + isSquareEmpty;
    }
    console.log(rowOutput);
    rowOutput = ""; // Satırı sıfırla
  }
  console.log("\n");
  rowOutput = "     "; // Başka bir satır birleştirmek için sıfırla
  for (let coordinateRow = 0; coordinateRow < boardSize; coordinateRow++) {
    rowOutput += letterToNumber[coordinateRow] + " ";
  }
  console.log(rowOutput);
  console.log("\n");
}

function getBit(bitboard, square) {
   return Number((bitboard & (1n << BigInt(square))) !== 0n);
}

function setBit(bitboard, square) {
   return bitboard |= (1n << BigInt(square));
}

function bitCount(n) {
  var bits = 0
  while (n !== 0) {
    bits += bitCount32(n | 0)
    n /= 0x100000000
  }
  return bits
}

function bitCount32 (n) {
  n = n - ((n >> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

 function countSetBits(n)
   {
     var count = 0;
     while (n)
     {
       count += n & 1;
       n >>= 1;
     }
     return count;
   }

function moveGenerator(bitboard) {
	
}













/**********************************\
 ==================================

          Dom Manipulation

 ==================================
\**********************************/

function initElements() {
	// Remove Elements
	const headerElement = document.querySelector('.tictactoe-PlayScreen-Header');
	const playButton = document.querySelector('.tictactoe-PlayScreen-PlayButton');
	const settings = document.querySelector('.tictactoe-PlayScreen-Settings');

	// Create Elements
	
  	if (headerElement && playButton && settings) {
    	headerElement.remove();
    	playButton.remove();    	
    	settings.remove();
    	setPlayScreenGrid();
    	createDifficultyButtons();
  	}
}
// Yeni div öğelerini oluşturun
function createDifficultyButtons() {
  const container = document.querySelector('.tictactoe-PlayScreen');
  
  // Önce mevcut zorluk divlerini temizleyin (isteğe bağlı)
  container.innerHTML = '';

  // Yeni zorluk divlerini oluşturun ve içeriğini ayarlayın
  const difficulties = ['Easy', 'Hardcore', 'Hard', 'Medium'];
  difficulties.forEach(difficulty => {
    const difficultyButton = document.createElement('div');
    difficultyButton.className = 'tictactoe-PlayScreen-DifficultyButton';
    difficultyButton.textContent = difficulty;
    container.appendChild(difficultyButton);
  });
  const difficultyText = document.createElement('div');
  difficultyText.className = 'tictactoe-PlayScreen-Difficulty';
  difficultyText.textContent = "Difficulty";
  container.appendChild(difficultyText);
}
function setPlayScreenGrid() {
	// tictactoe-PlayScreen sınıfına sahip elementi seçin
	const playScreenElement = document.querySelector('.tictactoe-PlayScreen');
	// Sütunları ve satırları ayarlayın
	playScreenElement.style.display = 'grid';
	playScreenElement.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr';
	playScreenElement.style.gridTemplateRows = '1fr 1fr 1fr';

}