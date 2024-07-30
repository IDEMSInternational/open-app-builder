'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AccordionSectionComponent.html" data-type="entity-link" >AccordionSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AnimatedSectionComponent.html" data-type="entity-link" >AnimatedSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AnimatedSectionGroupComponent.html" data-type="entity-link" >AnimatedSectionGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ComboBoxModalComponent.html" data-type="entity-link" >ComboBoxModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormComponent.html" data-type="entity-link" >FormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavGroupComponent.html" data-type="entity-link" >NavGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RoundIconButtonComponent.html" data-type="entity-link" >RoundIconButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectTextComponent.html" data-type="entity-link" >SelectTextComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SquareIconButtonComponent.html" data-type="entity-link" >SquareIconButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplateBaseComponent.html" data-type="entity-link" >TemplateBaseComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplateDebuggerComponent.html" data-type="entity-link" >TemplateDebuggerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplateHTMLComponent.html" data-type="entity-link" >TemplateHTMLComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplateLayoutComponent.html" data-type="entity-link" >TemplateLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplatePopupComponent.html" data-type="entity-link" >TemplatePopupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplAccordionComponent.html" data-type="entity-link" >TmplAccordionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplAdvancedDashedBoxComponent.html" data-type="entity-link" >TmplAdvancedDashedBoxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplAnimatedSlidesComponent.html" data-type="entity-link" >TmplAnimatedSlidesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplAudioComponent.html" data-type="entity-link" >TmplAudioComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplButtonComponent.html" data-type="entity-link" >TmplButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplCarouselComponent.html" data-type="entity-link" >TmplCarouselComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplComboBoxComponent.html" data-type="entity-link" >TmplComboBoxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplDashedBoxComponent.html" data-type="entity-link" >TmplDashedBoxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplDataItemsComponent.html" data-type="entity-link" >TmplDataItemsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplDisplayGridComponent.html" data-type="entity-link" >TmplDisplayGridComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplDisplayGroupComponent.html" data-type="entity-link" >TmplDisplayGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplDrawerComponent.html" data-type="entity-link" >TmplDrawerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplHelpIconComponent.html" data-type="entity-link" >TmplHelpIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplIconBannerComponent.html" data-type="entity-link" >TmplIconBannerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplImageComponent.html" data-type="entity-link" >TmplImageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplLatexComponent.html" data-type="entity-link" >TmplLatexComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplLottieAnimation.html" data-type="entity-link" >TmplLottieAnimation</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplNavigationBarComponent.html" data-type="entity-link" >TmplNavigationBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplNumberComponent.html" data-type="entity-link" >TmplNumberComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplOdkFormComponent.html" data-type="entity-link" >TmplOdkFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplParentPointBoxComponent.html" data-type="entity-link" >TmplParentPointBoxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplParentPointCounterComponent.html" data-type="entity-link" >TmplParentPointCounterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplPdfComponent.html" data-type="entity-link" >TmplPdfComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplQRCodeComponent.html" data-type="entity-link" >TmplQRCodeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplRadioButtonGridComponent.html" data-type="entity-link" >TmplRadioButtonGridComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplRadioGroupComponent.html" data-type="entity-link" >TmplRadioGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplSimpleCheckboxComponent.html" data-type="entity-link" >TmplSimpleCheckboxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplSliderComponent.html" data-type="entity-link" >TmplSliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplSubtitleComponent.html" data-type="entity-link" >TmplSubtitleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTaskCardComponent.html" data-type="entity-link" >TmplTaskCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTaskProgressBarComponent.html" data-type="entity-link" >TmplTaskProgressBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTextAreaComponent.html" data-type="entity-link" >TmplTextAreaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTextBoxComponent.html" data-type="entity-link" >TmplTextBoxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTextComponent.html" data-type="entity-link" >TmplTextComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTileComponent.html" data-type="entity-link" >TmplTileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTimerComponent.html" data-type="entity-link" >TmplTimerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplTitleComponent.html" data-type="entity-link" >TmplTitleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplToggleBarComponent.html" data-type="entity-link" >TmplToggleBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TmplVideoComponent.html" data-type="entity-link" >TmplVideoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkshopsComponent.html" data-type="entity-link" >WorkshopsComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BlankDate.html" data-type="entity-link" >BlankDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="classes/MutationsTracker.html" data-type="entity-link" >MutationsTracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/PausedState.html" data-type="entity-link" >PausedState</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayingState.html" data-type="entity-link" >PlayingState</a>
                            </li>
                            <li class="link">
                                <a href="classes/State.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="classes/Widget.html" data-type="entity-link" >Widget</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AnswerBody.html" data-type="entity-link" >AnswerBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAnswerListItem.html" data-type="entity-link" >IAnswerListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IButton.html" data-type="entity-link" >IButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IButton-1.html" data-type="entity-link" >IButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICategoryList.html" data-type="entity-link" >ICategoryList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDisplayGridParams.html" data-type="entity-link" >IDisplayGridParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnketoFormData.html" data-type="entity-link" >IEnketoFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEventFormSaved.html" data-type="entity-link" >IEventFormSaved</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFormEntry.html" data-type="entity-link" >IFormEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IODKFormComponentParameters.html" data-type="entity-link" >IODKFormComponentParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRadioButtonGridParams.html" data-type="entity-link" >IRadioButtonGridParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITemplatePopupComponentProps.html" data-type="entity-link" >ITemplatePopupComponentProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimerState.html" data-type="entity-link" >TimerState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});