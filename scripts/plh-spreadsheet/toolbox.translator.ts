import { ToolboxExcelSheet } from './plh-spreadsheet.model';
import { ToolboxContent } from './toolbox-content.model';

export class ToolboxTranslator {

    public from(toolboxSheets: ToolboxExcelSheet[]): ToolboxContent {
        return {};
    }
    
    public to(toolboxContent: ToolboxContent): ToolboxExcelSheet[] {
        return [];
    }

}