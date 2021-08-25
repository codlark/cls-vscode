
// import * as vscode from 'vscode'
const vscode = require('vscode')
const spawn = require('child_process').spawn

function openLayout(filename) {
    config = vscode.workspace.getConfiguration('brikWork')
    appPath = config.get('appPath')
    spawn(appPath, [filename])

}

function openCurrent(textEditor, edit) {
    doc = textEditor.document
    if (doc.isUntitled) {
        vscode.window.showWarningMessage("Please save layout file before trying to open in brikWork")

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

            config = vscode.workspace.getConfiguration('brikWork')
            config.update('appPath', filename, true)

        }
    })
}

// export function activate(context) {
module.exports.activate = function (context) {

    disposable = vscode.commands.registerCommand('brikWork.setAppPath', setAppPath)
    context.subscriptions.push(disposable)
    disposable = vscode.commands.registerTextEditorCommand('brikWork.openCurrent', openCurrent)
    context.subscriptions.push(disposable)
}