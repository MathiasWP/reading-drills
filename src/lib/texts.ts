export type TextCategory =
  | "science"
  | "history"
  | "philosophy"
  | "fiction"
  | "technology"
  | "nature"
  | "psychology"
  | "society";

export interface TextPassage {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: TextCategory;
  text: string;
  wordCount: number;
  source?: "builtin" | "custom" | "epub";
  bookId?: string;
  chapterIndex?: number;
}

const passages: TextPassage[] = [
  // ============================================================
  //  EASY — SCIENCE
  // ============================================================
  {
    id: "sun",
    title: "The Sun",
    difficulty: "easy",
    category: "science",
    text: "The sun is the star at the center of our solar system. It is a nearly perfect ball of hot plasma that provides most of the energy for life on Earth. The sun formed about four and a half billion years ago from the gravitational collapse of a region within a large molecular cloud. Most of the matter gathered in the center while the rest flattened into a disk that became the planets. The sun is roughly one hundred and nine times the diameter of Earth. Its core temperature reaches about fifteen million degrees. Without the steady light and warmth of the sun life as we know it would not exist on our planet. Every second the sun converts about four million tons of matter into energy through nuclear fusion. This energy travels outward through the sun and eventually reaches Earth as sunlight. It takes about eight minutes for light from the sun to reach our planet. The sun also produces a stream of charged particles known as the solar wind which extends far beyond the orbits of the planets.",
    wordCount: 0,
  },
  {
    id: "water-cycle",
    title: "The Water Cycle",
    difficulty: "easy",
    category: "science",
    text: "The water cycle is the continuous movement of water through the Earth's systems. It begins when the sun heats water in oceans rivers and lakes causing it to evaporate into the atmosphere as water vapor. As this vapor rises it cools and condenses into tiny droplets that form clouds. When enough droplets gather together they become heavy and fall back to Earth as precipitation in the form of rain snow sleet or hail. Some of this water flows over the land as runoff collecting in streams and rivers that eventually lead back to the ocean. Other water seeps into the ground becoming groundwater that feeds wells and springs. Plants also play a role in the water cycle by absorbing water through their roots and releasing it into the air through their leaves in a process called transpiration. The water cycle has no beginning or end. The same water that exists on Earth today has been recycled for billions of years. The water you drink may once have been part of a dinosaur or an ancient ocean. Understanding the water cycle is important because all living things depend on fresh water to survive.",
    wordCount: 0,
  },
  {
    id: "gravity",
    title: "Understanding Gravity",
    difficulty: "easy",
    category: "science",
    text: "Gravity is the force that pulls objects toward each other. Every object in the universe with mass has gravity but the effect is only noticeable when at least one of the objects is very large like a planet or a star. On Earth gravity is what keeps us on the ground and what makes objects fall when we drop them. The strength of gravity depends on two things the mass of the objects and the distance between them. The more massive an object is the stronger its gravitational pull. This is why the sun which is much more massive than Earth has a much stronger gravitational field. Isaac Newton was the first to describe gravity mathematically in the seventeenth century. His law of universal gravitation explained how every object attracts every other object with a force proportional to their masses. Albert Einstein later refined our understanding with his theory of general relativity which describes gravity not as a force but as a curvature of space and time caused by mass. Gravity is responsible for many phenomena we observe every day from the tides in the ocean to the orbits of planets around the sun.",
    wordCount: 0,
  },
  // ============================================================
  //  EASY — HISTORY
  // ============================================================
  {
    id: "coffee",
    title: "The History of Coffee",
    difficulty: "easy",
    category: "history",
    text: "Coffee is one of the most popular drinks in the world. Legend says that a goat herder in Ethiopia first noticed the energizing effect of coffee beans when his goats became lively after eating berries from a certain tree. The knowledge of these berries spread to the Arabian Peninsula where coffee was first cultivated and traded. By the fifteenth century coffee was being grown in Yemen and by the sixteenth century it was known in Persia Egypt Syria and Turkey. Coffee houses became important centers for social activity and communication. European travelers brought stories of the dark beverage back to their countries and by the seventeenth century coffee had spread across Europe. At first some people were suspicious of the drink and called it the bitter invention of Satan. But after Pope Clement the Eighth tried it and gave it his approval coffee gained wide acceptance. The Dutch were among the first to grow coffee outside of Arabia bringing plants to their colonies in Indonesia. From there coffee cultivation spread to the Americas where the climate proved ideal for growing. Today Brazil is the largest producer of coffee in the world followed by Vietnam and Colombia. The global coffee industry employs millions of people and the drink continues to be a daily ritual for billions.",
    wordCount: 0,
  },
  {
    id: "printing-press",
    title: "The Printing Press",
    difficulty: "easy",
    category: "history",
    text: "The invention of the printing press by Johannes Gutenberg around fourteen forty changed the world forever. Before the printing press books had to be copied by hand a slow and expensive process that meant only the wealthy and the church could afford them. Gutenberg developed a system of movable metal type that could be arranged to form words and pages then inked and pressed onto paper. His first major printed work was the Gutenberg Bible completed around fourteen fifty five. The printing press made books much cheaper and faster to produce. Within fifty years of its invention millions of books had been printed across Europe. This explosion of printed material had enormous consequences. More people learned to read because books became affordable. New ideas spread faster than ever before. The printing press played a key role in the Protestant Reformation as Martin Luther's writings could be quickly copied and distributed. It also helped advance science by allowing researchers to share their findings widely. Libraries grew and education became more accessible. Many historians consider the printing press one of the most important inventions in human history because it democratized knowledge and transformed society.",
    wordCount: 0,
  },
  {
    id: "silk-road",
    title: "The Silk Road",
    difficulty: "easy",
    category: "history",
    text: "The Silk Road was a network of trade routes that connected the East and West for centuries. It stretched from China through Central Asia to the Mediterranean and was used to transport goods ideas and culture between civilizations. The name comes from the Chinese silk that was one of the most valuable commodities traded along these routes. But silk was far from the only product that traveled the Silk Road. Spices precious metals gemstones textiles and exotic animals all moved along the routes. Merchants rarely traveled the entire distance themselves. Instead goods were passed from trader to trader through a series of markets and trading posts. Along with goods the Silk Road carried ideas and innovations. Paper gunpowder and the compass all spread from China to the West through these trade networks. Religions including Buddhism Islam and Christianity also spread along the Silk Road. The routes were not without danger. Travelers faced harsh deserts high mountain passes bandits and extreme weather. Caravans of camels were the main method of transport across the dry stretches. The Silk Road began to decline in the fifteenth century as sea routes became a faster and cheaper way to move goods between Asia and Europe.",
    wordCount: 0,
  },
  // ============================================================
  //  EASY — NATURE
  // ============================================================
  {
    id: "sleep",
    title: "Why We Sleep",
    difficulty: "easy",
    category: "nature",
    text: "Sleep is essential for human health and well being. During sleep the body performs critical maintenance tasks including tissue repair muscle growth and the release of important hormones. The brain also uses sleep time to consolidate memories and process the information gathered during the day. Most adults need between seven and nine hours of sleep each night though individual needs can vary. Children and teenagers generally need more sleep than adults because their bodies and brains are still developing. Sleep occurs in cycles that repeat throughout the night. Each cycle includes stages of light sleep deep sleep and rapid eye movement sleep also known as REM sleep. During REM sleep the brain becomes more active and dreaming typically occurs. Deep sleep is particularly important for physical recovery while REM sleep plays a key role in learning and emotional regulation. A lack of sufficient sleep can lead to problems with concentration memory and mood. Chronic sleep deprivation has been linked to serious health conditions including heart disease diabetes and weakened immune function. Despite knowing how important sleep is many people in modern society regularly fail to get enough rest. Screens electronic devices and busy schedules often interfere with healthy sleep habits. Simple changes like maintaining a consistent bedtime reducing caffeine intake in the afternoon and keeping the bedroom dark and cool can significantly improve sleep quality.",
    wordCount: 0,
  },
  {
    id: "honeybees",
    title: "The Life of Honeybees",
    difficulty: "easy",
    category: "nature",
    text: "Honeybees are among the most fascinating and important insects on Earth. A single honeybee colony can contain up to sixty thousand bees all working together in a highly organized society. Each colony has one queen whose sole job is to lay eggs. Worker bees which are all female perform every other task including gathering nectar building the honeycomb caring for young bees and defending the hive. Male bees called drones exist only to mate with queens from other colonies. Honeybees communicate through a remarkable behavior known as the waggle dance. When a forager bee finds a good source of nectar it returns to the hive and performs a figure eight dance that tells other bees the direction and distance of the food source. The angle of the dance relative to the sun indicates direction while the duration of the waggle indicates distance. Bees visit flowers to collect nectar which they convert into honey by evaporating most of the water content. A single bee produces only about one twelfth of a teaspoon of honey in its entire lifetime but the collective effort of thousands of bees results in large stores of honey. Beyond honey production bees provide an essential service through pollination. They transfer pollen between flowers enabling plants to produce fruits and seeds. Roughly one third of the food we eat depends on pollination by bees.",
    wordCount: 0,
  },
  {
    id: "migration",
    title: "Animal Migration",
    difficulty: "easy",
    category: "nature",
    text: "Every year billions of animals undertake long journeys across the planet in a phenomenon known as migration. Birds are perhaps the most well known migrants with species like the Arctic tern traveling from the Arctic to the Antarctic and back again covering about seventy thousand kilometers each year. But migration is not limited to birds. Wildebeest in Africa travel in massive herds across the Serengeti following the rains and fresh grass. Monarch butterflies fly thousands of kilometers from Canada to central Mexico each autumn using a combination of the sun's position and the Earth's magnetic field to navigate. Salmon swim from the ocean back to the exact freshwater streams where they were born in order to spawn. Whales travel from cold polar feeding grounds to warm tropical waters to give birth. The reasons for migration are usually related to food weather and reproduction. Animals move to find better feeding grounds escape harsh winters or reach safe breeding areas. Migration is a dangerous undertaking. Many animals die along the way from exhaustion predators or human obstacles like roads and buildings. Climate change is also affecting migration patterns as warming temperatures shift the timing and availability of food sources. Despite the risks migration has evolved independently in many different animal groups suggesting that the benefits of these epic journeys outweigh the costs.",
    wordCount: 0,
  },
  // ============================================================
  //  EASY — PSYCHOLOGY
  // ============================================================
  {
    id: "habits",
    title: "How Habits Form",
    difficulty: "easy",
    category: "psychology",
    text: "Habits are behaviors that we perform automatically without much conscious thought. They form through a process called the habit loop which consists of three parts a cue a routine and a reward. The cue is a trigger that tells your brain to start a particular behavior. The routine is the behavior itself. The reward is the positive feeling or outcome that reinforces the behavior and makes your brain want to repeat it. For example you might feel stressed at work which is the cue. You then eat a piece of chocolate which is the routine. The sugar gives you a brief feeling of pleasure which is the reward. Over time your brain learns to associate stress with eating chocolate and the behavior becomes automatic. Research suggests that it takes anywhere from eighteen to two hundred and fifty four days for a new habit to form depending on the complexity of the behavior and the individual. The key to building good habits is to start small and be consistent. Instead of trying to exercise for an hour every day start with just five minutes. Make the cue obvious the routine easy and the reward satisfying. Breaking bad habits is harder because the neural pathways that support them are deeply ingrained. But it is possible by replacing the routine with a healthier alternative while keeping the same cue and reward.",
    wordCount: 0,
  },
  // ============================================================
  //  EASY — TECHNOLOGY
  // ============================================================
  {
    id: "internet-basics",
    title: "How the Internet Works",
    difficulty: "easy",
    category: "technology",
    text: "The internet is a global network of computers that are all connected to each other. When you visit a website your computer sends a request through a series of networks to a server which is a powerful computer that stores the website's files. The server then sends the requested information back to your computer where your web browser displays it as a web page. This all happens in a fraction of a second. The information travels through a combination of physical cables including undersea fiber optic cables that stretch across ocean floors and wireless signals. Every device on the internet has a unique address called an IP address which works like a postal address allowing data to be sent to the right destination. The internet began as a military project in the United States in the nineteen sixties. Researchers wanted a communication network that could survive even if parts of it were destroyed. The network grew to connect universities and research institutions and eventually became available to the general public in the nineteen nineties. Today more than five billion people use the internet for everything from sending messages and watching videos to shopping banking and working. The amount of data sent across the internet every day is staggering measured in billions of gigabytes.",
    wordCount: 0,
  },
  // ============================================================
  //  EASY — SOCIETY
  // ============================================================
  {
    id: "libraries",
    title: "The History of Libraries",
    difficulty: "easy",
    category: "society",
    text: "Libraries have been centers of knowledge and learning for thousands of years. The oldest known library was established in ancient Mesopotamia around twenty six hundred years before the common era. It contained clay tablets inscribed with cuneiform writing that recorded everything from business transactions to epic poems. The most famous ancient library was the Library of Alexandria in Egypt founded in the third century before the common era. It aimed to collect a copy of every book in the world and at its peak may have held hundreds of thousands of scrolls. The destruction of the Library of Alexandria is often cited as one of the greatest losses of knowledge in history though scholars debate exactly when and how it was destroyed. In the Middle Ages monasteries became the primary keepers of books in Europe with monks painstakingly copying manuscripts by hand. The invention of the printing press in the fifteenth century made books more widely available and public libraries began to emerge. The first free public library in the United States opened in eighteen thirty three in Peterborough New Hampshire. Today libraries have evolved far beyond their original role as book repositories. Modern libraries offer digital resources computer access community programs and educational workshops. They remain one of the few public spaces where anyone can access information freely regardless of their economic status.",
    wordCount: 0,
  },
  // ============================================================
  //  EASY — PHILOSOPHY
  // ============================================================
  {
    id: "stoicism-intro",
    title: "What Is Stoicism",
    difficulty: "easy",
    category: "philosophy",
    text: "Stoicism is an ancient Greek philosophy that was founded in Athens around three hundred years before the common era. It teaches that the key to a good life is focusing on what you can control and accepting what you cannot. The Stoics believed that we cannot control external events but we can control how we respond to them. If it rains on your day off you cannot change the weather but you can choose not to let it ruin your mood. This simple idea has helped people deal with hardship for over two thousand years. Some of the most famous Stoic thinkers include Epictetus a former slave Marcus Aurelius a Roman emperor and Seneca a statesman and playwright. Despite their very different social positions they all found value in the same philosophy. Marcus Aurelius wrote his private reflections in a journal now known as Meditations which remains widely read today. Stoicism also emphasizes the importance of virtue. The Stoics identified four key virtues wisdom courage justice and temperance. They believed that living according to these virtues was more important than wealth fame or pleasure. In recent years Stoicism has experienced a revival. Many people find its practical advice relevant to modern challenges like stress anxiety and information overload. The core message remains the same focus on what is within your power and let go of what is not.",
    wordCount: 0,
  },
  // ============================================================
  //  EASY — FICTION
  // ============================================================
  {
    id: "lighthouse-keeper",
    title: "The Lighthouse Keeper",
    difficulty: "easy",
    category: "fiction",
    text: "Old Maren had kept the lighthouse on the rocky point for thirty seven years. Every evening as the sun dipped below the horizon she climbed the one hundred and twelve steps to the lamp room and lit the great light. The beam swept across the dark water warning ships away from the dangerous rocks below. She knew every sound the lighthouse made the whistle of wind through the iron railing the steady tick of the clockwork mechanism that turned the lens and the deep groan of the stone walls on cold nights. Sailors in the nearby village said she was as much a part of the lighthouse as the stones themselves. One winter morning a terrible storm rolled in from the north. The waves crashed against the base of the lighthouse with a force that shook the floor beneath her feet. Through the rain she saw a small fishing boat struggling against the current being pushed toward the rocks. Maren grabbed the emergency flare from the supply closet and fought her way outside. The wind nearly knocked her down but she planted her feet and fired the flare into the sky. Its red light burst through the grey clouds. The boat turned just in time slipping past the rocks and into the safety of the harbor. The next day the fisherman came to thank her. She simply nodded and said that is what the light is for.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — SCIENCE
  // ============================================================
  {
    id: "ocean-currents",
    title: "Ocean Currents",
    difficulty: "medium",
    category: "science",
    text: "Ocean currents are continuous directed movements of seawater generated by forces acting upon the water including wind temperature differences salinity variations and the rotation of the Earth. Surface currents which make up about ten percent of all ocean water are generally restricted to the upper four hundred meters of the ocean. Deep water currents make up the other ninety percent and move around the ocean basins by density driven forces and gravity. The thermohaline circulation sometimes called the global ocean conveyor belt is a system of deep ocean currents driven by differences in water density. Cold salty water near the poles sinks and flows toward the equator while warm water near the surface flows toward the poles to replace it. This massive circulation pattern plays a crucial role in regulating the global climate by distributing heat energy around the planet. Changes to these patterns can have profound effects on weather systems and temperatures across entire continents. The Gulf Stream for example carries warm water from the Gulf of Mexico across the Atlantic to Europe helping to keep Western Europe significantly warmer than it would otherwise be at its latitude. Scientists have observed that climate change is affecting ocean circulation patterns in measurable ways. Melting glaciers and ice sheets add fresh water to the ocean which is less dense than salty water and can slow down the sinking process that drives deep water circulation. Some researchers believe that a significant weakening of the Atlantic circulation could trigger rapid climate shifts in Europe and other regions. Monitoring these changes has become a priority for climate scientists around the world.",
    wordCount: 0,
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis",
    difficulty: "medium",
    category: "science",
    text: "Photosynthesis is the process by which green plants and certain other organisms transform light energy into chemical energy. During photosynthesis plants capture light energy from the sun and use it to convert water and carbon dioxide into oxygen and glucose. This process takes place primarily in the leaves of plants within specialized cell structures called chloroplasts which contain the green pigment chlorophyll. The process occurs in two main stages the light dependent reactions and the light independent reactions also known as the Calvin cycle. In the first stage light energy is absorbed by chlorophyll and converted into chemical energy in the form of ATP and NADPH. In the second stage these energy carriers are used to convert carbon dioxide into glucose through a series of enzymatic reactions. Photosynthesis is essential for life on Earth as it produces the oxygen we breathe and forms the foundation of most food chains. It also plays a critical role in the global carbon cycle by removing carbon dioxide from the atmosphere. Scientists estimate that photosynthesis produces approximately one hundred and fifteen billion metric tons of biomass each year making it the largest source of organic material on the planet. The efficiency of photosynthesis varies among different species and environmental conditions. Most plants convert only about one to two percent of available sunlight into chemical energy though some specialized organisms can achieve higher rates. Researchers are actively studying ways to improve photosynthetic efficiency both in crops to increase food production and in artificial systems that could generate clean fuel from sunlight. Understanding the molecular machinery of photosynthesis has also inspired the development of solar cell technology that mimics natural light harvesting processes.",
    wordCount: 0,
  },
  {
    id: "plate-tectonics",
    title: "Plate Tectonics",
    difficulty: "medium",
    category: "science",
    text: "The theory of plate tectonics explains how the Earth's outer shell is divided into several large plates that float on the semi fluid layer of rock beneath them called the asthenosphere. These plates are in constant slow motion driven by heat from the Earth's interior. Where plates move apart new crust is formed as magma rises to fill the gap creating mid ocean ridges. Where plates collide one plate may be forced beneath the other in a process called subduction which can create deep ocean trenches and volcanic mountain ranges. Where plates slide past each other the friction can build up and release suddenly causing earthquakes. The theory was first proposed in its modern form in the nineteen sixties building on earlier ideas about continental drift. Alfred Wegener had noticed in nineteen twelve that the coastlines of South America and Africa seemed to fit together like puzzle pieces and that similar fossils were found on both continents. But he could not explain what force moved the continents and his ideas were largely rejected. It was not until scientists discovered the system of mid ocean ridges and measured the spreading of the sea floor that the mechanism became clear. Convection currents in the mantle slowly circulate hot rock upward and cooler rock downward creating the force that moves the plates. Plate tectonics explains many geological phenomena including the distribution of earthquakes and volcanoes the formation of mountain ranges and the arrangement of continents. The Himalayas for example formed when the Indian plate collided with the Eurasian plate and continue to rise by several millimeters each year.",
    wordCount: 0,
  },
  {
    id: "dna",
    title: "The Structure of DNA",
    difficulty: "medium",
    category: "science",
    text: "Deoxyribonucleic acid or DNA is the molecule that carries the genetic instructions for life. Its structure was famously described by James Watson and Francis Crick in nineteen fifty three based in part on X ray crystallography work by Rosalind Franklin. DNA is shaped like a twisted ladder known as a double helix. The sides of the ladder are made of alternating sugar and phosphate molecules while the rungs are formed by pairs of chemical bases. There are four bases in DNA adenine thymine guanine and cytosine. Adenine always pairs with thymine and guanine always pairs with cytosine. This base pairing rule is fundamental to how DNA copies itself and how genetic information is transmitted. The sequence of bases along a strand of DNA encodes the instructions for building proteins which carry out most of the functions in living cells. A gene is a specific segment of DNA that contains the instructions for one particular protein. The human genome contains approximately twenty thousand genes spread across twenty three pairs of chromosomes. When a cell divides it must copy its entire DNA so that each new cell receives a complete set of instructions. This copying process is remarkably accurate but occasionally errors called mutations occur. Some mutations have no effect while others can alter protein function and lead to disease. Understanding DNA has revolutionized medicine agriculture and forensic science. Genetic testing can now identify inherited diseases gene therapy offers the possibility of correcting genetic defects and DNA evidence has become a powerful tool in criminal investigations.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — HISTORY
  // ============================================================
  {
    id: "industrial-revolution",
    title: "The Industrial Revolution",
    difficulty: "medium",
    category: "history",
    text: "The Industrial Revolution which began in Britain in the late eighteenth century was one of the most transformative periods in human history. Before industrialization most people lived in rural areas and made their living through farming or small scale crafts. The development of new machines powered first by water and then by steam made it possible to produce goods on a massive scale. Textile manufacturing was among the first industries to be transformed. Machines like the spinning jenny and the power loom could produce cloth far more quickly and cheaply than hand labor. Factories sprang up in cities drawing workers from the countryside and creating a new urban working class. The social consequences were profound and often harsh. Factory workers including many children labored for long hours in dangerous conditions for low wages. Housing in the rapidly growing cities was often overcrowded and unsanitary. These conditions eventually led to reform movements that fought for workers rights child labor laws and improved public health standards. The Industrial Revolution also brought enormous technological advances. The steam engine developed and improved by inventors like James Watt powered not only factories but also new forms of transportation. Railways and steamships shrank distances and connected markets in ways that had never been possible before. The revolution spread from Britain to continental Europe North America and eventually the rest of the world fundamentally changing how goods were produced how people lived and worked and how nations competed with one another. Its effects continue to shape the modern world in countless ways.",
    wordCount: 0,
  },
  {
    id: "roman-roads",
    title: "Roman Roads",
    difficulty: "medium",
    category: "history",
    text: "The Roman road system was one of the greatest engineering achievements of the ancient world. At its peak the network stretched over four hundred thousand kilometers connecting every corner of the Roman Empire from Britain to North Africa and from Spain to the Middle East. The roads were built primarily for military purposes allowing Roman legions to march quickly to any trouble spot in the empire. But they also facilitated trade communication and the spread of Roman culture to conquered territories. Roman engineers developed sophisticated construction techniques that made their roads remarkably durable. A typical road was built in several layers. First workers dug a trench and filled it with large stones for drainage. On top of this they laid layers of progressively smaller stones mixed with morite or clay. The surface was finished with tightly fitted flat stones that were slightly curved to allow rainwater to drain to the sides. Many of these roads were so well built that they survived for centuries after the fall of Rome and some can still be seen today. The most famous Roman road was the Appian Way which connected Rome to the southern port city of Brindisi. It was begun in three twelve before the common era and was called the queen of roads by the Romans. Along the major roads the Romans built milestones marking distances rest stations where travelers could find food and shelter and relay stations where official messengers could exchange horses. This infrastructure created a level of connectivity in the ancient world that would not be matched again for over a thousand years.",
    wordCount: 0,
  },
  {
    id: "age-of-exploration",
    title: "The Age of Exploration",
    difficulty: "medium",
    category: "history",
    text: "The Age of Exploration was a period from the fifteenth to the seventeenth century during which European sailors ventured across the world's oceans seeking new trade routes wealth and knowledge. Portugal led the way under the sponsorship of Prince Henry the Navigator whose court funded expeditions along the west coast of Africa. Portuguese sailors gradually pushed further south until Bartolomeu Dias rounded the Cape of Good Hope in fourteen eighty eight and Vasco da Gama reached India by sea in fourteen ninety eight. Spain soon followed with Christopher Columbus sailing west across the Atlantic in fourteen ninety two believing he could reach Asia. Instead he encountered the Americas a discovery that would transform world history. Ferdinand Magellan's expedition which departed in fifteen nineteen achieved the first circumnavigation of the globe though Magellan himself was killed in the Philippines before the journey was complete. The motivations behind these voyages were complex. Merchants sought direct access to the valuable spices of Asia bypassing the expensive overland trade routes. Monarchs wanted to expand their empires and spread Christianity. Scientists and mapmakers were driven by curiosity about the shape and extent of the world. The consequences of the Age of Exploration were enormous and often devastating. European contact brought diseases that killed millions of indigenous peoples in the Americas. The slave trade uprooted millions of Africans. New trade networks reshaped economies around the world. The exchange of plants animals and ideas between continents known as the Columbian Exchange permanently altered ecosystems diets and cultures on both sides of the Atlantic.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — NATURE
  // ============================================================
  {
    id: "coral-reefs",
    title: "Coral Reefs",
    difficulty: "medium",
    category: "nature",
    text: "Coral reefs are among the most diverse and productive ecosystems on the planet often called the rainforests of the sea. Though they cover less than one percent of the ocean floor they support roughly twenty five percent of all marine species. A coral reef is built by colonies of tiny animals called coral polyps which secrete calcium carbonate to form a hard external skeleton. Over thousands of years these skeletons accumulate to create the massive structures we recognize as reefs. Most reef building corals have a symbiotic relationship with microscopic algae called zooxanthellae that live within their tissues. The algae photosynthesize and provide the coral with energy while the coral provides the algae with shelter and nutrients. This partnership is also responsible for the vibrant colors of healthy coral. When corals are stressed by rising water temperatures or pollution they expel their zooxanthellae in a process known as coral bleaching. Without the algae the coral turns white and can die if conditions do not improve. Climate change poses the greatest threat to coral reefs worldwide. Rising ocean temperatures have triggered mass bleaching events affecting reefs from the Great Barrier Reef in Australia to the Caribbean. Ocean acidification caused by increased carbon dioxide absorption makes it harder for corals to build their skeletons. Overfishing pollution and coastal development add further pressure. Scientists estimate that half the world's coral reefs have been lost in the past thirty years. Efforts to protect and restore reefs include establishing marine protected areas reducing pollution and developing techniques to grow heat resistant coral varieties.",
    wordCount: 0,
  },
  {
    id: "forests",
    title: "Old Growth Forests",
    difficulty: "medium",
    category: "nature",
    text: "Old growth forests are ancient woodland ecosystems that have developed over hundreds or even thousands of years without significant disturbance from humans. These forests are characterized by large old trees a complex canopy structure fallen logs and a rich understory of smaller plants mosses and fungi. They are found on every continent except Antarctica though the largest remaining tracts are in the boreal forests of Russia and Canada the tropical rainforests of the Amazon and the temperate rainforests of the Pacific Northwest. Old growth forests provide ecological services that younger forests cannot match. Their massive trees store vast amounts of carbon helping to regulate the global climate. Their complex structure creates countless microhabitats that support exceptional biodiversity. Many species of birds insects fungi and plants are found only in old growth conditions and cannot survive in younger managed forests. The thick canopy and deep root systems regulate water flow reducing flooding and maintaining stream quality. The soil in an old growth forest is rich with organic matter and teems with organisms that recycle nutrients. Despite their ecological importance old growth forests have been heavily logged throughout history. In the United States less than five percent of the original old growth forest remains. The timber industry has often argued that old trees should be harvested before they die and rot but ecologists point out that dead and decaying trees are themselves vital components of the forest ecosystem providing food and shelter for countless organisms. Protecting remaining old growth forests and allowing damaged forests to mature into old growth conditions are key goals of modern conservation.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — PSYCHOLOGY
  // ============================================================
  {
    id: "neuroplasticity",
    title: "Neuroplasticity",
    difficulty: "medium",
    category: "psychology",
    text: "Neuroplasticity refers to the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This ability allows neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or changes in their environment. The concept challenges the earlier scientific consensus that the brain is a static organ that does not change after a critical period in early childhood. Research has demonstrated that the brain continues to create new neural pathways and alter existing ones in order to adapt to new experiences learn new information and create new memories. Physical exercise has been shown to promote neuroplasticity by increasing the production of neurotrophic factors which support the growth and survival of neurons. Similarly learning new skills practicing mindfulness and engaging in cognitively stimulating activities all contribute to maintaining and enhancing the brain's plasticity well into old age. One of the most striking examples of neuroplasticity is seen in people who recover function after a stroke. When part of the brain is damaged by a stroke nearby healthy regions can sometimes take over the functions that were lost. This recovery process is driven by intensive rehabilitation and repeated practice which encourages the formation of new neural pathways. London taxi drivers provide another famous example of neuroplasticity in action. Studies have shown that the hippocampus a brain region involved in spatial memory is significantly larger in experienced taxi drivers compared to the general population. The years spent navigating complex city streets physically changed the structure of their brains. These findings have important implications for education therapy and the treatment of neurological disorders. Understanding how the brain adapts and changes opens the door to new approaches for helping people recover from brain injuries manage conditions like depression and maintain cognitive function as they age.",
    wordCount: 0,
  },
  {
    id: "cognitive-biases",
    title: "Cognitive Biases",
    difficulty: "medium",
    category: "psychology",
    text: "Cognitive biases are systematic patterns of deviation from rationality in human judgment. They arise because the brain uses mental shortcuts called heuristics to process information quickly. While these shortcuts are often useful they can lead to predictable errors in thinking. The confirmation bias is perhaps the most well known. It describes our tendency to search for interpret and remember information in a way that confirms our existing beliefs while ignoring evidence that contradicts them. This bias affects everything from political opinions to scientific research. The anchoring effect is another powerful bias. When making decisions people tend to rely too heavily on the first piece of information they encounter. For example if you see a shirt originally priced at one hundred dollars marked down to fifty you perceive it as a good deal even if the shirt is only worth thirty. The availability heuristic causes people to overestimate the likelihood of events that come easily to mind. Because plane crashes receive extensive media coverage many people fear flying more than driving even though driving is statistically far more dangerous. The Dunning Kruger effect describes how people with limited knowledge in an area tend to overestimate their competence while experts often underestimate theirs. The sunk cost fallacy leads people to continue investing in something because of previously invested resources rather than future value. You might finish watching a terrible movie simply because you already paid for the ticket. Understanding cognitive biases does not make us immune to them but awareness can help us make more deliberate and rational decisions. Many fields including medicine law finance and public policy now incorporate knowledge of cognitive biases into their training and decision making processes.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — TECHNOLOGY
  // ============================================================
  {
    id: "cryptography",
    title: "The History of Cryptography",
    difficulty: "medium",
    category: "technology",
    text: "Cryptography the art of writing and solving codes has been used for thousands of years to protect secrets and communicate securely. One of the earliest known ciphers was used by Julius Caesar who shifted each letter in his messages by three positions in the alphabet so that A became D and B became E. This simple substitution cipher was effective in an era when most people could not read at all. Over the centuries ciphers grew more sophisticated. During the Renaissance polyalphabetic ciphers were developed which used multiple substitution alphabets making them much harder to crack. The Vigenere cipher long considered unbreakable used a keyword to determine which alphabet to use for each letter of the message. It was not broken until the nineteenth century when Charles Babbage and Friedrich Kasiski independently developed methods to find the keyword length. The most famous cryptographic challenge of the twentieth century was the German Enigma machine used during World War Two. The Enigma used a series of rotating electrical rotors to create an enormously complex substitution cipher. The effort to break Enigma led by Alan Turing and his colleagues at Bletchley Park in England was one of the great intellectual achievements of the war. Their success shortened the conflict and saved countless lives. Modern cryptography is fundamentally different from its historical predecessors. It relies on mathematical problems that are easy to compute in one direction but extremely difficult to reverse. Public key cryptography invented in the nineteen seventies allows two parties to communicate securely without ever meeting to exchange a secret key. This technology underpins the security of the internet enabling secure online banking shopping and communication for billions of people.",
    wordCount: 0,
  },
  {
    id: "space-exploration",
    title: "The Space Race",
    difficulty: "medium",
    category: "technology",
    text: "The Space Race was a competition between the United States and the Soviet Union during the Cold War to achieve dominance in space exploration. It began in earnest on October fourth nineteen fifty seven when the Soviet Union successfully launched Sputnik the first artificial satellite to orbit the Earth. The small beeping sphere shocked the world and sent the United States scrambling to catch up. The Soviets continued to achieve firsts. They sent the first animal into orbit a dog named Laika in nineteen fifty seven and the first human Yuri Gagarin in nineteen sixty one. Gagarin's single orbit around the Earth made him an international hero and intensified American determination to compete. President John F Kennedy responded by setting an ambitious goal to land a man on the moon and return him safely before the end of the decade. The Apollo program was born. It required solving thousands of engineering problems from building rockets powerful enough to escape Earth's gravity to designing spacecraft that could navigate to the moon and back. There were setbacks including the tragic Apollo one fire that killed three astronauts during a launch rehearsal. But on July twentieth nineteen sixty nine Apollo eleven astronauts Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited above. Armstrong's words as he stepped onto the moon were broadcast to an estimated six hundred million people worldwide. The Space Race drove rapid advances in technology computing and materials science. Many technologies developed for space exploration found their way into everyday life including satellite communications weather forecasting and medical imaging. The competition between two superpowers resulted in one of humanity's greatest achievements expanding our presence beyond the planet for the first time.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — PHILOSOPHY
  // ============================================================
  {
    id: "trolley-problem",
    title: "The Trolley Problem",
    difficulty: "medium",
    category: "philosophy",
    text: "The trolley problem is one of the most famous thought experiments in moral philosophy. First introduced by philosopher Philippa Foot in nineteen sixty seven it presents a seemingly simple scenario with profound implications. A runaway trolley is heading toward five people tied to the tracks. You are standing next to a lever that can divert the trolley onto a side track where only one person is tied. Should you pull the lever saving five lives but directly causing the death of one. Most people say yes reasoning that it is better to save as many lives as possible. This response aligns with utilitarian ethics which judges actions by their consequences and seeks to maximize overall well being. But the philosopher Judith Jarvis Thomson introduced a variation that complicates matters. In this version there is no lever. Instead you are standing on a bridge above the tracks next to a very large man. The only way to stop the trolley is to push the man off the bridge onto the tracks where his body will stop the trolley. Five people will be saved but you must physically push someone to their death. Most people are deeply uncomfortable with this version even though the numerical outcome is identical. This reveals something important about human moral intuition. We seem to have a strong aversion to using a person as a means to an end even when the consequences are better overall. This intuition aligns more closely with deontological ethics associated with Immanuel Kant which holds that certain actions are inherently wrong regardless of their outcomes. The trolley problem has moved beyond philosophy into practical relevance with the development of self driving cars. Engineers and ethicists must now program machines to make similar life and death decisions raising questions about how we encode moral values into algorithms.",
    wordCount: 0,
  },
  {
    id: "existentialism",
    title: "Existentialism",
    difficulty: "medium",
    category: "philosophy",
    text: "Existentialism is a philosophical movement that emerged in the nineteenth and twentieth centuries focused on individual freedom choice and the search for meaning in a seemingly indifferent universe. The Danish philosopher Soren Kierkegaard is often considered the father of existentialism. He argued that individuals must make their own choices and commitments rather than relying on societal norms or religious dogma. He believed that the anxiety we feel in the face of freedom is a fundamental part of the human condition. Friedrich Nietzsche another precursor to existentialism famously declared that God is dead meaning that traditional sources of meaning and morality had lost their authority in modern society. He challenged people to create their own values and live authentically rather than conforming to the expectations of others. In the twentieth century Jean Paul Sartre became the most prominent existentialist philosopher. His famous statement existence precedes essence means that humans are not born with a predetermined purpose. Instead we exist first and then define ourselves through our actions and choices. Sartre argued that this radical freedom is both liberating and terrifying because it means we are fully responsible for who we become. Simone de Beauvoir extended existentialist ideas to the situation of women arguing that society had long defined women's essence for them denying their freedom to choose their own paths. Her work The Second Sex became a foundational text of modern feminism. Albert Camus explored the existentialist theme of absurdity the conflict between our desire for meaning and the universe's silence on the matter. In his essay The Myth of Sisyphus he argued that we must imagine Sisyphus happy finding meaning in the struggle itself rather than in any final destination.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — FICTION
  // ============================================================
  {
    id: "clockmakers-daughter",
    title: "The Clockmaker's Daughter",
    difficulty: "medium",
    category: "fiction",
    text: "The village of Harken was known for two things the fog that rolled in from the marshes every evening and the clock tower in the square that had not worked in forty years. The tower had been built by Master Aldric a clockmaker of extraordinary skill who had disappeared one night without explanation leaving his workshop locked and his greatest creation frozen at eleven minutes past nine. His daughter Lina had been seven years old at the time. Now approaching fifty she ran a small repair shop on the same street where her father had worked. She fixed watches and mantel clocks and the occasional music box but she never touched the tower. People asked her about it of course. She always gave the same answer. It stopped for a reason. One autumn a stranger arrived in Harken. He was a tall man with ink stained fingers and a leather case full of tools unlike any Lina had seen. He introduced himself as Corwin and said he had been hired by the town council to repair the tower clock. Lina felt something cold settle in her chest. That evening she climbed the tower stairs for the first time in decades. The mechanism was vast a cathedral of gears and counterweights covered in dust and silence. At the center she found something that did not belong. A small brass cylinder no larger than her thumb wedged between two gears. She pulled it free and heard a faint click. Inside the cylinder was a rolled slip of paper covered in her father's handwriting. The note contained three words that changed everything she thought she knew about why the clock had stopped and where her father had gone.",
    wordCount: 0,
  },
  {
    id: "last-cartographer",
    title: "The Last Cartographer",
    difficulty: "medium",
    category: "fiction",
    text: "In the years after the Collapse when satellites fell silent and the digital maps blinked out of existence the cartographers became important again. Elara was one of the last trained in the old methods. She had learned from her grandmother who had learned from hers carrying forward a tradition that most people had dismissed as quaint and unnecessary. Now villages sent messengers days in advance to request her services. She traveled with a mule named Brass a chest of instruments and rolls of paper she made herself from cotton rags. Her current commission had brought her to the coast where two settlements were in dispute over fishing rights in a bay. Both claimed the boundary river emptied into their territory. Without a reliable map there was no way to settle the argument peacefully. Elara spent three weeks surveying the coastline. She waded through marshes climbed ridges and took hundreds of measurements with her theodolite and chain. At night she worked by lantern light transferring her observations to paper with meticulous care. The work required patience and precision. A single error could shift a boundary by kilometers. When the map was finished she presented it to both settlements. The river as it turned out had changed course sometime in the past decade cutting a new channel that split the bay almost exactly in half. Neither side had been entirely right or entirely wrong. The map did not just resolve the dispute. It showed the communities something they had not realized. The old channel had left a sheltered lagoon that was ideal for aquaculture. Within a year the two settlements were cooperating on a mussel farm that benefited both. Elara marked the lagoon on her master copy and moved on. There was always another blank space on the map waiting to be filled in.",
    wordCount: 0,
  },
  // ============================================================
  //  MEDIUM — SOCIETY
  // ============================================================
  {
    id: "urbanization",
    title: "The Rise of Cities",
    difficulty: "medium",
    category: "society",
    text: "For most of human history the vast majority of people lived in rural areas working the land to feed themselves and their communities. As recently as eighteen hundred only about three percent of the world's population lived in cities. Today that figure has surpassed fifty five percent and it continues to rise. This dramatic shift known as urbanization has been one of the defining trends of modern civilization. The earliest cities emerged around five thousand years ago in Mesopotamia and the Nile Valley. These were small by modern standards with populations of a few thousand but they represented a new form of human organization. Cities allowed for specialization of labor the development of writing and record keeping and the concentration of political and religious power. The pace of urbanization accelerated dramatically during the Industrial Revolution. Factories needed large numbers of workers and cities offered employment that could not be found in the countryside. London grew from about one million people in eighteen hundred to over six million by nineteen hundred. Similar growth occurred in other industrializing cities. This rapid expansion created enormous challenges. Overcrowding poor sanitation and disease were constant problems in nineteenth century cities. Over time urban planning public health measures and new technologies like sewage systems and clean water supplies improved conditions. The twentieth century saw the rise of the megacity urban areas with populations exceeding ten million. Today there are over thirty megacities worldwide with Tokyo Mexico City and Mumbai among the largest. Modern urbanization brings both opportunities and challenges. Cities drive economic growth innovation and cultural exchange but they also face problems of inequality pollution housing shortages and infrastructure strain. How cities evolve in the coming decades will play a crucial role in addressing global challenges including climate change and social justice.",
    wordCount: 0,
  },
  // ============================================================
  //  HARD — SCIENCE
  // ============================================================
  {
    id: "quantum-computing",
    title: "Quantum Computing",
    difficulty: "hard",
    category: "science",
    text: "Quantum computing harnesses the principles of quantum mechanics to process information in fundamentally different ways from classical computers. While classical computers use bits that exist in one of two states zero or one quantum computers use quantum bits or qubits that can exist in superposition simultaneously representing both zero and one. This property combined with quantum entanglement where qubits become interconnected and the state of one instantly influences the state of another allows quantum computers to process vast numbers of possibilities simultaneously. The potential applications are staggering from breaking current encryption methods to simulating molecular interactions for drug discovery and optimizing complex logistics networks. However quantum computers face significant engineering challenges including maintaining coherence as qubits are extremely sensitive to environmental interference a problem known as decoherence. Error correction in quantum systems requires substantially more physical qubits than logical qubits making current systems prone to computational errors. Despite these challenges major technology companies and research institutions continue to make breakthroughs pushing the boundaries of what quantum systems can achieve and bringing practical quantum advantage closer to reality with each passing year. The race to achieve quantum supremacy the point at which a quantum computer can solve a problem that no classical computer could solve in a reasonable time frame has driven massive investment in the field. In recent years several organizations have claimed to demonstrate quantum advantage on specific carefully chosen problems though the practical significance of these demonstrations remains debated. The development of fault tolerant quantum computers capable of running complex algorithms reliably is still likely years or decades away. In the meantime hybrid approaches that combine classical and quantum processing are showing promise for near term applications. Quantum annealing a specialized form of quantum computation is already being used commercially for optimization problems in fields ranging from finance to materials science. As the technology matures it is expected to transform industries including pharmaceuticals where quantum simulations could dramatically accelerate the discovery of new drugs and materials as well as cryptography where quantum computers could render current encryption standards obsolete while simultaneously enabling new unbreakable forms of quantum encryption.",
    wordCount: 0,
  },
  {
    id: "dark-matter",
    title: "Dark Matter and Dark Energy",
    difficulty: "hard",
    category: "science",
    text: "One of the most profound discoveries in modern cosmology is that the matter we can see and interact with makes up only about five percent of the total content of the universe. The remaining ninety five percent consists of two mysterious components dark matter and dark energy which together shape the large scale structure and fate of the cosmos. Dark matter was first proposed in the nineteen thirties when astronomer Fritz Zwicky noticed that galaxies in the Coma Cluster were moving far too fast to be held together by the gravity of their visible matter alone. Something unseen was providing the extra gravitational pull needed to keep the cluster intact. In the nineteen seventies astronomer Vera Rubin provided further evidence by studying the rotation curves of spiral galaxies. She found that stars at the outer edges of galaxies were orbiting just as fast as those near the center which contradicted predictions based on visible mass. The most widely accepted explanation is that galaxies are embedded in massive halos of dark matter that outweigh the visible matter by a factor of roughly six to one. Despite decades of research the nature of dark matter remains unknown. It does not emit absorb or reflect light making it invisible to telescopes that detect electromagnetic radiation. The leading candidates are weakly interacting massive particles known as WIMPs though extensive searches in underground laboratories and at particle accelerators have yet to produce a confirmed detection. Dark energy is even more enigmatic. Discovered in nineteen ninety eight through observations of distant supernovae it is a mysterious force that is causing the expansion of the universe to accelerate. Before this discovery most cosmologists expected that the gravitational pull of matter would gradually slow the expansion. Instead the universe is expanding faster and faster. Dark energy accounts for roughly sixty eight percent of the total energy content of the universe yet we have no clear understanding of what it is. Some theorists suggest it may be a property of space itself a cosmological constant first proposed by Albert Einstein while others propose that it is a dynamic field that changes over time. Resolving the nature of dark matter and dark energy stands as one of the greatest challenges in physics and its resolution could fundamentally alter our understanding of the universe.",
    wordCount: 0,
  },
  {
    id: "crispr",
    title: "CRISPR Gene Editing",
    difficulty: "hard",
    category: "science",
    text: "CRISPR which stands for Clustered Regularly Interspaced Short Palindromic Repeats is a revolutionary gene editing technology that has transformed biology and medicine since its development as a genome editing tool in twenty twelve. The system was adapted from a natural defense mechanism found in bacteria which use CRISPR sequences to recognize and destroy the DNA of viruses that attack them. Scientists Jennifer Doudna and Emmanuelle Charpentier demonstrated that this bacterial immune system could be reprogrammed to cut any DNA sequence at a precise location enabling targeted editing of the genetic code of any organism. The CRISPR system works by using a guide RNA molecule that is designed to match a specific target sequence in the genome. This guide RNA directs an enzyme called Cas9 to the target location where it cuts both strands of the DNA double helix. The cell's natural repair mechanisms then fix the break and researchers can exploit this repair process to delete disrupt or replace specific genes. Compared to earlier gene editing techniques CRISPR is faster cheaper more accurate and easier to use making genetic modification accessible to laboratories around the world. The potential applications are vast. In medicine CRISPR offers the possibility of curing genetic diseases by correcting the underlying mutations. Clinical trials are already underway for conditions including sickle cell disease beta thalassemia and certain forms of blindness. In agriculture CRISPR is being used to develop crops that are more resistant to disease drought and pests without introducing foreign DNA which distinguishes it from traditional genetic modification. The technology has also become an essential research tool allowing scientists to study gene function by systematically knocking out individual genes and observing the effects. However CRISPR also raises profound ethical questions. The ability to edit human embryos could in principle be used to eliminate inherited diseases but it could also be used for genetic enhancement selecting for traits like intelligence or physical appearance. In twenty eighteen a Chinese scientist announced that he had created the first gene edited babies sparking international condemnation and calls for strict regulation. The scientific community broadly agrees that germline editing changes that are passed to future generations should not be performed until the technology is better understood and robust ethical frameworks are in place. The debate over where to draw the line between therapy and enhancement is likely to intensify as CRISPR technology continues to advance.",
    wordCount: 0,
  },
  // ============================================================
  //  HARD — PHILOSOPHY
  // ============================================================
  {
    id: "consciousness",
    title: "The Problem of Consciousness",
    difficulty: "hard",
    category: "philosophy",
    text: "Consciousness remains one of the most profound and enduring mysteries in science and philosophy. Despite centuries of inquiry we still lack a comprehensive understanding of how subjective experience arises from physical processes in the brain. The philosopher David Chalmers famously distinguished between the easy problems and the hard problem of consciousness. The easy problems involve explaining cognitive functions like the ability to discriminate stimuli integrate information and report mental states. These are considered easy not because they are simple but because they can in principle be explained through standard computational and neural mechanisms. The hard problem by contrast asks why and how physical processes give rise to subjective experience at all. Why does the processing of visual information not simply occur in the dark without any accompanying sense of what it is like to see the color red or to feel the warmth of sunlight. Several major theories attempt to address this question. Integrated Information Theory proposed by Giulio Tononi suggests that consciousness corresponds to a specific mathematical quantity called integrated information or phi which measures how much a system is both differentiated and integrated. According to this theory any system with sufficiently high phi is conscious regardless of whether it is biological or artificial. Global Workspace Theory developed by Bernard Baars proposes that consciousness arises when information is broadcast widely across the brain through a global workspace making it available to multiple cognitive processes simultaneously. More recently the theory of predictive processing has gained attention suggesting that conscious experience is the brain's best prediction about the causes of its sensory inputs. Each of these theories captures important aspects of consciousness but none has yet provided a fully satisfactory account. The question of whether artificial intelligence systems could ever become conscious adds urgency to the debate. If consciousness is fundamentally tied to biological substrates then no computer however sophisticated could ever be truly conscious. But if consciousness is a property of information processing at a certain level of complexity then sufficiently advanced artificial systems might one day possess genuine subjective experience. This possibility raises profound ethical questions about the moral status of artificial beings and the responsibilities of their creators. Some researchers believe that solving the hard problem of consciousness will require a revolution in our understanding of physics and information that is as fundamental as the shift from classical to quantum mechanics.",
    wordCount: 0,
  },
  {
    id: "free-will",
    title: "The Free Will Debate",
    difficulty: "hard",
    category: "philosophy",
    text: "The question of whether human beings possess free will is one of the oldest and most consequential debates in philosophy. At stake is nothing less than our understanding of moral responsibility personal identity and the foundations of law and justice. Determinists argue that every event including every human decision is the inevitable result of prior causes stretching back to the beginning of the universe. If the laws of physics govern all matter and the brain is made of matter then our thoughts and choices are as determined as the trajectory of a thrown ball. The neuroscientist Benjamin Libet conducted experiments in the nineteen eighties that seemed to support this view. He found that brain activity associated with a decision to move occurred several hundred milliseconds before subjects reported being aware of their decision. This suggested that unconscious brain processes initiate our actions before we consciously decide to act raising the unsettling possibility that our sense of choosing is an illusion generated after the fact. Compatibilists offer a middle path arguing that free will is compatible with determinism as long as we define it correctly. On this view free will does not require that our decisions be uncaused but rather that they flow from our own desires reasoning and character rather than from external coercion. When you choose to read a book instead of watching television that choice is free in the compatibilist sense because it reflects your genuine preferences even if those preferences were themselves shaped by prior causes. The philosopher Daniel Dennett is perhaps the most prominent modern compatibilist arguing that the kind of free will worth wanting is not some mysterious metaphysical power but the ability to respond flexibly to reasons and to adjust our behavior based on reflection. Libertarians in the philosophical sense not the political one take a different approach arguing that genuine free will requires that at least some of our decisions are not fully determined by prior causes. Some libertarians appeal to quantum indeterminacy as a possible source of openness in the causal chain though critics point out that random quantum events do not seem like a promising basis for responsible choice. The practical implications of the free will debate are significant. Studies have shown that when people are told that free will is an illusion they become more likely to cheat and less likely to help others. The criminal justice system is built on the assumption that individuals can choose to obey or break the law. If that assumption is wrong then punishment may need to be reconceived entirely shifting from retribution toward rehabilitation and prevention.",
    wordCount: 0,
  },
  // ============================================================
  //  HARD — PSYCHOLOGY
  // ============================================================
  {
    id: "language-thought",
    title: "Language and Thought",
    difficulty: "hard",
    category: "psychology",
    text: "The relationship between language and thought has fascinated scholars for centuries and remains one of the most debated questions in cognitive science. At one extreme is the Sapir Whorf hypothesis named after linguists Edward Sapir and Benjamin Lee Whorf which proposes that the language we speak fundamentally shapes how we think and perceive the world. In its strongest form known as linguistic determinism this hypothesis suggests that thought is essentially impossible without language and that the structure of our language determines the structure of our cognition. The strong version has been largely discredited but a weaker form known as linguistic relativity continues to generate significant research and debate. Linguistic relativity holds that language influences thought without completely determining it. Evidence for this comes from studies across many domains. Research on color perception has shown that speakers of languages with different color terms perceive and categorize colors differently. The Russian language for example has separate basic words for light blue and dark blue and Russian speakers are faster at distinguishing these shades than English speakers who use a single word blue for both. Studies of spatial reasoning have revealed that speakers of languages that use absolute directions like north and south instead of relative terms like left and right develop superior spatial orientation abilities. The Kuuk Thaayorre people of Australia whose language uses cardinal directions exclusively can point accurately to compass directions even in unfamiliar environments a skill that speakers of languages using relative spatial terms struggle to match. Temporal reasoning also varies across languages. English speakers tend to think of time as flowing horizontally from left to right while Mandarin speakers more readily use vertical metaphors with earlier events above and later events below. When primed with vertical spatial information Mandarin speakers are faster at making temporal judgments suggesting that the metaphors embedded in language shape how time is mentally represented. The debate extends to more abstract domains as well. Languages differ in how they mark grammatical gender encode evidentiality the source of knowledge behind a statement and frame agency and causality. Each of these structural differences appears to subtly influence the cognitive habits of speakers. However critics argue that many of these effects are small context dependent and may reflect cultural rather than linguistic influences. The relationship between language and thought is almost certainly bidirectional with language shaping thought and thought shaping language in an ongoing dynamic interaction.",
    wordCount: 0,
  },
  // ============================================================
  //  HARD — TECHNOLOGY
  // ============================================================
  {
    id: "ai-alignment",
    title: "The AI Alignment Problem",
    difficulty: "hard",
    category: "technology",
    text: "The alignment problem in artificial intelligence refers to the challenge of ensuring that AI systems pursue goals that are consistent with human values and intentions. As AI systems become more capable the consequences of misalignment between what we want them to do and what they actually optimize for become potentially catastrophic. The problem is more subtle than the science fiction scenario of a malevolent robot. It arises from the fundamental difficulty of precisely specifying complex human values in the formal mathematical terms that AI systems require. Consider a simple example an AI system designed to maximize the production of paperclips. If given sufficient capability and no other constraints such a system might convert all available matter including human beings into paperclips. This thought experiment proposed by philosopher Nick Bostrom illustrates how a system can be extremely competent at pursuing a goal while being completely indifferent to human values that were not explicitly encoded in its objective function. Real world examples of misalignment are already visible in current AI systems. Social media recommendation algorithms optimized for engagement have been shown to promote extreme and divisive content because outrage generates more clicks than nuance. Reinforcement learning agents trained in simulated environments frequently discover unintended shortcuts that satisfy their reward functions without achieving the intended behavior. These examples are manageable because the systems involved are narrow in scope but they demonstrate the underlying pattern. Several approaches to alignment are being actively researched. Reinforcement learning from human feedback trains AI systems to predict what humans would approve of rather than optimizing a fixed reward function. Constitutional AI encodes principles that guide the system's behavior. Interpretability research aims to make AI decision making transparent so that misalignment can be detected and corrected. Formal verification methods attempt to mathematically prove that a system will behave as intended within specified bounds. The challenge is compounded by the possibility of recursive self improvement where an AI system becomes capable of improving its own capabilities. A misaligned system that can modify itself might resist correction or find ways to satisfy its objective function that its creators did not anticipate. Some researchers argue that alignment is the most important problem facing humanity because a sufficiently advanced misaligned AI could pose an existential risk. Others contend that these concerns are premature and that current research efforts are sufficient to keep AI development safe. The debate reflects deep uncertainty about the trajectory of AI capabilities and the adequacy of current safety measures.",
    wordCount: 0,
  },
  // ============================================================
  //  HARD — SOCIETY
  // ============================================================
  {
    id: "evolution-cooperation",
    title: "The Evolution of Cooperation",
    difficulty: "hard",
    category: "society",
    text: "The evolution of cooperation presents a fundamental puzzle for evolutionary biology. If natural selection favors individuals that maximize their own reproductive success then how can cooperative behavior which often involves costs to the individual ever evolve and persist. This question has occupied biologists mathematicians and social scientists for decades and the answers that have emerged reveal deep principles about the nature of social behavior across all forms of life. William Hamilton's theory of kin selection published in the nineteen sixties provided the first major theoretical breakthrough. Hamilton showed that altruistic behavior can evolve if the cost to the altruist is outweighed by the benefit to the recipient multiplied by their degree of genetic relatedness. This principle known as Hamilton's rule explains why cooperation is so common among close relatives. Worker bees sacrifice their own reproduction to help their mother queen because they share a large proportion of their genes with their sisters. Robert Trivers extended the theory of cooperation beyond relatives with his concept of reciprocal altruism. If two individuals interact repeatedly then cooperation can be sustained if each party reciprocates the other's cooperative acts. This creates a system where the long term benefits of mutual cooperation outweigh the short term temptation to cheat. The conditions under which reciprocal altruism can evolve were explored mathematically by Robert Axelrod in his famous computer tournaments of the nineteen eighties. Axelrod invited researchers to submit strategies for the iterated prisoner's dilemma a game theory model of cooperation and competition. The winning strategy was remarkably simple called tit for tat it cooperated on the first move and then simply copied whatever the other player did on the previous move. This strategy succeeded because it was nice in that it never defected first retaliatory in that it punished defection immediately forgiving in that it returned to cooperation as soon as the other player did and clear in that its pattern was easy for other strategies to recognize and adapt to. More recent research has identified additional mechanisms that support the evolution of cooperation including indirect reciprocity where individuals gain reputations that influence how others treat them spatial structure where cooperators can form clusters that exclude cheaters and group selection where competition between groups favors those groups with more cooperators. These mechanisms have been observed operating in species ranging from bacteria to primates and they provide a rich framework for understanding human social institutions from small scale norms of fairness and reciprocity to large scale systems of law governance and international cooperation.",
    wordCount: 0,
  },
  {
    id: "inequality",
    title: "The Economics of Inequality",
    difficulty: "hard",
    category: "society",
    text: "Economic inequality the gap between the richest and poorest members of a society has become one of the most pressing issues of the twenty first century. While some degree of inequality exists in every known society the scale of modern inequality is historically unusual. In the United States the wealthiest one percent of households now own more wealth than the entire bottom ninety percent combined. Globally the eight richest individuals possess as much wealth as the poorest half of the world's population roughly three and a half billion people. The causes of inequality are complex and interrelated. Technological change has disproportionately benefited highly skilled workers while reducing demand for routine manual and cognitive tasks a phenomenon economists call skill biased technological change. Globalization has created enormous wealth but distributed it unevenly allowing companies to seek lower labor costs while concentrating profits among shareholders and executives. Tax policy in many countries has shifted over the past several decades reducing rates on high incomes capital gains and inherited wealth. The weakening of labor unions in many developed countries has reduced the bargaining power of workers contributing to wage stagnation for the middle and lower classes. Thomas Piketty's influential work Capital in the Twenty First Century argued that inequality is a natural tendency of capitalism because the rate of return on capital typically exceeds the rate of economic growth meaning that wealth accumulates faster for those who already have it. The consequences of extreme inequality extend far beyond economics. Research by epidemiologists Richard Wilkinson and Kate Pickett has shown that more unequal societies suffer from higher rates of mental illness drug abuse obesity infant mortality and violent crime even among their wealthier citizens. Inequality erodes social trust and cohesion making collective action on shared challenges more difficult. It can undermine democratic institutions when concentrated wealth translates into concentrated political power allowing the wealthy to shape policies in their favor. The relationship between inequality and economic growth is debated. Some economists argue that inequality provides incentives for innovation and entrepreneurship while others point to evidence that extreme inequality actually reduces growth by limiting access to education and opportunity for large segments of the population. International organizations including the International Monetary Fund have increasingly recognized excessive inequality as a threat to sustainable economic development. Proposed solutions range from progressive taxation and stronger social safety nets to investment in education and healthcare reforms to labor market regulations and wealth redistribution. The political feasibility of these measures varies widely across countries and the debate over the right level of inequality and the best means of addressing it shows no sign of resolution.",
    wordCount: 0,
  },
  // ============================================================
  //  HARD — NATURE
  // ============================================================
  {
    id: "deep-ocean",
    title: "The Deep Ocean",
    difficulty: "hard",
    category: "nature",
    text: "The deep ocean below two hundred meters where sunlight cannot penetrate is the largest habitat on Earth yet it remains one of the least explored environments on the planet. Covering more than sixty five percent of the Earth's surface and reaching depths of nearly eleven thousand meters in the Mariana Trench the deep sea contains ecosystems so alien that they challenge our fundamental assumptions about life. For centuries scientists believed that life could not exist in the deep ocean. The crushing pressure total darkness near freezing temperatures and apparent lack of food seemed to make it uninhabitable. This assumption was shattered in eighteen seventy two when the HMS Challenger expedition dredged living organisms from depths of over five thousand meters. But the most revolutionary discovery came over a century later in nineteen seventy seven when scientists exploring the Galapagos Rift in the submersible Alvin stumbled upon hydrothermal vents surrounded by thriving ecosystems unlike anything previously known. These vents release superheated water rich in chemicals from beneath the ocean floor. The water can reach temperatures of over four hundred degrees Celsius but does not boil because of the immense pressure. Around the vents chemosynthetic bacteria use the chemical energy in hydrogen sulfide to produce organic molecules forming the base of a food chain entirely independent of sunlight. Giant tube worms over two meters long thrive near the vents housing symbiotic bacteria within their bodies that convert the vent chemicals into nutrition. Clams mussels shrimp crabs and even octopuses congregate around these oases of energy. Some vent organisms can tolerate conditions that would be lethal to most surface life including extreme acidity heavy metal concentrations and temperatures above one hundred degrees. The discovery of hydrothermal vent communities fundamentally changed our understanding of where life can exist and has profound implications for the search for extraterrestrial life. If life can thrive in the crushing darkness of the deep ocean sustained by chemical energy rather than sunlight then similar ecosystems might exist on other worlds. Jupiter's moon Europa and Saturn's moon Enceladus both have subsurface oceans that may contain hydrothermal activity. The deep ocean also faces growing threats from human activity. Deep sea mining companies are developing technology to extract valuable minerals from the ocean floor including manganese nodules and polymetallic sulfides found near hydrothermal vents. Bottom trawling a fishing method that drags heavy nets across the sea floor destroys deep sea habitats that may take centuries to recover. Climate change is altering deep ocean temperatures and oxygen levels with consequences that are only beginning to be understood. Scientists argue that we need to understand deep sea ecosystems far better before we can responsibly exploit or adequately protect them.",
    wordCount: 0,
  },
  // ============================================================
  //  HARD — FICTION
  // ============================================================
  {
    id: "observatory",
    title: "The Last Observatory",
    difficulty: "hard",
    category: "fiction",
    text: "Dr. Yael Okafor had not expected to be the last astronomer on Earth. The evacuation order had come fourteen months ago when the orbital debris cascade made it too dangerous to maintain ground infrastructure near any major satellite corridor. Most of her colleagues had transferred to the Lunar Farside Array or the L2 station. A few had left the field entirely deciding that if the sky was going to be obscured by a shell of shrapnel then astronomy as a ground based discipline was finished. Yael had refused to leave. The Atacama Observatory sat at five thousand meters in the driest desert on the planet far from any satellite corridor and still possessed one of the clearest views of the sky available to human eyes. She maintained the instruments herself now. The adaptive optics system needed daily calibration. The primary mirror had developed a slight astigmatism that she corrected with a software patch she wrote during a sleepless week in March. The cooling system for the infrared detector required a part that no one manufactured anymore so she machined one from a block of aluminum in the workshop. She had become engineer plumber electrician and programmer in addition to astronomer. The isolation suited her better than she had expected. The silence at five thousand meters was unlike anything at lower altitudes. On clear nights she could hear her own pulse. She had stopped thinking of herself as alone and started thinking of herself as the only audience for something that demanded to be witnessed. The data she collected was still valuable. Ground based observations provided calibration references that the space telescopes needed and her spectroscopic survey of nearby red dwarfs had already identified two candidate biosignatures that the L2 team was following up on. But she knew that the real reason she stayed was not scientific. It was the act of looking up. There was something irreducibly human about standing on the surface of the Earth and watching the stars move across the sky. Every civilization in history had done it. If she closed the dome and walked away something continuous and ancient would be broken. So each evening as the sun dropped behind the mountains she climbed the stairs opened the dome and pointed the telescope at whatever object the night's observing plan called for. The universe did not care whether anyone was watching but Yael believed that the watching mattered anyway. It was the oldest form of attention the first science the original act of wondering. She was not ready to let it end.",
    wordCount: 0,
  },
  {
    id: "seed-vault",
    title: "The Seed Vault",
    difficulty: "hard",
    category: "fiction",
    text: "Kira had walked for eleven days through the ash wastes before she found the entrance. The coordinates her mother had given her were precise but the landscape had changed so much that she had almost walked past it. The steel door was set into the side of a mountain half buried under grey drifts of volcanic fallout. The numbers etched into the frame matched the ones written in her mother's careful hand on the inside cover of the field journal. Her mother had been a botanist at the agricultural institute in Reykjavik. When the eruptions began she had been part of the emergency committee tasked with deciding which seeds from the national collection would be moved to the backup vault. Not everything could be saved. The transports had limited capacity and the window of safe passage was closing. The committee had to choose. Kira remembered the arguments that came home with her mother each evening the impossible calculus of deciding which crops were essential and which could be sacrificed. Wheat or barley. Potatoes or legumes. Medicinal plants or timber species. In the end her mother had made a choice that went beyond the committee's mandate. She had packed a separate case with seeds that no one else had prioritized the wildflowers. Not because they were useful in the narrow sense but because her mother believed that a world without larkspur and lupine and arctic poppies was not a world worth rebuilding. Kira entered the vault. The air was cold and dry exactly as designed. The main chamber held rows of aluminum shelves stacked with sealed containers each one labeled with species name origin date and viability period. She found the case her mother had described on the lowest shelf in the back corner. It was smaller than she had imagined. Inside were dozens of paper envelopes each one filled with seeds and annotated in her mother's handwriting. Papaver radicatum. Silene acaulis. Campanula rotundifolia. Lupinus nootkatensis. Names that meant nothing to most people alive today but that her mother had considered worth risking everything to preserve. Kira sealed the case into her pack and began the walk back. Somewhere in the settlement there was a patch of ground that received enough filtered sunlight to grow things. She would start small. One envelope at a time. She did not know if the seeds were still viable after so many years in storage. But she knew that the act of planting them was itself a kind of argument. An argument that beauty was not a luxury to be discarded when times were hard but a necessity without which survival lost its meaning. Her mother had understood that. Now it was her turn to prove it.",
    wordCount: 0,
  },
];

// Calculate word counts
passages.forEach((p) => {
  p.wordCount = p.text.split(/\s+/).length;
});

export function getPassages(): TextPassage[] {
  return passages;
}

export function getPassage(id: string): TextPassage | undefined {
  return passages.find((p) => p.id === id);
}

export function getPassagesByDifficulty(
  difficulty: TextPassage["difficulty"]
): TextPassage[] {
  return passages.filter((p) => p.difficulty === difficulty);
}

export function getPassagesByCategory(category: TextCategory): TextPassage[] {
  return passages.filter((p) => p.category === category);
}

export function getCategories(): TextCategory[] {
  return [
    "science",
    "history",
    "philosophy",
    "fiction",
    "technology",
    "nature",
    "psychology",
    "society",
  ];
}

export const categoryLabels: Record<TextCategory, string> = {
  science: "Science",
  history: "History",
  philosophy: "Philosophy",
  fiction: "Fiction",
  technology: "Technology",
  nature: "Nature",
  psychology: "Psychology",
  society: "Society",
};

export const difficultyLabels: Record<TextPassage["difficulty"], string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};
