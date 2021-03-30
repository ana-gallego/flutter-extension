"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const add_files_1 = require("./add-files");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    /**
     * WRAPPERSSSS!!!!
     */
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInContainer', () => insertSnippet("${1:Container}(\n" + getSpacer() + "child: $2", "\n)", getSpacer())));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInStack', () => insertSnippet("${1:Stack}(\n" + getSpacer() + "children: [\n" + getSpacer().repeat(2), "$2\n" + getSpacer() + "]\n)", getSpacer().repeat(2))));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInColumn', () => insertSnippet("${1:Column}(\n" + getSpacer() + "children: [\n" + getSpacer().repeat(2), "$2\n" + getSpacer() + "]\n)", getSpacer().repeat(2))));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInRow', () => insertSnippet("${1:Row}(\n" + getSpacer() + "children: [\n" + getSpacer().repeat(2), "$2\n" + getSpacer() + "]\n)", getSpacer().repeat(2))));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInListView', () => insertSnippet("${1:ListView}(\n" + getSpacer() + "children: [\n" + getSpacer().repeat(2), "$2\n" + getSpacer() + "]\n)", getSpacer().repeat(2))));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInPositioned', () => insertSnippet("${1:Positioned}(\n" + getSpacer() + "child: $2", "\n)", getSpacer())));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInExpanded', () => insertSnippet("${1:Expanded}(\n" + getSpacer() + "child: $2", "\n)", getSpacer())));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.wrapInText', () => insertSnippet("${1:Text}(\n" + "''", "\n)", "")));
    /**
     * FILESSSSS
     */
    var addFlutterFile = vscode_1.commands.registerCommand('extension.addFlutterFile', (args) => {
        const addFiles = new add_files_1.AddFiles();
        addFiles.showFileNameDialog(args)
            .then((path) => addFiles.createFolder(path))
            .then((path) => addFiles.createFiles(path, 'simple'))
            .then(addFiles.openPageInEditor)
            .catch((err) => {
            if (err) {
                vscode_1.window.showErrorMessage(err);
            }
        });
    });
    var addFlutterWebFile = vscode_1.commands.registerCommand('extension.addFlutterWebFile', (args) => {
        const addFiles = new add_files_1.AddFiles();
        addFiles.showFileNameDialog(args)
            .then((path) => addFiles.createFolder(path))
            .then((path) => addFiles.createFiles(path, 'responsive'))
            .then(addFiles.openPageInEditor)
            .catch((err) => {
            if (err) {
                vscode_1.window.showErrorMessage(err);
            }
        });
    });
    var addFluterBaseProyect = vscode_1.commands.registerCommand('extension.addFluterBaseProyect', (args) => {
        const addFiles = new add_files_1.AddFiles();
        addFiles.createFiles(args.fsPath, "main");
        /// Se crea carpeta Extras
        addFiles.createFolder(args.fsPath + "/tools")
            .then((x) => {
            addFiles.createFiles(x, 'extras');
        })
            /// Servicios
            .then(() => addFiles.createFolder(args.fsPath + "/services").then((x) => {
            addFiles.createFiles(x, 'services');
        }))
            /// Providers
            //.then(() => addFiles.createFolder(args.fsPath + "/providers"))
            /// Vistas
            .then(() => addFiles.createFolder(args.fsPath + "/src")
            .then(() => {
            addFiles.createFolder(args.fsPath + "/src/home")
                .then((x) => {
                addFiles.createFiles(x, 'simple');
            })
                .then(() => {
                addFiles.createFolder(args.fsPath + "/src/login")
                    .then((x) => {
                    addFiles.createFiles(x, 'login');
                });
            });
        }))
            /// Componentes reutilizables
            .then(() => addFiles.createFolder(args.fsPath + "/widgets").then(() => {
            // Form Inputs	
            addFiles.createFolder(args.fsPath + "/widgets/inputs").then((x) => {
                addFiles.createFiles(x, 'form');
            });
            // Buttons	
            addFiles.createFolder(args.fsPath + "/widgets/buttons").then((x) => {
                addFiles.createFiles(x, 'buttons');
            });
        }))
            .catch((err) => {
            if (err) {
                vscode_1.window.showErrorMessage(err);
            }
        });
    });
    context.subscriptions.push(addFlutterFile);
    context.subscriptions.push(addFlutterWebFile);
    context.subscriptions.push(addFluterBaseProyect);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function getSpacer() {
    const editor = vscode_1.window.activeTextEditor;
    if (editor && editor.options.insertSpaces) {
        return ' '.repeat(editor.options.tabSize);
    }
    return '\t';
}
function insertSnippet(before, after, space) {
    const editor = vscode_1.window.activeTextEditor;
    if (editor && editor.selection.start !== editor.selection.end) {
        var selection = editor.selection;
        var child = editor.document.getText(selection).trimLeft();
        var line = editor.document.lineAt(selection.start);
        child = child.replace(new RegExp("\n\\s{" + line.firstNonWhitespaceCharacterIndex + "}", "gm"), "\n" + space);
        var replaceText = before + child + after;
        if (child.substr(-1) === ",") {
            replaceText += ",";
        }
        editor.insertSnippet(new vscode_1.SnippetString(replaceText), selection);
    }
}
//# sourceMappingURL=extension.js.map