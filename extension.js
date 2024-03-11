const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function isDartFile(file) {
  return file.endsWith(".dart");
}

// current directory file list get
function flattenDirectory(dir) {
  const dirPath = dir || vscode.workspace.rootPath;
  const files = fs.readdirSync(dirPath);
  const result = [];
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      result.push(...flattenDirectory(filePath));
    } else {
      result.push(filePath);
    }
  });
  return result.filter(isDartFile);
}

function isIndexFile(file) {
  return file.endsWith("index.dart");
}

function createIndexFile(files, rPath) {
  const exports = files.map((file) => {
    // remove relative path
    if (isIndexFile(file)) {
      return "";
    }
    const rawPath = file.replace(rPath, "");
    return `export '.${rawPath}';`;
  });
  // remove empty string
  return exports.filter((exp) => exp !== "").join("\n");
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("activate extension!");

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

  vscode.commands.registerCommand("sunmkim.createIndex", function (uri) {
    // selected directory or root directory
    const startAt = uri.fsPath;

    if (!fs.existsSync(startAt)) {
      vscode.window.showErrorMessage("Invalid directory");
      return;
    }
    // flatten files list
    const files = flattenDirectory(uri.fsPath);
    // create index file
    const index = createIndexFile(files, startAt);

    const indexPath = path.join(startAt, "index.dart");

    fs.writeFileSync(indexPath, index);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
