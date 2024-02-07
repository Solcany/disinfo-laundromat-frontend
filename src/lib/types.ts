export interface FormData {
	region: LabeledValue;
	language: LabeledValue;
	browser: LabeledValue;
	content: string;
	[index: string]: string | LabeledValue;
}

export interface LabeledValue {
	label: string;
	value: any;
}
