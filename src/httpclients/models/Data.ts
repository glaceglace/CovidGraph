// {
//     "code": "REG-93",
//     "nom": "Provence-Alpes-Côte d'Azur",
//     "date": "2020-03-27",
//     "hospitalises": 823,
//     "reanimation": 186,
//     "deces": 48,
//     "gueris": 642,
//     "source": {
//       "nom": "OpenCOVID19-fr"
//     },
//     "sourceType": "opencovid19-fr"
//   }
export class Data {
    constructor(code: string = "", nom: string = "", date: string = "", hospitalises: number = 0, reanimation: number = 0, deces: number = 0, gueris: number = 0, casConfirmes = 0) {
        this.code = code
        this.nom = nom
        this.data = date
        this.hospitalises = hospitalises
        this; reanimation = reanimation
        this.deces = deces
        this.gueris = gueris
        this.casConfirmes = casConfirmes

    }
    code: string = ""
    nom: string = ""
    date: string = ""
    sourceType: string = ""
    hospitalises: number = 0
    reanimation: number = 0
    deces: number = 0
    gueris: number = 0
    casConfirmes: number = 0
}