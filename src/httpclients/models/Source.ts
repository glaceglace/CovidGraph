export class Source {
    constructor(nom: string = "", source:string="", archive:string="") {
        this.nom = nom
        this.source =source
        this.archive=archive
    }
    nom: string = ""
    source:string=""
    archive:string=""
}