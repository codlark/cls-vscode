
// import * as vscode from 'vscode'
const vscode = require('vscode')
const spawn = require('child_process').spawn

function openLayout(filename) {
    config = vscode.workspace.getConfiguration('cls')
    appPath = config.get('appPath')
    spawn(appPath, [filename])

}

function openCurrent(textEditor, _edit) {
    doc = textEditor.document
    if (doc.isUntitled) {
        vscode.window.showWarningMessage("Please save layout before trying to render.")

    } else if (doc.isDirty) {
        vscode.window.showInformationMessage('Layout file is unsaved, save first?',
        'Yes', 'No').then((res) => {
            if (res == 'Yes') {
                doc.save()
                openLayout(doc.fileName)
            }
        })

    } else {
        openLayout(doc.fileName)
    }
}

function setAppPath() {
    vscode.window.showOpenDialog().then((result) => {
        if (result !== undefined) {
            filename = result[0].fsPath
            // vscode.window.showInformationMessage(''+filename)

            config = vscode.workspace.getConfiguration('cls')
            config.update('appPath', filename, true)

        }
    })
}

// export function activate(context) {
module.exports.activate = function (context) {

    disposable = vscode.commands.registerCommand('cls.setAppPath', setAppPath)
    context.subscriptions.push(disposable)
    disposable = vscode.commands.registerTextEditorCommand('cls.openCurrent', openCurrent)
    context.subscriptions.push(disposable)
}