import { ExtensionContext, commands, window, SnippetString } from "vscode";
import { AddFiles } from "./add-files";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  /**
   * WRAPPERSSSS!!!!
   */

  context.subscriptions.push(
    commands.registerCommand("extension.wrapInContainer", () =>
      insertSnippet(
        "${1:Container}(\n" + getSpacer() + "child: $2",
        "\n)",
        getSpacer()
      )
    )
  );
  context.subscriptions.push(
    commands.registerCommand("extension.wrapInStack", () =>
      insertSnippet(
        "${1:Stack}(\n" + getSpacer() + "children: [\n" + getSpacer().repeat(2),
        "$2\n" + getSpacer() + "]\n)",
        getSpacer().repeat(2)
      )
    )
  );
  context.subscriptions.push(
    commands.registerCommand("extension.wrapInColumn", () =>
      insertSnippet(
        "${1:Column}(\n" +
          getSpacer() +
          "children: [\n" +
          getSpacer().repeat(2),
        "$2\n" + getSpacer() + "]\n)",
        getSpacer().repeat(2)
      )
    )
  );
  context.subscriptions.push(
    commands.registerCommand("extension.wrapInRow", () =>
      insertSnippet(
        "${1:Row}(\n" + getSpacer() + "children: [\n" + getSpacer().repeat(2),
        "$2\n" + getSpacer() + "]\n)",
        getSpacer().repeat(2)
      )
    )
  );
  context.subscriptions.push(
    commands.registerCommand("extension.wrapInListView", () =>
      insertSnippet(
        "${1:ListView}(\n" +
          getSpacer() +
          "children: [\n" +
          getSpacer().repeat(2),
        "$2\n" + getSpacer() + "]\n)",
        getSpacer().repeat(2)
      )
    )
  );
  context.subscriptions.push(
    commands.registerCommand("extension.wrapInPositioned", () =>
      insertSnippet(
        "${1:Positioned}(\n" + getSpacer() + "child: $2",
        "\n)",
        getSpacer()
      )
    )
  );
  context.subscriptions.push(
    commands.registerCommand("extension.wrapInExpanded", () =>
      insertSnippet(
        "${1:Expanded}(\n" + getSpacer() + "child: $2",
        "\n)",
        getSpacer()
      )
    )
  );
  context.subscriptions.push(
    commands.registerCommand("extension.wrapInText", () =>
      insertSnippet("${1:Text}(\n" + "''", "\n)", "")
    )
  );

  /**
   * FILESSSSS
   */

  var addFlutterFile = commands.registerCommand(
    "extension.addFlutterFile",
    (args: any) => {
      const addFiles: AddFiles = new AddFiles();
      addFiles
        .showFileNameDialog(args)
        .then((path: any) => addFiles.createFolder(path))
        .then((path: any) => addFiles.createFiles(path, "simple"))
        .then(addFiles.openPageInEditor)
        .catch((err: any) => {
          if (err) {
            window.showErrorMessage(err);
          }
        });
    }
  );

  var addFlutterWebFile = commands.registerCommand(
    "extension.addFlutterWebFile",
    (args: any) => {
      const addFiles: AddFiles = new AddFiles();
      addFiles
        .showFileNameDialog(args)
        .then((path: any) => addFiles.createFolder(path))
        .then((path: any) => addFiles.createFiles(path, "responsive"))
        .then(addFiles.openPageInEditor)
        .catch((err: any) => {
          if (err) {
            window.showErrorMessage(err);
          }
        });
    }
  );

  var addFluterBaseProyect = commands.registerCommand(
    "extension.addFluterBaseProyect",
    (args: any) => {
      const addFiles: AddFiles = new AddFiles();
      addFiles.createFiles(args.fsPath, "main");
      /// Se crea carpeta Extras
      addFiles
        .createFolder(args.fsPath + "/tools")
        .then((x: any) => {
          addFiles.createFiles(x, "extras");
        })
        /// Servicios
        .then(() =>
          addFiles.createFolder(args.fsPath + "/services").then((x: any) => {
            addFiles.createFiles(x, "services");
          })
        )
        /// Providers
        //.then(() => addFiles.createFolder(args.fsPath + "/providers"))
        /// Vistas
        .then(() =>
          addFiles.createFolder(args.fsPath + "/src").then(() => {
            addFiles
              .createFolder(args.fsPath + "/src/home")
              .then((x: any) => {
                addFiles.createFiles(x, "simple");
              })
              .then(() => {
                addFiles
                  .createFolder(args.fsPath + "/src/login")
                  .then((x: any) => {
                    addFiles.createFiles(x, "login");
                  });
              });
          })
        )
        /// Componentes reutilizables
        .then(() =>
          addFiles.createFolder(args.fsPath + "/widgets").then(() => {
            // Form Inputs
            addFiles
              .createFolder(args.fsPath + "/widgets/inputs")
              .then((x: any) => {
                addFiles.createFiles(x, "form");
              });
            // Buttons
            addFiles
              .createFolder(args.fsPath + "/widgets/buttons")
              .then((x: any) => {
                addFiles.createFiles(x, "buttons");
              });
          })
        )

        .catch((err: any) => {
          if (err) {
            window.showErrorMessage(err);
          }
        });
    }
  );

  context.subscriptions.push(addFlutterFile);
  context.subscriptions.push(addFlutterWebFile);
  context.subscriptions.push(addFluterBaseProyect);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getSpacer() {
  const editor = window.activeTextEditor;
  if (editor && editor.options.insertSpaces) {
    return " ".repeat(<number>editor.options.tabSize);
  }
  return "\t";
}

function insertSnippet(before: string, after: string, space: string) {
  const editor = window.activeTextEditor;
  if (editor && editor.selection.start !== editor.selection.end) {
    var selection = editor.selection;
    var child = editor.document.getText(selection).trimLeft();
    var line = editor.document.lineAt(selection.start);
    child = child.replace(
      new RegExp("\n\\s{" + line.firstNonWhitespaceCharacterIndex + "}", "gm"),
      "\n" + space
    );
    var replaceText = before + child + after;
    if (child.substr(-1) === ",") {
      replaceText += ",";
    }
    editor.insertSnippet(new SnippetString(replaceText), selection);
  }
}
