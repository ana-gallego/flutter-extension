"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFiles = void 0;
const vscode_1 = require("vscode");
const fs = require("fs");
const path = require("path");
const Q = require("q");
const folder_files_1 = require("./folder-files");
class AddFiles {
    showFileNameDialog(args) {
        const deferred = Q.defer();
        var clickedFolderPath;
        if (args) {
            clickedFolderPath = args.fsPath;
        }
        else {
            if (!vscode_1.window.activeTextEditor) {
                deferred.reject("Please open a file first.. or just right-click on a file/folder and use the context menu!");
                return deferred.promise;
            }
            else {
                clickedFolderPath = path.dirname(vscode_1.window.activeTextEditor.document.fileName);
            }
        }
        var newFolderPath = fs.lstatSync(clickedFolderPath).isDirectory()
            ? clickedFolderPath
            : path.dirname(clickedFolderPath);
        if (vscode_1.workspace.workspaceFolders === undefined) {
            deferred.reject("Please open a project first. Thanks! :)");
        }
        else {
            vscode_1.window
                .showInputBox({
                prompt: "What's the name of the new folder?",
                value: "folder",
            })
                .then((fileName) => {
                if (!fileName ||
                    /[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?\s]/g.test(fileName)) {
                    deferred.reject("That's not a valid name! (no whitespaces or special characters)");
                }
                else {
                    deferred.resolve(path.join(newFolderPath, fileName));
                }
            }, (error) => console.error(error));
        }
        return deferred.promise;
    }
    // Create the new folder
    createFolder(path) {
        const deferred = Q.defer();
        fs.exists(path, (exists) => {
            if (!exists) {
                fs.mkdirSync(path);
                deferred.resolve(path);
            }
            else {
                deferred.reject("Folder already exists");
            }
        });
        return deferred.promise;
    }
    // Get file contents and create the new files in the folder
    createFiles(folderPath, type) {
        const deferred = Q.defer();
        const af = new AddFiles();
        var files = [];
        let ff = new folder_files_1.FolderFiles();
        switch (type) {
            case "responsive":
                files = ff.responsiveProyect(folderPath);
                break;
            case "simple":
                files = ff.simpleProyect(folderPath);
                break;
            case "extras":
                files = ff.extras(folderPath);
                break;
            case "main":
                files = ff.main(folderPath);
                break;
            case "login":
                files = ff.login(folderPath);
                break;
            case "form":
                files = ff.form(folderPath);
                break;
            case "buttons":
                files = ff.buttons(folderPath);
                break;
            case "services":
                files = ff.services(folderPath);
                break;
            default:
                break;
        }
        // write files
        af.writeFiles(files).then((errors) => {
            if (errors.length > 0) {
                vscode_1.window.showErrorMessage(`${errors.length} file(s) could not be created. I'm sorry :(`);
            }
            else {
                deferred.resolve(folderPath);
            }
        });
        return deferred.promise;
    }
    writeFiles(files) {
        const deferred = Q.defer();
        var errors = [];
        files.forEach((file) => {
            fs.writeFile(file.name, file.content, (err) => {
                if (err) {
                    errors.push(err.message);
                }
                deferred.resolve(errors);
            });
        });
        return deferred.promise;
    }
    /**
     * abrir archivo creado en el navegador
     */
    openPageInEditor(folderName) {
        const deferred = Q.defer();
        var inputName = path.parse(folderName).name;
        vscode_1.workspace
            .openTextDocument(path.join(folderName, `${inputName}-page.dart`))
            .then((textDocument) => {
            if (!textDocument) {
                return;
            }
            vscode_1.window.showTextDocument(textDocument).then((editor) => {
                if (!editor) {
                    return;
                }
                deferred.resolve(editor);
            });
        });
        return deferred.promise;
    }
}
exports.AddFiles = AddFiles;
//# sourceMappingURL=add-files.js.map