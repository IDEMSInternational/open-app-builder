/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_name: "workshop_data_list",
    status: "released",
    data_list_name: "workshop",
    rows: [
      {
        id: "w_self_care",
        number: 1,
        image_asset: "plh_images/workshops/w_self_care/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: false,
        relax_data: "@data.relax.relax_5",
        intro_audio_asset: "plh_audio/topic_intros/w_self_care_intro.mp3",
        caregiver_testimonial_script:
          "For me as a parent, it was almost impossible to find time for myself. I was always busy taking care of everyone else. Through @global.parent_app, I realised how important it is to take care of myself. It helps me AND my family! \n\nHaving a moment for myself helps me to breathe and notice how I feel. Even 5 minutes to have a cup of tea makes a big difference. Now I can deal with my stress better.",
        teen_testimonial_script:
          "My dad was always busy. He would come home from work and snap at us when we started asking him questions. \n\n@global.parent_app helped us a lot. We no longer fight. Now, when my dad comes home, he first sits down by himself for 5 minutes and then we do a relaxing activity from @global.parent_app together, so we can all take a deep breath and relax. Then we can chat about our day, about anything good or bad that happened. Everyone is so much happier now.",
        title: "Welcome and Self-Care",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          short_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Welcome and Self-Care",
          },
          in_text_title: {
            eng: "**Welcome and Self-Care** workshop",
          },
          short_title: {
            eng: "Self-Care",
          },
          tools: {
            eng: "How to do self-care",
          },
        },
        in_text_title: "**Welcome and Self-Care** workshop",
        short_title: "Self-Care",
        tools: "How to do self-care",
      },
      {
        id: "w_1on1",
        number: 2,
        image_asset: "plh_images/workshops/w_1on1/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_2",
        something_fun_data: "@data.something_fun.co_chef",
        intro_audio_asset: "plh_audio/topic_intros/w_1on1_intro.mp3",
        caregiver_testimonial_script:
          "When I first heard I had to spend One-on-One Time with my teen, it was hard for me. I did not know when to do it or what to say. I did not want to spoil my teen so that he thinks we have to do everything together. \n\nBut I really wanted to build my relationship with my teen and I wanted him to open up about what was troubling him. So we tried the One-on-One Time. \n\nFirst, it felt weird, but it turned out to be fun! Now we watch his TV programme together and we chat about it. And we can even talk about how my son is changing into adolescence, and even about girlfriends and those things!",
        teen_testimonial_script:
          "When my mother asked to spend time with me, I thought “Maybe something is wrong, maybe she is sick”. But she said “No, I just want to spend time.” I was sceptical, but I accepted. \n\nShe asked me what I like doing. It was strange and I was not comfortable, because she never ever spent time with me on my own. \n\nThe more she kept on trying and we spent this time together, it felt really nice. She got to share her own childhood with me, things I never heard before. That helped me to also share what is going on in my life. We even talk about boyfriends and about problems I have. I know I can talk to my mother now.",
        title: "One-on-One Time",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "One-on-One Time",
          },
          in_text_title: {
            eng: "**One-on-One Time** workshop",
          },
          tools: {
            eng: "How to spend one-on-one time",
          },
        },
        in_text_title: "**One-on-One Time** workshop",
        tools: "How to spend one-on-one time",
      },
      {
        id: "w_praise",
        number: 3,
        image_asset: "plh_images/workshops/w_praise/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_3",
        something_fun_data: "@data.something_fun.reflect_positive",
        intro_audio_asset: "plh_audio/topic_intros/w_praise_intro.mp3",
        caregiver_testimonial_script:
          "When we learned about this praising thing, I thought “We were never praised for things as teenagers, so why should we start now?”. But I got interested when I learned what the benefits of praising could be. \n\nRight after the weekly workshop, I noticed my teen doing what they do every day: Washing the dishes. And I said “Thank you for washing the dishes, my girl, it really makes me happy that you are helping out.” My teen was smiling and she even came to give me a hug, which she never does. \n\nThis praising business is hard. I still forget sometimes or give praise at the same time as criticism. But praising really makes a difference. I never thought that a simple praise could make such a change in a person!",
        teen_testimonial_script:
          "I was grateful that my mother learned about praise. \n\nMy mother always noticed when I was doing something wrong. She would shout at me and hit me. \n\nBut when my mother did the workshop, she would praise me for little things. First I thought “What is going on?” but then it continued. I liked it so I did more good things I thought she would like. \n\nIt feels great that my mother sees the good things I do, and not just the bad things.\n\nI even said it to her once. During @data.workshop.w_1on1.title, I said “Thank you, mom, for saying something nice when I do things well, not only when I do things wrong.” This made us both very happy.",
        title: "Praise",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Praise",
          },
          in_text_title: {
            eng: "**Praise** workshop",
          },
          tools: {
            eng: "How to praise",
          },
        },
        in_text_title: "**Praise** workshop",
        tools: "How to praise",
      },
      {
        id: "w_instruct",
        number: 4,
        image_asset: "plh_images/workshops/w_instruct/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_4",
        something_fun_data: "@data.something_fun.dance_moves",
        intro_audio_asset: "plh_audio/topic_intros/w_instruct_intro.mp3",
        caregiver_testimonial_script:
          "Before, I used to raise my teens the way I was raised: I would tell them “don’t do this, don’t do that.” We used to fight a lot, but things have really changed when I learned about giving positive instructions.\n\nNow I focus on the behaviour I want to see, and give clear and simple instructions to my teens. It took time to learn to say “please do this” instead of “don’t do this.” \n\nMy teens and even my husband tell me that they love this way of doing things, because now they know what needs to be done. My teen said one day “I really love this new mom,” and my own stress levels have come down a lot.",
        teen_testimonial_script:
          "At first, I did not care much that my mother was doing @global.parent_app. But then I started to see my mother change how she communicated with us.\n\nOne day, when I was going out with my friends, she said I must be home by 6pm. I was like “Hmmm okay,” because she normally did not give clear instructions on what she wanted - she would just say nothing and then shout at me for being late when I got home. \n\nWhen I got home around 5pm, my mother gave me a hug and said “Thank you for being on time.” It was strange, but I liked it. \n\nSince then, we have much clearer communication in the house.",
        title: "Positive Instructions",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Positive Instructions",
          },
          in_text_title: {
            eng: "**Positive Instructions** workshop",
          },
          tools: {
            eng: "How to give positive instructions",
          },
        },
        in_text_title: "**Positive Instructions** workshop",
        tools: "How to give positive instructions",
      },
      {
        id: "w_stress",
        number: 5,
        image_asset: "plh_images/workshops/w_stress/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_7",
        something_fun_data: "@data.something_fun.check_in_chat",
        intro_audio_asset: "plh_audio/topic_intros/w_stress_intro.mp3",
        caregiver_testimonial_script:
          "Life is tough sometimes. Before I joined @global.parent_app, I used to be grumpy at all times. I would take out my anger on everyone at home, not only my teens but even my husband as well. They would run away when I came home, because they knew I would start yelling at them. \n\nLearning to take a pause and breathe was difficult at first, but every time I tried it, it helped me to calm down. Now my teens are no longer running away when I come home, and they actually listen better than when I used to shout at them!",
        teen_testimonial_script:
          "Whenever I would do something wrong, my father would get so angry at me and beat me. He would not even listen to me, and I would get so angry as well at him and everyone else. \n\nNow, when he gets angry, he first takes a few deep breaths before he responds. It makes everyone calm down instead of causing a big fight.\n\nIt really helped me at home and at school, because even me I am no longer slashing everyone and I am no longer this moody person. When I feel really angry or stressed, I also take deep breaths like my father does. I am a different person.",
        title: "Managing Stress",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Managing Stress",
          },
          in_text_title: {
            eng: "**Managing Stress** workshop",
          },
          tools: {
            eng: "How to manage stress",
          },
        },
        in_text_title: "**Managing Stress** workshop",
        tools: "How to manage stress",
      },
      {
        id: "w_money",
        number: 6,
        image_asset: "plh_images/workshops/w_money/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_8",
        something_fun_data: "@data.something_fun.dream_travel",
        intro_audio_asset: "plh_audio/topic_intros/w_money_intro.mp3",
        caregiver_testimonial_script:
          "Saving and budgeting helps me as a parent, and it helps my teens as well to understand where the money goes.\n\nMy teens always asked for a lot of things and they did not understand when I said “I do not have money.” They would say “but you have a job!” \n\nI sat down with them and showed them all the things we pay for and how much is left. They understand now and even give ideas on how we can save to work towards our goals like new shoes or a birthday and bigger goals like their school fees. For the older one, I even opened a savings account.",
        teen_testimonial_script:
          "I used to ask my mom to buy me nice clothes all the time. Each time, she would say “I do not have money,” but I knew that she was getting money from my uncle. I did not understand why she refused to buy me clothes. I thought at some point “she does not love me.”\n\nBut one day, she called me to sit down with her and asked “what are the needs and wants in our house.” I started to list all my needs and wants. Then my mother helped me to also think about the family needs. Now I understand where our money is going, towards the things we need as a family. \n\nFrom that day, I understand I cannot come in and ask any time. Now, when I want something, I wait till the month-end when we all discuss the budget together to see if it fits. We understand each other better now.",
        title: "Family Budgets",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Family Budgets",
          },
          in_text_title: {
            eng: "**Family Budgets** workshop",
          },
          tools: {
            eng: "How to budget & save",
          },
        },
        in_text_title: "**Family Budgets** workshop",
        tools: "How to budget & save",
      },
      {
        id: "w_rules",
        number: 7,
        image_asset: "plh_images/workshops/w_rules/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_9",
        something_fun_data: "@data.something_fun.famous_party",
        intro_audio_asset: "plh_audio/topic_intros/w_rules_intro.mp3",
        caregiver_testimonial_script:
          "My teenagers always just disappeared. I did not know where they were, and I would get so worried and angry with them. I used to say “this is my house, and these are my rules, if you do not want to follow them you can leave and stay in your own place.” \n\nWhen we learned in @global.parent_app about rules, I learned that there are rules for teens and for adults and for everyone. If we follow the rules as parents, our teens will follow our example.\n\nI explained my worry and we all agreed: We all follow the rule and say where we are going when we leave the house. Coming up with rules together helped us a lot, as my teens do not see me anymore as that annoying parent that just makes up unnecessary rules.",
        teen_testimonial_script:
          "I never liked rules and I used to forget rules a lot. \n\nOne day, I was playing with my friends. The rule at home was that we should be in the yard by 6pm, but I forgot again. By 6.30 it was getting dark and I was still outside and playing with my phone. Then a boy came, grabbed my phone and ran away. \n\nI understood that rules can really help to keep us safe, so I changed my behaviour and I was in the yard by 5pm from then.",
        title: "Rules",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Rules",
          },
          in_text_title: {
            eng: "**Rules** workshop",
          },
          tools: {
            eng: "How to create rules",
          },
        },
        in_text_title: "**Rules** workshop",
        tools: "How to create rules",
      },
      {
        id: "w_consequence",
        number: 8,
        image_asset: "plh_images/workshops/w_consequence/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_10",
        something_fun_data: "@data.something_fun.two_truths",
        intro_audio_asset: "plh_audio/topic_intros/w_consequence_intro.mp3",
        caregiver_testimonial_script:
          "When my teenagers did something to make me angry, I would shout at them and punish them right away. But the next time they did it again! I could not understand why they did not hear me even when I shouted. \n\n@global.parent_app helped me understand that my teenagers will listen to me more when I am calm. So, when something happens, I take a deep breath and say “we will talk about this later when we are both calm.”\n\nWe even agree on the consequences together now before something goes wrong. This has worked wonders - I have seen a huge change in my teen’s behaviour now that they are more involved, and I have less stress. \n\nI wish I knew this long ago, but it is never too late to start!",
        teen_testimonial_script:
          "My mom and dad would always punish me when they were angry with me. They would shout at me and I would also get angry. I often did not follow the rules, because they were too harsh, I did not understand what they were saying, or I would not even bother listening to them, because we were all angry.\n\nOne day, they asked me: Let's think together what the consequence should be for not coming home in time. It was great to give my view – before something happens that makes us all angry. We are all calm and agree first. It is easier for me to follow the rules now because I know I agreed on the rule and on the consequence if I do not follow the rule.",
        title: "Calm Consequences",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Calm Consequences",
          },
          in_text_title: {
            eng: "**Calm Consequences** workshop",
          },
          tools: {
            eng: "How to give calm consequences",
          },
        },
        in_text_title: "**Calm Consequences** workshop",
        tools: "How to give calm consequences",
      },
      {
        id: "w_solve",
        number: 9,
        image_asset: "plh_images/workshops/w_solve/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_11",
        something_fun_data: "@data.something_fun.mirror",
        intro_audio_asset: "plh_audio/topic_intros/w_solve_intro.mp3",
        caregiver_testimonial_script:
          "I did not have a good relationship with my daughter. I was always shouting at her, and she was refusing to go to school. \n\nOnly when I started spending One-on-One time with her, I realised that she did not want to go to school because she was being bullied at school. We sat down and used the 6 steps of problem solving. We identified the problem, and figured out solutions together: “What can I do as a parent so you can attend school and feel safe?”\n\nWe agreed I would go talk to the teacher to find a way forward. We really found the solutions together, and we are closer now.",
        teen_testimonial_script:
          "When my father introduced the problem-solving steps to me, it helped me with my family, but it also helped me with my friends. \n\nI told my friends about the steps, and now when we are arguing we sit down and everyone comes up with solutions. We then look for the negatives and positives of each solution, and we agree “okay let’s try this one.” \n\nMy friends even took it to their own homes, and it is helping with their families as well! \n\nIt is great when others listen to you and accept your ideas even though you are young. We can all bring that harmony with our friends and family.",
        title: "Problem Solving",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Problem Solving",
          },
          in_text_title: {
            eng: "**Problem Solving** workshop",
          },
          tools: {
            eng: "How to solve problems",
          },
        },
        in_text_title: "**Problem Solving** workshop",
        tools: "How to solve problems",
      },
      {
        id: "w_safe",
        number: 10,
        image_asset: "plh_images/workshops/w_safe/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_12",
        something_fun_data: "@data.something_fun.time_machine",
        intro_audio_asset: "plh_audio/topic_intros/w_safe_intro.mp3",
        caregiver_testimonial_script:
          "I was so grateful to make the safety plan with my teen. I thought I knew which areas are safe for my teen and which are not. But when we made the safety plan together, I realised that my girl knew more areas that I was not aware of. \n\nI also thought she was safe at school, but through this activity I realised she was being bullied and the teachers did not do anything about it.\n\nThe more we talked, the more I understood and got information from my teen. That really helped me to protect my teen and keep her safe.",
        teen_testimonial_script:
          "When my friends or I got into trouble, I would always try to hide it from my mother because she would get so angry and shout at me. \n\nWhen we made the map of safe and unsafe places, I learned a lot – also why it is dangerous to share every picture online. My mother told me I can always ask her if there is a problem and she promised she would not get mad. \n\nShe kept her promise, so now if I have a problem or I do not feel safe I know we can always come up with a solution together. I can even talk to my mother about the things I do online now!",
        title: "Teen Safety",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Teen Safety",
          },
          in_text_title: {
            eng: "**Teen Safety** workshop",
          },
          tools: {
            eng: "How to keep your teen safe",
          },
        },
        in_text_title: "**Teen Safety** workshop",
        tools: "How to keep your teen safe",
      },
      {
        id: "w_crisis",
        number: 11,
        image_asset: "plh_images/workshops/w_crisis/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_13",
        something_fun_data: "@data.something_fun.superpowers",
        intro_audio_asset: "plh_audio/topic_intros/w_crisis_intro.mp3",
        caregiver_testimonial_script:
          "My teen used to be so angry all the time. He would never listen and we would get into big arguments every day. Through @global.parent_app, I started spending more time with my teen and strengthening our relationship. One day he shared with me that he was part of a gang but he wanted to get out. \n\nWe made short-term and long-term plans together on how we could do that. Our life looks so different now!",
        teen_testimonial_script:
          "Two years ago, I was raped by my uncle who stayed in our yard. I did not tell my mother, because I was afraid she would hit me, shout at me, or even throw me out of the house. I did not have anywhere else to go. \n\nWhen my mother started with @global.parent_app, she started spending more time together. I was still afraid, but in the end I shared it with my mother. My mom did not shout, but she listened and told me it is not my fault. We went to the police and the clinic together. I am so grateful I do not have to carry this secret anymore.",
        title: "Dealing with Crisis",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Dealing with Crisis",
          },
          in_text_title: {
            eng: "**Dealing with Crisis** workshop",
          },
          tools: {
            eng: "How to deal with crisis",
          },
        },
        in_text_title: "**Dealing with Crisis** workshop",
        tools: "How to deal with crisis",
      },
      {
        id: "w_celebrate",
        number: 12,
        image_asset: "plh_images/workshops/w_celebrate/tools.svg",
        "completion_level::default": 0,
        started: false,
        completed: false,
        disabled: true,
        relax_data: "@data.relax.relax_14",
        intro_audio_asset: "plh_audio/topic_intros/w_celebrate_intro.mp3",
        title: "Celebration and Next Steps",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          tools: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Celebration and Next Steps",
          },
          in_text_title: {
            eng: "**Celebration and Next Steps** workshop",
          },
          tools: {
            eng: "How to support each other",
          },
        },
        in_text_title: "**Celebration and Next Steps** workshop",
        tools: "How to support each other",
      },
    ],
    _xlsxPath: "global/data/workshop_data_list.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "relax_list",
    data_list_name: "relax",
    status: "released",
    rows: [
      {
        id: "relax_1",
        task_id: "task_relax",
        text_template: "relax_1_text",
        activity_template: "activity_relax_1",
        audio_asset: "plh_audio/relax/relax_1.mp3",
        favourite_field: "relax_1_favourite",
        type: "relax_passive_short",
        title: "Quick pause",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Quick pause",
          },
        },
      },
      {
        id: "relax_2",
        workshop: "1on1",
        task_id: "task_relax",
        text_template: "relax_2_text",
        activity_template: "activity_relax_2",
        audio_asset: "plh_audio/relax/relax_2.mp3",
        favourite_field: "relax_2_favourite",
        type: "relax_passive_short",
        title: "Power of three",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Power of three",
          },
        },
      },
      {
        id: "relax_3",
        workshop: "praise",
        task_id: "task_relax",
        text_template: "relax_3_text",
        activity_template: "activity_relax_3",
        audio_asset: "plh_audio/relax/relax_3.mp3",
        favourite_field: "relax_3_favourite",
        type: "relax_passive_short",
        title: "One thing today",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "One thing today",
          },
        },
      },
      {
        id: "relax_4",
        workshop: "instruct",
        task_id: "task_relax",
        text_template: "relax_4_text",
        activity_template: "activity_relax_4",
        audio_asset: "plh_audio/relax/relax_4.mp3",
        favourite_field: "relax_4_favourite",
        type: "relax_passive_short",
        title: "Breathe to three",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Breathe to three",
          },
        },
      },
      {
        id: "relax_5",
        workshop: "self_care",
        task_id: "task_relax",
        text_template: "relax_5_text",
        activity_template: "activity_relax_5",
        audio_asset: "plh_audio/relax/relax_5.mp3",
        favourite_field: "relax_5_favourite",
        type: "relax_passive_short",
        title: "In and out",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "In and out",
          },
        },
      },
      {
        id: "relax_6",
        task_id: "task_relax",
        text_template: "relax_6_text",
        activity_template: "activity_relax_6",
        audio_asset: "plh_audio/relax/relax_6.mp3",
        favourite_field: "relax_6_favourite",
        type: "relax_passive_short",
        title: "Think about today",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Think about today",
          },
        },
      },
      {
        id: "relax_7",
        workshop: "stress",
        task_id: "task_relax",
        text_template: "relax_7_text",
        activity_template: "activity_relax_7",
        audio_asset: "plh_audio/relax/relax_7.mp3",
        favourite_field: "relax_7_favourite",
        type: "relax_passive_short",
        title: "Pause to respond",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Pause to respond",
          },
        },
      },
      {
        id: "relax_8",
        workshop: "money",
        task_id: "task_relax",
        text_template: "relax_8_text",
        activity_template: "activity_relax_8",
        audio_asset: "plh_audio/relax/relax_8.mp3",
        favourite_field: "relax_8_favourite",
        type: "relax_passive_short",
        title: "Small things",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Small things",
          },
        },
      },
      {
        id: "relax_9",
        workshop: "rules",
        task_id: "task_relax",
        text_template: "relax_9_text",
        activity_template: "activity_relax_9",
        audio_asset: "plh_audio/relax/relax_9.mp3",
        favourite_field: "relax_9_favourite",
        type: "relax_passive_short",
        title: "Body scan",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Body scan",
          },
        },
      },
      {
        id: "relax_10",
        workshop: "consequence",
        task_id: "task_relax",
        text_template: "relax_10_text",
        activity_template: "activity_relax_10",
        audio_asset: "plh_audio/relax/relax_10.mp3",
        favourite_field: "relax_10_favourite",
        type: "relax_passive_short",
        title: "Feel the ground",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Feel the ground",
          },
        },
      },
      {
        id: "relax_11",
        workshop: "solve",
        task_id: "task_relax",
        text_template: "relax_11_text",
        activity_template: "activity_relax_11",
        audio_asset: "plh_audio/relax/relax_11.mp3",
        favourite_field: "relax_11_favourite",
        type: "relax_passive_short",
        title: "Counting sounds",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Counting sounds",
          },
        },
      },
      {
        id: "relax_12",
        workshop: "safe",
        task_id: "task_relax",
        text_template: "relax_12_text",
        activity_template: "activity_relax_12",
        audio_asset: "plh_audio/relax/relax_12.mp3",
        favourite_field: "relax_12_favourite",
        type: "relax_passive_short",
        title: "Feel your feeling",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Feel your feeling",
          },
        },
      },
      {
        id: "relax_13",
        workshop: "crisis",
        task_id: "task_relax",
        text_template: "relax_13_text",
        activity_template: "activity_relax_13",
        audio_asset: "plh_audio/relax/relax_13.mp3",
        favourite_field: "relax_13_favourite",
        type: "relax_active",
        title: "Your song",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Your song",
          },
        },
      },
      {
        id: "relax_14",
        workshop: "celebrate",
        task_id: "task_relax",
        text_template: "relax_14_text",
        activity_template: "activity_relax_14",
        audio_asset: "plh_audio/relax/relax_14.mp3",
        favourite_field: "relax_14_favourite",
        type: "relax_passive_short",
        title: "Ground & gratitude",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Ground & gratitude",
          },
        },
      },
      {
        id: "relax_15",
        task_id: "task_relax",
        text_template: "relax_15_text",
        activity_template: "activity_relax_15",
        audio_asset: "plh_audio/relax/relax_15.mp3",
        favourite_field: "relax_15_favourite",
        type: "relax_passive_short",
        title: "Notice how you feel",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Notice how you feel",
          },
        },
      },
      {
        id: "relax_16",
        task_id: "task_relax",
        text_template: "relax_16_text",
        activity_template: "activity_relax_16",
        audio_asset: "plh_audio/relax/relax_16.mp3",
        favourite_field: "relax_16_favourite",
        type: "relax_passive_short",
        title: "Pause power",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Pause power",
          },
        },
      },
      {
        id: "relax_17",
        task_id: "task_relax",
        text_template: "relax_17_text",
        activity_template: "activity_relax_17",
        audio_asset: "plh_audio/relax/relax_17.mp3",
        favourite_field: "relax_17_favourite",
        type: "relax_passive_short",
        title: "Praise yourself",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Praise yourself",
          },
        },
      },
      {
        id: "relax_18",
        task_id: "task_relax",
        text_template: "relax_18_text",
        activity_template: "activity_relax_18",
        audio_asset: "plh_audio/relax/relax_18.mp3",
        favourite_field: "relax_18_favourite",
        type: "relax_passive_long",
        title: "Taking care of yourself",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Taking care of yourself",
          },
        },
      },
      {
        id: "relax_19",
        task_id: "task_relax",
        text_template: "relax_19_text",
        activity_template: "activity_relax_19",
        audio_asset: "plh_audio/relax/relax_19.mp3",
        favourite_field: "relax_19_favourite",
        type: "relax_passive_long",
        title: "Take a pause",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Take a pause",
          },
        },
      },
      {
        id: "relax_20",
        task_id: "task_relax",
        text_template: "relax_20_text",
        activity_template: "activity_relax_20",
        audio_asset: "plh_audio/relax/relax_20.mp3",
        favourite_field: "relax_20_favourite",
        type: "relax_active",
        title: "Physical activity",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Physical activity",
          },
        },
      },
      {
        id: "relax_21",
        task_id: "task_relax",
        text_template: "relax_21_text",
        activity_template: "activity_relax_21",
        audio_asset: "plh_audio/relax/relax_21.mp3",
        favourite_field: "relax_21_favourite",
        type: "relax_active",
        title: "List of things",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "List of things",
          },
        },
      },
      {
        id: "relax_22",
        task_id: "task_relax",
        text_template: "relax_22_text",
        activity_template: "activity_relax_22",
        audio_asset: "plh_audio/relax/relax_22.mp3",
        favourite_field: "relax_22_favourite",
        type: "relax_active",
        title: "Connect",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Connect",
          },
        },
      },
      {
        id: "relax_23",
        task_id: "task_relax",
        text_template: "relax_23_text",
        activity_template: "activity_relax_23",
        audio_asset: "plh_audio/relax/relax_23.mp3",
        favourite_field: "relax_23_favourite",
        type: "relax_active",
        title: "Prevent anger",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Prevent anger",
          },
        },
      },
      {
        id: "relax_24",
        task_id: "task_relax",
        text_template: "relax_24_text",
        activity_template: "activity_relax_24",
        audio_asset: "plh_audio/relax/relax_24.mp3",
        favourite_field: "relax_24_favourite",
        type: "relax_active",
        title: "Angry? Take a break",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Angry? Take a break",
          },
        },
      },
    ],
    _xlsxPath: "global/data/relax_data_list.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "activity_data_list",
    data_list_name: "something_fun",
    status: "released",
    rows: [
      {
        id: "reflect_positive",
        workshop: "praise",
        activity_template: "activity_reflect_positive",
        favourite_field: "activity_reflect_positive_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Reflect on the positive",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Reflect on the positive",
          },
        },
      },
      {
        id: "check_in_chat",
        workshop: "stress",
        activity_template: "activity_check_in_chat",
        favourite_field: "activity_check_in_chat_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Check-in chat",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Check-in chat",
          },
        },
      },
      {
        id: "dream_travel",
        workshop: "money",
        activity_template: "activity_dream_travel",
        favourite_field: "activity_dream_travel_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Dream Travel",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Dream Travel",
          },
        },
      },
      {
        id: "famous_party",
        workshop: "rules",
        activity_template: "activity_famous_party",
        favourite_field: "activity_famous_party_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Famous Party",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Famous Party",
          },
        },
      },
      {
        id: "two_truths",
        workshop: "consequence",
        activity_template: "activity_two_truths",
        favourite_field: "activity_two_truths_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Two truths, one lie",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Two truths, one lie",
          },
        },
      },
      {
        id: "time_machine",
        workshop: "safe",
        activity_template: "activity_time_machine",
        favourite_field: "activity_time_machine_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Time Machine",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Time Machine",
          },
        },
      },
      {
        id: "superpowers",
        workshop: "crisis",
        activity_template: "activity_superpowers",
        favourite_field: "activity_superpowers_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Superpowers",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Superpowers",
          },
        },
      },
      {
        id: "friendly_chat",
        activity_template: "activity_friendly_chat",
        favourite_field: "activity_friendly_chat_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Just a friendly chat",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Just a friendly chat",
          },
        },
      },
      {
        id: "interrupter",
        activity_template: "activity_interrupter",
        favourite_field: "activity_interrupter_favourite",
        spend_time: true,
        type: "chat_together",
        title: "The Interrupter",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "The Interrupter",
          },
        },
      },
      {
        id: "three_options",
        activity_template: "activity_three_options",
        favourite_field: "activity_three_options_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Three options",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Three options",
          },
        },
      },
      {
        id: "yes_no_maybe",
        activity_template: "activity_yes_no_maybe",
        favourite_field: "activity_yes_no_maybe_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Yes, No or Maybe",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Yes, No or Maybe",
          },
        },
      },
      {
        id: "memory_game",
        activity_template: "activity_memory_game",
        favourite_field: "activity_memory_game_favourite",
        spend_time: true,
        type: "chat_together",
        title: 'Memory game - "On Saturday..."',
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: 'Memory game - "On Saturday..."',
          },
        },
      },
      {
        id: "invent_story",
        activity_template: "activity_invent_story",
        favourite_field: "activity_invent_story_favourite",
        spend_time: true,
        type: "chat_together",
        title: "Make up a story",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Make up a story",
          },
        },
      },
      {
        id: "co_chef",
        workshop: "1on1",
        activity_template: "activity_co_chef",
        favourite_field: "activity_co_chef_favourite",
        spend_time: true,
        type: "do_together",
        title: "Co-chef",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Co-chef",
          },
        },
      },
      {
        id: "dance_moves",
        workshop: "instruct",
        activity_template: "activity_dance_moves",
        favourite_field: "activity_dance_moves_favourite",
        spend_time: true,
        type: "do_together",
        title: "Dance moves",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Dance moves",
          },
        },
      },
      {
        id: "mirror",
        workshop: "solve",
        activity_template: "activity_mirror",
        favourite_field: "activity_mirror_favourite",
        spend_time: true,
        type: "do_together",
        title: "Mirror",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Mirror",
          },
        },
      },
      {
        id: "whats_new",
        activity_template: "activity_whats_new",
        favourite_field: "activity_whats_new_favourite",
        spend_time: true,
        type: "do_together",
        title: "What's new?",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "What's new?",
          },
        },
      },
      {
        id: "get_active",
        activity_template: "activity_get_active",
        favourite_field: "activity_get_active_favourite",
        spend_time: true,
        type: "do_together",
        title: "Get active!",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Get active!",
          },
        },
      },
      {
        id: "name_that_tune",
        activity_template: "activity_name_that_tune",
        favourite_field: "activity_name_that_tune_favourite",
        spend_time: true,
        type: "do_together",
        title: "Name that tune",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Name that tune",
          },
        },
      },
      {
        id: "pass_the_snap",
        activity_template: "activity_pass_the_snap",
        favourite_field: "activity_pass_the_snap_favourite",
        spend_time: true,
        type: "do_together",
        title: "Pass the snap",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          intro_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Pass the snap",
          },
          intro_text: {
            eng: "Here is a fun game you can do with your family!",
          },
        },
        intro_text: "Here is a fun game you can do with your family!",
      },
      {
        id: "family_workout",
        activity_template: "activity_family_workout",
        favourite_field: "activity_family_workout_favourite",
        spend_time: true,
        type: "do_together",
        title: "Family workout",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Family workout",
          },
        },
      },
      {
        id: "housework",
        activity_template: "activity_housework",
        favourite_field: "activity_housework_favourite",
        spend_time: true,
        has_recording: true,
        type: "do_together",
        title: "Make housework fun",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          intro_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Make housework fun",
          },
          intro_text: {
            eng: "Household chores aren’t fun… or are they? You can make them into a game!",
          },
        },
        intro_text: "Household chores aren’t fun… or are they? You can make them into a game!",
      },
      {
        id: "doing_what",
        activity_template: "activity_doing_what",
        favourite_field: "activity_doing_what_favourite",
        spend_time: true,
        has_recording: true,
        type: "do_together",
        title: "What are you doing?",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          intro_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "What are you doing?",
          },
          intro_text: {
            eng: "Here is a fun game you can do with your family!",
          },
        },
        intro_text: "Here is a fun game you can do with your family!",
      },
      {
        id: "crazy_chicken",
        activity_template: "activity_crazy_chicken",
        favourite_field: "activity_crazy_chicken_favourite",
        spend_time: true,
        type: "do_together",
        title: "Crazy chicken",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Crazy chicken",
          },
        },
      },
    ],
    _xlsxPath: "global/data/activity_data_list.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "parent_centre_data_list",
    status: "released",
    data_list_name: "parent_centre",
    rows: [
      {
        id: "my_tips",
        show: true,
        icon_asset: "plh_images/icons/light_bulb_heart_white.svg",
        template: "parent_centre_my_tips",
        tile_style: "parent_centre_1",
        click_count_field: "click_pc_my_tips_count",
        title: "My Tips",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "My Tips",
          },
          location_text: {
            eng: "**My Tips** in the @global.parent_centre",
          },
        },
        location_text: "**My Tips** in the @global.parent_centre",
      },
      {
        id: "essential_tools",
        show: true,
        icon_asset: "plh_images/icons/light_bulb_white.svg",
        template: "parent_centre_essential_tools",
        tile_style: "parent_centre_3",
        click_count_field: "click_pc_essential_tools_count",
        title: "Essential Tools",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Essential Tools",
          },
          location_text: {
            eng: "**Essential Tools** in the @global.parent_centre",
          },
        },
        location_text: "**Essential Tools** in the @global.parent_centre",
      },
      {
        id: "customisation",
        show: "@fields.survey_welcome_completed",
        icon_asset: "plh_images/icons/phone_heart_white.svg",
        template: "setup_and_survey_stepper",
        tile_style: "parent_centre_4",
        click_count_field: "click_pc_customisation_count",
        title: "Customise @global.parent_app",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Customise @global.parent_app",
          },
          location_text: {
            eng: "**Customise @global.parent_app** in the @global.parent_centre",
          },
        },
        location_text: "**Customise @global.parent_app** in the @global.parent_centre",
      },
      {
        id: "customise_again",
        show: "!@fields.survey_welcome_completed",
        icon_asset: "plh_images/icons/phone_heart_white.svg",
        template: "parent_centre_customisation",
        tile_style: "parent_centre_4",
        click_count_field: "click_pc_customise_again_count",
        title: "Customise Again",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Customise Again",
          },
          location_text: {
            eng: "**Customise Again** in the @global.parent_centre",
          },
        },
        location_text: "**Customise Again** in the @global.parent_centre",
      },
      {
        id: "relax_and_activities",
        show: true,
        icon_asset: "plh_images/icons/smile_eyes_up_white.svg",
        template: "parent_centre_relax_and_act",
        tile_style: "parent_centre_1",
        click_count_field: "click_pc_relax_and_activities_count",
        title: "Relax & Activities",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Relax & Activities",
          },
          location_text: {
            eng: "under **Relax & Activities** in the @global.parent_centre",
          },
        },
        location_text: "under **Relax & Activities** in the @global.parent_centre",
      },
      {
        id: "help",
        show: true,
        icon_asset: "plh_images/icons/question_mark_white.svg",
        template: "parent_centre_help",
        tile_style: "parent_centre_3",
        click_count_field: "click_pc_help_count",
        title: "Help",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Help",
          },
          location_text: {
            eng: "**Help** in the @global.parent_centre",
          },
        },
        location_text: "**Help** in the @global.parent_centre",
      },
      {
        id: "technical_support",
        show: true,
        icon_asset: "plh_images/icons/info_phone_white.svg",
        template: "parent_centre_technical_support",
        tile_style: "parent_centre_4",
        click_count_field: "click_pc_technical_support_count",
        title: "Technical Support",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Technical Support",
          },
          location_text: {
            eng: "**Technical Support** in the @global.parent_centre",
          },
        },
        location_text: "**Technical Support** in the @global.parent_centre",
      },
      {
        id: "covid",
        show: true,
        icon_asset: "plh_images/icons/ask_question_white.svg",
        template: "parent_centre_covid",
        tile_style: "parent_centre_1",
        click_count_field: "click_pc_covid_count",
        title: "Coping with @global.covid",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Coping with @global.covid",
          },
          location_text: {
            eng: "**Coping with @global.covid** in the @global.parent_centre",
          },
        },
        location_text: "**Coping with @global.covid** in the @global.parent_centre",
      },
      {
        id: "bereavement",
        show: true,
        icon_asset: "plh_images/icons/hands_support_heart_white.svg",
        template: "parent_centre_bereavement",
        tile_style: "parent_centre_3",
        click_count_field: "click_pc_bereavement_count",
        title: "Coping with grief",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Coping with grief",
          },
          location_text: {
            eng: "**Coping with grief** in the @global.parent_centre",
          },
        },
        location_text: "**Coping with grief** in the @global.parent_centre",
      },
      {
        id: "message_archive",
        show: true,
        icon_asset: "plh_images/icons/letter_white.svg",
        template: "parent_centre_message_archive",
        tile_style: "parent_centre_4",
        click_count_field: "click_pc_message_archive_count",
        title: "Message Archive",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Message Archive",
          },
          location_text: {
            eng: "**Message Archive** in the @global.parent_centre",
          },
        },
        location_text: "**Message Archive** in the @global.parent_centre",
      },
      {
        id: "support_contacts",
        show: false,
        icon_asset: "plh_images/icons/hands_support_heart_white.svg",
        tile_style: "parent_centre_1",
        click_count_field: "click_pc_support_contacts_count",
        title: "Support Contacts",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Support Contacts",
          },
          location_text: {
            eng: "**Support Contacts** in the @global.parent_centre",
          },
        },
        location_text: "**Support Contacts** in the @global.parent_centre",
      },
      {
        id: "evidence_base",
        show: false,
        icon_asset: "plh_images/icons/documents_white.svg",
        tile_style: "parent_centre_3",
        click_count_field: "click_pc_evidence_base_count",
        title: "Evidence Base",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          location_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Evidence Base",
          },
          location_text: {
            eng: "**Evidence Base** in the @global.parent_centre",
          },
        },
        location_text: "**Evidence Base** in the @global.parent_centre",
      },
    ],
    _xlsxPath: "global/data/parent_centre_data_list.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "covid_data_list",
    status: "released",
    data_list_name: "covid",
    rows: [
      {
        id: "talk_to_teen",
        content_template: "tools_talk_to_teen",
        library_activity: "lib_act_talk_to_teen",
        image_asset: "plh_images/parent_centre/covid/talk_to_teen.svg",
        title: "How to talk to my teen",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "How to talk to my teen",
          },
        },
      },
      {
        id: "deal_with_news",
        content_template: "tools_deal_with_news",
        library_activity: "lib_act_deal_with_news",
        image_asset: "plh_images/parent_centre/covid/deal_with_news.svg",
        title: "Steps to deal with news",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Steps to deal with news",
          },
        },
      },
      {
        id: "help_teen_choose",
        content_template: "tools_help_teen_choose",
        library_activity: "lib_act_help_teen_choose",
        image_asset: "plh_images/parent_centre/covid/help_teen_choose.svg",
        title: "How can I help my teen choose well?",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "How can I help my teen choose well?",
          },
        },
      },
      {
        id: "teen_influences",
        content_template: "understand_teen_influences",
        library_activity: "lib_act_teen_influences",
        image_asset: "plh_images/parent_centre/covid/teen_influences.svg",
        title: "What influences teen decisions?",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "What influences teen decisions?",
          },
        },
      },
      {
        id: "teen_feelings",
        content_template: "understand_teen_feelings",
        library_activity: "lib_act_teen_feelings",
        image_asset: "plh_images/parent_centre/covid/teen_feelings.svg",
        title: "How does my teen feel?",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "How does my teen feel?",
          },
        },
      },
      {
        id: "change_thoughts",
        content_template: "change_thoughts",
        library_activity: "lib_act_change_thoughts",
        image_asset: "plh_images/parent_centre/covid/change_thoughts.svg",
        title: "Changing negative to positive",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Changing negative to positive",
          },
        },
      },
    ],
    _xlsxPath: "global/data/parent_centre_data_list.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "bereavement_data_list",
    status: "released",
    data_list_name: "bereavement",
    rows: [
      {
        id: "self",
        content_template: "bereavement_self",
        title: "Help yourself cope",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Help yourself cope",
          },
        },
      },
      {
        id: "teen",
        content_template: "bereavement_teen",
        title: "Help your teen cope",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Help your teen cope",
          },
        },
      },
      {
        id: "practical",
        content_template: "bereavement_practical",
        title: "Practical steps",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Practical steps",
          },
        },
      },
    ],
    _xlsxPath: "global/data/parent_centre_data_list.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "habit_data_list",
    status: "released",
    data_list_name: "habit",
    rows: [
      {
        id: "relax",
        task_id: "task_habit_relax",
        image_asset: "plh_images/habits/habit_relax.svg",
        lottie_asset: "plh_lottie/habits/habit_relax.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Relax",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Relax",
          },
          in_text_title: {
            eng: "**Relax** @global.parent_point",
          },
          description: {
            eng: "Doing a relaxation activity",
          },
          mark_text: {
            eng: "Every time you do a relax, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Relax** @global.parent_point",
        description: "Doing a relaxation activity",
        mark_text:
          "Every time you do a relax, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "treat_yourself",
        task_id: "task_habit_treat_yourself",
        image_asset: "plh_images/habits/habit_treat_yourself.svg",
        lottie_asset: "plh_lottie/habits/habit_treat_yourself.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Treat yourself well",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Treat yourself well",
          },
          in_text_title: {
            eng: "**Treat yourself well** @global.parent_point",
          },
          description: {
            eng: "Doing something they like for themselves",
          },
          mark_text: {
            eng: "Every time you treat yourself well, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Treat yourself well** @global.parent_point",
        description: "Doing something they like for themselves",
        mark_text:
          "Every time you treat yourself well, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "praise_yourself",
        task_id: "task_habit_praise_yourself",
        image_asset: "plh_images/habits/habit_praise_yourself.svg",
        lottie_asset: "plh_lottie/habits/habit_praise_yourself.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Praise yourself",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Praise yourself",
          },
          in_text_title: {
            eng: "**Praise yourself** @global.parent_point",
          },
          description: {
            eng: "Praising themselves",
          },
          mark_text: {
            eng: "Every time you praise yourself, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Praise yourself** @global.parent_point",
        description: "Praising themselves",
        mark_text:
          "Every time you praise yourself, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "spend_time",
        task_id: "task_habit_spend_time",
        image_asset: "plh_images/habits/habit_spend_time.svg",
        lottie_asset: "plh_lottie/habits/habit_spend_time.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "One-on-one time",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "One-on-one time",
          },
          in_text_title: {
            eng: "**One-on-one time** @global.parent_point",
          },
          description: {
            eng: "Spending time with their teen",
          },
          mark_text: {
            eng: "Every time you do one-on-one time, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**One-on-one time** @global.parent_point",
        description: "Spending time with their teen",
        mark_text:
          "Every time you do one-on-one time, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "praise_teen",
        task_id: "task_habit_praise_teen",
        image_asset: "plh_images/habits/habit_praise_teen.svg",
        lottie_asset: "plh_lottie/habits/habit_praise_teen.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Praise your teen",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Praise your teen",
          },
          in_text_title: {
            eng: "**Praise your teen** @global.parent_point",
          },
          description: {
            eng: "Praising their teen when they did positive thing",
          },
          mark_text: {
            eng: "Every time you praise your teen, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Praise your teen** @global.parent_point",
        description: "Praising their teen when they did positive thing",
        mark_text:
          "Every time you praise your teen, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "instruct_positively",
        task_id: "task_habit_instruct_positively",
        image_asset: "plh_images/habits/habit_instruct_positively.svg",
        lottie_asset: "plh_lottie/habits/habit_instruct_positively.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Get positive",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Get positive",
          },
          in_text_title: {
            eng: "**Get positive** @global.parent_point",
          },
          description: {
            eng: "Giving their teen a positive instruction",
          },
          mark_text: {
            eng: "Every time you give a positive instruction, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Get positive** @global.parent_point",
        description: "Giving their teen a positive instruction",
        mark_text:
          "Every time you give a positive instruction, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "breathe",
        task_id: "task_habit_breathe",
        image_asset: "plh_images/habits/habit_breathe.svg",
        lottie_asset: "plh_lottie/habits/habit_breathe.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Breathe not yell",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Breathe not yell",
          },
          in_text_title: {
            eng: "**Breathe not yell** @global.parent_point",
          },
          description: {
            eng: "Taking a pause before responding",
          },
          mark_text: {
            eng: "Every time you take a pause before responding, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Breathe not yell** @global.parent_point",
        description: "Taking a pause before responding",
        mark_text:
          "Every time you take a pause before responding, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "money",
        task_id: "task_habit_money",
        image_asset: "plh_images/habits/habit_money.svg",
        lottie_asset: "plh_lottie/habits/habit_money.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Good money choice",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Good money choice",
          },
          in_text_title: {
            eng: "**Good money choice** @global.parent_point",
          },
          description: {
            eng: "Keeping the budget",
          },
          mark_text: {
            eng: "Every time you make a good choice about needs, wants and savings, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Good money choice** @global.parent_point",
        description: "Keeping the budget",
        mark_text:
          "Every time you make a good choice about needs, wants and savings, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "consequence",
        task_id: "task_habit_consequence",
        image_asset: "plh_images/habits/habit_consequence.svg",
        lottie_asset: "plh_lottie/habits/habit_consequence.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Calm consequence",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Calm consequence",
          },
          in_text_title: {
            eng: "**Calm consequence** @global.parent_point",
          },
          description: {
            eng: "Giving their teen a consequence in a calm way",
          },
          mark_text: {
            eng: "Every time you give a calm consequence, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Calm consequence** @global.parent_point",
        description: "Giving their teen a consequence in a calm way",
        mark_text:
          "Every time you give a calm consequence, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
      {
        id: "safe",
        task_id: "task_habit_safe",
        image_asset: "plh_images/habits/habit_safe.svg",
        lottie_asset: "plh_lottie/habits/habit_safe.json",
        "fields::weekly_count": 0,
        "fields::total_count": 0,
        title: "Safe",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          in_text_title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          description: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
          short_mark_text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Safe",
          },
          in_text_title: {
            eng: "**Safe** @global.parent_point",
          },
          description: {
            eng: "Planning or keeping a family safety plan",
          },
          mark_text: {
            eng: "Every time you do something to keep your teen safe, tap the @global.parent_point and celebrate your success!",
          },
          short_mark_text: {
            eng: "Did it? Tap it!",
          },
        },
        in_text_title: "**Safe** @global.parent_point",
        description: "Planning or keeping a family safety plan",
        mark_text:
          "Every time you do something to keep your teen safe, tap the @global.parent_point and celebrate your success!",
        short_mark_text: "Did it? Tap it!",
      },
    ],
    _xlsxPath: "global/data/habit_data_list.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "hp_praise_messages",
    status: "released",
    data_list_name: "praise",
    rows: [
      {
        id: "hp_praise_message_1",
        workshop_list: ["w_1on1"],
        mood_list: ["happy"],
        text: "That’s wonderful! Well done for spending time together. It lays the foundation for a great relationship with your teen!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "That’s wonderful! Well done for spending time together. It lays the foundation for a great relationship with your teen!",
          },
        },
      },
      {
        id: "hp_praise_message_2",
        workshop_list: ["w_1on1"],
        mood_list: ["happy"],
        text: "Good for you! One-on-one time shows your teens they are important to you. It really makes a difference!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Good for you! One-on-one time shows your teens they are important to you. It really makes a difference!",
          },
        },
      },
      {
        id: "hp_praise_message_3",
        workshop_list: ["w_1on1"],
        mood_list: ["happy"],
        text: "Wonderful! Spending time with your teen may make your teen more willing to help out more often. You are doing great!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Wonderful! Spending time with your teen may make your teen more willing to help out more often. You are doing great!",
          },
        },
      },
      {
        id: "hp_praise_message_4",
        workshop_list: ["w_1on1"],
        mood_list: ["happy"],
        text: "Well done! One-on-one time with your teen gives you a chance to learn more about your teen’s interests and abilities. You are a star!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Well done! One-on-one time with your teen gives you a chance to learn more about your teen’s interests and abilities. You are a star!",
          },
        },
      },
      {
        id: "hp_praise_message_5",
        workshop_list: ["w_1on1"],
        mood_list: ["happy"],
        text: "Excellent job! Spending time together helps to build a strong and positive relationship between you and your teen.",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Excellent job! Spending time together helps to build a strong and positive relationship between you and your teen.",
          },
        },
      },
      {
        id: "hp_praise_message_6",
        workshop_list: ["w_1on1"],
        mood_list: ["ok"],
        text: "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will greatly improve your relationship; well done for trying!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will greatly improve your relationship; well done for trying!",
          },
        },
      },
      {
        id: "hp_praise_message_7",
        workshop_list: ["w_1on1"],
        mood_list: ["sad"],
        text: "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen - things will get better. Well done for trying!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen - things will get better. Well done for trying!",
          },
        },
      },
      {
        id: "hp_praise_message_8",
        workshop_list: ["w_instruct"],
        mood_list: ["happy"],
        text: "Great to hear it went well; you are a star!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Great to hear it went well; you are a star!",
          },
        },
      },
      {
        id: "hp_praise_message_9",
        workshop_list: ["w_instruct"],
        mood_list: ["ok", "sad"],
        text: "Sorry to hear it was difficult for you. Well done for trying!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry to hear it was difficult for you. Well done for trying!",
          },
        },
      },
      {
        id: "hp_praise_message_10",
        workshop_list: ["w_stress"],
        mood_list: ["happy"],
        text: "Wonderful! You deserve all the happy times!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Wonderful! You deserve all the happy times!",
          },
        },
      },
      {
        id: "hp_praise_message_11",
        workshop_list: ["w_stress"],
        mood_list: ["ok", "sad"],
        text: "Sorry that this was difficult for you. You are a star for trying!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry that this was difficult for you. You are a star for trying!",
          },
        },
      },
      {
        id: "hp_praise_message_12",
        workshop_list: ["w_stress"],
        mood_list: ["happy"],
        text: "Amazing to hear it made you feel good! Keep up the great work. Your teen is learning so much from you!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Amazing to hear it made you feel good! Keep up the great work. Your teen is learning so much from you!",
          },
        },
      },
      {
        id: "hp_praise_message_13",
        workshop_list: ["w_stress"],
        mood_list: ["ok", "sad"],
        text: "Talking about how we feel can be difficult at first, but you and your teen will get used to it. Keep trying, and you will see the positive results!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Talking about how we feel can be difficult at first, but you and your teen will get used to it. Keep trying, and you will see the positive results!",
          },
        },
      },
      {
        id: "hp_praise_message_14",
        workshop_list: ["w_money"],
        mood_list: ["happy"],
        text: "Great to hear it went well. Talking about your finances together really makes your family stronger!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Great to hear it went well. Talking about your finances together really makes your family stronger!",
          },
        },
      },
      {
        id: "hp_praise_message_15",
        workshop_list: ["w_money"],
        mood_list: ["ok", "sad"],
        text: "Sorry to hear it was difficult for you. Well done for trying!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry to hear it was difficult for you. Well done for trying!",
          },
        },
      },
      {
        id: "hp_praise_message_16",
        workshop_list: ["w_rules"],
        mood_list: ["happy"],
        text: "Great to hear it went well! Consistent rules help make our teens feel secure, and keep them safe!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Great to hear it went well! Consistent rules help make our teens feel secure, and keep them safe!",
          },
        },
      },
      {
        id: "hp_praise_message_17",
        workshop_list: ["w_rules"],
        mood_list: ["ok", "sad"],
        text: "Sorry that this has been difficult. Creating rules together requires some practice but it's worth it!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry that this has been difficult. Creating rules together requires some practice but it's worth it!",
          },
        },
      },
      {
        id: "hp_praise_message_18",
        workshop_list: ["w_crisis"],
        mood_list: ["happy"],
        text: "Great to hear it went well!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Great to hear it went well!",
          },
        },
      },
      {
        id: "hp_praise_message_19",
        workshop_list: ["w_consequence"],
        mood_list: ["ok", "sad"],
        text: "Sorry that this was difficult. Setting consequences together will make your teen want to follow the rules more often!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry that this was difficult. Setting consequences together will make your teen want to follow the rules more often!",
          },
        },
      },
      {
        id: "hp_praise_message_20",
        workshop_list: ["w_solve"],
        mood_list: ["ok", "sad"],
        text: "Sorry that this was hard. Sometimes we just have to keep trying. Find a time when you and your teen are calm and try again to talk through a problem using the four steps of problem-solving. Together, you can do so much!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry that this was hard. Sometimes we just have to keep trying. Find a time when you and your teen are calm and try again to talk through a problem using the four steps of problem-solving. Together, you can do so much!",
          },
        },
      },
      {
        id: "hp_praise_message_21",
        workshop_list: ["w_safe"],
        mood_list: ["happy"],
        text: "Great to hear it went well! Talking about risks and support options prevents problems and really helps to keep your teen safe.",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Great to hear it went well! Talking about risks and support options prevents problems and really helps to keep your teen safe.",
          },
        },
      },
      {
        id: "hp_praise_message_22",
        workshop_list: ["w_safe"],
        mood_list: ["ok", "sad"],
        text: "Sorry that this was hard. Mapping risks and places to get support can be challenging and emotional. It really does help to keep your teen safe!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry that this was hard. Mapping risks and places to get support can be challenging and emotional. It really does help to keep your teen safe!",
          },
        },
      },
      {
        id: "hp_praise_message_23",
        workshop_list: ["w_crisis"],
        mood_list: ["ok", "sad"],
        text: "Sorry that it didn’t go so well. This is not easy to do. Try to sit down and discuss it with your teen again. Also, is there someone your teen trusts who could join you in the discussion with your teen?",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Sorry that it didn’t go so well. This is not easy to do. Try to sit down and discuss it with your teen again. Also, is there someone your teen trusts who could join you in the discussion with your teen?",
          },
        },
      },
      {
        id: "hp_praise_message_24",
        workshop_list: ["w_consequence"],
        mood_list: ["happy"],
        text: "Great to hear it went well! Getting consequences right helps teens behave better and makes family life calmer.",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Great to hear it went well! Getting consequences right helps teens behave better and makes family life calmer.",
          },
        },
      },
      {
        id: "hp_praise_message_25",
        workshop_list: ["w_solve"],
        mood_list: ["happy"],
        text: "Great to hear it went well! When your teen learns how to solve problems, they can use that skill their whole life. What a gift!",
        _translations: {
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Great to hear it went well! When your teen learns how to solve problems, they can use that skill their whole life. What a gift!",
          },
        },
      },
    ],
    _xlsxPath: "global/data/praise_data_list.xlsx",
  },
];
export default data_list;
