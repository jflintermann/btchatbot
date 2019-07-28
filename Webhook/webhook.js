const express = require("express")
const axios = require("axios")
const app = express()
const fs = require("fs")
const path = require("path")

//may add more recommendation systems here and in line 33
let recommendationSystem = "content based"
let contentBasedURL = "http://localhost:3001/dishes/getBy?"
let collaborativeURL = "http://localhost:1112/dishes/getBy/?"
let currentURL
let user
let recipes
let currentStep = 0
let lastRecipe = fs.readFileSync(path.join(__dirname, "currentRecipe.json"))
let currentRecipe = JSON.parse(lastRecipe)
let requestHeader = {
    headers: {}
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/recipes",function (req, res, next) {
    console.log(req.body)                                                                                               //DEBUG
    try {
        switch (req.body.intent) {
            case "getRecipe":
                if (recommendationSystem == "collaborative")
                    currentURL = collaborativeURL
                else
                    currentURL = contentBasedURL
                if ("ingredient" in req.body) {
                    let ingredients = req.body.ingredient
                    if (Array.isArray(ingredients)) {
                        ingredients = [...new Set(ingredients)]
                        let tmp = ""
                        ingredients.forEach((ing, index, array) => {
                            ingredients = [...new Set(ingredients)]
                            if (index < array.length - 1) {
                                tmp = tmp.concat(`${ing}%2C`)
                            } else {
                                tmp = tmp.concat(`${ing}`)
                            }
                        })
                        ingredients = tmp
                    }
                    currentURL = currentURL.concat(`allowedIngredients=${ingredients}`)
                }
                if ("negativeIngredient" in req.body) {
                    let ingredients = req.body.negativeIngredient
                    if (Array.isArray(ingredients)) {
                        ingredients = [...new Set(ingredients)]
                        let tmp = ""
                        ingredients.forEach((ing, index, array) => {
                            if (index < array.length - 1) {
                                tmp.concat(`${ing}%2C`)
                            } else {
                                tmp.concat(`${ing}`)
                            }
                        })
                        ingredients = tmp
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`excludedIngredients=${ingredients}`)
                }
                if ("healthLabel" in req.body) {
                    let healthLabels = req.body.healthLabel
                    if (Array.isArray(healthLabels)) {
                        healthLabels = [...new Set(healthLabels)]
                        let tmp = ""
                        healthLabels.forEach((label, index, array) => {
                            if (index < array.length - 1) {
                                tmp = tmp.concat(`${label}%2C`)
                            } else {
                                tmp = tmp.concat(`${label}`)
                            }
                        })
                        healthLabels = tmp
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`healthLabels=${healthLabels}`)
                }
                if ("dietLabel" in req.body) {
                    let dietLabels = req.body.dietLabel
                    if (Array.isArray(dietLabels)) {
                        dietLabels = [...new Set(dietLabels)]
                        let tmp = ""
                        dietLabels.forEach((label, index, array) => {
                            if (index < array.length - 1) {
                                tmp = tmp.concat(`${label}%2C`)
                            } else {
                                tmp = tmp.concat(`${label}`)
                            }
                        })
                        dietLabels = tmp
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`dietLabels=${dietLabels}`)
                }
                if ("maxTime" in req.body) {
                    let maxTime = req.body.maxTime
                    if (req.body.timeUnit == "hours")
                        maxTime = maxTime * 60
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`maxTime=${maxTime*60}`)
                }
                if ("cuisine" in req.body) {
                    let cuisine = req.body.cuisine
                    if (currentURL.substr(currentURL.length - 1) != "?") currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`allowedCuisines=${cuisine}`)
                }
                if ("course" in req.body) {
                    let course = req.body.course
                    if (currentURL.substr(currentURL.length - 1) != "?") currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`allowedCourses=${course}`)
                }
                console.log(currentURL)                                                                                 //DEBUG
                axios.get(currentURL, requestHeader)
                    .then(response => {
                        recipes = response.data
                        if (recipes.length == 0) {
                            res.send("Sorry, I didn't find a fitting recipe.")
                        } else {
                            //if response is json array
                            try {
                                recipes.map(recipe => JSON.parse(recipe))
                            } catch (e) {
                                //recipes don't need to be parsed
                            }
                            if ("flavor" in req.body) {
                                //TODO
                            }
                            currentRecipe = getRandomRecipe(recipes)
                            fs.writeFileSync(path.join(__dirname, "currentRecipe.json"), JSON.stringify(currentRecipe))
                            res.send(`How about ${currentRecipe.name}?`)
                        }

                    }).catch (e => {
                        res.send("Could not connect to database.")
                        //console.log(e)                                                                                //DEBUG
                    })
                break
            case "getSuggestion":
                break
            case "getAnotherRecipe":
                if (recipes == null)
                    res.send("Sorry, I didn't find a fitting recipe.")
                else
                    recipes.filter(recipe => recipe == currentRecipe)
                    currentRecipe = getRandomRecipe(recipes)
                if (currentRecipe == null)
                    res.send("Sorry, I didn't find a fitting recipe.")
                else
                    res.send(`How about ${currentRecipe.name}?`)
                break
            case "getFasterRecipe":
                if (recipes == null)
                    res.send("Sorry, I didn't find a fitting recipe.")
                else
                    recipes.filter(recipe => recipe == currentRecipe)
                    for (recipe in recipes) {
                        if (recipe.time < currentRecipe.time)
                            currentRecipe = recipe
                    }
                if (currentRecipe == null)
                    res.send("Sorry, I didn't find a fitting recipe.")
                else
                    res.send(`How about ${currentRecipe.name}? It takes ${currentRecipe.time} minutes.`)
                break
            case "getHealthierRecipe":
                break
            case "getIngredient":
                if (currentRecipe == null) {
                    res.send("There is no current recipe.")
                } else {
                    let responseString = "Per person you need "
                    let ingredientArray = []
                    let recipeIngredients = []
                    currentRecipe.ingredients.forEach(ingredient => recipeIngredients.push(ingredient.name))
                    if ("ingredient" in req.body) {
                        Array.isArray(req.body.ingredient) ? ingredientArray = [...new Set(req.body.ingredient)] : ingredientArray.push(req.body.ingredient)
                        ingredientArray = ingredientArray.filter(ingredient => recipeIngredients.includes(ingredient))
                    } else {
                        ingredientArray = recipeIngredients
                    }
                    if (ingredientArray.length > 0) {
                        ingredientArray.forEach((ingredient, index, array) => {
                            let and = switchPunctuation(index, array.length)
                            responseString = responseString.concat(`${currentRecipe.ingredients[recipeIngredients.indexOf(ingredient)].key}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.ingredient)) {
                            ingredientArray = [...new Set(req.body.ingredient)]
                            if (ingredientArray.length > 1) {
                                responseString = "You need neither "
                                ingredientArray.forEach((ingredient, index, array) => {
                                    let nor = switchPunctuation(index, array.length, "nor")
                                    responseString = responseString.concat(`${ingredient}${nor}`)
                                })
                            } else
                                responseString = `You don't need any ${ingredientArray}.`
                        } else {
                            responseString = `You don't need any ${req.body.ingredient}.`
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getNutrient":
                if (currentRecipe == null) {
                    res.send("There is no current recipe.")
                } else {
                    let responseString = "Per person this recipe contains approximately "
                    let nutrientArray = []
                    if ("nutrient" in req.body) {
                        Array.isArray(req.body.nutrient) ? nutrientArray = [...new Set(req.body.nutrient)] : nutrientArray.push(req.body.nutrient)
                        nutrientArray = nutrientArray.filter(nutrient => nutrient in currentRecipe.nutrients[0])
                    } else {
                        nutrientArray = Object.keys(currentRecipe.nutrients[0])
                    }
                    if (ingredientArray.length > 0) {
                        nutrientArray.forEach((nutrient, index, array) => {
                            let quantity = Math.round(currentRecipe.nutrients[0][nutrient].quantity)
                            if (quantity == 0) quantity = "less than 1"
                            let unit = currentRecipe.nutrients[0][nutrient].unit
                            let label = currentRecipe.nutrients[0][nutrient].label
                            let and = switchPunctuation(index, array.length)
                            responseString = responseString.concat(`${quantity} ${unit} ${label}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.nutrient)) {
                            nutrientArray = [...new Set(req.body.nutrient)]
                            if (nutrientArray.length > 1) {
                                responseString = "This recipe contains neither "
                                nutrientArray.forEach((nutrient, index, array) => {
                                    let nor = switchPunctuation(index, array.length, "nor")
                                    responseString = responseString.concat(`${nutrient}${nor}`)
                                })
                            } else
                                responseString = `This recipe does not contain ${nutrientArray}.`
                        } else {
                            responseString = `This recipe does not contain ${req.body.nutrient}.`
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getHealthLabel":
                if (currentRecipe == null) {
                    res.send("There is no current recipe.")
                } else {
                    let responseString = "This recipe is labelled as "
                    let healthArray = []
                    if ("healthLabel" in req.body) {
                        Array.isArray(req.body.healthLabel) ? healthArray = [...new Set(req.body.healthLabel)] : healthArray.push(req.body.healthLabel)
                        healthArray = healthArray.filter(healthLabel => currentRecipe.healthLabels.includes(healthLabel))
                    } else {
                        healthArray = currentRecipe.healthLabels
                    }
                    if (healthArray.length > 0) {
                        healthArray.forEach((healthLabel, index, array) => {
                            let and = switchPunctuation(index, array.length)
                            responseString = responseString.concat(`${healthLabel}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.healthLabel)) {
                            healthArray = [...new Set(req.body.healthLabel)]
                            if (healthArray.length > 1) {
                                responseString = "This recipe is labelled as neither "
                                healthArray.forEach((healthLabel, index, array) => {
                                    let nor = switchPunctuation(index, array.length, "nor")
                                    responseString = responseString.concat(`${healthLabel}${nor}`)
                                })
                            } else
                                responseString = `This recipe is not labelled as ${healthArray}.`
                        } else {
                            responseString = `This recipe is not labelled as ${req.body.healthLabel}.`
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getCaution":
                if (currentRecipe == null) {
                    res.send("There is no current recipe.")
                } else {
                    let responseString = "This recipe contains "
                    let cautionArray = []
                    if ("caution" in req.body) {
                        Array.isArray(req.body.caution) ? cautionArray = [...new Set(req.body.caution)] : cautionArray.push(req.body.caution)
                        cautionArray = cautionArray.filter(caution => currentRecipe.cautions.includes(caution))
                    } else {
                        cautionArray = currentRecipe.cautions
                    }
                    if (cautionArray.length > 0) {
                        cautionArray.forEach((caution, index, array) => {
                            let and = switchPunctuation(index, array.length)
                            responseString = responseString.concat(`${caution}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.caution)) {
                            cautionArray = [...new Set(req.body.caution)]
                            if (cautionArray.length > 1) {
                                responseString = "This recipe contains neither "
                                cautionArray.forEach((caution, index, array) => {
                                    let nor = switchPunctuation(index, array.length, "nor")
                                    responseString = responseString.concat(`${caution}${nor}`)
                                })
                            } else
                                responseString = `This recipe does not contain ${cautionArray}.`
                        } else {
                            responseString = `This recipe does not contain ${req.body.caution}.`
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getDietLabel":
                if (currentRecipe == null) {
                    res.send("There is no current recipe.")
                } else {
                    let responseString = "This recipe is labelled as "
                    let dietArray = []
                    if ("dietLabel" in req.body) {
                        Array.isArray(req.body.dietLabel) ? dietArray = [...new Set(req.body.dietLabel)] : dietArray.push(req.body.dietLabel)
                        dietArray = dietArray.filter(dietLabel => currentRecipe.dietLabels.includes(dietLabel))
                    } else {
                        dietArray = currentRecipe.dietLabels
                    }
                    if (dietArray.length > 0) {
                        dietArray.forEach((dietLabel, index, array) => {
                            let and = switchPunctuation(index, array.length)
                            responseString = responseString.concat(`${dietLabel}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.dietLabel)) {
                            dietArray = [...new Set(req.body.dietLabel)]
                            if (dietArray.length > 1) {
                                responseString = "This recipe is labelled as neither "
                                dietArray.forEach((dietLabel, index, array) => {
                                    let nor = switchPunctuation(index, array.length, "nor")
                                    responseString = responseString.concat(`${dietLabel}${nor}`)
                                })
                            } else
                                responseString = `This recipe is not labelled as ${dietArray}.`
                        } else {
                            responseString = `This recipe is not labelled as ${req.body.dietLabel}.`
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getFlavor":
                if (currentRecipe == null) {
                    res.send("There is no current recipe.")
                } else {
                    let responseString = "This recipe is considered "
                    let flavorArray = []
                    if ("flavor" in req.body) {
                        Array.isArray(req.body.flavor) ? flavorArray = [...new Set(req.body.flavor)] : flavorArray.push(req.body.flavor)
                        flavorArray = flavorArray.filter(flavor => flavor in currentRecipe.flavors && currentRecipe.flavors[flavor] >= 0.3)
                    } else {
                        flavorArray = Object.keys(currentRecipe.flavors)
                        flavorArray = flavorArray.filter(flavor => currentRecipe.flavors[flavor] >= 0.3)
                    }
                    if (flavorArray.length > 0) {
                        flavorArray.forEach((flavor, index, array) => {
                            flavorValue = currentRecipe.flavors[flavor]
                            let and = switchPunctuation(index, array.length)
                            if (flavorValue >= 0.5)
                                responseString = responseString.concat(`${flavor}${and}`)
                            else if (flavorValue >= 0.3)
                                responseString = responseString.concat(`mildly ${flavor}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.flavor)) {
                            flavorArray = [...new Set(req.body.flavor)]
                            if (flavorArray.length > 1) {
                                responseString = "This recipe is considered neither "
                                flavorArray.forEach((flavor, index, array) => {
                                    let nor = switchPunctuation(index, array.length, "nor")
                                    responseString = responseString.concat(`${flavor}${nor}`)
                                })
                            } else
                                responseString = `This recipe is not considered ${flavorArray}.`
                        } else {
                            responseString = `This recipe is not considered ${req.body.flavor}.`
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getDescription":
                if (currentRecipe == null)
                    res.send("There is no current recipe.")
                else
                    res.send(currentRecipe.description)
                break
            case "getPrepTime":
                if (currentRecipe == null)
                    res.send("There is no current recipe.")
                else
                    res.send(`The preparation takes ${Math.round(currentRecipe.time / 60)} minutes.`)
                break
            case "getCuisine":
                if (currentRecipe == null)
                    res.send("There is no current recipe.")
                else {
                    if (currentRecipe.cuisine == null)
                        res.send("It is not know.")
                    else
                        res.send(`This is a ${currentRecipe.cuisine} recipe.`)
                }
                break
            case "getCourse":
                if (currentRecipe == null)
                    res.send("There is no current recipe.")
                else
                    res.send(`It is categorized under ${currentRecipe.course}.`)
                break
            case "getStep":
                if (currentRecipe == null)
                    res.send("There is no current recipe.")
                else {
                    if ("stepCount" in req.body) {
                        console.log(currentRecipe.preperation.length)
                        if (req.body.stepCount < 1 || req.body.stepCount > currentRecipe.preperation.length) {
                            responseString = `This recipe only has ${currentRecipe.preperation.length} steps.`
                        } else {
                            currentStep = req.body.stepCount-1
                            responseString = currentRecipe.preperation[currentStep]
                        }
                    } else {
                        responseString = currentRecipe.preperation[currentStep]
                    }
                    res.send(responseString)
                }
                break
            case "getNextStep":
                if (currentRecipe == null)
                    res.send("There is no current recipe.")
                else {
                    if (currentStep+1 < currentRecipe.preperation.length) {
                        currentStep++
                        responseString = currentRecipe.preperation[currentStep]
                    } else {
                        responseString = `This recipe only has ${currentRecipe.preperation.length} steps.`
                    }
                    res.send(responseString)
                }
                break
            case "getPreviousStep":
                if (currentRecipe == null)
                    res.send("There is no current recipe.")
                else {
                    if (currentStep-1 >= 0) {
                        currentStep--
                        responseString = currentRecipe.preperation[currentStep]
                    } else {
                        responseString = "There is no step before the first one."
                    }
                    res.send(responseString)
                }
                break
            case "authenticate":
                break
            case "rateDish":
                break
            case "setRecommendationSystem":
                recommendationSystem = req.body.recommendationSystem
                res.send(`Recommendation system is set to ${recommendationSystem}.`)
                break
            case "clear":
                currentURL = contentBasedURL
                user = ""
                currentRecipe = ""
                recipes = ""
                currentStep = ""
                requestHeader = {
                    headers: {}
                }
                res.send("Recipe has been reset.")
                break
            default:
                break
        }
    } catch (e) {
        console.log(e)
        res.send("Something went wrong.")
    }
})

function getRandomRecipe(recipes) {
    return recipes[Math.floor(Math.random() * recipes.length)]
}

function switchPunctuation(index, length, string = "and") {
    if (index == length-1)
        return "."
    if (index == length-2)
        return ` ${string} `
    else
        return ", "
}

app.listen(50001)
console.log("listening on 50001")