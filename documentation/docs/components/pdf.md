# PDF

## Example

| type      | name          | value                   |parameter_list |
| --------- | ------------  | ------                  |--------- |
|pdf	    | pdf_1	        | quality_assurance/example_pdf.pdf | starting_page: 3 |

!!! Warning
    Only one pdf component can be displayed at a time – the files will not display if multiple pdf components exist within the same template.

![](images/pdf.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1VXM9zYgrsZIB4h8slC9mg3P9C-jsXuPScNaml-1qaOk/)   
[Live Preview Demo](https://idems-debug.web.app/template/comp_pdf)

## Parameters

| Parameter         | Default     | Description |
| ---------         | ----------- | --------- |
|starting_page	    | 1	          | The page that will be displayed when the component is initially rendered |
|error_message	    | "Embedded PDFs are not supported in this browser, please use an up-to-date version of Google Chrome to view"  | An error message to be displayed on legacy browsers that don't support the pdf component |
