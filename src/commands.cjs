
// import * as vscode from 'vscode'
const vscode = require('vscode')

function openCurrent(textEditor, edit) {
    doc = textEditor.document
    if (doc.isUntitled) {
        thenable = vscode.window.showSaveDialog({"filters": {"brikWork Layout File":["bwl"]}})
        thenable.then
    } else {
        vscode.window.showInformationMessage(textEditor.document.fileName)
    }
}

function setAppPath() {
    path = vscode.window.showOpenDialog()
    path.then((result)=> {
        if (result === undefined) {
            //don't set
        } else {
            vscode.workspace.getConfiguration('')
        }
    })
}

// export function activate(context) {
module.exports.activate = function (context) {

    disposable = vscode.commands.registerCommand('brikWork.setAppPath', setAppPath)

    disposable = vscode.commands.registerTextEditorCommand('brikWork.openCurrent', openCurrent)
    context.subscriptions.push(disposable)
}