// This file will be populated by pbiviz when you run npm install
// For now, we'll create a minimal placeholder
// The actual type definitions will be installed via powerbi-visuals-api package

declare module "powerbi-visuals-api" {
    export = powerbi;
}

declare module "powerbi-visuals-utils-dataviewutils" {
    export = powerbi.extensibility.utils.dataview;
}

declare module "powerbi-visuals-utils-formattingutils" {
    export = powerbi.extensibility.utils.formatting;
}
