'use strict'

function makeId(length = 3) {
  const possible = '0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min + 0.99
}

function makeLorem(wordCount = 85) {
  const wordsBank = `Dormi sepolto in un campo di grano
  Non è la rosa, non è il tulipano
  Che ti fan veglia dall'ombra dei fossi
  Ma son mille papaveri rossi
  Lungo le sponde del mio torrente
  Voglio che scendano i lucci argentati
  Non più i cadaveri dei soldati
  Portati in braccio dalla corrente
  Così dicevi ed era d'inverno
  E come gli altri verso l'inferno
  Te ne vai triste come chi deve
  Il vento ti sputa in faccia la neve
  Fermati Piero, fermati adesso
  Lascia che il vento ti passi un po' addosso
  Dei morti in battaglia ti porti la voce
  Chi diede la vita ebbe in cambio una croce
  Ma tu no lo udisti e il tempo passava
  Con le stagioni a passo di giava
  Ed arrivasti a passar la frontiera
  In un bel giorno di primavera
  E mentre marciavi con l'anima in spalle
  Vedesti un uomo in fondo alla valle
  Che aveva il tuo stesso identico umore
  Ma la divisa di un altro colore
  Sparagli Piero, sparagli ora
  E dopo un colpo sparagli ancora
  Fino a che tu non lo vedrai esangue
  Cadere in terra a coprire il suo sangue
  E se gli sparo in fronte o nel cuore
  Soltanto il tempo avrà per morire
  Ma il tempo a me resterà per vedere
  Vedere gli occhi di un uomo che muore
  E mentre gli usi questa premura
  Quello si volta, ti vede e ha paura
  Ed imbracciata l'artiglieria
  Non ti ricambia la cortesia
  Cadesti in terra senza un lamento
  E ti accorgesti in un solo momento
  Che il tempo non ti sarebbe bastato
  A chiedere perdono per ogni peccato
  Cadesti a terra senza un lamento
  E ti accorgesti in un solo momento
  Che la tua vita finiva quel giorno
  E non ci sarebbe stato un ritorno
  Ninetta mia, a crepare di maggio
  Ci vuole tanto, troppo coraggio
  Ninetta bella, dritto all'inferno
  Avrei preferito andarci in inverno
  E mentre il grano ti stava a sentire
  Dentro alle mani stringevi il fucile Dentro alla bocca stringevi parole
  Troppo gelate per sciogliersi al sole
  Dormi sepolto in un campo di grano
  Non è la rosa, non è il tulipano
  Che ti fan veglia dall'ombra dei fossi
  Ma sono mille papaveri rossi`

  const words = wordsBank.replace(/(\r\n|\n|\r)/gm, '').split(' ')
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}
