import { Story } from '../story.model';

export const amaniPhoneStory: Story = {
    id: "amani-phone-story",
    name: "Mum, Amani, and the phonecall",
    hasChoices: true,
    panels: [
        {
            imageSrc: "assets/images/stories/amani-phone/0.jpg"
        },
        {
            imageSrc: "assets/images/stories/amani-phone/1.jpg",
            nextPanelOptions: [
                {
                    type: "random",
                    nextPanelId: "phone-hospital"
                },
                {
                    type: "random",
                    nextPanelId: "phone-friend"
                }
            ]
        },
        {
            id: "phone-hospital",
            imageSrc: "assets/images/stories/amani-phone/phone_mums_hospital.jpg",
            nextPanelQuestion: "It's Grandma's hospital. " + 
                "Should Mum pick up the phone?",
            nextPanelOptions: [
                {
                    type: "choice",
                    nextPanelId: "picked-up-phone-amani-angry",
                    optionButtonType: "yes",
                },
                {
                    type: "choice",
                    nextPanelId: "ignored-phone",
                    optionButtonType: "no"
                }
            ]
        },
        {
            id: "phone-friend",
            imageSrc: "assets/images/stories/amani-phone/phone_mums_friend.jpg",
            nextPanelQuestion: "It's a friend. " + 
                "Should Mum pick up the phone?",
            nextPanelOptions: [
                {
                    type: "choice",
                    nextPanelId: "picked-up-phone-amani-angry",
                    optionButtonType: "yes",
                },
                {
                    type: "choice",
                    nextPanelId: "ignored-phone",
                    optionButtonType: "no"
                }
            ]
        },
        {
            id: "phone-hospital",
            imageSrc: "assets/images/stories/amani-phone/phone_mums_hospital.jpg",
            nextPanelQuestion: "It's Grandma's hospital. " + 
                "Should Mum pick up the phone?",
            nextPanelOptions: [
                {
                    type: "choice",
                    nextPanelId: "picked-up-phone-amani-angry",
                    optionButtonType: "yes",
                },
                {
                    type: "choice",
                    nextPanelId: "ignored-phone",
                    optionButtonType: "no"
                }
            ]
        },
        {
            id: "picked-up-phone-amani-angry",
            imageSrc: "assets/images/stories/amani-phone/picked_up_phone1.jpg"
        },
        {
            id: "ignored-phone",
            imageSrc: "assets/images/stories/amani-phone/ignored_phone.jpg"
        }
    ]
}