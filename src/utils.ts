export class Utils {


    camelCase(input: string): string {
        return input.replace(/-([a-z])/ig, function (all, letter) {
            return letter.toUpperCase();
        });
    }

    /**
     * 
     * @param fileName nombre del archivo
     * este metodo retorna un nombre en camelCase a partir del nombre del file que se creará
     */
    nameByFileName(fileName:string):string {
        var name: string;
        name = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        name = this.camelCase(name).replace("-", "").replace("_", "");
        return name;
    }
}