let vol = new Tone.Volume(-10).toMaster()
let polySynth = new Tone.PolySynth(3, Tone.FMSynth)
polySynth.connect(vol)

let p1 = new Tone.Players({
    "kick": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3',
    "snare": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3',
    "hihat": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3'
}, function() {

})

p1.connect(vol)

let chords = [
    ['C3', 'E4', 'B3', 'G4'],
    ['B2', 'G4', 'D4', 'E4'],
    ['D3', 'F4', 'C4', 'D4'],
    ['A2', 'G4', 'B4', 'E4'],
]




let play = document.getElementById('go').addEventListener('click', function() {


    Tone.context.latencyHint = 'fastest'
    Tone.Transport.bpm.value = 120



    let seq = new Tone.Sequence(function(time, idx) {
        if ([0, 4, 8, 12].indexOf(idx) >= 0) {
            p1.get('kick').start()
        }
        if ([2, 6, 10, 14].indexOf(idx) >= 0) {
            p1.get('snare').start()
        }

        let chordIndex = -1
        if (idx == 0) {
            chordIndex = 0
        } else if (idx == 4) {
            chordIndex = 1
        } else if (idx == 8) {
            chordIndex = 2
        } else if (idx == 12) {
            chordIndex = 3
        }
        if (chordIndex >= 0) {
            polySynth.triggerAttackRelease(chords[chordIndex][0], '16n')
            polySynth.triggerAttackRelease(chords[chordIndex][1], '16n', '+16n')
            polySynth.triggerAttackRelease(chords[chordIndex][2], '16n', '+8n')
            polySynth.triggerAttackRelease(chords[chordIndex][3], '16n', '+4n')
        }

        p1.get('hihat').start()
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '8n')

    Tone.Transport.start('+0.2') // start 0.20 seconds after play
    seq.start()



    let stop = document.getElementById('stop')
    stop.addEventListener('click', function() {
        seq.stop()
    })

})