export default [
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "1on1_Emo",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Character": "Guide",
        "MessageText": "Welcome! How are you feeling today?",
        "Choice_Media_Display": "media",
        "Choice_1": "Happy",
        "Choice_1_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happier.svg",
        "Choice_2": "Neutral",
        "Choice_2_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/neutral.svg",
        "Choice_3": "Sad",
        "Choice_3_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/sadder.svg"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Happy",
        "Character": "Guide",
        "MessageText": "Great to hear you are doing well! Here is @fields.elder, have you met him?",
        "Choice_1": "Chat to @fields.elder"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Neutral; Sad",
        "Character": "Guide",
        "MessageText": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here!"
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": 3,
        "Character": "Guide",
        "MessageText": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds? ",
        "Choice_1": "Yes",
        "Choice_2": "No"
      },
      {
        "Row_ID": 5,
        "Type": "Start_new_flow",
        "From": 4,
        "Condition": "Yes",
        "MessageText": "Calm1"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": 5,
        "Character": "Guide",
        "MessageText": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family!"
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": 6,
        "Character": "Guide",
        "MessageText": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you! ",
        "Choice_1": "Chat to @fields.elder"
      },
      {
        "Row_ID": 8,
        "Type": "Send_message",
        "From": 4,
        "Condition": "No",
        "Character": "Guide",
        "MessageText": "Here is @fields.elder, have you met him? He may have some helpful ideas for you! ",
        "Choice_1": "Chat to @fields.elder"
      },
      {
        "Row_ID": 9,
        "Type": "Exit",
        "From": "2,7,8",
        "Condition": "Chat to @fields.elder",
        "MessageText": "1on1_Intro"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "1on1_Intro",
    "Character": "Elder",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Character": "Elder",
        "MessageText": "Hi! It is so nice to meet you! I just moved here."
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "Character": "Elder",
        "MessageText": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me!"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 2,
        "Character": "Elder",
        "MessageText": "Do you ever have any challenges with your teens? ",
        "Choice_1": "Yes",
        "Choice_2": "No"
      },
      {
        "Row_ID": "3A",
        "Type": "Send_message",
        "From": 3,
        "Condition": "Yes",
        "Character": "Elder",
        "MessageText": "Ah it's good to know that I am not the only one!"
      },
      {
        "Row_ID": "3B",
        "Type": "Send_message",
        "From": 3,
        "Condition": "No",
        "Character": "Elder",
        "MessageText": "That's amazing! What is your secret? Perhaps we can share experiences? "
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": "3A,3B",
        "Character": "Elder",
        "MessageText": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems. "
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": 4,
        "Character": "Elder",
        "MessageText": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time!",
        "Choice_1": "Yes",
        "Choice_2": "Later"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": 5,
        "Condition": "Yes",
        "Character": "Elder",
        "MessageText": "Great, let's see…",
        "Choice_1": "Take me to Tips"
      },
      {
        "Row_ID": "6A",
        "Type": "Exit",
        "From": 6,
        "Condition": "Take me to Tips",
        "MessageText": "Toolbox_1on1_Tips"
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": 5,
        "Condition": "Later",
        "Character": "Elder",
        "MessageText": "No problem, I will show you another time. See you later!",
        "Choice_1": "Take me to Homescreen"
      },
      {
        "Row_ID": "7A",
        "Type": "Exit",
        "From": 7,
        "Condition": "Take me to Homescreen",
        "MessageText": "Homescreen"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "1on1_Activity",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Here are some ideas for easy activities you and your teen can try together."
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "MessageText": "Show this list to your teen and let them pick!",
        "User_input": true,
        "Save_name": "mod1_chooseact",
        "Choice_1": "Prepare dinner",
        "Choice_2": "Eat a meal together",
        "Choice_3": "Have tea after school",
        "Choice_4": "Watch a TV show",
        "Choice_5": "Review homework",
        "Choice_6": "Walk to school/shop",
        "Choice_7": "Chat before bedtime",
        "Choice_8": "Play a game/sport"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 2,
        "MessageText": "When will you spend time together? ",
        "Save_name": "mod1_chooseday",
        "Choice_1": "Monday",
        "Choice_2": "Tuesday",
        "Choice_3": "Wednesday",
        "Choice_4": "Thursday",
        "Choice_5": "Friday",
        "Choice_6": "Saturday",
        "Choice_7": "Sunday"
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": 3,
        "MessageText": "At what time?",
        "Save_name": "mod1_choosetime",
        "Choice_1": "Morning",
        "Choice_2": "Afternoon",
        "Choice_3": "Evening"
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": 4,
        "MessageText": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
        "Choice_1": "Take me to Homescreen"
      },
      {
        "Row_ID": 6,
        "Type": "Exit",
        "From": 5,
        "Condition": "Take me to Homescreen",
        "MessageText": "Homescreen"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "1on1_ActRev",
    "Character": "Elder",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Character": "Elder",
        "MessageText": "Your goal for One-on-One Time was to @fields.mod1_chooseact with your teen.\nHow did it go? ",
        "Save_name": "mod1experience",
        "Choice_Media_Display": "both",
        "Choice_1": "Great",
        "Choice_1_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happier.svg",
        "Choice_2": "Neutral",
        "Choice_2_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/neutral.svg",
        "Choice_3": "Bad",
        "Choice_3_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/sadder.svg"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Great",
        "Character": "Elder",
        "MessageText": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen!",
        "Visual/Comment/suggestion": "Sticker with Guide? Happy Elder?",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Neutral",
        "Character": "Elder",
        "MessageText": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying! ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 4,
        "Type": "Start_new_flow",
        "From": "2,3",
        "Condition": "Next",
        "MessageText": "1on1_Highlights"
      },
      {
        "Row_ID": 5,
        "Type": "Start_new_flow",
        "From": 4,
        "MessageText": "1on1_Challenges"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Bad",
        "Character": "Elder",
        "MessageText": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying! ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 7,
        "Type": "Start_new_flow",
        "From": 6,
        "Condition": "Next",
        "MessageText": "1on1_Challenges"
      },
      {
        "Row_ID": 8,
        "Type": "Start_new_flow",
        "From": 7,
        "MessageText": "1on1_Highlights"
      },
      {
        "Row_ID": 9,
        "Type": "Send_message",
        "From": "5,8",
        "Character": "Elder",
        "MessageText": "Do you have a photo of your time together? I would love to see it!",
        "Choice_1": "Upload",
        "Choice_2": "Skip"
      },
      {
        "Row_ID": 10,
        "Type": "Exit",
        "From": 9,
        "Condition": "Upload",
        "MessageText": "Gallery"
      },
      {
        "Row_ID": 11,
        "Type": "Exit",
        "From": 9,
        "Condition": "Skip",
        "MessageText": "Homescreen"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "1on1_Highlights",
    "Character": "Elder",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Character": "Elder",
        "MessageText": "Which of my tips helped you? ",
        "Save_name": "mod1_high1",
        "Choice_1": "Do it every day",
        "Choice_2": "Let your teen choose the activity",
        "Choice_3": "Follow your teen’s lead",
        "Choice_4": "Give your teen all of your attention",
        "Choice_5": "Show your teen you are really listening",
        "Choice_6": "Have fun!",
        "Choice_7": "None "
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Do it every day",
        "Character": "Elder",
        "MessageText": "Why was this tip helpful for you? ",
        "Save_name": "mod1_high2",
        "Choice_1": "Having a specific time helps me remember ",
        "Choice_2": "With a routine my teen and I can both keep our schedule free",
        "Choice_3": "Spending time every day helps build trust with my teen "
      },
      {
        "Row_ID": "2A",
        "Type": "Send_message",
        "From": 2,
        "Character": "Elder",
        "MessageText": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores!",
        "Save_name": "next",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Let your teen choose the activity",
        "Character": "Elder",
        "MessageText": "Why was this tip helpful for you? ",
        "Save_name": "mod1_high3",
        "Choice_1": "Letting my teen choose what to do builds their confidence",
        "Choice_2": "If my teen chooses, he/she is more likely to want to spend time together",
        "Choice_3": "Letting my teen choose shows that I care about his/her interests"
      },
      {
        "Row_ID": "3A",
        "Type": "Send_message",
        "From": 3,
        "Character": "Elder",
        "MessageText": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives.",
        "Save_name": "next",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Follow your teen’s lead",
        "Character": "Elder",
        "MessageText": "Why was this tip helpful for you? ",
        "Save_name": "mod1_high4",
        "Choice_1": "By accepting my teen’s suggestions, I show I listen to him/her",
        "Choice_2": "Saying something nice about my teen’s choice helps them feel valued",
        "Choice_3": "Doing what my teen likes to do will help them to open up to me"
      },
      {
        "Row_ID": "4A",
        "Type": "Send_message",
        "From": 4,
        "Character": "Elder",
        "MessageText": "You are 100% right. What a great way to improve communication with our teens!",
        "Save_name": "next",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Give your teen all of your attention",
        "Character": "Elder",
        "MessageText": "Why was this tip helpful for you? ",
        "Save_name": "mod1_high5",
        "Choice_1": "By preventing interruptions, I show my teen they are most important",
        "Choice_2": "Even if I can't join my teen's activity, like sports, I can still cheer them on",
        "Choice_3": "When I pay attention, I can learn so much about my teen's interests, views and capabilities"
      },
      {
        "Row_ID": "5A",
        "Type": "Send_message",
        "From": 5,
        "Character": "Elder",
        "MessageText": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something!",
        "Save_name": "next",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Show your teen you are really listening",
        "Character": "Elder",
        "MessageText": "Why was this tip helpful for you? ",
        "Save_name": "mod1_high6",
        "Choice_1": "By nodding and saying \"I see\" my teen feels heard and valued",
        "Choice_2": "By repeating parts of what my teen has said, I can make sure I understand him/her well",
        "Choice_3": "Listening with eye contact shows my teen I care about what they do and think"
      },
      {
        "Row_ID": "6A",
        "Type": "Send_message",
        "From": 6,
        "Character": "Elder",
        "MessageText": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives! ",
        "Save_name": "next",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Have fun!",
        "Character": "Elder",
        "MessageText": "Why was this tip helpful for you? ",
        "Save_name": "mod1_high7",
        "Choice_1": "When I enjoy One-on-One Time, my teen is also more likely to enjoy it",
        "Choice_2": "Normally we often argue, so it was great to spend positive time together",
        "Choice_3": "One-on-One Time is an opportunity for me to show a calm and relaxed side of myself to my teens "
      },
      {
        "Row_ID": "7A",
        "Type": "Send_message",
        "Character": "Elder",
        "MessageText": "So right! We can all enjoy and build a stronger family at the same time!",
        "Save_name": "next",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 8,
        "Type": "Send_message",
        "From": 1,
        "Condition": "None ",
        "Character": "Elder",
        "MessageText": "Sorry to hear my tips did not help you. ",
        "Save_name": "next",
        "Choice_1": "Next"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "1on1_Challenges",
    "Character": "Elder",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Condition": "Great; Neutral",
        "Condition_variable": "mod1experience",
        "MessageText": "Did you have any challenges when trying to spend time with your teen? ",
        "Choice_1": "I don’t have enough time",
        "Choice_2": "My teen does not want to spend time with me",
        "Choice_3": "My teen only wants to watch TV or play on their phone",
        "Choice_4": "My teen wants to do things that are not safe or that cost money",
        "Choice_5": "My teen wants to do things that I cannot do physically",
        "Choice_6": "My teen chose a competitive activity. I won and they got angry.",
        "Choice_7": "I struggled to end One-on-One Time",
        "Choice_8": "All my children want One-on-One Time at the same time"
      },
      {
        "Row_ID": "1A",
        "Type": "Send_message",
        "From": "start",
        "Condition": "Neutral; Bad",
        "Condition_variable": "mod2experience",
        "MessageText": "Did you have any challenges when trying to spend time with your teen? ",
        "Choice_1": "I don’t have enough time",
        "Choice_2": "My teen does not want to spend time with me",
        "Choice_3": "My teen only wants to watch TV or play on their phone",
        "Choice_4": "My teen wants to do things that are not safe or that cost money",
        "Choice_5": "My teen wants to do things that I cannot do physically",
        "Choice_6": "My teen chose a competitive activity. I won and they got angry.",
        "Choice_7": "I struggled to end One-on-One Time",
        "Choice_8": "All my children want One-on-One Time at the same time"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": "start",
        "Condition": "Bad",
        "Condition_variable": "mod1experience",
        "MessageText": "What challenges did you have when trying to spend time with your teen? ",
        "Choice_1": "I don’t have enough time",
        "Choice_2": "My teen does not want to spend time with me",
        "Choice_3": "My teen only wants to watch TV or play on their phone",
        "Choice_4": "My teen wants to do things that are not safe or that cost money",
        "Choice_5": "My teen wants to do things that I cannot do physically",
        "Choice_6": "My teen chose a competitive activity. I won and they got angry.",
        "Choice_7": "I struggled to end One-on-One Time",
        "Choice_8": "All my children want One-on-One Time at the same time"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "I don’t have enough time",
        "MessageText": "I know it can be hard to find time during our day, with work, chores, and everything else.\nDo you want to try one of the following things?",
        "Choice_1": "Think of a time each day that I can make 5 minutes or a bit more.",
        "Choice_2": "Find a chore that I could do together in a fun way.",
        "Choice_3": "Ask my teen or someone else to help me with a chore so I have some extra free time."
      },
      {
        "Row_ID": "3A",
        "Type": "Send_message",
        "From": 3,
        "Condition": "Think of a time each day that I can make 5 minutes or a bit more.",
        "MessageText": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "3B",
        "Type": "Send_message",
        "From": 3,
        "Condition": "Find a chore that I could do together in a fun way.",
        "MessageText": "Great! That way you get your work done and have a fun time together with your teen!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "3C",
        "Type": "Send_message",
        "From": 3,
        "Condition": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
        "MessageText": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "My teen does not want to spend time with me",
        "MessageText": "Sorry you struggled with that. It can make us feel bad if our children do not want to spend One-on-One Time us.\nDo you want to try one of the following things?",
        "Choice_1": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
        "Choice_2": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
        "Choice_3": "Do something fun with the whole family. "
      },
      {
        "Row_ID": "4A",
        "Type": "Send_message",
        "From": 4,
        "Condition": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
        "MessageText": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "4B",
        "Type": "Send_message",
        "From": 4,
        "Condition": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
        "MessageText": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "4C",
        "Type": "Send_message",
        "From": 4,
        "Condition": "Do something fun with the whole family. ",
        "MessageText": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "My teen only wants to watch TV or play on their phone",
        "MessageText": "Sorry you had that challenge. Children often want to spend time watching T.V. or playing with a gadget. Well done for being patient with them!\nDo you want to try one of the following things?",
        "Choice_1": "Suggest other fun options to do instead.",
        "Choice_2": "Find something educational to do together with my teen on the gadget.",
        "Choice_3": "Ask my teen to show how their phone/gadget works."
      },
      {
        "Row_ID": "5A",
        "Type": "Send_message",
        "From": 5,
        "Condition": "Suggest other fun options to do instead.",
        "MessageText": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "5B",
        "Type": "Send_message",
        "From": 5,
        "Condition": "Find something educational to do together with my teen on the gadget.",
        "MessageText": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "5C",
        "Type": "Send_message",
        "From": 5,
        "Condition": "Ask my teen to show how their phone/gadget works.",
        "MessageText": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "My teen wants to do things that are not safe or that cost money",
        "MessageText": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
        "Choice_1": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
        "Choice_2": "Suggest other fun options to do instead."
      },
      {
        "Row_ID": "6A",
        "Type": "Send_message",
        "From": 6,
        "Condition": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
        "MessageText": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "6B",
        "Type": "Send_message",
        "From": 6,
        "Condition": "Suggest other fun options to do instead.",
        "MessageText": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "My teen wants to do things that I cannot do physically",
        "MessageText": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
        "Choice_1": "Watch my teen do the activity and cheer them on.",
        "Choice_2": "Suggest other fun options to do instead."
      },
      {
        "Row_ID": "7A",
        "Type": "Send_message",
        "From": 7,
        "Condition": "Watch my teen do the activity and cheer them on.",
        "MessageText": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "7B",
        "Type": "Send_message",
        "From": 7,
        "Condition": "Suggest other fun options to do instead.",
        "MessageText": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 8,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "My teen chose a competitive activity. I won and they got angry.",
        "MessageText": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
        "Choice_1": "Suggest other activities that we can do together instead of against each other.",
        "Choice_2": "Play the activity in teams so I can encourage my teen when we may lose."
      },
      {
        "Row_ID": "8A",
        "Type": "Send_message",
        "From": 8,
        "Condition": "Suggest other activities that we can do together instead of against each other.",
        "MessageText": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "8B",
        "Type": "Send_message",
        "From": 8,
        "Condition": "Play the activity in teams so I can encourage my teen when we may lose.",
        "MessageText": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 9,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "I struggled to end One-on-One Time",
        "MessageText": "I know the end of One-on-One Time can sometimes be difficult.\n\nDo you want to try one of the following things?",
        "Choice_1": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
        "Choice_2": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
        "Choice_3": "Plan One-on-One Time right before another activity my teen enjoys."
      },
      {
        "Row_ID": "9A",
        "Type": "Send_message",
        "From": 9,
        "Condition": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
        "MessageText": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "9B",
        "Type": "Send_message",
        "From": 9,
        "Condition": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
        "MessageText": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "9C",
        "Type": "Send_message",
        "From": 9,
        "Condition": "Plan One-on-One Time right before another activity my teen enjoys.",
        "MessageText": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 10,
        "Type": "Send_message",
        "From": "1,2",
        "Condition": "All my children want One-on-One Time at the same time",
        "MessageText": "I also struggled with that! It can be difficult to spend One-on-One Time with our teens when we have more than one child.\nDo you want to try one of the following things?",
        "Choice_1": "Ask another adult or older sibling to look after the younger children during that time.",
        "Choice_2": "Think of a time when the other children are not around and spend time then.",
        "Choice_3": "Plan One-on-One Time in a place other than at home"
      },
      {
        "Row_ID": "10A",
        "Type": "Send_message",
        "From": 10,
        "Condition": "Ask another adult or older sibling to look after the younger children during that time.",
        "MessageText": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "10B",
        "Type": "Send_message",
        "From": 10,
        "Condition": "Think of a time when the other children are not around and spend time then.",
        "MessageText": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "10C",
        "Type": "Send_message",
        "From": 10,
        "Condition": "Plan One-on-One Time in a place other than at home",
        "MessageText": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 11,
        "Type": "Send_message",
        "From": "3A,3B,3C,4A,4B,4C,5A,5B,5C,6A,6B,7A,7B,8A,8B,9A,9B,9C,10A,10B,10C",
        "Condition": "Next",
        "MessageText": "Did you have any other challenges?",
        "Choice_1": "Yes",
        "Choice_2": "No"
      },
      {
        "Row_ID": 12,
        "Type": "Send_message",
        "From": 11,
        "Condition": "No",
        "MessageText": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!"
      },
      {
        "Row_ID": 13,
        "Type": "Send_message",
        "From": 11,
        "Condition": "Yes",
        "MessageText": "What other challenges did you have when trying to spend time with your teen? ",
        "Choice_1": "I don’t have enough time",
        "Choice_2": "My teen does not want to spend time with me",
        "Choice_3": "My teen only wants to watch TV or play on their phone",
        "Choice_4": "My teen wants to do things that are not safe or that cost money",
        "Choice_5": "My teen wants to do things that I cannot do physically",
        "Choice_6": "My teen chose a competitive activity. I won and they got angry.",
        "Choice_7": "I struggled to end One-on-One Time",
        "Choice_8": "All my children want One-on-One Time at the same time"
      },
      {
        "Row_ID": 14,
        "Type": "Go_to",
        "From": 13,
        "Condition": "I don’t have enough time",
        "MessageText": 3
      },
      {
        "Row_ID": 15,
        "Type": "Go_to",
        "From": 13,
        "Condition": "My teen does not want to spend time with me",
        "MessageText": 4
      },
      {
        "Row_ID": 16,
        "Type": "Go_to",
        "From": 13,
        "Condition": "My teen only wants to watch TV or play on their phone",
        "MessageText": 5
      },
      {
        "Row_ID": 17,
        "Type": "Go_to",
        "From": 13,
        "Condition": "My teen wants to do things that are not safe or that cost money",
        "MessageText": 6
      },
      {
        "Row_ID": 18,
        "Type": "Go_to",
        "From": 13,
        "Condition": "My teen wants to do things that I cannot do physically",
        "MessageText": 7
      },
      {
        "Row_ID": 19,
        "Type": "Go_to",
        "From": 13,
        "Condition": "My teen chose a competitive activity. I won and they got angry.",
        "MessageText": 8
      },
      {
        "Row_ID": 20,
        "Type": "Go_to",
        "From": 13,
        "Condition": "I struggled to end One-on-One Time",
        "MessageText": 9
      },
      {
        "Row_ID": 21,
        "Type": "Go_to",
        "From": 13,
        "Condition": "All my children want One-on-One Time at the same time",
        "MessageText": 10
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Praise",
    "Flow_Name": "Praise_Intro",
    "Character": "Guide",
    "Second_Character": "Neighbour",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Character": "Guide",
        "MessageText": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care! "
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "MessageText": "How does it make you feel when I say that?  ",
        "Save_name": "smile1",
        "Choice_Media_Display": "media",
        "Choice_1": "slight smile",
        "Choice_1_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happy.svg",
        "Choice_2": "moderate smile",
        "Choice_2_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happier.svg",
        "Choice_3": "big smile",
        "Choice_3_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happiest.svg"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 2,
        "MessageText": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. "
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": 3,
        "MessageText": "Oh, look, it’s our neighbour @fields.neighbour.",
        "Comment/suggestion/visual": "[knock knock graphic at door/window ]"
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": 4,
        "Character": "Neighbour",
        "MessageText": "Hi @fields.guide, good to see you!",
        "Comment/suggestion/visual": "Neighbour blob appears"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": 5,
        "MessageText": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
        "Comment/suggestion/visual": "Neighbour tells story.",
        "Choice_1": "Let me hear your story"
      },
      {
        "Row_ID": 7,
        "Type": "Story_message",
        "From": 6,
        "Condition": "Let me hear your story",
        "MessageText": "I was busy cooking and my one daughter @fields.neighbour_young_daughter was doing her homework. She was practicing reading her book out loud and her sister @fields.neighbour_teen_daughter was helping her: ",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS01.svg",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 8,
        "Type": "Story_message",
        "From": 7,
        "MessageText": "@fields.neighbour_young_daughter(struggling over a difficult word): \"The girl braw – broo – brought the ball to her brother\"",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS01.svg",
        "Choice_1": "Next",
        "Choice_2": "Previous"
      },
      {
        "Row_ID": "8A",
        "Type": "Go_to",
        "From": 8,
        "Condition": "Previous",
        "MessageText": 7
      },
      {
        "Row_ID": 9,
        "Type": "Story_message",
        "From": 8,
        "Condition": "Next",
        "MessageText": "@fields.neighbour_teen_daughter: \"@fields.neighbour_young_daughter! Well done! You read well! Keep reading! The more you practice the better you will get.\"",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS02.svg",
        "Choice_1": "Next",
        "Choice_2": "Previous"
      },
      {
        "Row_ID": "9A",
        "Type": "Go_to",
        "From": 9,
        "Condition": "Previous",
        "MessageText": 8
      },
      {
        "Row_ID": 10,
        "Type": "Story_message",
        "From": 9,
        "Condition": "Next",
        "MessageText": "@fields.neighbour: \"I am very proud of my two daughters. @fields.neighbour_young_daughter , you are working so hard, I know reading is not easy. And thank you very much @fields.neighbour_teen_daughter for helping your sister so I can cook. You are a big help to me.\"",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS03.svg",
        "Choice_1": "Next",
        "Choice_2": "Previous"
      },
      {
        "Row_ID": "10A",
        "Type": "Go_to",
        "From": 10,
        "Condition": "Previous",
        "MessageText": 9
      },
      {
        "Row_ID": 11,
        "Type": "Send_message",
        "From": 10,
        "Condition": "Next",
        "Character": "Neighbour",
        "MessageText": "That's great right? How do you think what I said  made both my daughters feel? ",
        "Comment/suggestion/visual": "Neighbour blob appears again",
        "Save_name": "smile2",
        "Choice_Media_Display": "media",
        "Choice_1": "slight smile",
        "Choice_1_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happy.svg",
        "Choice_2": "moderate smile",
        "Choice_2_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happier.svg",
        "Choice_3": "big smile",
        "Choice_3_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happiest.svg"
      },
      {
        "Row_ID": 12,
        "Type": "Send_message",
        "From": 11,
        "MessageText": "Why do you think I told them that I appreciated \nwhat they were doing?",
        "Choose_multi": true,
        "Save_name": "appreciate",
        "Choice_1": "To get them to do it more often",
        "Choice_2": "To help me finish my work",
        "Choice_3": "To make them feel good",
        "Choice_4": "To make me feel good"
      },
      {
        "Row_ID": 13,
        "Type": "Send_message",
        "From": 12,
        "MessageText": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!"
      },
      {
        "Row_ID": 14,
        "Type": "Send_message",
        "From": 13,
        "MessageText": "Let me break it down for you in 3 easy steps! \n",
        "Choice_1": "Take me to Tips",
        "Choice_2": "Take me to Homescreen"
      },
      {
        "Row_ID": 15,
        "Type": "Start_new_flow",
        "From": 14,
        "Condition": "Take me to Tips",
        "MessageText": "Toolbox_Praise_Tips"
      },
      {
        "Row_ID": 16,
        "Type": "Start_new_flow",
        "From": 14,
        "Condition": "Take me to Homescreen",
        "MessageText": "Homescreen"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Praise",
    "Flow_Name": "Praise_Activity",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Character": "Guide",
        "MessageText": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond! ",
        "Comment/suggestion/visual": "Blob giving high five\n or other encouraging GIF\nStickers-03.jpg"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "MessageText": "Let's practice praising! Would you like to do this with your teen now?",
        "Comment/suggestion/visual": "Note – to separate between the ‘’praise the teen’’ activity and the ‘’teen praises carer’’ activity – or at least to give them the option. ",
        "Choice_1": "Yes",
        "Choice_2": "Later"
      },
      {
        "Row_ID": 3,
        "Type": "Start_new_flow",
        "From": 2,
        "Condition": "Later",
        "MessageText": "Homescreen"
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": 2,
        "Condition": "Yes",
        "MessageText": "Parent – Which of the following things does your teen do well? ",
        "Comment/suggestion/visual": "1. They can choose more than one\n2. We need to say specifically \"or write your own!\"",
        "Choose_multi": true,
        "User_input": true,
        "Save_name": "teenpraise",
        "Choice_1": "Making their bed ",
        "Choice_2": "Cleaning their room ",
        "Choice_3": "Helping clean up after school ",
        "Choice_4": "Greeting other family members ",
        "Choice_5": "Looking after siblings ",
        "Choice_6": "Coming home in time ",
        "Choice_7": "Showing thoughtfulness/respect ",
        "Choice_8": "Using 'please' and 'thank you' ",
        "Choice_9": "Getting ready for school in time ",
        "Choice_10": "Doing chores or schoolwork  ",
        "Choice_11": "Getting through mealtime peacefully "
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": 4,
        "MessageText": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
        "Choice_1": "Click here when done"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": 5,
        "Condition": "Click here when done",
        "MessageText": "Now it's your teen's turn to praise you!\nTeen – which things do you like about your parent? ",
        "Comment/suggestion/visual": " ",
        "Choose_multi": true,
        "User_input": true,
        "Save_name": "parentpraise",
        "Choice_1": "Cooking for the family ",
        "Choice_2": "Helping with school work ",
        "Choice_3": "Making money for the family ",
        "Choice_4": "Cleaning the house ",
        "Choice_5": "Spending time with me ",
        "Choice_6": "Looking after me when I am sick ",
        "Choice_7": "Ensuring we have enough food ",
        "Choice_8": "Listening to me ",
        "Choice_9": "Having a chat together ",
        "Choice_10": "Saying nice things about me "
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": 6,
        "MessageText": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
        "Choice_1": "Click here when done"
      },
      {
        "Row_ID": 8,
        "Type": "Send_message",
        "From": 7,
        "Condition": "Click here when done",
        "MessageText": "Way to go dream team!  "
      },
      {
        "Row_ID": 9,
        "Type": "Send_message",
        "From": 8,
        "MessageText": "It's also important to praise yourself for things you do well!  "
      },
      {
        "Row_ID": 10,
        "Type": "Send_message",
        "From": 9,
        "MessageText": "Take a moment and think of one thing you have done recently that you have done well! Here are some ideas: \n\n\n",
        "User_input": true,
        "Save_name": "selfpraise",
        "Choice_1": "Using this app",
        "Choice_2": "Showing love to my children ",
        "Choice_3": "Getting up even though I felt tired ",
        "Choice_4": "Smiling at someone ",
        "Choice_5": "Making food to stay strong ",
        "Choice_6": "Spending time with my children ",
        "Choice_7": "Helping my children with schoolwork "
      },
      {
        "Row_ID": 11,
        "Type": "Send_message",
        "From": 10,
        "MessageText": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
        "Comment/suggestion/visual": "[congratulations visual] \n",
        "Choice_1": "Take me to Homescreen"
      },
      {
        "Row_ID": 12,
        "Type": "Start_new_flow",
        "From": 11,
        "Condition": "Take me to Homescreen",
        "MessageText": "Homescreen"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Praise",
    "Flow_Name": "Praise_ActRev",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "Character": "Elder",
        "MessageText": "Your goal was to continue to spend time with your teen, and to PRAISE them when spending time together.  \n\nDid you manage to spend time with your teen this week? How did it go?",
        "Save_name": "mod2experience",
        "Choice_Media_Display": "both",
        "Choice_1": "Great",
        "Choice_1_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/happier.svg",
        "Choice_2": "Neutral",
        "Choice_2_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/neutral.svg",
        "Choice_3": "Bad",
        "Choice_3_Media": "https://plh-demo1.idems.international/assets/images/stickers/faces/sadder.svg"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Great",
        "MessageText": "Great to hear it went well! Well done for spending time with your teen.  ",
        "Choice_1": "Go to Praise check-in"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 1,
        "Condition": "Neutral; Bad",
        "MessageText": "Sorry to hear it was difficult for you. Well done for trying! ",
        "Choice_1": "Go to One-on-One Time Challenges",
        "Choice_1_Media": "Continue"
      },
      {
        "Row_ID": 4,
        "Type": "Start_new_flow",
        "From": 3,
        "Condition": "Go to One-on-One Time Challenges",
        "MessageText": "1on1_Challenges"
      },
      {
        "Row_ID": "5A",
        "Type": "Send_message",
        "From": 2,
        "Condition": "Go to Praise check-in",
        "MessageText": "Did you praise your teen during one-on-one time?",
        "Choice_1": "Yes",
        "Choice_2": "No"
      },
      {
        "Row_ID": "5B",
        "Type": "Send_message",
        "From": 3,
        "Condition": "Continue",
        "MessageText": "Did you praise your teen during one-on-one time?",
        "Choice_1": "Yes",
        "Choice_2": "No"
      },
      {
        "Row_ID": "5C",
        "Type": "Send_message",
        "From": 4,
        "MessageText": "Did you praise your teen during one-on-one time?",
        "Choice_1": "Yes",
        "Choice_2": "No"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": "5A,5B,5C",
        "Condition": "No",
        "MessageText": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”."
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": "5A,5B,5C",
        "Condition": "Yes",
        "MessageText": "Well done, great job for remembering. How did your teen respond? ",
        "Choice_1": "Surprised",
        "Choice_2": "Happy",
        "Choice_3": "My teen did not like it",
        "Choice_4": "I don’t know"
      },
      {
        "Row_ID": "7A",
        "Type": "Send_message",
        "From": 7,
        "Condition": "Surprised",
        "MessageText": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!"
      },
      {
        "Row_ID": "7B",
        "Type": "Send_message",
        "From": 7,
        "Condition": "Happy",
        "MessageText": "Well done for noticing how your teen felt, keep it up!"
      },
      {
        "Row_ID": "7C",
        "Type": "Send_message",
        "From": 7,
        "Condition": "My teen did not like it",
        "MessageText": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! "
      },
      {
        "Row_ID": "7D",
        "Type": "Send_message",
        "From": 7,
        "Condition": "I don’t know",
        "MessageText": "No problem, try to notice how they respond next time!"
      },
      {
        "Row_ID": 8,
        "Type": "Send_message",
        "From": "7A,7B,7C,7D",
        "MessageText": "Did you praise your teen at any other time during the week?",
        "Choice_1": "Every day",
        "Choice_2": "Almost every day",
        "Choice_3": "A few days",
        "Choice_4": "Never"
      },
      {
        "Row_ID": "8A",
        "Type": "Send_message",
        "From": 8,
        "Condition": "Every day; Almost every day",
        "MessageText": "Well done for remembering to praise your teen – it makes a big difference!"
      },
      {
        "Row_ID": "8B",
        "Type": "Send_message",
        "From": 8,
        "Condition": "A few days; Never",
        "MessageText": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Welcome",
    "Flow_Name": "Welcome_Intro",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": "First",
        "Type": "Start_new_flow",
        "From": "start",
        "MessageText": "CharacterNames"
      },
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "First",
        "MessageText": "We want to make this work for you! \nPlease choose your guide",
        "Comment": "This is not a message (no one can be speaking).",
        "Save_name": "guidenumber",
        "Choice_Media_Display": "media",
        "Choice_1": "guide1",
        "Choice_1_Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg",
        "Choice_2": "guide2",
        "Choice_2_Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide2/Welcome01.jpg"
      },
      {
        "Row_ID": "1A",
        "Type": "Save_value",
        "From": 1,
        "Condition": "guide1",
        "MessageText": "@fields.firstguide",
        "Save_name": "guide "
      },
      {
        "Row_ID": "1B",
        "Type": "Save_value",
        "From": 1,
        "Condition": "guide2",
        "MessageText": "@fields.secondguide",
        "Save_name": "guide "
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": "1A,1B",
        "MessageText": "Hi there! I'm @fields.guide, and I have two teens – a boy and a girl. I'll be your guide.\n\nThis is how it works: You'll get a weekly session with stress-reducing activities for you, and effective tools for bringing up a teenager. In between, you'll get reminders for things to do together that improve family relationships.\n\nFor this week, let's start with a short introduction:",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 2,
        "MessageText": "A daily stress-reducer can help us with parenting, and make us feel better.  Let's start with 30 seconds of relaxation for yourself. You deserve this! ",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
      },
      {
        "Row_ID": 4,
        "Type": "Start_new_flow",
        "From": 3,
        "MessageText": "Calm5"
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": 4,
        "MessageText": "Send me a daily quick relaxation activity",
        "Comment": "Should be a tickbox.\nNeed to link this to actually setting a reminder.",
        "Save_name": "dailycalm",
        "Display_As_Tick": true,
        "Choice_1": "Yes",
        "Choice_2": "No"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": 5,
        "MessageText": "Sometimes our teens can make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud. Can you think of one thing that your teenager has done recently that you want them to do more of? This can be even a small thing such as \n- came home on time   \n- said something nice to someone at home  \n- smiled \n\nNext time you see your teenager, tell them how much you appreciated that thing.",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": 6,
        "MessageText": "Every parent in the world is struggling in these hard times. These five quick questions will make the app work better for you: "
      },
      {
        "Row_ID": 8,
        "Type": "Start_new_flow",
        "From": 7,
        "MessageText": "Welcome_Survey"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Welcome",
    "Flow_Name": "Welcome_Survey",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "It is hard to find time to have fun with your teen. How many days in the past week did you do something fun together?",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome05.jpg",
        "Save_name": "welcomesurvey_q1",
        "Choice_1": 0,
        "Choice_2": 1,
        "Choice_3": 2,
        "Choice_4": 3,
        "Choice_5": 4,
        "Choice_6": 5,
        "Choice_7": 6,
        "Choice_8": 7
      },
      {
        "Row_ID": "1A",
        "Type": "Send_message",
        "From": 1,
        "Condition": "0;1;2;3",
        "MessageText": "We know it is hard to find time in our busy lives. Well done for trying your best!",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome06.jpg",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "1B",
        "Type": "Send_message",
        "From": 1,
        "Condition": "4;5;6;7",
        "MessageText": "Well done for spending time with your teen, it makes all the difference!",
        "Media": "https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/Sticker01.jpg",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": "1A,1B",
        "Condition": "Next",
        "MessageText": "Focusing on the positive will help you see that behaviour more. How many days in the past week have you praised your teen?",
        "Save_name": "welcomesurvey_q2",
        "Choice_1": 0,
        "Choice_2": 1,
        "Choice_3": 2,
        "Choice_4": 3,
        "Choice_5": 4,
        "Choice_6": 5,
        "Choice_7": 6,
        "Choice_8": 7
      },
      {
        "Row_ID": "2A",
        "Type": "Send_message",
        "From": 2,
        "Condition": "0;1;2;3;4",
        "MessageText": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "2B",
        "Type": "Send_message",
        "From": 2,
        "Condition": "5;6;7;8",
        "MessageText": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": "2A,2B",
        "Condition": "Next",
        "MessageText": "This is a very stressful time for families. How many days in the past week did you feel very stressed as a parent/caregiver? ",
        "Save_name": "welcomesurvey_q3",
        "Choice_1": 0,
        "Choice_2": 1,
        "Choice_3": 2,
        "Choice_4": 3,
        "Choice_5": 4,
        "Choice_6": 5,
        "Choice_7": 6,
        "Choice_8": 7
      },
      {
        "Row_ID": "3A",
        "Type": "Send_message",
        "From": 3,
        "Condition": "0;1;2",
        "MessageText": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "3B",
        "Type": "Send_message",
        "From": 3,
        "Condition": "3;4;5;6;7",
        "MessageText": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": "3A,3B",
        "Condition": "Next",
        "MessageText": "Sometimes our children make us really upset. How many days in the past week did you shout, scream or yell at your children? ",
        "Save_name": "welcomesurvey_q4",
        "Choice_1": 0,
        "Choice_2": 1,
        "Choice_3": 2,
        "Choice_4": 3,
        "Choice_5": 4,
        "Choice_6": 5,
        "Choice_7": 6,
        "Choice_8": 7
      },
      {
        "Row_ID": "4A",
        "Type": "Send_message",
        "From": 4,
        "Condition": "0;1",
        "MessageText": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "4B",
        "Type": "Send_message",
        "From": 4,
        "Condition": "2;3;4;5;6;7",
        "MessageText": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": "4A,4B",
        "Condition": "Next",
        "MessageText": "It is so stressful when children misbehave. How many days in the past week did you physically discipline your children by hitting, spanking, or slapping with your hand or an object like a stick or a belt? ",
        "Save_name": "welcomesurvey_q5",
        "Choice_1": 0,
        "Choice_2": 1,
        "Choice_3": 2,
        "Choice_4": 3,
        "Choice_5": 4,
        "Choice_6": 5,
        "Choice_7": 6,
        "Choice_8": 7
      },
      {
        "Row_ID": "5A",
        "Type": "Send_message",
        "From": 5,
        "Condition": 0,
        "MessageText": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "5B",
        "Type": "Send_message",
        "From": 5,
        "Condition": "1;2;3;4;5;6;7",
        "MessageText": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": "5A,5B",
        "Condition": "Next",
        "MessageText": "Bonus question: We all want to keep our children safe. How confident do you feel you are able to protect your child from sexual abuse online or in-person?\n(0 = not confident to 8 = extremely confident)",
        "Save_name": "welcomesurvey_q6",
        "Choice_1": 0,
        "Choice_2": 1,
        "Choice_3": 2,
        "Choice_4": 3,
        "Choice_5": 4,
        "Choice_6": 5,
        "Choice_7": 6,
        "Choice_8": 7,
        "Choice_9": 8
      },
      {
        "Row_ID": "6A",
        "Type": "Send_message",
        "From": 6,
        "Condition": "0;1;2;3;4",
        "MessageText": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "6B",
        "Type": "Send_message",
        "From": 6,
        "Condition": "5;6;7;8",
        "MessageText": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": "6A,6B",
        "Condition": "Next",
        "MessageText": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": 8,
        "Type": "Start_new_flow",
        "From": 7,
        "Condition": "Next",
        "MessageText": "ImmediateSupport"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Welcome",
    "Flow_Name": "ImmediateSupport",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Could you choose one parenting goal that is important to you?",
        "User_input": true,
        "Save_name": "programmegoal",
        "Choice_1": "I want to have a better relationship with my teen",
        "Choice_2": "I want my teen to behave better",
        "Choice_3": "I want to feel less stress loneliness or anger",
        "Choice_4": "I want to worry about money less",
        "Choice_5": "I want less conflict in my family",
        "Choice_6": "I want to know more about how to keep my teen safe online and offline",
        "Choice_7": "JML TO ADD DISABILITY OPTION "
      },
      {
        "Row_ID": "1A",
        "Type": "Send_message",
        "From": 1,
        "MessageText": "We know it can be hard to know what to do sometimes…"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": "1A",
        "Condition": "I want to have a better relationship with my teen",
        "Condition_variable": "programmegoal",
        "MessageText": "Spending time with your teen is free and even 10 minutes a day helps build trust. Try asking your teen what they would like to do together. It can be fun and relaxing for you too! \n\n",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "2A",
        "Type": "Send_message",
        "From": 2,
        "Condition": "Next",
        "MessageText": "Your PARENTapp journey will include more support for this goal."
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": "1A",
        "Condition": "I want my teen to behave better",
        "Condition_variable": "programmegoal",
        "MessageText": "One thing that can help with teenage behaviour is to praise anytime that they do something good – however small. Teens may not look like they want your praise but they still really, really do.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "3A",
        "Type": "Send_message",
        "From": 3,
        "Condition": "Next",
        "MessageText": "We hope this small tip will help. More support on how to deal with difficult teen behaviour will be covered later on when we talk about \"Rules\"."
      },
      {
        "Row_ID": 4,
        "Type": "Send_message",
        "From": "1A",
        "Condition": "I want to feel less stress loneliness or anger",
        "Condition_variable": "programmegoal",
        "MessageText": "Caring for yourself is really important. Try taking five deep breaths when you feel overwhelmed. Why not talk to a friend, or do something relaxing for yourself? You deserve it! ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "4A",
        "Type": "Send_message",
        "From": 4,
        "Condition": "Next",
        "MessageText": "We hope this small tip will help. More support will be given later on when we talk about \"Managing anger and stress\"."
      },
      {
        "Row_ID": 5,
        "Type": "Send_message",
        "From": "1A",
        "Condition": "I want to worry about money less",
        "Condition_variable": "programmegoal",
        "MessageText": "Talk to your teen about how much money comes in and what you spend money on as a family each month. When everyone sees where the money goes, it is easier to agree on where you can save money together! ",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "5A",
        "Type": "Send_message",
        "From": 5,
        "Condition": "Next",
        "MessageText": "We hope this small tip will help. More support will be given in \"Family budgeting\"."
      },
      {
        "Row_ID": 6,
        "Type": "Send_message",
        "From": "1A",
        "Condition": "I want less conflict in my family",
        "Condition_variable": "programmegoal",
        "MessageText": "When a problem comes up, talk about it together! What is the problem exactly? What different solutions are there and what are the consequences of one? That way, you can find a solution that can be OK for everyone.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "6A",
        "Type": "Send_message",
        "From": 6,
        "Condition": "Next",
        "MessageText": "We hope this small tip will help. More support will be given later on when we talk about \"Problem solving\"."
      },
      {
        "Row_ID": 7,
        "Type": "Send_message",
        "From": "1A",
        "Condition": "I want to know more about how to keep my teen safe online and offline",
        "Condition_variable": "programmegoal",
        "MessageText": "Try to start a conversation with your teen about safe and unsafe places in your community and online. They may even know some you don’t. This will help you make a plan together about how to stay safe.",
        "Choice_1": "Next"
      },
      {
        "Row_ID": "7A",
        "Type": "Send_message",
        "From": 7,
        "Condition": "Next",
        "MessageText": "We hope this small tip will help. More support will be given later on when we talk about \"keeping my teen safe\"."
      },
      {
        "Row_ID": 8,
        "Type": "Send_message",
        "From": "1A",
        "Condition": "JML TO ADD DISABILITY OPTION ",
        "Condition_variable": "programmegoal",
        "MessageText": "[disability quick tip]"
      },
      {
        "Row_ID": 9,
        "Type": "Send_message",
        "From": "2A,3A,4A,5A,6A,7A,8",
        "MessageText": "There are many more practical and useful parenting tips that will help make your home a safe and happy place for everyone!",
        "Choice_1": "Click to start your PARENTapp parenting journey!"
      },
      {
        "Row_ID": 10,
        "Type": "Start_new_flow",
        "From": 9,
        "Condition": "Click to start your PARENTapp parenting journey!",
        "MessageText": "Homescreen"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "Calm1",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
        "Comment": "Audio_short_pause"
      },
      {
        "Row_ID": 2,
        "Type": "Exit",
        "From": 1
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "1on1",
    "Flow_Name": "Calm2",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Let's use the magic power of three stay present and relax. \n"
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "MessageText": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n"
      },
      {
        "Row_ID": 3,
        "Type": "Send_message",
        "From": 2,
        "MessageText": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow."
      },
      {
        "Black": 3,
        "Row_ID": 4,
        "Type": "Exit",
        "From": 3
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Praise",
    "Flow_Name": "Calm3",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!"
      },
      {
        "Row_ID": 2,
        "Type": "Exit",
        "From": 1
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "PosIn",
    "Flow_Name": "Calm4",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Use the magic power of three to stay connected and relax."
      },
      {
        "Row_ID": 2,
        "Type": "Send_message",
        "From": 1,
        "MessageText": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
        "comments": "Image of Guide taking a breath"
      },
      {
        "Row_ID": 3,
        "From": 2,
        "MessageText": "How do you feel now? Do you feel any different? Deep breathing helps our whole body and mind to calm down. \nYou are a star!"
      },
      {
        "Row_ID": 4,
        "Type": "Exit",
        "From": 3
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Module": "Welcome",
    "Flow_Name": "Calm5",
    "Character": "Guide",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!"
      },
      {
        "Row_ID": 2,
        "Type": "Exit",
        "From": 1
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "CharacterNames",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Save_value",
        "From": "start",
        "MessageText": "Osk",
        "Comment/suggestion/visual": "Guide's name",
        "Save_name": "firstguide"
      },
      {
        "Row_ID": 2,
        "Type": "Save_value",
        "From": 1,
        "MessageText": "Oska",
        "Comment/suggestion/visual": "Guide's name",
        "Save_name": "secondguide"
      },
      {
        "Row_ID": 3,
        "Type": "Save_value",
        "From": 2,
        "MessageText": "Ed",
        "Comment/suggestion/visual": "Elder's name",
        "Save_name": "elder"
      },
      {
        "Row_ID": 4,
        "Type": "Save_value",
        "From": 3,
        "MessageText": "Nancy",
        "Comment/suggestion/visual": "Neighbour's name",
        "Save_name": "neighbour"
      },
      {
        "Row_ID": 5,
        "Type": "Save_value",
        "From": 4,
        "MessageText": "Shukuru",
        "Comment/suggestion/visual": "Neighbour's young daughter's name",
        "Save_name": "neighbour_young_daughter"
      },
      {
        "Row_ID": 6,
        "Type": "Save_value",
        "From": 5,
        "MessageText": "Faraja",
        "Comment/suggestion/visual": "Neighbour's teen daughter's name",
        "Save_name": "neighbour_teen_daughter"
      },
      {
        "Row_ID": 7,
        "Type": "Save_value",
        "From": 6,
        "MessageText": "Amina",
        "Comment/suggestion/visual": "Guide's daughter's name",
        "Save_name": "guide_daughter"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Homescreen",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "https://plh-demo1.idems.international/home"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "MyJourney",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "https://plh-demo1.idems.international/chat"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Toolbox",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "https://plh-demo1.idems.international/toolbox"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Toolbox_1on1_Tips",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Toolbox_Praise_Tips",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Gallery",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "https://plh-demo1.idems.international/gallery"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Praise1",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star."
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Praise2",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! "
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Praise3",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Thank you for making so much effort to be a better parent. You are loved and appreciated! "
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Praise4",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  "
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Praise5",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!"
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Praise6",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Thank you for showing up for your family today and doing your best! You are appreciated! "
      }
    ]
  },
  {
    "Flow_Type": "Conversation",
    "Flow_Name": "Praise7",
    "status": "released",
    "data": [
      {
        "Row_ID": 1,
        "Type": "Send_message",
        "From": "start",
        "MessageText": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference."
      }
    ]
  }
]