(function () {
  "use strict";

  const additions = {
    2022: {
      reading: [
        "The organizers also resist the temptation to judge success by the number of repaired objects alone. A lamp that is used for another year, a repaired bicycle that replaces a short car journey or a visitor who chooses a more durable replacement all matter. At the same time, volunteers are careful not to present repair as a simple solution to every environmental problem. Some failures reveal that a product was never designed to be opened, while others show that an apparently cheap repair could create a later safety risk.",
        "This measured approach has changed the relationship between the university and local residents. People who once visited only to dispose of old equipment now return with advice, spare parts and stories about products that survived several repairs. The café has therefore become a small public classroom in which technical knowledge, consumer responsibility and social trust develop together."
      ],
      readingQuestion: {
        prompt: "What does the passage suggest is a broader sign that the repair café is successful?",
        options: [
          "Every damaged object is repaired without cost",
          "Participants make more durable and careful consumption choices",
          "Volunteers replace professional repair shops",
          "Manufacturers stop producing new products"
        ],
        answer: 1,
        explanation: "新增段落把延长物品使用期、替代短途乘车和选择更耐用的替代品都视为成效，重点在消费观念与行为的改变，而不只是维修数量。"
      },
      listening: [
        "Student: One more thing: if the person joining online has connection problems, can we use the phone in the room to contact you?",
        "Staff: Yes, but please test the app as soon as you arrive. The room phone is meant for internal calls, so it cannot be used for the online meeting.",
        "Student: That's fine. We'll ask everyone to send their slides before seven fifteen so we won't lose time.",
        "Staff: Good idea. And remember that the booking cannot be extended automatically. If the next group arrives, you will need to leave at nine thirty."
      ],
      listeningQuestion: {
        prompt: "What does the staff member imply about the room phone?",
        options: [
          "It can replace the online meeting app",
          "It should be used only for internal communication",
          "It will connect the group to the next users",
          "It must be booked separately"
        ],
        answer: 1,
        explanation: "工作人员说 room phone 用于内部通话，不能用于线上会议，因此它不能替代会议软件。"
      }
    },
    2023: {
      reading: [
        "The quality of a short project depends heavily on how it is organized. A vague instruction to help with marketing may leave a student making attractive slides without knowing whether they address a real business problem. Clear goals, a named supervisor, realistic working hours and an agreement about ownership of the final work are therefore essential. Ethical questions also arise when companies use short projects mainly to obtain inexpensive labor rather than to offer genuine learning.",
        "Universities can act as intermediaries by checking tasks before advertising them and by asking students to reflect on what they contributed. This reflection discourages applicants from claiming credit for work they did not do and helps employers understand the limits of a brief placement. Used carefully, the micro-internship is less a shortcut to a famous company than a structured opportunity to turn classroom knowledge into evidence of practical judgment."
      ],
      readingQuestion: {
        prompt: "What is the main risk of a poorly organized micro-internship?",
        options: [
          "It may last longer than a normal degree",
          "Students may work without clear goals or genuine learning",
          "Employers may be forced to hire every participant",
          "Universities may stop teaching practical subjects"
        ],
        answer: 1,
        explanation: "新增段落指出任务含糊、缺少目标和监督时，学生可能只完成表面工作，甚至成为廉价劳动力，因此核心风险是学习质量和劳动伦理。"
      },
      listening: [
        "Man: I'll check the timetable, but what about shops that receive deliveries early in the morning?",
        "Woman: Delivery vehicles will be allowed into the centre before ten, and restaurants can use the rear service roads after that.",
        "Man: So the restriction mainly affects private cars rather than local businesses.",
        "Woman: Exactly. The council will also compare air-quality readings and survey visitors afterwards. If the first Sunday creates serious problems, the route can be changed."
      ],
      listeningQuestion: {
        prompt: "How will the city decide whether the car-free plan needs adjustment?",
        options: [
          "By closing all shops for one week",
          "By observing air quality and collecting visitor feedback",
          "By allowing private cars after ten o'clock",
          "By cancelling every bus route"
        ],
        answer: 1,
        explanation: "女士说活动后会比较空气质量数据并调查访客，若出现严重问题就调整路线。"
      }
    },
    2024: {
      reading: [
        "Misinformation is especially difficult to correct because emotion affects sharing. A headline that produces anger or fear may travel faster than a careful correction, and people are more likely to remember the original claim than the later explanation. Repeated exposure can also create a false sense of familiarity: a statement begins to feel credible simply because it has appeared many times. For this reason, checking a claim once is not enough; readers should examine who benefits from the message and what evidence has been omitted.",
        "A useful classroom exercise is to compare two reports of the same event rather than label one true and the other false. Students can highlight changed numbers, missing quotations and different descriptions of responsibility. The exercise makes verification less abstract and shows that reliable judgment usually requires several small checks rather than a single authoritative source."
      ],
      readingQuestion: {
        prompt: "Why can a familiar false claim still seem credible after correction?",
        options: [
          "Corrections are always written in a foreign language",
          "Repeated exposure can make people mistake familiarity for evidence",
          "Photographs are never reliable",
          "Most readers remember every correction in detail"
        ],
        answer: 1,
        explanation: "新增段落提出“熟悉感”会让重复出现的说法显得可信，这说明反复接触本身可能制造虚假的真实感。"
      },
      listening: [
        "Man: I have photographs from last year's harvest festival. Would those be useful?",
        "Woman: They would, but we may need a release form for children whose faces are recognizable.",
        "Man: I understand. I can choose images where people are working and their faces are not clear.",
        "Woman: That would be safer. The newsletter closes on Thursday, so please send three or four selected photographs by Wednesday evening rather than the whole folder."
      ],
      listeningQuestion: {
        prompt: "Why does the woman ask the man to send only a few photographs?",
        options: [
          "The newsletter has limited space and a clear deadline",
          "The garden is closed for repairs",
          "All photographs of adults are forbidden",
          "The website cannot display images"
        ],
        answer: 0,
        explanation: "女士要求周三前发送三到四张精选照片，而不是整个文件夹，因为通讯稿有截止日期且版面有限。"
      }
    },
    2025: {
      reading: [
        "The design of digital services complicates individual decisions. Platforms benefit when users return frequently, so small cues such as badges, vibrations and red dots are deliberately difficult to ignore. A person may silence one application while another assumes its place. Organizations also expect rapid replies, which turns the absence of a notification into a new source of anxiety. Concentration problems should therefore not be explained only as a failure of personal discipline.",
        "More effective policies combine individual strategies with collective rules. A seminar group may agree to place phones in a box, while an employer may publish realistic response times. Such arrangements protect attention without pretending that everyone can remain permanently unavailable. The objective is not silence for its own sake, but a predictable environment in which people can choose when to engage and when to focus."
      ],
      readingQuestion: {
        prompt: "What point does the passage make about personal discipline?",
        options: [
          "It is the only cause of lost concentration",
          "It cannot fully explain distraction created by service design and social expectations",
          "It becomes unnecessary when phones are silent",
          "It improves when people receive more notifications"
        ],
        answer: 1,
        explanation: "新增段落指出平台设计和工作中的回复期待也会制造分心，因此不能把注意力问题全部归咎于个人自律。"
      },
      listening: [
        "Woman: What happens if I discover a faulty bike after I have already unlocked it?",
        "Man: Use the repair button in the application and photograph the fault. The rental charge should stop once the report is confirmed.",
        "Woman: Should I leave the bike where it is?",
        "Man: No. If it is safe to move, return it to the nearest station and attach the red maintenance tag under the seat. A mechanic will receive the report automatically."
      ],
      listeningQuestion: {
        prompt: "What should the woman do after reporting a faulty bicycle?",
        options: [
          "Leave it in the road and wait for a mechanic",
          "Return it safely and attach the maintenance tag",
          "Continue using it until the battery is empty",
          "Remove the lock and take the bike home"
        ],
        answer: 1,
        explanation: "男士要求她把车安全送回最近站点，并把红色维护标签挂在座位下，系统会自动通知维修人员。"
      }
    },
    "lunar-network": {
      reading: [
        "The lunar environment creates engineering problems that do not appear in an ordinary mobile network. Temperatures vary sharply between sunlight and shadow, abrasive dust can enter joints and seals, and solar radiation may disturb electronic components. A device that works in a laboratory must therefore survive launch, landing and a long period without direct repair. Engineers test each component under vibration and vacuum conditions and keep spare communication paths that can operate if one part fails.",
        "The project also has to consider how a future network would be governed. A simple demonstration can use a temporary standard, but scientists from different countries will eventually need shared frequencies, security rules and methods for handling urgent data. The experiment is valuable not because it promises immediate mobile coverage, but because it identifies which technical and organizational choices must be solved before the Moon can support a reliable communication system."
      ],
      readingQuestion: {
        prompt: "Why is the experiment valuable even if it does not create permanent lunar coverage?",
        options: [
          "It will replace all Earth-based communication systems",
          "It exposes technical and organizational problems that future networks must solve",
          "It proves that lunar dust has no effect on machines",
          "It allows every scientist to use the same telephone number"
        ],
        answer: 1,
        explanation: "末段强调实验价值在于识别未来可靠通信网络必须解决的技术与治理问题，而不是立即提供永久覆盖。"
      },
      listening: [
        "Student: If the internet connection fails during the engineer's talk, could we play a video that she records in advance?",
        "Staff: Yes. Save the file on two devices and do not rely on cloud access during the exhibition.",
        "Student: We'll also print a summary so visitors can read something while we reconnect.",
        "Staff: That is a practical backup. And ask the engineer to keep her presentation shorter than twenty minutes so there will be time for questions."
      ],
      listeningQuestion: {
        prompt: "What does the staff member recommend for the online engineer's presentation?",
        options: [
          "Cancel the presentation if Wi-Fi is available",
          "Keep a local backup and reserve time for questions",
          "Show the video for more than an hour",
          "Move the event to the smaller hall"
        ],
        answer: 1,
        explanation: "工作人员建议把录播文件保存在两台本地设备，并让工程师控时、留出问答时间。"
      }
    },
    "historic-landmark": {
      reading: [
        "Managing access fairly is as difficult as protecting the stone itself. Online-only tickets may exclude older visitors or people without reliable banking services, while very cheap entry can encourage people to book without intending to come. Some sites reserve part of each day for local residents and school groups, and others keep a small number of tickets for in-person visitors. These measures reduce the risk that a famous destination becomes accessible mainly to those who can plan far ahead.",
        "Conservation should also be measured over decades rather than judged by annual visitor numbers. Monitoring moisture, surface loss and crowd movement may show that fewer, better-paced visits cause less damage than a larger number of short entries. Revenue remains necessary, but it cannot be the only definition of success. A landmark survives as a public place only when conservation, access and the daily needs of surrounding communities are treated as connected responsibilities."
      ],
      readingQuestion: {
        prompt: "Why does the passage support keeping some tickets for in-person visitors?",
        options: [
          "It increases the total price of online tickets",
          "It prevents access from depending only on advance digital planning",
          "It allows every visitor to enter without a ticket",
          "It shows that conservation is no longer necessary"
        ],
        answer: 1,
        explanation: "新增段落指出线上票可能排除不熟悉数字服务的访客，保留现场票可减少访问机会被提前规划能力限制的问题。"
      },
      listening: [
        "Man: Did the early ticket also include the guide and the shuttle bus?",
        "Woman: The shuttle was included, but the guide cost extra. We only paid because one gallery was closed and the guide explained its history in another room.",
        "Man: Was the replacement tour worth it?",
        "Woman: I think so. It was shorter, but we understood why conservation work was necessary. The site also offered us another visit within a year."
      ],
      listeningQuestion: {
        prompt: "How did the site respond when one gallery was closed?",
        options: [
          "It cancelled the shuttle service",
          "It provided a replacement explanation and another visit within a year",
          "It charged visitors twice as much",
          "It removed the guide from the ticket"
        ],
        answer: 1,
        explanation: "女士说闭馆后导游在另一房间解释历史，并且景区提供一年内的另一次参观。"
      }
    },
    "cat-breed": {
      reading: [
        "Public interest in unusual breeds can conflict with animal welfare. Advertisements often emphasize appearance and intelligence while saying little about the time, cost and special housing a mature animal may require. Some places restrict the ownership of hybrids with wild ancestors, and shelters report that owners sometimes give up an active pet after discovering that ordinary furniture cannot contain it. Breeders therefore face an ethical duty not only to breed healthy animals but also to screen buyers carefully.",
        "For a family interested in the breed, temperament matters more than appearance. An experienced adult cat may need less intensive supervision than a young Savannah, while a home with safe outdoor access may suit an active animal better than a small flat. The responsible question is not whether the breed looks distinctive, but whether the household can provide predictable routines, enrichment and veterinary care for the animal's entire life."
      ],
      readingQuestion: {
        prompt: "What does the passage identify as the most important question for a prospective owner?",
        options: [
          "Whether the cat has the most unusual coat",
          "Whether the household can meet the animal's long-term welfare needs",
          "Whether the cat can live without medical care",
          "Whether the breeder charges the lowest price"
        ],
        answer: 1,
        explanation: "末段把重点放在家庭能否长期提供规律生活、环境丰富性和兽医照护，而不是外观是否稀有。"
      },
      listening: [
        "Man: So the shelter will visit her home before she adopts the cat?",
        "Woman: Yes. They check whether the windows are secure and whether there is a quiet room for the first few days.",
        "Man: She is worried that an adult cat will not settle with visitors.",
        "Woman: The shelter knows each animal's behavior. A calm older cat may be less disturbed by visitors than a young one that becomes excited when the doorbell rings."
      ],
      listeningQuestion: {
        prompt: "Why might an older cat suit the woman's sister?",
        options: [
          "Older cats require no space or toys",
          "Its known temperament may fit more predictably with visitors",
          "It will definitely live outdoors",
          "The shelter does not require a home visit"
        ],
        answer: 1,
        explanation: "女士说收容所了解每只动物的行为，成年猫的已知性格可能比容易因门铃兴奋的小猫更稳定。"
      }
    },
    "empty-shopping-centre": {
      reading: [
        "The project is being developed in stages because a single comprehensive redevelopment would leave the building empty for several more years. The rear section will first house the clinic and library, while the front remains closed until the fire systems are replaced. This sequence creates immediate public benefits without pretending that every financial and engineering question has been answered. Temporary walls and separate entrances also allow construction to continue without preventing essential services from opening.",
        "Residents have asked for written guarantees about rents, opening hours and public access. They remember earlier proposals that promised community facilities but later became luxury apartments when costs increased. The council has responded with a legal agreement covering the public areas and a committee that includes local tenants and disabled users. These arrangements cannot guarantee success, but they make it harder for the original public purpose to disappear quietly during a future change of ownership."
      ],
      readingQuestion: {
        prompt: "Why do residents request written guarantees?",
        options: [
          "They want to delay all construction permanently",
          "They fear that community promises may be abandoned later",
          "They oppose the use of temporary walls",
          "They believe the library should charge higher rents"
        ],
        answer: 1,
        explanation: "新增段落说明居民记得过去承诺落空，因此要求以法律协议和委员会保障公共设施不会被悄悄改成商业住宅。"
      },
      listening: [
        "Fire officers also asked the centre to record how long it takes to check rooms used by evening classes.",
        "The manager said one stairway became crowded because a door opened toward the corridor instead of away from it.",
        "A follow-up practice will therefore be held before the main hall reopens next month.",
        "Training will include a short exercise in which two exits are blocked, forcing staff to guide visitors through an unfamiliar route."
      ],
      listeningQuestion: {
        prompt: "Why will the centre hold another practice?",
        options: [
          "To test changes to doors, room checks and blocked exits",
          "To show visitors the temporary market",
          "To shorten evening classes next month",
          "To remove a fire exit permanently"
        ],
        answer: 0,
        explanation: "新闻补充指出门向、房间检查和备用路线仍有问题，因此大厅重开前会再演练一次。"
      }
    },
    "potato-supply": {
      reading: [
        "Diversification is not cost-free. Smaller suppliers may be unable to meet the quality standards of several factories, and keeping extra food in cold storage uses energy. Contracts can help by sharing risk, but a long agreement with a grower may become expensive if demand falls. Companies therefore have to balance flexibility against reliability rather than simply add more suppliers.",
        "Consumers also influence how quickly a supply chain recovers. If shoppers reject unfamiliar varieties or slightly different packaging, surplus food may be wasted even when it is safe. Clear labels, recipe suggestions and realistic prices can make better use of what is available. The strongest response to a shortage combines biological security, transport planning, storage and honest communication; no single measure can remove every risk."
      ],
      readingQuestion: {
        prompt: "What trade-off does the passage highlight in making food supplies more resilient?",
        options: [
          "Reliability can require costs and reduce flexibility",
          "Imported food always destroys domestic agriculture",
          "Cold storage can only be provided by restaurants",
          "Consumers never react to prices"
        ],
        answer: 0,
        explanation: "新增段落说明多供应商、冷链和长期合同都带来成本与灵活性代价，因此韧性建设不是无成本的。"
      },
      listening: [
        "Customer: Will the price of the pumpkin soup change if the vegetables come from a different farm?",
        "Owner: It may rise slightly next week, but I would rather explain the increase than remove the dish suddenly.",
        "Customer: That makes sense. Could I reserve two bowls for lunch?",
        "Owner: Yes. The menu changes quickly, so reservations will be confirmed in the morning after the delivery arrives."
      ],
      listeningQuestion: {
        prompt: "Why does the owner confirm lunch reservations in the morning?",
        options: [
          "The supplier delivers ingredients that same day",
          "The café does not open before noon",
          "The price never changes",
          "Customers cannot send messages online"
        ],
        answer: 0,
        explanation: "菜单会随当天供应变化，而早晨送货后店主才能确认菜品与预订是否可行。"
      }
    },
    "crowded-city": {
      reading: [
        "Digital information is useful only when it is accurate and available to everyone. A system that directs tourists to a quiet attraction may quickly make that place crowded, and an application that reports waiting times can fail when the network is busy. Cities should therefore combine live data with permanent signs, staff at key junctions and information delivered through hotels or transport operators.",
        "Residents also need protections that visitors do not require. Noise, blocked pavements and short-term rentals can make a central neighbourhood difficult to live in even when visitor income is rising. Some cities issue resident cards for local services, limit changing the use of homes and publish clear rules for tour groups. Managing crowds is ultimately a test of whether a city can preserve ordinary life while sharing its most famous places."
      ],
      readingQuestion: {
        prompt: "Why is live digital information not sufficient on its own?",
        options: [
          "It can be inaccurate or redistribute crowds to another quiet area",
          "It always reduces the number of visitors to zero",
          "It prevents residents from using public transport",
          "It makes permanent signs illegal"
        ],
        answer: 0,
        explanation: "新增段落指出实时数据可能网络失败，也可能把游客集中到原本安静的位置，因此还需线下标识与人员引导。"
      },
      listening: [
        "Student: If we book online, may we change the time if our train is delayed?",
        "Staff: You can change it once without a fee, but the new entry period depends on availability.",
        "Student: What if we miss the last entry altogether?",
        "Staff: Bring the ticket to the information desk on the same day. We can move it to the following morning, although the shuttle ticket must be purchased again."
      ],
      listeningQuestion: {
        prompt: "What happens if the group misses the last entry?",
        options: [
          "Their ticket can be moved to the next morning",
          "They must buy a completely new museum ticket",
          "The museum keeps the ticket until the next holiday",
          "They can only use the shuttle bus"
        ],
        answer: 0,
        explanation: "工作人员说当天到咨询台可以把门票改到第二天上午，但接驳车票需要重新购买。"
      }
    }
  };

  for (const exam of window.CET4_EXAMS || []) {
    const id = exam.mockId || exam.year;
    const addition = additions[id];
    if (!addition) continue;

    exam.reading.passage = [exam.reading.passage, ...addition.reading].join("\n\n");
    exam.reading.questions.push(addition.readingQuestion);
    exam.listening.script = [exam.listening.script, ...addition.listening].join("\n");
    exam.listening.questions.push(addition.listeningQuestion);
  }
})();
