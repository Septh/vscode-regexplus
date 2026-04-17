import vscode = require('vscode')
import self = require('../package.json')

// NB: this file is unused at the moment, the extension has no code, only grammars.

let outputChannel: vscode.OutputChannel

async function activate(context: vscode.ExtensionContext) {
    console.log('hello')
    outputChannel = vscode.window.createOutputChannel(self.displayName, self.contributes.languages[0].id)
}

function deactivate() {
    outputChannel.dispose()
    console.log('bye')
}

export = {
    activate,
    deactivate
}
