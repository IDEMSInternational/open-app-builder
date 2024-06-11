# Parameters vs styles

**I’m guessing the style_list stuff are specifications that are based on CSS. Although I know of its existence, I’ve never worked my way through CSS stuff. I guess that’s another thing to learn something about. I put `text-align: right` in the `parameter_list` column and it did nothing, but it did what I would have expected in the `style_list` column. Similarly, `style: large center` has an effect in the `parameter_list` column but not the `style_list` column.**

_Asked on 10 February 2022_

The `parameter_list` takes only parameters that are specifically defined by us for every specific component. As such, these are going to be pretty impossible for you to guess without documentation. For what it's worth, [this file](https://github.com/IDEMSInternational/open-app-builder/blob/master/documentation/docs/authors/template-component-parameter-list.md) is the closest thing to documentation of those parameters that we have at the moment.  

Instead, the `style_list` does indeed interpret CSS directly. My knowledge of CSS is limited as well so I can't be of much help here, but [this documentation website](https://www.w3schools.com/cssref/default.asp) has proven handy to me in the past. 

_Answered on 14 February 2022 by ETW_