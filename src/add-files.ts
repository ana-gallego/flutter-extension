
import { window, workspace, TextEditor } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as Q from 'q';
import { IFiles } from './file';
import { FolderFiles } from './folder-files';

export class AddFiles {

    public showFileNameDialog(args: any): Q.Promise<string> {
        const deferred: Q.Deferred<string> = Q.defer<string>();

        var clickedFolderPath: string;
        if (args) {
            clickedFolderPath = args.fsPath;
        }
        else {
            if (!window.activeTextEditor) {
                deferred.reject('Please open a file first.. or just right-click on a file/folder and use the context menu!');
                return deferred.promise;
            } else {
                clickedFolderPath = path.dirname(window.activeTextEditor.document.fileName);
            }
        }
        var newFolderPath: string = fs.lstatSync(clickedFolderPath).isDirectory() ? clickedFolderPath : path.dirname(clickedFolderPath);

        if (workspace.rootPath === undefined) {
            deferred.reject('Please open a project first. Thanks! :)');
        }
        else {
            window.showInputBox({
                prompt: 'What\'s the name of the new folder?',
                value: 'folder'
            }).then(
                (fileName) => {
                    if (!fileName || /[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?\s]/g.test(fileName)) {
                        deferred.reject('That\'s not a valid name! (no whitespaces or special characters)');
                    } else {
                        deferred.resolve(path.join(newFolderPath, fileName));
                    }
                },
                (error) => console.error(error)
            );
        }
        return deferred.promise;
    }

    // Create the new folder
    public createFolder(path: any): Q.Promise<string> {
        const deferred: Q.Deferred<string> = Q.defer<string>();

        fs.exists(path, (exists) => {
            if (!exists) {
                fs.mkdirSync(path);
                deferred.resolve(path);
            } else {
                deferred.reject('Folder already exists');
            }
        });
        return deferred.promise;
    }

    // Get file contents and create the new files in the folder 
    public createFiles(folderPath: string, type: string): Q.Promise<string> {
        const deferred: Q.Deferred<string> = Q.defer<string>();
        const af: AddFiles = new AddFiles();

        var files: IFiles[] = [];
        let ff = new FolderFiles();

        switch (type) {
            case 'responsive':
                files = ff.responsiveProyect(folderPath);
                break;
            case 'simple':
                files = ff.simpleProyect(folderPath);
                break;
            case 'extras':
                files = ff.extras(folderPath);
                break;
            case 'main':
                files = ff.main(folderPath);
                break;
            case 'login':
                files = ff.login(folderPath);
                break;
            case 'form':
                files = ff.form(folderPath);
                break;
            case 'buttons':
                files = ff.buttons(folderPath);
                break;

            default:
                break;
        }

        // write files
        af.writeFiles(files).then((errors: any) => {
            if (errors.length > 0) {
                window.showErrorMessage(`${errors.length} file(s) could not be created. I'm sorry :(`);
            }
            else {
                deferred.resolve(folderPath);
            }
        });

        return deferred.promise;
    }

    public writeFiles(files: IFiles[]): Q.Promise<string[]> {
        const deferred: Q.Deferred<string[]> = Q.defer<string[]>();
        var errors: string[] = [];
        files.forEach(file => {
            fs.writeFile(file.name, file.content, (err) => {
                if (err) { errors.push(err.message); }
                deferred.resolve(errors);
            });
        });
        return deferred.promise;
    }

    /**
     * abrir archivo creado en el navegador
     */
    public openPageInEditor(folderName: any): Q.Promise<TextEditor> {
        const deferred: Q.Deferred<TextEditor> = Q.defer<TextEditor>();
        var inputName: string = path.parse(folderName).name;

        workspace.openTextDocument(path.join(folderName, `${inputName}-page.dart`)).then((textDocument) => {
            if (!textDocument) { return; }
            window.showTextDocument(textDocument).then((editor) => {
                if (!editor) { return; }
                deferred.resolve(editor);
            });

        });

        return deferred.promise;
    }
}