// GESTIONE AUDIO PER PUCCIOQUIZ
// Sistema audio per ruota e vincite

class AudioManager {
  constructor() {
    this.sounds = {};
    this.isInitialized = false;
    this.audioContext = null;
    this.masterVolume = 0.7;
    
    // Inizializza contesto audio
    this.initAudioContext();
  }

  // Inizializza Web Audio API
  initAudioContext() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.isInitialized = true;
      console.log('AudioContext inizializzato');
    } catch (error) {
      console.error('AudioContext non supportato:', error);
    }
  }

  // Carica tutti i suoni
  async loadSounds() {
    if (!this.isInitialized) return;

    // Suoni di vincita - usando URL di suoni liberi o generati
    const soundUrls = {
      // Suono rotazione ruota (casino wheel spin)
      wheelSpin: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      
      // Suono vincita Pucciotto (grande vittoria)
      winPucciotto: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      
      // Suono vincita Maglietta (vittoria media)
      winMaglietta: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      
      // Suono vincita Crocchettone (vittoria piccola)
      winCrocchettone: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      
      // Suono vincita Portachiavi (vittoria piccola)
      winPortachiavi: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      
      // Suono perdita (nulla)
      loseNothing: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
    };

    // Carica suoni usando oscillatori per generare suoni procedurali
    this.generateSounds();
  }

  // Genera suoni procedurali usando Web Audio API
  generateSounds() {
    if (!this.audioContext) return;

    // Suono rotazione ruota (suono meccanico ripetitivo)
    this.sounds.wheelSpin = () => this.playWheelSpinSound();
    
    // Suoni di vincita con diverse tonalità
    this.sounds.winPucciotto = () => this.playWinSound(523.25, 659.25, 783.99); // Do, Mi, Sol (triade maggiore)
    this.sounds.winMaglietta = () => this.playWinSound(440, 554.37, 659.25); // La, Do#, Mi
    this.sounds.winCrocchettone = () => this.playWinSound(392, 493.88, 587.33); // Sol, Si, Re
    this.sounds.winPortachiavi = () => this.playWinSound(349.23, 440, 523.25); // Fa, La, Do
    this.sounds.loseNothing = () => this.playLoseSound();
  }

  // Suono rotazione ruota
  playWheelSpinSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1 * this.masterVolume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Suono vincita
  playWinSound(freq1, freq2, freq3) {
    if (!this.audioContext) return;

    const playNote = (frequency, startTime, duration) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3 * this.masterVolume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = this.audioContext.currentTime;
    playNote(freq1, now, 0.3);
    playNote(freq2, now + 0.1, 0.3);
    playNote(freq3, now + 0.2, 0.4);
  }

  // Suono perdita
  playLoseSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.1 * this.masterVolume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Riproduci suono rotazione ruota (loop)
  startWheelSpin() {
    if (!this.sounds.wheelSpin) return;
    
    this.wheelSpinInterval = setInterval(() => {
      this.sounds.wheelSpin();
    }, 100);
  }

  // Ferma suono rotazione ruota
  stopWheelSpin() {
    if (this.wheelSpinInterval) {
      clearInterval(this.wheelSpinInterval);
      this.wheelSpinInterval = null;
    }
  }

  // Riproduci suono vincita in base al premio
  playWinSound(prize) {
    const soundMap = {
      'Pucciotto': 'winPucciotto',
      'Maglietta': 'winMaglietta',
      'Crocchettone': 'winCrocchettone',
      'Portachiavi': 'winPortachiavi',
      'Nulla': 'loseNothing'
    };

    const soundKey = soundMap[prize] || 'loseNothing';
    if (this.sounds[soundKey]) {
      this.sounds[soundKey]();
    }
  }

  // Imposta volume master
  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  // Resume AudioContext se sospeso (richiesto da alcuni browser)
  resumeAudio() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Crea istanza globale dell'audio manager
const audioManager = new AudioManager();

// Auto-inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  audioManager.loadSounds();
  
  // Resume audio al primo click (richiesto da alcuni browser)
  document.addEventListener('click', () => {
    audioManager.resumeAudio();
  }, { once: true });
});

// Esporta per uso globale
window.audioManager = audioManager;
