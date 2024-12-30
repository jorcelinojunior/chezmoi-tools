import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Chezmoi Tools Extension Test Suite', () => {
  vscode.window.showInformationMessage('Starting Chezmoi Tools tests.');

  test('Extension should be activated', async () => {
    const extension = vscode.extensions.getExtension('jorcelinojunior.chezmoi-tools');
    assert.ok(extension, 'Extension is not found');
    assert.ok(extension.isActive, 'Extension is not active');
  });

  test('Commands should be registered', async () => {
    const registeredCommands = await vscode.commands.getCommands(true);
    const expectedCommands = [
      'chezmoi-tools.add',
      'chezmoi-tools.forget',
      'chezmoi-tools.edit',
      'chezmoi-tools.apply',
      'chezmoi-tools.diff',
    ];

    expectedCommands.forEach(command => {
      assert.ok(registeredCommands.includes(command), `Command '${command}' is not registered.`);
    });
  });

  test('Run Chezmoi Add Command', async () => {
    const uri = vscode.Uri.file('./../../images/icon.png');
    const command = 'chezmoi-tools.add';

    await vscode.commands.executeCommand(command, uri);
    assert.ok(true, 'Command executed without throwing an error.');
  });

  test('Run Chezmoi Forget Command', async () => {
    const uri = vscode.Uri.file('./../../images/icon.png');
    const command = 'chezmoi-tools.forget';

    await vscode.commands.executeCommand(command, uri);
    assert.ok(true, 'Command executed without throwing an error.');
  });

  test('Run Chezmoi Apply Command', async () => {
    const command = 'chezmoi-tools.apply';

    await vscode.commands.executeCommand(command);
    assert.ok(true, 'Command executed without throwing an error.');
  });

  test('Run Chezmoi Diff Command', async () => {
    const command = 'chezmoi-tools.diff';

    await vscode.commands.executeCommand(command);
    assert.ok(true, 'Command executed without throwing an error.');
  });
});
