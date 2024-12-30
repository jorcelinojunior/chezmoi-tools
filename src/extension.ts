import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  // Registrar comandos da extensão
  const commands = [
    {
      command: 'chezmoi-tools.add',
      title: 'Add to Chezmoi',
      handler: (uri: vscode.Uri) => runChezmoiCommand('add', uri),
    },
    {
      command: 'chezmoi-tools.forget',
      title: 'Forget from Chezmoi',
      handler: (uri: vscode.Uri) => runChezmoiCommand('forget', uri),
    },
    {
      command: 'chezmoi-tools.edit',
      title: 'Edit with Chezmoi',
      handler: (uri: vscode.Uri) => runChezmoiCommand('edit', uri),
    },
    {
      command: 'chezmoi-tools.apply',
      title: 'Apply Changes',
      handler: () => runChezmoiCommand('apply'),
    },
    {
      command: 'chezmoi-tools.diff',
      title: 'Show Diff',
      handler: () => runChezmoiCommand('diff'),
    },
  ];

  commands.forEach(({ command, title, handler }) => {
    const disposable = vscode.commands.registerCommand(command, handler);
    context.subscriptions.push(disposable);
    vscode.commands.executeCommand('setContext', `chezmoi-tools.${command}`, true);
  });

  vscode.window.showInformationMessage('Chezmoi Tools is now active!');
}

// Executa comandos do Chezmoi
function runChezmoiCommand(command: string, uri?: vscode.Uri) {
  const filePath = uri?.fsPath;
  const fullCommand = `chezmoi ${command} ${filePath || ''}`.trim();

  exec(fullCommand, { env: { ...process.env, HOME: process.env.HOME } }, (error, stdout, stderr) => {
    if (error) {
      vscode.window.showErrorMessage(`Erro ao executar chezmoi ${command}: ${stderr}`);
      return;
    }
    vscode.window.showInformationMessage(`Comando '${command}' executado com sucesso:\n${stdout}`);
  });
}

export function deactivate() {
  vscode.window.showInformationMessage('Chezmoi Tools is now deactivated.');
}
