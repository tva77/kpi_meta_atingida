"use strict";

import powerbi from "powerbi-visuals-api";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;

import { VisualSettings } from "./settings";
import * as d3 from "d3";

export class Visual implements IVisual {
    private target: HTMLElement;
    private settings: VisualSettings;
    private host: IVisualHost;
    private container: d3.Selection<HTMLDivElement, any, any, any>;

    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        this.target = options.element;

        // Create main container
        this.container = d3.select(this.target)
            .append("div")
            .classed("kpi-card-container", true);
    }

    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);

        // Clear previous content
        this.container.selectAll("*").remove();

        const dataView: DataView = options.dataViews[0];

        if (!dataView || !dataView.categorical || !dataView.categorical.values) {
            return;
        }

        // Extract data
        let title = "Meta de Vendas Q4";
        let currentValue = 0;
        let targetValue = 0;

        // Get title from categories if available
        if (dataView.categorical.categories && dataView.categorical.categories.length > 0) {
            const categoryValues = dataView.categorical.categories[0].values;
            if (categoryValues && categoryValues.length > 0) {
                title = String(categoryValues[0]);
            }
        }

        // Get values
        const values = dataView.categorical.values;
        if (values.length >= 1 && values[0].values.length > 0) {
            currentValue = Number(values[0].values[0]) || 0;
        }
        if (values.length >= 2 && values[1].values.length > 0) {
            targetValue = Number(values[1].values[0]) || 0;
        }

        // Calculate metrics
        const percentage = targetValue > 0 ? Math.round((currentValue / targetValue) * 100) : 0;
        const remaining = targetValue - currentValue;

        // Apply card settings
        const card = this.container
            .style("background-color", "#FFFFFF")
            .style("padding", "4px")
            .style("box-shadow", "0 2px 8px rgba(0,0,0,0.1)");

        // Current value section
        const valueSection = card.append("div")
            .classed("kpi-value-section", true);

        valueSection.append("div")
            .classed("kpi-current-value", true)
            .style("font-size", `${this.settings.valueSettings.fontSize}px`)
            .style("color", this.settings.valueSettings.fontColor)
            .style("font-family", this.settings.valueSettings.fontFamily)
            .style("text-align", "center")
            .text(this.formatValue(currentValue, this.settings.valueSettings.displayUnits, this.settings.valueSettings.decimalPlaces));


        // Meta section with progress bar
        const metaSection = card.append("div")
            .classed("kpi-meta-section", true);

        const metaHeader = metaSection.append("div")
            .classed("kpi-meta-header", true);

        metaHeader.append("div")
            .classed("kpi-meta-label", true)
            .style("font-size", `${this.settings.metaValueSettings.fontSize}px`)
            .style("color", this.settings.metaValueSettings.fontColor)
            .style("font-family", this.settings.metaValueSettings.fontFamily)
            .style("text-align", "left")
            .text(`Meta: ${this.formatValue(targetValue, this.settings.metaValueSettings.displayUnits, this.settings.metaValueSettings.decimalPlaces)}`);

        metaHeader.append("div")
            .classed("kpi-percentage", true)
            .style("font-size", `${this.settings.percentageSettings.fontSize}px`)
            .style("color", this.settings.percentageSettings.fontColor)
            .style("font-family", this.settings.percentageSettings.fontFamily)
            .style("font-weight", "bold")
            .style("text-align", "right")
            .text(`${percentage}%`);

        // Remaining section
        const remainingSection = card.append("div")
            .classed("kpi-remaining-section", true);

        remainingSection.append("div")
            .classed("kpi-remaining-label", true)
            .style("font-size", `${this.settings.differenceSettings.fontSize}px`)
            .style("color", this.settings.differenceSettings.fontColor)
            .style("font-family", this.settings.differenceSettings.fontFamily)
            .text("Diferença:");

        remainingSection.append("div")
            .classed("kpi-remaining-value", true)
            .style("font-size", `${this.settings.differenceSettings.fontSize}px`)
            .style("color", this.settings.differenceSettings.fontColor)
            .style("font-family", this.settings.differenceSettings.fontFamily)
            .style("text-align", "right")
            .text(this.formatValue(remaining, this.settings.differenceSettings.displayUnits, this.settings.differenceSettings.decimalPlaces));
    }

    private formatValue(value: number, displayUnits: number, decimalPlaces: number): string {
        let formattedValue = value;
        let suffix = "";

        // Apply display units
        if (displayUnits === 0) {
            // Auto: choose based on value size
            if (Math.abs(value) >= 1000000000) {
                formattedValue = value / 1000000000;
                suffix = "B";
            } else if (Math.abs(value) >= 1000000) {
                formattedValue = value / 1000000;
                suffix = "M";
            } else if (Math.abs(value) >= 1000) {
                formattedValue = value / 1000;
                suffix = "K";
            }
        } else if (displayUnits > 1) {
            formattedValue = value / displayUnits;
            if (displayUnits === 1000) suffix = "K";
            else if (displayUnits === 1000000) suffix = "M";
            else if (displayUnits === 1000000000) suffix = "B";
        }

        return formattedValue.toLocaleString('pt-BR', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        }) + suffix;
    }

    private formatCurrency(value: number): string {
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}
