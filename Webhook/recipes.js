const express = require("express")
const axios = require("axios")
const app = express()
const fs = require("fs")
const path = require("path")

// adjust url
let recommendationSystemURL = "http://localhost:3001/dishes/getBy?"
let currentHeader
let currentURL
let currentUserID
let recipes
let currentRecipe = JSON.parse(fs.readFileSync(path.join(__dirname, "currentRecipe.json")))
let currentStep = 0
let phrases = JSON.parse(fs.readFileSync(path.join(__dirname, "/../phrases.json")))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/recipes",function (req, res, next) {
    console.log(req.body) // debug
    try {
        switch (req.body.intent) {
            case "getRecipe":
                currentURL = recommendationSystemURL
                if (currentUserID == null) {
                    currentHeader = {
                        headers: {
                        }
                    }
                } else {
                        currentHeader = {
                            headers: {
                                user: currentUserID,
                                recommendation: true
                            }
                        }
                    currentURL = currentURL.concat(`userID=${currentUserID}`)
                }
                if ("name" in req.body) {
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`name=${req.body.name}`)
                }
                if ("ingredient" in req.body) {
                    let ingredients = req.body.ingredient
                    if (Array.isArray(ingredients)) {
                        ingredients = [...new Set(ingredients)]
                        let string = ""
                        ingredients.forEach((ing, index, array) => {
                            ingredients = [...new Set(ingredients)]
                            if (index < array.length - 1) {
                                string = string.concat(`${ing}%2C`)
                            } else {
                                string = string.concat(`${ing}`)
                            }
                        })
                        ingredients = string
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`allowedIngredients=${ingredients}`)
                }
                if ("negativeIngredient" in req.body) {
                    let ingredients = req.body.negativeIngredient
                    if (Array.isArray(ingredients)) {
                        ingredients = [...new Set(ingredients)]
                        let string = ""
                        ingredients.forEach((ing, index, array) => {
                            if (index < array.length - 1) {
                                string.concat(`${ing}%2C`)
                            } else {
                                string.concat(`${ing}`)
                            }
                        })
                        ingredients = string
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`excludedIngredients=${ingredients}`)
                }
                if ("healthLabel" in req.body) {
                    let healthLabels = req.body.healthLabel
                    if (Array.isArray(healthLabels)) {
                        healthLabels = [...new Set(healthLabels)]
                        let string = ""
                        healthLabels.forEach((label, index, array) => {
                            if (index < array.length - 1) {
                                string = string.concat(`${label}%2C`)
                            } else {
                                string = string.concat(`${label}`)
                            }
                        })
                        healthLabels = string
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`healthLabels=${healthLabels}`)
                }
                if ("dietLabel" in req.body) {
                    let dietLabels = req.body.dietLabel
                    if (Array.isArray(dietLabels)) {
                        dietLabels = [...new Set(dietLabels)]
                        let string = ""
                        dietLabels.forEach((label, index, array) => {
                            if (index < array.length - 1) {
                                string = string.concat(`${label}%2C`)
                            } else {
                                string = string.concat(`${label}`)
                            }
                        })
                        dietLabels = string
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`dietLabels=${dietLabels}`)
                }
                if ("flavor" in req.body) {
                    let flavors = req.body.flavor
                    if (Array.isArray(flavors)) {
                        flavors = [...new Set(flavors)]
                        let string = ""
                        flavors.forEach((flavor, index, array) => {
                            if (index < array.length - 1) {
                                string = string.concat(`${flavor}%2C`)
                            } else {
                                string = string.concat(`${flavor}`)
                            }
                        })
                        flavors = string
                    }
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`allowedFlavors=${flavors}`)
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
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`allowedCuisines=${req.body.cuisine}`)
                }
                if ("course" in req.body) {
                    if (currentURL.substr(currentURL.length - 1) != "?")
                        currentURL = currentURL.concat("&")
                    currentURL = currentURL.concat(`allowedCourses=${req.body.course}`)
                }
                console.log(currentHeader, currentURL) // debug
                axios.get(currentURL, currentHeader)
                    .then(response => {
                        recipes = response.data
                        if (recipes.length == 0) {
                            res.send(phrases.recipeDeny)
                        } else {
                            // if response is json array
                            try {
                                recipes.map(recipe => JSON.parse(recipe))
                            } catch (e) {
                                // recipes don't need to be parsed
                            }
                            currentRecipe = getRandomRecipe(recipes)
                            fs.writeFileSync(path.join(__dirname, "currentRecipe.json"), JSON.stringify(currentRecipe))
                            logRecipe()
                            res.send(phrases.recipeSuggestion1 + currentRecipe.name + phrases.recipeSuggestion2)
                        }

                    }).catch (e => {
                        res.send(phrases.connectionError)
                        //console.log(e)
                    })
                break
            case "getAnotherRecipe":
                if (recipes == null)
                    res.send(phrases.anotherRecipeDeny)
                else {
                    recipes.filter(recipe => recipe != currentRecipe)
                    currentRecipe = getRandomRecipe(recipes)
                    if (currentRecipe == null)
                        res.send(phrases.anotherRecipeDeny)
                    else {
                        fs.writeFileSync(path.join(__dirname, "currentRecipe.json"), JSON.stringify(currentRecipe))
                        logRecipe()
                        res.send(phrases.recipeSuggestion1 + currentRecipe.name + phrases.recipeSuggestion2)
                    }
                }
                break
            case "getFasterRecipe":
                if (recipes == null)
                    res.send(phrases.fasterRecipeDeny)
                else {
                    recipes.filter(recipe => recipe != currentRecipe || recipe.time < currentRecipe.time)
                    currentRecipe = getRandomRecipe(recipes)
                    if (currentRecipe == null)
                        res.send(phrases.fasterRecipeDeny)
                    else {
                        fs.writeFileSync(path.join(__dirname, "currentRecipe.json"), JSON.stringify(currentRecipe))
                        logRecipe()
                        res.send(phrases.recipeSuggestion1 + currentRecipe.name + phrases.recipeSuggestion2 + " " + phrases.recipeTime1 + Math.round(currentRecipe.time / 60) + phrases.recipeTime2)
                    }
                }
                break
            case "getIngredient":
                if (currentRecipe == null) {
                    res.send(phrases.currentRecipeDeny)
                } else {
                    let responseString = phrases.ingredientList
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
                                responseString = phrases.ingredientDenyList
                                ingredientArray.forEach((ingredient, index, array) => {
                                    let nor = switchPunctuation(index, array.length, phrases.nor)
                                    responseString = responseString.concat(`${ingredient}${nor}`)
                                })
                            } else
                                responseString = phrases.ingredientDeny1 + ingredientArray + phrases.ingredientDeny2
                        } else {
                            responseString = phrases.ingredientDeny1 + req.body.ingredient + phrases.ingredientDeny2
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getNutrient":
                if (currentRecipe == null) {
                    res.send(phrases.currentRecipeDeny)
                } else {
                    let responseString = phrases.nutrientList
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
                            if (quantity == 0) quantity = phrases.nutrientLittle
                            let unit = currentRecipe.nutrients[0][nutrient].unit
                            let label = currentRecipe.nutrients[0][nutrient].label
                            let and = switchPunctuation(index, array.length)
                            responseString = responseString.concat(`${quantity} ${unit} ${label}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.nutrient)) {
                            nutrientArray = [...new Set(req.body.nutrient)]
                            if (nutrientArray.length > 1) {
                                responseString = phrases.nutrientDenyList
                                nutrientArray.forEach((nutrient, index, array) => {
                                    let nor = switchPunctuation(index, array.length, phrases.nor)
                                    responseString = responseString.concat(`${nutrient}${nor}`)
                                })
                            } else
                                responseString = phrases.nutrientDeny1 + nutrientArray + phrases.nutrientDeny2
                        } else {
                            responseString = phrases.nutrientDeny1 + req.body.nutrient + phrases.nutrientDeny2
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getHealthLabel":
                if (currentRecipe == null) {
                    res.send(phrases.currentRecipeDeny)
                } else {
                    let responseString = phrases.labelList
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
                                responseString = phrases.labelDenyList
                                healthArray.forEach((healthLabel, index, array) => {
                                    let nor = switchPunctuation(index, array.length, phrases.nor)
                                    responseString = responseString.concat(`${healthLabel}${nor}`)
                                })
                            } else
                                responseString = phrases.labelDeny1 + healthArray + phrases.labelDeny2
                        } else {
                            responseString = phrases.labelDeny1 + req.body.healthLabel + phrases.labelDeny2
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getCaution":
                if (currentRecipe == null) {
                    res.send(phrases.currentRecipeDeny)
                } else {
                    let responseString = phrases.cautionList
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
                                responseString = phrases.cautionDenyList
                                cautionArray.forEach((caution, index, array) => {
                                    let nor = switchPunctuation(index, array.length, phrases.nor)
                                    responseString = responseString.concat(`${caution}${nor}`)
                                })
                            } else
                                responseString = phrases.cautionDeny1 + cautionArray + phrases.cautionDeny2
                        } else {
                            responseString = phrases.cautionDeny1 + req.body.caution + phrases.cautionDeny2
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getDietLabel":
                if (currentRecipe == null) {
                    res.send(phrases.currentRecipeDeny)
                } else {
                    let responseString = phrases.labelList
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
                                responseString = phrases.labelDenyList
                                dietArray.forEach((dietLabel, index, array) => {
                                    let nor = switchPunctuation(index, array.length, phrases.nor)
                                    responseString = responseString.concat(`${dietLabel}${nor}`)
                                })
                            } else
                                responseString = phrases.labelDeny1 + dietArray + phrases.labelDeny2
                        } else {
                            responseString = phrases.labelDeny1 + req.body.dietLabel + phrases.labelDeny2
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getFlavor":
                if (currentRecipe == null) {
                    res.send(phrases.currentRecipeDeny)
                } else {
                    let responseString = phrases.flavorList
                    let flavorArray = []
                    if ("flavor" in req.body) {
                        Array.isArray(req.body.flavor) ? flavorArray = [...new Set(req.body.flavor)] : flavorArray.push(req.body.flavor)
                        flavorArray = flavorArray.filter(flavor => flavor in currentRecipe.flavors && currentRecipe.flavors[flavor] >= 0.3)
                    } else {
                        flavorArray = Object.keys(currentRecipe.flavors)
                        // may adjust threshold
                        flavorArray = flavorArray.filter(flavor => currentRecipe.flavors[flavor] >= 0.3)
                    }
                    if (flavorArray.length > 0) {
                        flavorArray.forEach((flavor, index, array) => {
                            flavorValue = currentRecipe.flavors[flavor]
                            let and = switchPunctuation(index, array.length)
                            // may adjust threshold
                            if (flavorValue >= 0.3)
                                responseString = responseString.concat(`${flavor}${and}`)
                        })
                    } else {
                        if (Array.isArray(req.body.flavor)) {
                            flavorArray = [...new Set(req.body.flavor)]
                            if (flavorArray.length > 1) {
                                responseString = phrases.flavorDenyList
                                flavorArray.forEach((flavor, index, array) => {
                                    let nor = switchPunctuation(index, array.length, phrases.nor)
                                    responseString = responseString.concat(`${flavor}${nor}`)
                                })
                            } else
                                responseString = phrases.flavorDeny1 + flavorArray + phrases.flavorDeny2
                        } else {
                            responseString = phrases.flavorDeny1 + req.body.flavor + phrases.flavorDeny2
                        }
                    }
                    res.send(responseString)
                }
                break
            case "getName":
                if (currentRecipe == null)
                    res.send(phrases.currentRecipeDeny)
                else
                    res.send(currentRecipe.name)
                break
            case "getDescription":
                if (currentRecipe == null)
                    res.send(phrases.currentRecipeDeny)
                else
                    res.send(currentRecipe.description)
                break
            case "getPrepTime":
                if (currentRecipe == null)
                    res.send(phrases.currentRecipeDeny)
                else
                    res.send(phrases.recipeTime1 + Math.round(currentRecipe.time / 60) + phrases.recipeTime2)
                break
            case "getCuisine":
                if (currentRecipe == null)
                    res.send(phrases.currentRecipeDeny)
                else {
                    if (currentRecipe.cuisine == null)
                        res.send(phrases.cuisineDeny)
                    else
                        res.send(phrases.cuisine1 + currentRecipe.cuisine + phrases.cuisine2)
                }
                break
            case "getCourse":
                if (currentRecipe == null)
                    res.send(phrases.currentRecipeDeny)
                else
                    res.send(phrases.course1 + currentRecipe.course + phrases.course2)
                break
            case "getStep":
                if (currentRecipe == null)
                    res.send(phrases.currentRecipeDeny)
                else {
                    responseString = ""
                    if ("stepCount" in req.body) {
                        if (req.body.stepCount < 1 || req.body.stepCount > currentRecipe.preperation.length) {
                            responseString = phrases.stepMax1 + currentRecipe.preperation.length + phrases.stepMax2
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
                    res.send(phrases.currentRecipeDeny)
                else {
                    responseString = ""
                    if (currentStep+1 < currentRecipe.preperation.length) {
                        currentStep++
                        responseString = currentRecipe.preperation[currentStep]
                    } else {
                        responseString = phrases.stepMax1 + currentRecipe.preperation.length + phrases.stepMax2
                    }
                    res.send(responseString)
                }
                break
            case "getPreviousStep":
                if (currentRecipe == null)
                    res.send(phrases.currentRecipeDeny)
                else {
                    responseString = ""
                    if (currentStep-1 >= 0) {
                        currentStep--
                        responseString = currentRecipe.preperation[currentStep]
                    } else {
                        responseString = phrases.stepMin
                    }
                    res.send(responseString)
                }
                break
            case "register":
                responseString = ""
                if ("userID" in req.body) {
                    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")))
                    for (index in users) {
                        if (req.body.userID.toLowerCase() == users[index].userID.toLowerCase()) {
                            currentUserID = users[index].userID
                            responseString = phrases.userExists1 + users[index].userID + phrases.userExists2
                        }
                    }
                    if (responseString == "") {
                        users.push({
                            "userID": req.body.userID,
                            "dishLog": [],
                            "ratings": []
                        })
                        fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users))
                        currentUserID = req.body.userID
                        logRecipe()
                        responseString = phrases.userCreated1 + req.body.userID + phrases.userCreated2
                    }
                } else {
                    responseString = phrases.userRegisterDeny
                }
                res.send(responseString)
                break
            case "authenticate":
                responseString = ""
                if ("userID" in req.body) {
                    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")))
                    for (index in users) {
                        if (req.body.userID.toLowerCase() == users[index].userID.toLowerCase()) {
                            currentUserID = users[index].userID
                            logRecipe()
                            responseString = phrases.userAuth1 + users[index].userID + phrases.userAuth2
                        }
                    }
                    if (responseString == "") {
                        responseString = phrases.userNotFound1 + req.body.userID + phrases.userNotFound2
                    }
                } else {
                    responseString = phrases.userAuthDeny
                }
                res.send(responseString)
                break
            case "log_out":
                currentUserID = null
                res.send(phrases.userDefault)
                break
            case "rateDish":
                responseString = ""
                if (currentUserID == null)
                    res.send(phrases.currentUserDeny)
                else {
                    if ("rating" in req.body) {
                        let users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")))
                        let userIndex = users.findIndex(user => user.userID == currentUserID)
                        let ratingIndex = users[userIndex].ratings.findIndex(rating => rating.dishID == currentRecipe.dishID)
                        // add new rating to user profile
                        if (ratingIndex == -1) {
                            currentHeader = {
                                headers: {
                                    user: currentUserID,
                                    rating: req.body.rating
                                    }
                            }
                            currentURL = recommendationSystemURL
                            currentURL = currentURL.concat(`dishId=${currentRecipe.dishID}`)
                            console.log(currentHeader, currentURL) // debug
                            axios.get(currentURL, currentHeader)
                                .then(response => {
                                    users[userIndex].ratings.push({
                                        "dishID": currentRecipe.dishID,
                                        "rating": req.body.rating,
                                        "time": new Date().getTime()
                                    })
                                    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users))
                                    res.send(phrases.rating1 + currentRecipe.name + phrases.rating2 + req.body.rating + phrases.rating3)
                                }).catch(e => {
                                    //console.log(e)
                                    res.send(phrases.connectionError)
                                })
                        } else {
                            oldRating = users[userIndex].ratings[ratingIndex].rating
                            // if old rating didn't change
                            if (oldRating == req.body.rating)
                                res.send(phrases.ratingSame + currentRecipe.name + phrases.rating2 + req.body.rating + phrases.rating3)
                            // adjust old rating if it changed
                            else {
                                currentHeader = {
                                    headers: {
                                        user: currentUserID,
                                        rating: req.body.rating
                                        }
                                }
                                currentURL = recommendationSystemURL
                                currentURL = currentURL.concat(`dishId=${currentRecipe.dishID}`)
                                console.log(currentHeader, currentURL) // debug
                                axios.get(currentURL, currentHeader)
                                    .then(response => {
                                        users[userIndex].ratings[ratingIndex] = {
                                        "dishID": currentRecipe.dishID,
                                        "rating": req.body.rating,
                                        "time": new Date().getTime()
                                        }
                                        fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users))
                                        res.send(phrases.ratingAdjust1 + currentRecipe.name + phrases.ratingAdjust2 + oldRating + phrases.ratingAdjust3 + req.body.rating + phrases.rating3)
                                    }).catch(e => {
                                        //console.log(e)
                                        res.send(phrases.connectionError)
                                    })
                            }
                        }
                    } else {
                        res.send(phrases.ratingDeny)
                    }
                }
                break
            case "clear":
                currentRecipe = null
                recipes = null
                currentStep = 0
                res.send(phrases.clear)
                break
            case "checkRecipe":
                if (currentRecipe == null)
                    res.send("false")
                else
                    res.send("true")
                break
            case "checkStep":
                if (currentStep+1 == currentRecipe.preperation.length)
                    res.send("true")
                else
                    res.send("false")
                break
            case "checkRating":
                let users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")))
                if (currentUserID != null) {
                    let userIndex = users.findIndex(user => user.userID == currentUserID)
                    if (users[userIndex].ratings.find(rating => rating.dishID == currentRecipe.dishID) == null)
                        res.send("false")
                    else
                        res.send("true")
                } else {
                    res.send("false")
                }
                break
            default:
                // may add error message for unknown intent or wrong request body
                break
        }
    } catch (e) {
        console.log(e)
        res.send(phrases.webhookError)
    }
})

function getRandomRecipe(recipes) {
    return recipes[Math.floor(Math.random() * recipes.length)]
}

function switchPunctuation(index, length, string=phrases.and) {
    if (index == length-1)
        return "."
    if (index == length-2)
        return ` ${string} `
    else
        return ", "
}

function logRecipe() {
    if (currentRecipe != null && currentUserID != null) {
        let users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")))
        users[users.findIndex(user => user.userID == currentUserID)].dishLog.push({
            "dishID": currentRecipe.dishID,
            "time": new Date().getTime()
        })
        fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users))
    }
}

app.listen(50003)
console.log("listening on 50003")
