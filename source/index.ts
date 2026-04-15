import vscode = require('vscode')
import self = require('../package.json')

let channel: vscode.OutputChannel

async function activate(context: vscode.ExtensionContext) {
    console.log('hello')
    channel = vscode.window.createOutputChannel(self.displayName, self.contributes.languages[0].id)
    channel.appendLine('hello')

    vscode.window.showInformationMessage('Yo')
}

function deactivate() {
    console.log('bye')
    channel.appendLine('bye')
    channel.dispose()
}

export = {
    activate,
    deactivate
}
