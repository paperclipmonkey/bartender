# Recipes
Each recipe is a JSON document that lives in the recipes folder. They follow a set JSON structure:

## structure
```JS
{
    "name": "Used by Google etc",
    "description": "Shows up in details page. Supports markdown.",
    "intro": "list item text",
    "pre": "text shown before dispensing",
    "post": "text shown after dispensing",
    "glass": "glass type from ENUM available. Changes the icon",
    "steps": [ // Steps are run sequentially, with each ingredient inside a step being dispensed at the same time
        {
            "ingredients": [
                {
                    "name": "vodka", // Ingredient name needs to match optic or pump
                    "amount": 75 // ml to dispense. Optics are in 25ml increments
                },
                {
                    "name": "cointreau",
                    "amount": 50
                },
                {
                    "name": "lime",
                    "amount": 25
                },
                {
                    "name": "cranberry",
                    "amount": 10 // If on a pump it can be any ml size
                }
            ]
        },
        { // Step 2 happens after all step 1 ingredients have been dispensed
            "ingredients": [
                {
                    "name": "syrup", // Ingredient name needs to match optic or pump
                    "amount": 25 // ml to dispense. Optics are in 25ml increments
                },
            ]
        }
    ]
}
```