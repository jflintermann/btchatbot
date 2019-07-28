from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals
import requests
from rasa_sdk import Action
from rasa_sdk.events import SlotSet

url = "http://localhost:50001/recipes"

""" create request for recipe """


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
        flavor = tracker.get_slot("flavor")
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
        if flavor is not None:
            payload.update({"flavor": flavor})
        if len(payload) == 1:
            payload.update({"intent": "suggestion"})
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
                SlotSet("flavor", None)]


""" """


class ActionAnotherRecipe(Action):
    def name(self):
        return "action_another_recipe"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getAnotherRecipe"}).text)


""" """


class ActionFasterRecipe(Action):
    def name(self):
        return "action_faster_recipe"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getFasterRecipe"}).text)


""" """


class ActionHealthierRecipe(Action):
    def name(self):
        return "action_healthier_recipe"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getHealthierRecipe"}).text)


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
        return [SlotSet("step_count", None)]


""""""


class ActionNextStep(Action):
    def name(self):
        return "action_next_step"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getNextStep"}).text)


""""""


class ActionPreviousStep(Action):
    def name(self):
        return "action_previous_step"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(requests.post(url, data={"intent": "getPreviousStep"}).text)


""" """


class ActionAuthenticate(Action):
    def name(self):
        return "action_authenticate"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("Not yet implemented.")


""" """


class ActionRateDish(Action):
    def name(self):
        return "action_rate_dish"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("Not yet implemented.")


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


""" """


class ActionRepeat(Action):
    def name(self):
        return "action_repeat"

    def run(self, dispatcher, tracker, domain):
        response = ""
        for event in tracker.events:
            if event["event"] == 'bot':
                response = event["text"]
        if response == "":
            dispatcher.utter_message("There was no previous message.")
        else:
            dispatcher.utter_message(response)
