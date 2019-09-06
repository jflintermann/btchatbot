## greet
* greet
  - utter_greet

## goodbye
* goodbye
  - utter_goodbye

## yes without context
* affirm
  - action_fallback_question
> check_fallback_question

## no without context
* deny
  - action_fallback_question
> check_fallback_question

## recipe
* get_recipe
  - action_recipe
  - slot{"ingredient": null}
  - slot{"negative_ingredient": null}
  - slot{"health_label": null}
  - slot{"diet_label": null}
  - slot{"max_time": null}
  - slot{"time_unit": null}
  - slot{"cuisine": null}
  - slot{"course": null}
  - slot{"fallback_flag": "recipe"}

## different recipe
* get_another_recipe
  - action_another_recipe
  - slot{"fallback_flag": "recipe"}

## less preparation time recipe
* get_faster_recipe
  - action_faster_recipe
  - slot{"fallback_flag": "recipe"}

## recipe ingredient
* get_ingredient
  - action_ingredient
  - slot{"ingredient": null}

## recipe nutrient
* get_nutrient
  - action_nutrient
  - slot{"nutrient": null}

## recipe health label
* get_health_label
  - action_health_label
  - slot{"health_label": null}

## recipe caution
* get_caution
  - action_caution
  - slot{"caution": null}

## recipe flavor
* get_flavor
  - action_flavor
  - slot{"flavor": null}

## recipe description
* get_description
  - action_description

## recipe preparation time
* get_prep_time
  - action_prep_time

## recipe cuisine
* get_cuisine
  - action_cuisine

## recipe course
* get_course
  - action_course

## recipe diet label
* get_diet_label
  - action_diet_label
  - slot{"flavor": null}

## preparation step
* get_step
  - action_step
  - slot{"step_count": null}
  - slot{"fallback_flag": "step"}

## next preparation step
* get_next_step
  - action_next_step
  - slot{"fallback_flag": "step"}

## previous preparation step
* get_previous_step
  - action_previous_step
  - slot{"fallback_flag": "step"}

## register user
* register
  - action_register
  - slot{"user_id": null}

## authenticate user
* authenticate
  - action_authenticate
  - slot{"user_id": null}

## log out user
* log_out
  - action_log_out

## rate current dish
* rate_dish
  - action_rate_dish
  - slot{"rating": null}

## recommendation system
* set_recommendation_system
  - action_recommendation_system
  - slot{"recommendation_system": null}

## help
* help
  - action_help

## reset everything
* clear
  - action_clear
  - action_restart
  - slot{"fallback_flag": null}

## repeat last response
* repeat_last
  - action_repeat

## fallback ignored
  - action_fallback_question

## fallback suggestion
  - action_fallback_question
> check_fallback_question

## fallback suggestion denied
> check_fallback_question
* deny
  - utter_ask_rephrase

## if fallback suggested to rate the dish
> check_fallback_question
* affirm
  - action_fallback

## if fallback suggested recipe
> check_fallback_question
* affirm
  - action_fallback
  - slot{"fallback_flag": "recipe"}

## if fallback suggested a step
> check_fallback_question
* affirm
  - action_fallback
  - slot{"fallback_flag": "step"}
