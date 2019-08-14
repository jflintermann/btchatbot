from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals
import requests
from rasa_sdk import Action
from rasa_sdk.events import SlotSet

url = "http://localhost:50001/recipes"

""" build and send request for recipe """


class ActionRecipe(Action):
    def name(self):
        return "action_recipe"

    def run(self, dispatcher, tracker, domain):
        ingredient = tracker.get_slot("ingredient")
        negative_ingredient = tracker.get_slot("negative_ingredient")
        health_label = tracker.get_slot("health_label")
        diet_label = tracker.get_slot("diet_label")
        max_time = tracker.get_slot("max_time")
        time_unit = tracker.get_slot("time_unit")
        cuisine = tracker.get_slot("cuisine")
        course = tracker.get_slot("course")
        payload = {"intent": "getRecipe"}
        if ingredient is not None:
            payload.update({"ingredient": ingredient})
        if negative_ingredient is not None:
            payload.update({"negativeIngredient": negative_ingredient})
        if health_label is not None:
            payload.update({"healthLabel": health_label})
        if diet_label is not None:
            payload.update({"dietLabel": diet_label})
        if max_time is not None:
            payload.update({"maxTime": max_time})
        if time_unit is not None:
            payload.update({"timeUnit": time_unit})
        if cuisine is not None:
            payload.update({"cuisine": cuisine})
        if course is not None:
            payload.update({"course": course})
        if len(payload) == 1:
            payload.update({"intent": "getSuggestion"})
        response_text = requests.post(url, data=payload).text
        dispatcher.utter_message(response_text)
        return [SlotSet("ingredient", None),
                SlotSet("negative_ingredient", None),
                SlotSet("health_label", None),
                SlotSet("diet_label", None),
                SlotSet("max_time", None),
                SlotSet("time_unit", None),
                SlotSet("cuisine", None),
                SlotSet("course", None),
                SlotSet("fallback_flag", "recipe")]


""" """


class ActionAnotherRecipe(Action):
    def name(self):
        return "action_another_recipe"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getAnotherRecipe"}).text)
        return [SlotSet("fallback_flag", "recipe")]


""" """


class ActionFasterRecipe(Action):
    def name(self):
        return "action_faster_recipe"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getFasterRecipe"}).text)
        return [SlotSet("fallback_flag", "recipe")]


""" """


class ActionIngredient(Action):
    def name(self):
        return "action_ingredient"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "getIngredient"}
        ingredient = tracker.get_slot("ingredient")
        if ingredient is not None:
            payload.update({"ingredient": ingredient})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("ingredient", None)]


""" """


class ActionNutrient(Action):
    def name(self):
        return "action_nutrient"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "getNutrient"}
        nutrient = tracker.get_slot("nutrient")
        if nutrient is not None:
            payload.update({"nutrient": nutrient})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("nutrient", None)]


""" """


class ActionHealthLabel(Action):
    def name(self):
        return "action_health_label"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "getHealthLabel"}
        health_label = tracker.get_slot("health_label")
        if health_label is not None:
            payload.update({"healthLabel": health_label})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("health_label", None)]


""" """


class ActionCaution(Action):
    def name(self):
        return "action_caution"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "getCaution"}
        caution = tracker.get_slot("caution")
        if caution is not None:
            payload.update({"caution": caution})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("caution", None)]


""""""


class ActionDietLabel(Action):
    def name(self):
        return "action_diet_label"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "getDietLabel"}
        diet_label = tracker.get_slot("diet_label")
        if diet_label is not None:
            payload.update({"dietLabel": diet_label})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("diet_label", None)]


""""""


class ActionFlavor(Action):
    def name(self):
        return "action_flavor"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "getFlavor"}
        flavor = tracker.get_slot("flavor")
        if flavor is not None:
            payload.update({"flavor": flavor})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("flavor", None)]


""" """


class ActionDescription(Action):
    def name(self):
        return "action_description"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getDescription"}).text)


""" """


class ActionPrepTime(Action):
    def name(self):
        return "action_prep_time"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getPrepTime"}).text)


""""""


class ActionCuisine(Action):
    def name(self):
        return "action_cuisine"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getCuisine"}).text)


""""""


class ActionCourse(Action):
    def name(self):
        return "action_course"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getCourse"}).text)


""""""


class ActionStep(Action):
    def name(self):
        return "action_step"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "getStep"}
        step_count = tracker.get_slot("step_count")
        if step_count is not None:
            payload.update({"stepCount": step_count})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("step_count", None), SlotSet("fallback_flag", "step")]


""""""


class ActionNextStep(Action):
    def name(self):
        return "action_next_step"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getNextStep"}).text)
        return [SlotSet("fallback_flag", "step")]


""""""


class ActionPreviousStep(Action):
    def name(self):
        return "action_previous_step"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getPreviousStep"}).text)
        return [SlotSet("fallback_flag", "step")]


""" """


class ActionRegister(Action):
    def name(self):
        return "action_register"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "register"}
        user_id = tracker.get_slot("user_id")
        if user_id is not None:
            payload.update({"userID": user_id})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("user_id", None)]


""" """


class ActionAuthenticate(Action):
    def name(self):
        return "action_authenticate"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "authenticate"}
        user_id = tracker.get_slot("user_id")
        if user_id is not None:
            payload.update({"userID": user_id})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("user_id", None)]


""" """


class ActionLogOut(Action):
    def name(self):
        return "action_log_out"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "logOut"}).text)


""" """


class ActionRateDish(Action):
    def name(self):
        return "action_rate_dish"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "rateDish"}
        rating = tracker.get_slot("rating")
        if rating is not None:
            payload.update({"rating": rating})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("rating", None)]


""" """


class ActionRecommendationSystem(Action):
    def name(self):
        return "action_recommendation_system"

    def run(self, dispatcher, tracker, domain):
        payload = {"intent": "setRecommendationSystem"}
        recommendation_system = tracker.get_slot("recommendation_system")
        if recommendation_system is not None:
            payload.update({"recommendationSystem": recommendation_system})
        dispatcher.utter_message(requests.post(url, data=payload).text)
        return [SlotSet("recommendation_system", None)]


""" """


class ActionClear(Action):
    def name(self):
        return "action_clear"

    def run(self, dispatcher, tracker, domain):

        dispatcher.utter_message(requests.post(url, data={"intent": "clear"}).text)
        return [SlotSet("fallback_flag", None)]


""" """


class ActionRepeat(Action):
    def name(self):
        return "action_repeat"

    def run(self, dispatcher, tracker, domain):
        response = ""
        history = tracker.events[::-1]
        for event in history:
            if event["event"] == "bot":
                response = event["text"]
                break
        history.pop(0)
        for event in history:
            if event["event"] == "user":
                print("--------last message intent ranking--------")
                for intent in event["parse_data"]["intent_ranking"]:
                    print(intent["confidence"], intent["name"])
                print("-------------------------------------------")
                break
        if response == "":
            dispatcher.utter_message("There was no previous message.")
        else:
            dispatcher.utter_message(response)


""""""


class ActionFallbackQuestion(Action):
    def name(self):
        return "action_fallback_question"

    def run(self, dispatcher, tracker, domain):
        flag = tracker.get_slot("fallback_flag")
        history = tracker.events[::-1]
        for event in history:
            if event["event"] == "user":
                print("----------fallback intent ranking----------")
                for intent in event["parse_data"]["intent_ranking"]:
                    print(intent["confidence"], intent["name"])
                print("-------------------------------------------")
                break
        current_recipe = requests.post(url, data={"intent": "checkRecipe"}).text
        if current_recipe == "true":
            if flag == "recipe":
                response = "I didn't understand. Do you want to start with the first step?"
            elif flag == "step":
                last_step = requests.post(url, data={"intent": "checkStep"}).text
                if last_step == "true":
                    rating = requests.post(url, data={"intent": "checkRating"}).text
                    if rating == "true":
                        response = "I didn't understand. Do you want a recipe suggestion?"
                    elif rating == "false":
                        response = "I didn't understand. Do you want to rate your last dish?"
                    else:
                        response = rating
                elif last_step == "false":
                    response = "I didn't understand. Do you want the next step?"
                else:
                    response = last_step
            else:
                response = "I didn't understand. Do you want a recipe suggestion?"
        elif current_recipe == "false":
            response = "I didn't understand. Do you want a recipe suggestion?"
        else:
            response = current_recipe
        dispatcher.utter_message(response)


""""""


class ActionFallback(Action):
    def name(self):
        return "action_fallback"

    def run(self, dispatcher, tracker, domain):
        flag = tracker.get_slot("fallback_flag")
        set_flag = flag
        current_recipe = requests.post(url, data={"intent": "checkRecipe"}).text
        if current_recipe == "true":
            if flag == "recipe":
                response = requests.post(url, data={"intent": "getStep", "stepCount": 1}).text
                set_flag = "step"
            elif flag == "step":
                last_step = requests.post(url, data={"intent": "checkStep"}).text
                if last_step == "true":
                    rating = requests.post(url, data={"intent": "checkRating"}).text
                    if rating == "true":
                        response = requests.post(url, data={"intent": "getSuggestion"}).text
                        set_flag = "recipe"
                    elif rating == "false":
                        response = "How would you rate your last dish on a scale from 1 to 10?"
                    else:
                        response = rating
                elif last_step == "false":
                    response = requests.post(url, data={"intent": "getNextStep"}).text
                    set_flag = "step"
                else:
                    response = last_step
            else:
                response = requests.post(url, data={"intent": "getSuggestion"}).text
                set_flag = "recipe"
        elif current_recipe == "false":
            response = requests.post(url, data={"intent": "getSuggestion"}).text
            set_flag = "recipe"
        else:
            response = current_recipe
        dispatcher.utter_message(response)
        return [SlotSet("fallback_flag", set_flag)]
