import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  const commands = [
    {
      command: 'chezmoi-tools.add',
      title: 'Add to Chezmoi',
      handler: (uri: vscode.Uri | undefined) => {
        if (!uri) {
          vscode.window.showErrorMessage("Please select a file to add to Chezmoi.");
          return;
        }
        runChezmoiCommand('add', uri);
      },
    },
    {
      command: 'chezmoi-tools.forget',
      title: 'Forget from Chezmoi',
      handler: (uri: vscode.Uri | undefined) => {
        if (!uri) {
          vscode.window.showErrorMessage("Please select a file to remove from Chezmoi.");
          return;
        }
        runChezmoiCommand('forget', uri);
      },
    },
    {
      command: 'chezmoi-tools.edit',
      title: 'Edit with Chezmoi',
      handler: (uri: vscode.Uri | undefined) => {
        if (!uri) {
          vscode.window.showErrorMessage("Please select a file to edit with Chezmoi.");
          return;
        }
        runChezmoiCommand('edit', uri);
      },
    },
    {
      command: 'chezmoi-tools.apply',
      title: 'Apply Chezmoi Changes',
      handler: () => runChezmoiCommand('apply'),
    },
    {
      command: 'chezmoi-tools.diff',
      title: 'Show Chezmoi Diff',
      handler: () => runChezmoiCommand('diff'),
    },
  ];

  commands.forEach(({ command, handler }) => {
    const disposable = vscode.commands.registerCommand(command, handler);
    context.subscriptions.push(disposable);
    // vscode.commands.executeCommand('setContext', `chezmoi-tools.${command}`, true);
    vscode.commands.executeCommand('setContext', command, true);
  });

  vscode.window.showInformationMessage('Chezmoi Tools is now active!');
}

function runChezmoiCommand(command: string, uri?: vscode.Uri) {
  const filePath = uri?.fsPath;
  const fullCommand = `chezmoi ${command} ${filePath || ''}`.trim();

  exec(
    fullCommand,
    { env: { ...process.env, HOME: process.env.HOME } },
    (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(
          `Failed to execute Chezmoi command '${command}': ${stderr || error.message}`
        );
        return;
      }
      const outputMessage = stdout.trim() || "Command executed successfully.";
      vscode.window.showInformationMessage(
        `Chezmoi command '${command}' completed:\n${outputMessage}`
      );
    }
  );
}

export function deactivate() {
  vscode.window.showInformationMessage('Chezmoi Tools is now deactivated.');
}
