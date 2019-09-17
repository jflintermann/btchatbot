## intent:greet
- hello
- hi
- hey there
- howdy
- greetings
- hey
- good morning
- good evening

## intent:goodbye
- goodbye
- bye bye
- see you later
- see ya
- bye
- see you around
- see you later

## intent:affirm
- yes
- yeah
- ok
- indeed
- that's right
- great
- yep
- of course
- that sounds good
- correct

## intent:deny
- no
- no way
- i don't like it
- doesn't sound good
- nope
- never
- I don't think so
- don't like that
- not really

## intent:register
- register [bob](user_id)
- register me i'm [alice](user_id)
- create a new profile for [peter](user_id)
- make a new profile for [john](user_id)

## intent:authenticate
- i'm [bob](user_id)
- it's me, [alice](user_id) again
- this is [peter](user_id)
- here is [john](user_id)
- it's [sally](user_id)
- my name is [susan](user_id)
- [dante](user_id) it is
- [max](user_id) here
- go to [sarah](user_id)'s user profile
- switch to [lisa](user_id)'s user profile
- switch to user profile from [anita](user_id)
- go to user profile from [marvin](user_id)

## intent:log_out
- log me out
- go to default profile
- log off
- log out
- log me off

## intent:get_another_recipe
- i want another recipe
- suggest me another recipe
- suggest me something else
- do you have something else?
- do you have more?
- what else do you have?
- give me something different
- another recipe
- i don't like this dish
- another dish

## intent:get_caution
- does this meal contain [gluten](caution)?
- tell me the cautions of this recipe
- is there any [gluten](caution) in this meal?
- i need to know if there is [gluten](caution) in this dish
- i need to know the cautions of this recipe
- list the cautions for me

## intent:get_course
- what is the best time to eat this meal?
- is this a [main](course:Main Dishes) meal?
- what course is this?
- what is the course of this recipe
- is this considered a [main](course) dish?
- tell me what course this meal belongs to
- is this a [main](course:Main Dishes) dish?

## intent:get_cuisine
- to what cuisine does this meal belong?
- where did this recipe originate from?
- is this [german](cuisine)?
- is this meal from [italy](cuisine:italian)?
- what is the origin of this dish?
- is the origin of this recipe [france](cuisine:french) or [thailand](cuisine:thai)?
- what is the cuisine of the dish?
- tell me the cuisine of this recipe

## intent:get_name
- what is the name of the dish?
- what is the recipe called?
- what's the name?
- what is it called?
- tell me the name
- tell me what it's called
- give me the name of the recipe
- give me the name
- give me the name of the dish

## intent:get_description
- describe this dish for me
- what is the description?
- give me the description
- what is that?
- what is this?
- tell me the description
- i need the description
- what kind of recipe is that?
- give me more details about this recipe
- i need some more details

## intent:get_diet_label
- what are the diet labels of this dish?
- tell me the diet labels
- i want to know the diet labels
- list the diet labels for me
- is this meal fitting for my [low carb](diet_label:LOW_CARB) diet?
- is this [low fat](diet_label:LOW_FAT)?
- is this recipe considered [low carb](diet_label:LOW_CARB) or [low salt](diet_label:LOW_SODIUM)?
- is this recipe labelled as [high protein](diet_label:HIGH_PROTEIN)?

## intent:get_faster_recipe
- i want a faster recipe
- suggest me a faster one
- give me a faster recipe
- i don't have that much time 
- this takes way too long
- do you have something quicker
- give me a quicker one
- my time is limited
- i need something faster
- that takes very long
- i don't think that i have that much time
- the preparation time is too high
- give me something that needs less time
- faster recipe
- faster dish

## intent:get_flavor
- what are the flavors of this dish?
- tell me the flavors of this meal
- i want to know the flavors of this recipe
- i need to know the flavors of this dish
- is this meal considered [meaty](flavor)?
- is this meal [piquant](flavor) or [sweet](flavor)?
- is this a [sour](flavor) recipe?
- list the flavors of this recipe
- give me the flavors of this dish
- is this [salty](flavor)?
- is this dish [spicy](flavor:piquant), [bitter](flavor) or [sugary](flavor:sweet)?
- is this a [fleshy](flavor:meaty) or [salty](flavor) meal?

## intent:get_health_label
- what are the health labels of this recipe?
- is this labelled as [vegan](health_label)?
- is this meal [vegan](health_label) or [vegetarian](health_label)?
- is this recipe [vegan](health_label) friendly?
- tell me the health labels of this meal
- i need to know the health labels of this dish
- list the health labels for me

## intent:get_ingredient
- which ingredients do i have to use?
- which ingredients are needed?
- how many ingredients does this dish have?
- how many ingredients do i need?
- how much stuff do i need?
- how many groceries are needed?
- which groceries are needed?
- what groceries do i need?
- how many ingredients do i have to use?
- what ingredients do i have to use?
- what is the number of ingredients?
- what do i need to make this?
- tell me the ingredients
- give me a list of the ingredients
- list the ingredients for me
- what do i need to preparkcale this?
- which ingredients do i need to cook this?
- what do i need for this recipe?
- what is needed for this dish?
- do i need [fish](ingredient) for this dish?
- do i need [fish](ingredient), [fish](ingredient) or [fish](ingredient) for this dish?
- does this meal contain [fish](ingredient) or [fish](ingredient)?
- is there [fish](ingredient) in this?
- tell me if i need [fish](ingredient), [fish](ingredient) or [fish](ingredient) to prepare this recipe
- how much [fish](ingredient) or [fish](ingredient) is in this meal?

## intent:get_next_step
- what is the next step?
- give me the next instruction
- what is the next instruction?
- what do i have to do next?
- proceed to the next step
- what should i do next?
- what has to be done next?
- what step is next?
- what step comes next?
- what is the step after this?
- how do i continue?
- i'm done with this step
- i'm ready to go on
- i have finished this step
- what do i have to do after that?
- what is the next thing to be done?
- what's next to do?
- what will be the next step?
- what's to be done next?

## intent:get_nutrient
- how many [kcal](nutrient:ENERC_KCAL) does this meal have?
- how much [fat](nutrient:FAT) and [sugar](nutrient:SUGAR) does this dish have?
- give me the amount of [protein](nutrient:PROCNT) in this dish
- how much [carbs](nutrient:CHOCDF) does one portion have?
- tell me the nutrients of this recipe
- what nutrients does this dish have?
- what are the nutrients of this recipe?
- tell me how much [salt](nutrient:NA) is in this meal
- how many [kcal](nutrient:ENERC_KCAL), [sugar](nutrient:SUGAR) and [fat](nutrient:FAT) does it have?
- what the amount of [fat](nutrient:FAT)?
- list the nutrients for me

## intent:get_prep_time
- how long does it take to prepare?
- what is the preparation time?
- how long does it take?
- what's the prep time?
- does it take a long time?
- how long until i can eat?
- tell me the preparation time of this meal

## intent:get_previous_step
- what was the previous instruction?
- repeat the previous step
- what is the previous instruction?
- repeat the previous instruction
- what step was previous?
- give me the previous instruction
- give me the previous step
- repeat the previous instruction
- i didn't understand the previous instruction
- i didn't understand the previous step
- repeat the step before this
- repeat the instruction before this one
- i didn't get the previous step
- proceed with the previous step

## intent:get_recipe
- i need a recipe with [fish](ingredient)
- i'm hungry
- i want to eat something
- i need a recipe
- i need some food
- i want to cook something
- i have to cook something
- i would like to cook a meal
- it's time to eat something
- i have to eat something
- it's time to cook
- i should eat something
- i have [60](max_time) [minutes](time_unit) to prepare a dish with [onion](ingredient) and [beans](ingredient)[rice](ingredient)
- i need a [salad](name) recipe with [beet](ingredient)
- i want something with [gobo](ingredient)
- i need a recipe with [cabbage](ingredient), [onions](ingredient) and [potatoes](ingredient)
- i want to eat a meal with [carrot](ingredient) and [pepper](ingredient)
- suggest me a meal with [chicken](ingredient) and [oregano](ingredient) in it
- i want to cook a dish that has [beef](ingredient), [pasta](ingredient) and [melon](ingredient) in it
- give me a [german](cuisine) recipe with [corn](ingredient)
- suggest me a [vegetarian](health_label:VEGETARIAN), [italian](cuisine) [pizza](name) with [tomatoes](ingredient)
- give me a recipe with [turnip](ingredient) but im [vegan](health_label:VEGAN)
- i need a [indian](cuisine), [gluten free](health_label:GLUTEN_FREE) dish
- i want to eat something [vegetarian](health_label:VEGETARIAN) with [noodles](ingredient)
- give me a [spicy](flavor), [chinese](cuisine), [vegan](health_label:VEGAN) recipe with [plum](ingredient) and [bamboo shoots](ingredient)
- suggest me something with [garlic](ingredient) but without [milk](negative_ingredient)
- suggest me something [sweet](flavor) without [ginger](negative_ingredient)
- i want to cook something [meaty](flavor), [french](cuisine) and [gluten free](health_label:GLUTEN_FREE) without [tomato](negative_ingredient)
- i need a [lasagna](name) recipe without [zucchini](negative_ingredient)
- i want to cook something [sour](flavor)
- give me a [low carb](diet_label:LOW_CARB) recipe
- suggest me something [japanese](cuisine)
- i need to prepare something within [1](max_time) [hour](time_unit:hours)
- i'm on a [high protein](diet_label:HIGH_PROTEIN) diet
- i want to prepare a [thai](cuisine), [spicy](flavor) meal within [40](max_time) [minutes](time_unit)
- suggest me a [dairy free](health_label:DAIRY_FREE) recipe with no [tomatoes](negative_ingredient)
- i need a [sugar concious](health_label:SUGAR_CONCIOUS) dish with [butter](ingredient) but with no [kiwifruit](negative_ingredient)
- i have [50](max_time) [minutes](time_unit) to cook a [chinese](cuisine), [spicy](flavor) meal with [olive](ingredient) and [peas](ingredient)
- suggest me a recipe that is done in [2](max_time) [hours](time_unit) without [ketchup](negative_ingredient)
- give me a [balanced](diet_label:BALANCED) dish with [apple](ingredient) but with no [cheese](negative_ingredient)
- i would like to eat something [spicy](flavor) with [raisin](ingredient) but without [cranberry](negative_ingredient)
- suggest me a good [main](course:Main Dishes) meal
- i want to prepare a [main](course:Main Dishes) dish
- give me a [main](course:Main Dishes) meal without [pork](negative_ingredient) 
- i want to cook a [japanese](cuisine) [main](course:Main Dishes) dish with [lemon](ingredient) 
- i have [30](max_time) [minutes](time_unit) to prepare a meal
- i'd like to eat something [high fiber](diet_label:HIGH_FIBER) without [oats](negative_ingredient)
- i need to prepare a recipe but i only have [3](max_time) [hours](time_unit)
- i don't like [blueberry](negative_ingredient)

## intent:get_step
- how do i [start](step_count:1)?
- let's get [startet](step_count:1)
- i want to [begin](step_count:1)
- how do i [begin](step_count:1)?
- what is the [first](step_count:1) step?
- what do i have to do [second](step_count:2)?
- time to [start](step_count:1)
- what should i do [third](step_count:3)?
- what is the [fourth](step_count:4) instruction?
- give me the [fifth](step_count:5) instruction
- was has to be done [sixth](step_count:6)?
- i want to [start](step_count:1)
- i would like to get [startet](step_count:1)
- let's [start](step_count:1)
- proceed with the [seventh](step_count:7) step
- what step is [eigth](step_count:8)?
- what step comes [ninth](step_count:9)?
- what is the [tenth](step_count:10) thing to be done?
- what's to be done [first](step_count:1)?
- repeat this step
- repeat this instruction
- i didn't understand that step
- repeat step [one](step_count:1)
- i didn't get step [two](step_count:2)
- tell me what step [three](step_count:3) was
- i have to hear step [four](step_count:4) again
- i didn't get this instruction
- what's the instruction again?
- what was the step again?

## intent:rate_dish
- i would give this dish a [10](rating)
- i rate this dish [9](rating) out of 10
- i think [8](rating) is a fair rating for this dish
- this dish is a solid [7](rating)
- i loved this dish, give it a [6](rating) for me
- i didn't like this dish, give it a [5](rating) for me
- rate this dish with a [4](rating) for me
- rate this dish as [3](rating) out of 10 for me
- i didn't like it, give it a [2](rating)
- this was bad, i give it a [1](rating)

## intent:repeat_last
- repeat
- repeat that
- could you repeat that
- say that again
- what did you say
- i did not get that
- what was that?
- pardon me?
- what was the last thing you said?
- say it one more time
- i didn't understand that
- repeat last
- i couldn't understand that
- say it again
- what?

## intent:clear
- clear
- restart
- restart system
- reset system
- reset
- clear all
- i want to restart
- start from scratch
- clear everything
- clear
- reset everything
- clear system

## intent: help
- what can i do?
- what are my options?
- can you help me?
- help
- help me
- i don't know what i can do
- list my options
- options

## synonym:1
- one
- first
- start
- begin

## synonym:2
- two
- second

## synonym:3
- three
- third

## synonym:4
- four
- fourth

## synonym:5
- five
- fifth

## synonym:6
- six
- sixth

## synonym:7
- seven
- seventh

## synonym:8
- eight
- eigth

## synonym:9
- nine
- ninth

## synonym:10
- ten
- tenth

## synonym:CHOCDF
- carbs
- carbohydrate
- carb
- carbo

## synonym:CHOLE
- Cholesterol
- cholesterol

## synonym:DAIRY_FREE
- no dairy
- lactose intolerance
- lactose intolerant
- dairy intolerance
- dairy free
- free of dairy
- free of lactose

## synonym:ENERC_KCAL
- kcal
- calories
- kilocalorie
- kilocalories
- Energy

## synonym:FAT
- fats
- fat

## synonym:GLUTEN_FREE
- no milk
- no gluten
- gluten intolerance
- gluten intolerant
- gluten free
- free of gluten
- allergic to gluten
- gluten allergy
- gluten allergic

## synonym:HIGH_PROTEIN
- high protein
- higher protein
- lot protein
- a lot of protein
- much protein
- lots of protein
- high in protein

## synonym:LOW_CARB
- lower my carbs
- lower my carb
- less carbs
- less carb
- low carb
- low on carb
- low on carbs
- low in carbs
- low in carb

## synonym:LOW_FAT
- lower my fat
- lower my fats
- less fat
- less fats
- low fat
- low on fat
- low on fats
- low in fat
- low in fats
- watch my fat

## synonym:LOW_SODIUM
- low sodium
- lower sodium
- less sodium
- watch my sodium
- much sodium
- lower my sodium
- low in sodium

## synonym:NA
- salt
- sodium chloride
- sodium

## synonym:PROCNT
- protein

## synonym:SUGAR
- sugar
- glucose
- fructose
- dextrose
- sugars

## synonym:SUGAR_CONSCIOUS
- lower my sugar
- lower my sugars
- less sugar
- less sugars
- low sugar
- low on sugar
- low on sugars
- low in sugar
- low in sugars
- sugar conscious
- sugar free

## synonym:VEGAN
- no animal products
- animal free
- animal

## synonym:VEGETARIAN
- veggy
- vegetarian
- veggie
- no meat
- meatless
- without meat
- non meat
- meat free

## synonym:french
- france

## synonym:german
- germany

## synonym:japanese
- japan

## synonym:italian
- italy

## synonym:chinese
- china

## synonym:indian
- india

## synonym:thai
- thailand

## synonym:meaty
- fleshy

## synonym:piquant
- spicy
- hot

## synonym:sweet
- sugary
- sweetened
- sugared
- candied

## lookup:name
  data/lookup_table/name.txt

## lookup:ingredient
  data/lookup_table/ingredient.txt

## lookup:negative_ingredient
  data/lookup_table/ingredient.txt

## lookup:diet_label
  data/lookup_table/diet_label.txt

## lookup:nutrient
  data/lookup_table/nutrient.txt

## lookup:health_label
  data/lookup_table/health_label.txt
