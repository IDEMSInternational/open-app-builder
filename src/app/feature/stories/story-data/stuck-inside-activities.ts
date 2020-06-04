import { Story } from '../story.model';

export const stuckInsideActivitiesStory: Story = {
    id: "stuck-inside-activities",
    name: "Stuck Inside Activities",
    hasChoices: true,
    panels: [
        {
            id: "start",
            imageSrc: "assets/images/stories/stuck-indoors-activity/start.jpg",
            nextPanelOptions: [
                {
                    type: "next",
                    nextPanelId: "can-we-go"
                }
            ]
        },
        {
            id: "can-we-go",
            imageSrc: "assets/images/stories/stuck-indoors-activity/can_we_go_to_grandpas.jpg",
            nextPanelQuestion: "Should Mother take them to Grandpa's?",
            nextPanelOptions: [
                {
                    type: "choice",
                    nextPanelId: "police",
                    optionButtonType: "yes"
                },                {
                    type: "choice",
                    nextPanelId: "instead",
                    optionButtonType: "no"
                }
            ]
        },
        {
            id: "police",
            imageSrc: "assets/images/stories/stuck-indoors-activity/police.jpg",
            conclusion: "They broke the lockdown laws and now little Joey is scared! Oh dear!",
            goodEnding: false
        },
        {
            id: "instead",
            imageSrc: "assets/images/stories/stuck-indoors-activity/instead.jpg",
            nextPanelOptions: [
                {
                    type: "next",
                    nextPanelId: "delegate"
                }
            ]
        },
        {
            id: "delegate",
            imageSrc: "assets/images/stories/stuck-indoors-activity/delegate.jpg",
            nextPanelOptions: [
                {
                    type: "next",
                    nextPanelId: "fence"
                }
            ]
        },
        {
            id: "fence",
            imageSrc: "assets/images/stories/stuck-indoors-activity/fence.jpg",
            conclusion: "The kids didn't get to go to grandpa's, but they still had fun whilst staying safe!",
            goodEnding: true
        }
    ]
}