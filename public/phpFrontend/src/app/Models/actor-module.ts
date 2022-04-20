export class Actor {
    #_id!: string;
    #name!: string;
    #year!: string;
    #movies!: Movie[];

    get _id() { return this.#_id; }
    get name() { return this.#name; }
    get year() { return this.#year; }
    get movies() { return this.#movies; }
    set name(name:string){this.#name= name}
    set year(year:string){this.#year= year}
    set movies(movies:Movie[]){this.#movies= movies}

    constructor(id: string, name: string, year: string) {
        this.#_id = id;
        this.#name = name;
        this.#year = year;
        this.#movies = [];
      }
}
export class Movie {
    #_id!: string;
    #name!: string;
    #year!: string;
    
    get _id() { return this.#_id; }
    get name() { return this.#name; }
    get year() { return this.#year; }

    set name(name:string){this.#name= name}
    set year(year:string){this.#year= year}

    constructor(id: string, name: string, year: string) {
        this.#_id = id;
        this.#name = name;
        this.#year = year;
      }
}