const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "freezedcat" is now active!');

  let disposable = vscode.commands.registerCommand(
    "sunmkim.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from freezingcat!");
    }
  );

  vscode.commands.registerCommand("sunmkim.openDartJ", function () {
    const url = "https://dartj.web.app";
    vscode.commands.executeCommand("simpleBrowser.show", url);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
