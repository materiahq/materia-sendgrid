// External modules
// const CommonModule = (window as any).angular.common.CommonModule;
const CommonModule = (window as any).angular.common.CommonModule;
const NgModule = (window as any).angular.core.NgModule;
// Angular CDK
// Angular material
const MatButtonModule = (window as any).angular.material.MatButtonModule;
const MatCardModule = (window as any).angular.material.MatCardModule;
const MatIconModule = (window as any).angular.material.MatIconModule;
const MatTooltipModule = (window as any).angular.material.MatTooltipModule;
const MatListModule = (window as any).angular.material.MatListModule;
const FlexLayoutModule = (window as any).angular.flexLayout.FlexLayoutModule;

// Components and directives
import { SendgridViewComponent } from "./components";

// Addon class
export { SendgridAddon } from "./sendgrid.addon";

@NgModule({
	imports: [
		// Angular modules
		CommonModule,

		FlexLayoutModule,

		// Material modules
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatListModule,
		MatTooltipModule
	],
	exports: [SendgridViewComponent],
	declarations: [SendgridViewComponent],
	entryComponents: [SendgridViewComponent],
	providers: []
})
export class SendgridModule {
	static getViewComponent() {
		return SendgridViewComponent;
	}
}