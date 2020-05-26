import { Story } from '../story.model';

export const amaniPhoneStory: Story = {
    id: "amani-phone-story",
    name: "Mum, Amani, and the phonecall",
    hasChoices: true,
    panels: [
        {
            imageSrc: "assets/images/stories/amani-phone/0.jpg",
            nextPanelOptions: [
                {
                    type: "next",
                    nextPanelId: "phone-ringing"
                }
            ]
        },
        {
            id: "phone-ringing",
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
                    nextPanelId: "picked-up-phone-amani-sad",
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
                    nextPanelId: "picked-up-phone-hospital",
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
            id: "picked-up-phone-hospital",
            imageSrc: "assets/images/stories/amani-phone/picked_up_phone1.jpg",
            nextPanelQuestion: "The hospital says Grandma's condition is worsening."
                + "What should Mum do?",
            nextPanelOptions: [
                {
                    type: "choice",
                    nextPanelId: "picked-up-hospital-honest",
                    optionButtonType: "optionA",
                    optionDescription: "Tell Amani"
                },
                {
                    type: "choice",
                    nextPanelId: "picked-up-hospital-gone",
                    optionButtonType: "optionB",
                    optionDescription: "Walk Away"
                }
            ]
        },
        {
            id: "picked-up-phone-amani-sad",
            imageSrc: "assets/images/stories/amani-phone/picked_up_phone1.jpg",
            nextPanelOptions: [
                {
                    type: "next",
                    nextPanelId: "amani-angry"
                }
            ]
        },
        {
            id: "picked-up-hospital-honest",
            imageSrc: "assets/images/stories/amani-phone/grandma_honest.jpg",
            nextPanelOptions: [
                {
                    type: "next",
                    nextPanelId: "sorry-proud"
                }
            ]
        },
        {
            id: "picked-up-hospital-gone",
            imageSrc: "assets/images/stories/amani-phone/mum_gone.jpg",
            nextPanelOptions: [
                {
                    type: "next",
                    nextPanelId: "amani-angry"
                }
            ]
        },
        {
            id: "amani-angry",
            imageSrc: "assets/images/stories/amani-phone/angry_amani.jpg",
            conclusion: "Mother is happy, but Amani is frustrated!",
            goodEnding: false
        },
        {
            id: "sorry-proud",
            imageSrc: "assets/images/stories/amani-phone/sorry_proud.jpg",
            conclusion: "Mother is concerned about Grandma, but Amani understands, and is still happy!",
            goodEnding: true
        },
        {
            id: "ignored-phone",
            imageSrc: "assets/images/stories/amani-phone/ignored_phone.jpg",
            conclusion: "Amani and Mother are happy! It's important for us to give eachother our full atention when spending 1 on 1 time.",
            goodEnding: true
        }
    ]
}