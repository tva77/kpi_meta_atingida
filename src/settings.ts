"use strict";

import powerbi from "powerbi-visuals-api";
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import DataView = powerbi.DataView;

class ValueSettings extends formattingSettings.SimpleCard {
    public name: string = "valueSettings";
    public displayName: string = "Configurações do Valor";

    public fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Tamanho da Fonte",
        value: 20,
    });

    public fontColor = new formattingSettings.ColorPicker({
        name: "fontColor",
        displayName: "Cor da Fonte",
        value: { value: "#000000" },
    });

    public fontFamily = new formattingSettings.TextInput({
        name: "fontFamily",
        displayName: "Família da Fonte",
        value: "DIN, sans-serif",
        placeholder: "DIN, sans-serif",
    });

    public displayUnits = new formattingSettings.NumUpDown({
        name: "displayUnits",
        displayName: "Unidades de Exibição",
        value: 1,
    });

    public decimalPlaces = new formattingSettings.NumUpDown({
        name: "decimalPlaces",
        displayName: "Casas Decimais",
        value: 0,
    });

    public slices: formattingSettings.Slice[] = [
        this.fontSize,
        this.fontColor,
        this.fontFamily,
        this.displayUnits,
        this.decimalPlaces,
    ];
}

class MetaValueSettings extends formattingSettings.SimpleCard {
    public name: string = "metaValueSettings";
    public displayName: string = "Configurações da Meta";

    public fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Tamanho da Fonte",
        value: 12,
    });

    public fontColor = new formattingSettings.ColorPicker({
        name: "fontColor",
        displayName: "Cor da Fonte",
        value: { value: "#000000" },
    });

    public fontFamily = new formattingSettings.TextInput({
        name: "fontFamily",
        displayName: "Família da Fonte",
        value: "DIN, sans-serif",
        placeholder: "DIN, sans-serif",
    });

    public displayUnits = new formattingSettings.NumUpDown({
        name: "displayUnits",
        displayName: "Unidades de Exibição",
        value: 1,
    });

    public decimalPlaces = new formattingSettings.NumUpDown({
        name: "decimalPlaces",
        displayName: "Casas Decimais",
        value: 0,
    });

    public slices: formattingSettings.Slice[] = [
        this.fontSize,
        this.fontColor,
        this.fontFamily,
        this.displayUnits,
        this.decimalPlaces,
    ];
}

class PercentageSettings extends formattingSettings.SimpleCard {
    public name: string = "percentageSettings";
    public displayName: string = "Configurações da Porcentagem";

    public fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Tamanho da Fonte",
        value: 12,
    });

    public fontColor = new formattingSettings.ColorPicker({
        name: "fontColor",
        displayName: "Cor da Fonte",
        value: { value: "#F59E0B" },
    });

    public fontFamily = new formattingSettings.TextInput({
        name: "fontFamily",
        displayName: "Família da Fonte",
        value: "Segoe UI, sans-serif",
        placeholder: "Segoe UI, sans-serif",
    });

    public slices: formattingSettings.Slice[] = [
        this.fontSize,
        this.fontColor,
        this.fontFamily,
    ];
}

class DifferenceSettings extends formattingSettings.SimpleCard {
    public name: string = "differenceSettings";
    public displayName: string = "Configurações da Diferença";

    public fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Tamanho da Fonte",
        value: 12,
    });

    public fontColor = new formattingSettings.ColorPicker({
        name: "fontColor",
        displayName: "Cor da Fonte",
        value: { value: "#6B7280" },
    });

    public fontFamily = new formattingSettings.TextInput({
        name: "fontFamily",
        displayName: "Família da Fonte",
        value: "DIN, sans-serif",
        placeholder: "DIN, sans-serif",
    });

    public displayUnits = new formattingSettings.NumUpDown({
        name: "displayUnits",
        displayName: "Unidades de Exibição",
        value: 1,
    });

    public decimalPlaces = new formattingSettings.NumUpDown({
        name: "decimalPlaces",
        displayName: "Casas Decimais",
        value: 0,
    });

    public slices: formattingSettings.Slice[] = [
        this.fontSize,
        this.fontColor,
        this.fontFamily,
        this.displayUnits,
        this.decimalPlaces,
    ];
}

export class VisualSettings extends formattingSettings.Model {
    public valueSettings: ValueSettings = new ValueSettings();
    public metaValueSettings: MetaValueSettings = new MetaValueSettings();
    public percentageSettings: PercentageSettings = new PercentageSettings();
    public differenceSettings: DifferenceSettings = new DifferenceSettings();

    public cards: formattingSettings.Cards[] = [
        this.valueSettings,
        this.metaValueSettings,
        this.percentageSettings,
        this.differenceSettings,
    ];

    public static parse(dataView: DataView): VisualSettings {
        const settings = new VisualSettings();
        if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
            return settings;
        }

        const objects = dataView.metadata.objects;

        // Parse value settings
        if (objects["valueSettings"]) {
            const valueObj = objects["valueSettings"];
            if (valueObj["fontSize"]) settings.valueSettings.fontSize.value = valueObj["fontSize"] as number;
            if (valueObj["fontColor"]) settings.valueSettings.fontColor.value = valueObj["fontColor"] as any;
            if (valueObj["fontFamily"]) settings.valueSettings.fontFamily.value = valueObj["fontFamily"] as string;
            if (valueObj["displayUnits"] !== undefined) settings.valueSettings.displayUnits.value = valueObj["displayUnits"] as number;
            if (valueObj["decimalPlaces"] !== undefined) settings.valueSettings.decimalPlaces.value = valueObj["decimalPlaces"] as number;
        }

        // Parse meta value settings
        if (objects["metaValueSettings"]) {
            const metaValueObj = objects["metaValueSettings"];
            if (metaValueObj["fontSize"]) settings.metaValueSettings.fontSize.value = metaValueObj["fontSize"] as number;
            if (metaValueObj["fontColor"]) settings.metaValueSettings.fontColor.value = metaValueObj["fontColor"] as any;
            if (metaValueObj["fontFamily"]) settings.metaValueSettings.fontFamily.value = metaValueObj["fontFamily"] as string;
            if (metaValueObj["displayUnits"] !== undefined) settings.metaValueSettings.displayUnits.value = metaValueObj["displayUnits"] as number;
            if (metaValueObj["decimalPlaces"] !== undefined) settings.metaValueSettings.decimalPlaces.value = metaValueObj["decimalPlaces"] as number;
        }

        // Parse percentage settings
        if (objects["percentageSettings"]) {
            const percentageObj = objects["percentageSettings"];
            if (percentageObj["fontSize"]) settings.percentageSettings.fontSize.value = percentageObj["fontSize"] as number;
            if (percentageObj["fontColor"]) settings.percentageSettings.fontColor.value = percentageObj["fontColor"] as any;
            if (percentageObj["fontFamily"]) settings.percentageSettings.fontFamily.value = percentageObj["fontFamily"] as string;
        }

        // Parse difference settings
        if (objects["differenceSettings"]) {
            const differenceObj = objects["differenceSettings"];
            if (differenceObj["fontSize"]) settings.differenceSettings.fontSize.value = differenceObj["fontSize"] as number;
            if (differenceObj["fontColor"]) settings.differenceSettings.fontColor.value = differenceObj["fontColor"] as any;
            if (differenceObj["fontFamily"]) settings.differenceSettings.fontFamily.value = differenceObj["fontFamily"] as string;
            if (differenceObj["displayUnits"] !== undefined) settings.differenceSettings.displayUnits.value = differenceObj["displayUnits"] as number;
            if (differenceObj["decimalPlaces"] !== undefined) settings.differenceSettings.decimalPlaces.value = differenceObj["decimalPlaces"] as number;
        }

        return settings;
    }

    public static getDefault(): VisualSettings {
        return new VisualSettings();
    }
}
