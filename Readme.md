# Recipe & Shopping list App

_This is a React Native App developed by marina1799, lenadethloff and hfg-leonard-t._<br><br>

With this app, you can easily manage all the nice recipes that you have, and you will never worry again about the tiring process of writing a shopping list.<br><br>

## Tutorial for using the app

### Creating a recipe book

1. You can create different recipe books where you can put your collection of recipes.<br>
   To do this, just launch the app, and you will start on the home page of our app.<br>
   Here you will later find all of your recipe books, and you can also navigate to the shopping list by using the "Einkaufszettel" button.<br>
   To add a new recipe book, click the `+` button on the bottom right of the page.<br>
   Then you can choose the "Rezepteliste" option to create a recipe book.

2. Add a name and description to your new recipe book and press "Hinzufügen". You also have the option to set an image for your recipe book.

3. The new recipe book will now be visible on your home page, and you can either access it or delete it from there.

### Creating a recipe

1. Next, you can create a recipe by clicking the `+` button on the home page or from inside a recipe book by also pressing the `+` button.

2. Now you can again select an image for the recipe, a title, a recipe list, the duration, all your ingredients, and lastly, the preparation steps. If you are done filling out all the fields, just hit "Speichern".

3. You can now access your recipe by first selecting the recipe book where it is inside and then pressing on the newly created recipe (it will be located at the bottom of all recipes).

### Adding recipe ingredients directly to your shopping list

1. When you access any recipe, you have to add the ingredients that you need to prepare it directly to your shopping list. Do this by just pressing the "Zu Einkaufszettel hinzufügen" button.

2. You will be seeing a modal where you can specifically select just the ingredients that you want to add to your shopping list. If you have selected all the ingredients you want to add, hit "Hinzufügen".

3. The selected ingredients will now be added to your shopping list.

## Deleting recipe lists and recipes

1. You can at any time just hit the `delete` icon next to your recipe or your shopping list.

2. You will then be asked if you really want to delete it. **Be careful because when you delete it, there will be no way to bring it back!**

### Managing the shopping list

1. Navigate to the shopping list from your home page using the "Einkaufszettel" button.

2. You can see all your items listed below.

3. You can add new items by filling out the "Menge..." and the "Zutat..." input fields and pressing "Hinzufügen".

4. You can mark your items as "done" by checking the checkbox next to them.

5. The checked items will be listed at the bottom of the page. You can restore them, by unchecking them again.

6. If you want to clear the checked items, hit the "Abgehakte löschen" button. **They will then be removed permanently!**

## Technical details

- This app uses React Native with Expo.
- To store any data that is just strings and JSON objects, we use AsyncStorage. With AsyncStorage it is easy to store and fetch data in any component where it is needed.
- To pick images, we use expo-image-picker, and to save images, expo-file-system is used.
- To style our app, we use the native-base component library.
- For navigating inside our app, we use the react-navigation package.
