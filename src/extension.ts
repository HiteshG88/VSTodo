import * as vscode from 'vscode';
import { helloWorldPanel } from './helloWorldPanel';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"VSTodo-sidebar",
		sidebarProvider
	  )
	);

	context.subscriptions.push(vscode.commands.registerCommand('vstodo.helloWorld', () => {
		// vscode.window.showInformationMessage('Hello from VsTodo!');
		helloWorldPanel.createOrShow(context.extensionUri);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vstodo.refresh',async () => {
		// helloWorldPanel.kill();
		// helloWorldPanel.createOrShow(context.extensionUri);
		await vscode.commands.executeCommand("workbench.action.closeSidebar");
		await vscode.commands.executeCommand("workbench.view.extension.VSTodo-sidebar-view");
		// setTimeout(() => {
		// 	vscode.commands.executeCommand(
		// 		"workbench.action.webview.openDeveloperTools"
		// 	);
		// }, 500);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vstodo.askQuestion', async () => {
		const answer = await vscode.window.showInformationMessage('how is your day', 'good', 'bad');
		if (answer === 'bad') {
			vscode.window.showInformationMessage('Sorry to hear that');
		} else {
			console.log({ answer });	
		}
	})); 
}

export function deactivate() {}
