"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderFiles = void 0;
const contents_1 = require("./contents");
const path = require("path");
const utils_1 = require("./utils");
/**
 * Retorna una lista con los nombres y contenidos de los archivos que se agregaran
 * a la carpeta creada, según la opción elegida
 */
class FolderFiles {
    /**
     *
     * @param folderName Nombre de carpeta
     * Retorna archivos para proyecto enfocado unicamente a movil
     */
    simpleProyect(folderName) {
        let inputName = path.parse(folderName).name;
        // Nombre de la carpeta sin guiones y en camelCase
        let formatedName = new utils_1.Utils().nameByFileName(inputName);
        let contents = new contents_1.Contents();
        console.log(contents.simplePageContent(inputName, formatedName, ''));
        let files = [
            {
                name: path.join(folderName, `${inputName}-page.dart`),
                content: contents.simplePageContent(inputName, formatedName, '')
            },
            {
                name: path.join(folderName, `${inputName}-controller.dart`),
                content: contents.controllerContent(formatedName)
            }
        ];
        return files;
    }
    /**
     *
     * @param folderName Nombre de carpeta
     * Retorna archivos para proyecto enfocado a un diseño responsive
     */
    responsiveProyect(folderName) {
        var inputName = path.parse(folderName).name;
        // Nombre de la carpeta sin guiones y en camelCase
        let formatedName = new utils_1.Utils().nameByFileName(inputName);
        let contents = new contents_1.Contents();
        let files = [
            {
                name: path.join(folderName, `${inputName}-page.dart`),
                content: contents.responsivePageContent(inputName, formatedName)
            },
            {
                name: path.join(folderName, `${inputName}-mobile-view.dart`),
                content: contents.simplePageContent(inputName, formatedName, 'Mobile')
            },
            {
                name: path.join(folderName, `${inputName}-desktop-view.dart`),
                content: contents.simplePageContent(inputName, formatedName, 'Desktop')
            },
            {
                name: path.join(folderName, `${inputName}-controller.dart`),
                content: contents.controllerContent(formatedName)
            }
        ];
        return files;
    }
    extras(folderName) {
        let contents = new contents_1.Contents();
        let files = [
            {
                name: path.join(folderName, `constants.dart`),
                content: contents.constants()
            },
            {
                name: path.join(folderName, `colors.dart`),
                content: contents.colors()
            },
            {
                name: path.join(folderName, `dimens.dart`),
                content: contents.dimens()
            },
            {
                name: path.join(folderName, `dialogs.dart`),
                content: contents.dialogs()
            },
            {
                name: path.join(folderName, `routes.dart`),
                content: contents.routes()
            },
            {
                name: path.join(folderName, `validators.dart`),
                content: contents.validators()
            },
            {
                name: path.join(folderName, `tools.dart`),
                content: contents.imports()
            },
        ];
        return files;
    }
    main(folderName) {
        let contents = new contents_1.Contents();
        let files = [
            {
                name: path.join(folderName, `main.dart`),
                content: contents.main()
            }
        ];
        return files;
    }
    login(folderName) {
        let contents = new contents_1.Contents();
        let files = [
            {
                name: path.join(folderName, `login-page.dart`),
                content: contents.loginPage()
            },
            {
                name: path.join(folderName, `login-controller.dart`),
                content: contents.loginController()
            }
        ];
        return files;
    }
    form(folderName) {
        let contents = new contents_1.Contents();
        let files = [
            {
                name: path.join(folderName, `inputs.dart`),
                content: contents.inputs()
            },
            {
                name: path.join(folderName, `email-input.dart`),
                content: contents.emailInput()
            },
            {
                name: path.join(folderName, `password-input.dart`),
                content: contents.passwordInput()
            }
        ];
        return files;
    }
    buttons(folderName) {
        let contents = new contents_1.Contents();
        let files = [
            {
                name: path.join(folderName, `buttons.dart`),
                content: contents.buttons()
            },
            {
                name: path.join(folderName, `simple-button.dart`),
                content: contents.simpleButton()
            },
        ];
        return files;
    }
}
exports.FolderFiles = FolderFiles;
//# sourceMappingURL=folder-files.js.map