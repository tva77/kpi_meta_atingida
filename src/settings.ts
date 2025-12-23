"use strict";

import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;

export class ValueSettings {
    public fontSize: number = 24;
    public fontColor: string = "#000000";
    public fontFamily: string = "DIN, sans-serif";
    public displayUnits: number = 1; // 0 = Auto, 1 = None, 1000 = K, 1000000 = M, 1000000000 = B
    public decimalPlaces: number = 0;
}

export class MetaValueSettings {
    public fontSize: number = 16;
    public fontColor: string = "#000000";
    public fontFamily: string = "DIN, sans-serif";
    public displayUnits: number = 1; // 0 = Auto, 1 = None, 1000 = K, 1000000 = M, 1000000000 = B
    public decimalPlaces: number = 0;
}

export class PercentageSettings {
    public fontSize: number = 16;
    public fontColor: string = "#F59E0B";
    public fontFamily: string = "Segoe UI, sans-serif";
}

export class DifferenceSettings {
    public fontSize: number = 14;
    public fontColor: string = "#6B7280";
    public fontFamily: string = "DIN, sans-serif";
    public displayUnits: number = 1; // 0 = Auto, 1 = None, 1000 = K, 1000000 = M, 1000000000 = B
    public decimalPlaces: number = 0;
}

export class VisualSettings {
    public valueSettings: ValueSettings = new ValueSettings();
    public metaValueSettings: MetaValueSettings = new MetaValueSettings();
    public percentageSettings: PercentageSettings = new PercentageSettings();
    public differenceSettings: DifferenceSettings = new DifferenceSettings();

    public static parse(dataView: DataView): VisualSettings {
        const settings = new VisualSettings();
        if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
            return settings;
        }

        const objects = dataView.metadata.objects;

        // Parse value settings
        if (objects["valueSettings"]) {
            const valueObj = objects["valueSettings"];
            if (valueObj["fontSize"]) settings.valueSettings.fontSize = valueObj["fontSize"] as number;
            if (valueObj["fontColor"]) settings.valueSettings.fontColor = valueObj["fontColor"] as string;
            if (valueObj["fontFamily"]) settings.valueSettings.fontFamily = valueObj["fontFamily"] as string;
            if (valueObj["displayUnits"] !== undefined) settings.valueSettings.displayUnits = valueObj["displayUnits"] as number;
            if (valueObj["decimalPlaces"] !== undefined) settings.valueSettings.decimalPlaces = valueObj["decimalPlaces"] as number;
        }

        // Parse meta value settings
        if (objects["metaValueSettings"]) {
            const metaValueObj = objects["metaValueSettings"];
            if (metaValueObj["fontSize"]) settings.metaValueSettings.fontSize = metaValueObj["fontSize"] as number;
            if (metaValueObj["fontColor"]) settings.metaValueSettings.fontColor = metaValueObj["fontColor"] as string;
            if (metaValueObj["fontFamily"]) settings.metaValueSettings.fontFamily = metaValueObj["fontFamily"] as string;
            if (metaValueObj["displayUnits"] !== undefined) settings.metaValueSettings.displayUnits = metaValueObj["displayUnits"] as number;
            if (metaValueObj["decimalPlaces"] !== undefined) settings.metaValueSettings.decimalPlaces = metaValueObj["decimalPlaces"] as number;
        }

        // Parse percentage settings
        if (objects["percentageSettings"]) {
            const percentageObj = objects["percentageSettings"];
            if (percentageObj["fontSize"]) settings.percentageSettings.fontSize = percentageObj["fontSize"] as number;
            if (percentageObj["fontColor"]) settings.percentageSettings.fontColor = percentageObj["fontColor"] as string;
            if (percentageObj["fontFamily"]) settings.percentageSettings.fontFamily = percentageObj["fontFamily"] as string;
        }

        // Parse difference settings
        if (objects["differenceSettings"]) {
            const differenceObj = objects["differenceSettings"];
            if (differenceObj["fontSize"]) settings.differenceSettings.fontSize = differenceObj["fontSize"] as number;
            if (differenceObj["fontColor"]) settings.differenceSettings.fontColor = differenceObj["fontColor"] as string;
            if (differenceObj["fontFamily"]) settings.differenceSettings.fontFamily = differenceObj["fontFamily"] as string;
            if (differenceObj["displayUnits"] !== undefined) settings.differenceSettings.displayUnits = differenceObj["displayUnits"] as number;
            if (differenceObj["decimalPlaces"] !== undefined) settings.differenceSettings.decimalPlaces = differenceObj["decimalPlaces"] as number;
        }

        return settings;
    }

    public static getDefault(): VisualSettings {
        return new VisualSettings();
    }

    public static enumerateObjectInstances(settings: VisualSettings, options: powerbi.EnumerateVisualObjectInstancesOptions): powerbi.VisualObjectInstanceEnumeration {
        const objectName = options.objectName;
        const objectEnumeration: powerbi.VisualObjectInstance[] = [];

        switch (objectName) {
            case "valueSettings":
                objectEnumeration.push({
                    objectName: objectName,
                    properties: {
                        fontSize: settings.valueSettings.fontSize,
                        fontColor: settings.valueSettings.fontColor,
                        fontFamily: settings.valueSettings.fontFamily,
                        displayUnits: settings.valueSettings.displayUnits,
                        decimalPlaces: settings.valueSettings.decimalPlaces
                    },
                    selector: null
                });
                break;
            case "metaValueSettings":
                objectEnumeration.push({
                    objectName: objectName,
                    properties: {
                        fontSize: settings.metaValueSettings.fontSize,
                        fontColor: settings.metaValueSettings.fontColor,
                        fontFamily: settings.metaValueSettings.fontFamily,
                        displayUnits: settings.metaValueSettings.displayUnits,
                        decimalPlaces: settings.metaValueSettings.decimalPlaces
                    },
                    selector: null
                });
                break;
            case "percentageSettings":
                objectEnumeration.push({
                    objectName: objectName,
                    properties: {
                        fontSize: settings.percentageSettings.fontSize,
                        fontColor: settings.percentageSettings.fontColor,
                        fontFamily: settings.percentageSettings.fontFamily
                    },
                    selector: null
                });
                break;
            case "differenceSettings":
                objectEnumeration.push({
                    objectName: objectName,
                    properties: {
                        fontSize: settings.differenceSettings.fontSize,
                        fontColor: settings.differenceSettings.fontColor,
                        fontFamily: settings.differenceSettings.fontFamily,
                        displayUnits: settings.differenceSettings.displayUnits,
                        decimalPlaces: settings.differenceSettings.decimalPlaces
                    },
                    selector: null
                });
                break;
        }

        return objectEnumeration;
    }
}
