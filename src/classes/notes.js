const Note = require("./note.js");

class Notes {
    static noteList = [];

    static createNote(title, description) {
        const newNote = new Note(title, description);
        this.noteList.push(newNote);
        
        return newNote;
    }

    static updateNote(id, title, description) {
        for (let i = 0; i < this.noteList.length; i++) {
            if (this.noteList[i].id === id) {
                this.noteList[i].title = title;
                this.noteList[i].description = description; 

                return true;
            }
        }
        return false;
    }

    static deleteNote(id) {
        for (let i = 0; i < this.noteList.length; i++) {
            if (this.noteList[i].id === id) {
                this.noteList.splice(i, 1);

                return true;
            }
        }
        return false;
    }
}

Notes.createNote("Meeting Notes", "Discussed project timeline and deliverables.<br>Assigned tasks to team members.<br>Next steps: Follow up on Tuesday.");
Notes.createNote("Grocery List", "1. Apples<br>2. Bananas<br>3. Milk<br>4. Eggs<br>5. Bread");
Notes.createNote("Birthday Plans", "Plan a surprise party for Sarah.<br>Invite 15 people, book a venue, buy cake.<br>Send invitations by Friday.");
Notes.createNote("Travel Itinerary", "Flight at 10 AM, arrival at 2 PM.<br>Hotel check-in at 4 PM.<br>Visit the museum in the evening.<br>Explore local restaurants.");
Notes.createNote("To-Do List", "1. Finish report<br>2. Call mom<br>3. Email client<br>4. Go for a run<br>5. Buy new shoes");
Notes.createNote("Recipe Idea", "Ingredients: chicken, garlic, ginger, soy sauce, honey.<br>Instructions: Marinate chicken, stir-fry with garlic and ginger.<br>Serve with rice and veggies.");
Notes.createNote("Book Recommendations", "1. '1984' by George Orwell<br>2. 'The Great Gatsby' by F. Scott Fitzgerald<br>3. 'Sapiens' by Yuval Noah Harari<br>4. 'The Catcher in the Rye' by J.D. Salinger");
Notes.createNote("Work Goals", "1. Improve team collaboration<br>2. Complete 3 projects this quarter<br>3. Increase sales by 10%<br>4. Learn a new skill (e.g. Python)");
Notes.createNote("Health Tracker", "Exercise: 30-minute walk<br>Water: 8 glasses<br>Sleep: 7 hours<br>Diet: Eating more vegetables");
Notes.createNote("Movie Watchlist", "1. The Matrix<br>2. Inception<br>3. Interstellar<br>4. The Dark Knight<br>5. The Shawshank Redemption");
Notes.createNote("Learning Plan", "1. Complete JavaScript course<br>2. Practice coding daily<br>3. Read programming blogs<br>4. Contribute to open-source projects");
Notes.createNote("Fitness Challenge", "1. Run 5 km<br>2. Do 30 pushups<br>3. Hold plank for 3 minutes<br>4. Stretch daily");
Notes.createNote("Vacation Ideas", "1. Paris<br>2. Tokyo<br>3. Bali<br>4. New Zealand<br>5. Iceland");
Notes.createNote("Weekend Goals", "1. Clean the house<br>2. Organize the closet<br>3. Catch up on Netflix<br>4. Go hiking on Sunday");
Notes.createNote("Productivity Tips", "1. Prioritize tasks<br>2. Use the Pomodoro technique<br>3. Eliminate distractions<br>4. Take regular breaks");
Notes.createNote("Recipe: Pancakes", "Ingredients: flour, eggs, milk, baking powder, butter<br>Instructions: Mix dry ingredients, add wet ingredients, cook on medium heat.<br>Serve with syrup and berries.");
Notes.createNote("Tech Wishlist", "1. New laptop<br>2. Smartwatch<br>3. Noise-canceling headphones<br>4. Portable speaker<br>5. External hard drive");
Notes.createNote("Holiday Gift Ideas", "1. Cozy sweater<br>2. Bluetooth speaker<br>3. Scented candles<br>4. Gift card for favorite store<br>5. Book subscription box");
Notes.createNote("Music Playlist", "1. 'Blinding Lights' by The Weeknd<br>2. 'Levitating' by Dua Lipa<br>3. 'Good 4 U' by Olivia Rodrigo<br>4. 'Stay' by The Kid LAROI & Justin Bieber");

module.exports = Notes;