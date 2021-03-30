import * as path from 'path';
import { Contents } from './contents';
import { IFiles } from './file';
import { Utils } from './utils';


/**
 * Retorna una lista con los nombres y contenidos de los archivos que se agregaran 
 * a la carpeta creada, según la opción elegida
 */

export class FolderFiles {

    /**
     * 
     * @param folderName Nombre de carpeta
     * Retorna archivos para proyecto enfocado unicamente a movil
     */

    public simpleProyect(folderName: string): IFiles[] {
        let inputName: string = path.parse(folderName).name;
        // Nombre de la carpeta sin guiones y en camelCase
        let formatedName = new Utils().nameByFileName(inputName);
        let contents: Contents = new Contents();
        console.log(contents.simplePageContent(inputName, formatedName, ''));
        let files: IFiles[] = [
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

    responsiveProyect(folderName: string): IFiles[] {
        var inputName: string = path.parse(folderName).name;
        // Nombre de la carpeta sin guiones y en camelCase
        let formatedName = new Utils().nameByFileName(inputName);
        let contents: Contents = new Contents();
        let files: IFiles[] = [
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

    extras(folderName: string): IFiles[] {
        let contents: Contents = new Contents();
        let files: IFiles[] = [
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

    main(folderName: string): IFiles[] {
        let contents: Contents = new Contents();
        let files: IFiles[] = [
            {
                name: path.join(folderName, `main.dart`),
                content: contents.main()
            }
        ];

        return files;
    }

    login(folderName: string): IFiles[] {
        let contents: Contents = new Contents();
        let files: IFiles[] = [
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


    form(folderName: string): IFiles[] {
        let contents: Contents = new Contents();
        let files: IFiles[] = [

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

    buttons(folderName: string): IFiles[] {
        let contents: Contents = new Contents();
        let files: IFiles[] = [
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

    services(folderName: string): IFiles[] {
        let contents: Contents = new Contents();
        let files: IFiles[] = [
            {
                name: path.join(folderName, `firebase-service.dart`),
                content: contents.firebaseService()
            },
            {
                name: path.join(folderName, `auth-service.dart`),
                content: contents.authService()
            },
            {
                name: path.join(folderName, `http-service.dart`),
                content: contents.httpService()
            },
        ];

        return files;
    }
}